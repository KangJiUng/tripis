import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

type DayReviewPayload = {
  day_id: string;
  day_index: number;
  content: string;
};

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const plan_id = formData.get('plan_id') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const day_reviews_raw = (formData.get('day_reviews') as string | null) ?? '[]';
    const images = formData.getAll('images') as File[];

    if (!plan_id || !title || !content) {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    if (images.length > 10) {
      return NextResponse.json({ error: 'Max 10 images' }, { status: 400 });
    }

    const { data: plan, error: planError } = await supabase
      .from('travel_plan')
      .select('country, start_date, end_date')
      .eq('plan_id', plan_id)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ error: 'Invalid plan_id' }, { status: 400 });
    }

    let dayReviews: DayReviewPayload[] = [];
    try {
      dayReviews = JSON.parse(day_reviews_raw) as DayReviewPayload[];
    } catch {
      dayReviews = [];
    }

    const dayContents = [...dayReviews]
      .sort((a, b) => a.day_index - b.day_index)
      .map((day) => {
        const trimmed = day.content?.trim() ?? '';
        return trimmed.length > 0 ? trimmed : null;
      });

    const { data: review, error: insertError } = await supabase
      .from('review')
      .insert({
        user_id: user.id,
        plan_id,
        plan_country: plan.country,
        plan_start_date: plan.start_date,
        plan_end_date: plan.end_date,
        title,
        content,
        image_urls: [],
        day_contents: dayContents,
      })
      .select()
      .single();

    if (insertError || !review) {
      throw insertError;
    }

    if (dayReviews.length > 0) {
      const rows = dayReviews.map((day) => ({
        review_id: review.review_id,
        day_id: day.day_id,
        day_index: day.day_index,
        content: day.content?.trim() ?? '',
      }));

      const { error: dayError } = await supabase.from('review_day').insert(rows);
      if (dayError) {
        throw dayError;
      }
    }

    const uploadedPaths: string[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const path = `${review.review_id}/${i + 1}.jpg`;

        const { error } = await supabase.storage.from('tripis-review-images').upload(path, file, {
          contentType: file.type,
          upsert: false,
        });

        if (error) throw error;

        uploadedPaths.push(`${SUPABASE_URL}/storage/v1/object/public/tripis-review-images/${path}`);
      }

      if (uploadedPaths.length > 0) {
        const { error: updateError } = await supabase
          .from('review')
          .update({ image_urls: uploadedPaths })
          .eq('review_id', review.review_id);

        if (updateError) throw updateError;
      }
    } catch (imgError) {
      if (uploadedPaths.length > 0) {
        await supabase.storage
          .from('tripis-review-images')
          .remove(uploadedPaths.map((p) => p.replace('tripis-review-images/', '')));
      }
      throw imgError;
    }

    return NextResponse.json({ review }, { status: 201 });
  } catch (e) {
    console.error('POST /api/reviews error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('query')?.trim();
  const sort = searchParams.get('sort') === 'likes' ? 'likes' : 'latest';

  let dbQuery = supabase
    .from('review')
    .select(
      `
      review_id,
      user_id,
      plan_id,
      plan_country,
      plan_start_date,
      plan_end_date,
      title,
      content,
      image_urls,
      like_count,
      comment_count,
      created_at
      `,
    )
    .order(sort === 'likes' ? 'like_count' : 'created_at', { ascending: false })
    .order('created_at', { ascending: false });

  if (query) {
    dbQuery = dbQuery.or(`title.ilike.%${query}%,content.ilike.%${query}%`);
  }

  const { data: reviews, error } = await dbQuery;

  if (error) {
    console.error('GET /api/reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }

  if (!reviews || reviews.length === 0) {
    return NextResponse.json({ reviews: [] });
  }

  const userIds = Array.from(new Set(reviews.map((r) => r.user_id)));

  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, nickname, profile_image_url')
    .in('id', userIds);

  if (usersError) {
    console.error('GET /api/reviews relation fetch error:', usersError);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }

  const userMap = new Map((users ?? []).map((u) => [u.id, u]));

  const mergedReviews = reviews.map((review) => ({
    ...review,
    users: userMap.get(review.user_id) ?? null,
  }));

  return NextResponse.json({ reviews: mergedReviews });
}
