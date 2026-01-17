import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

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

        uploadedPaths.push(`${SUPABASE_URL}/storage/v1/object/public/tripis-post-images/${path}`);
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

export async function GET(req: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');
  const type = searchParams.get('type');

  // 1. 포스트 상세 조회
  if (id) {
    const { data: post, error } = await supabase
      .from('post')
      .select(
        `
    post_id,
    post_type,
    title,
    content,
    tags,
    countries,
    image_urls,
    countries,
    tags,
    created_at,
    users!inner (
      nickname,
      profile_image_url
    )
  `,
      )
      .eq('post_id', id)
      .single();

    if (error || !post) {
      console.error('post detail error:', error);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  }

  // 2. 리스트 조회 (탭별)
  if (type) {
    const { data: posts, error } = await supabase
      .from('post')
      .select(
        `
        post_id,
        title,
        content,
        post_type,
        image_urls,
        countries,
        tags,
        created_at,
        user_id,
        users (
          nickname,
          profile_image_url
        )
        `,
      )
      .eq('post_type', type)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    return NextResponse.json({ posts });
  }

  return NextResponse.json({ error: 'Query parameter required (id or type)' }, { status: 400 });
}
