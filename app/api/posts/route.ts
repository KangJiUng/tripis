import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();

  try {
    // 1. 로그인 체크
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. FormData 파싱
    const formData = await req.formData();

    const post_type = formData.get('post_type') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const countries = formData.getAll('countries') as string[];
    const tags = formData.get('tags') as string | null;
    const images = formData.getAll('images') as File[];

    if (!post_type || !title || !content) {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    if (images.length > 10) {
      return NextResponse.json({ error: 'Max 10 images' }, { status: 400 });
    }

    // 3. post 먼저 생성 (image_urls 비워둠)
    const { data: post, error: insertError } = await supabase
      .from('post')
      .insert({
        user_id: user.id,
        post_type,
        title,
        content,
        countries,
        tags,
        image_urls: [],
      })
      .select()
      .single();

    if (insertError || !post) {
      throw insertError;
    }

    const uploadedPaths: string[] = [];

    // 4. 이미지 업로드
    try {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const path = `${post.post_id}/${i + 1}.jpg`;

        const { error } = await supabase.storage.from('tripis-post-images').upload(path, file, {
          contentType: file.type,
          upsert: false,
        });

        if (error) throw error;

        uploadedPaths.push(`tripis-post-images/${path}`);
      }

      // 5. post image_urls 업데이트
      if (uploadedPaths.length > 0) {
        const { error: updateError } = await supabase
          .from('post')
          .update({ image_urls: uploadedPaths })
          .eq('post_id', post.post_id);

        if (updateError) throw updateError;
      }
    } catch (imgError) {
      // 이미지 업로드 실패 시 정리
      if (uploadedPaths.length > 0) {
        await supabase.storage
          .from('tripis-post-images')
          .remove(uploadedPaths.map((p) => p.replace('tripis-post-images/', '')));
      }

      throw imgError;
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (e) {
    console.error('POST /api/posts error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
