import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('query')?.trim();
  const type = searchParams.get('type');

  if (!query) {
    return NextResponse.json({ error: 'query is required' }, { status: 400 });
  }

  let dbQuery = supabase
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
      user_id
      `,
    )
    .order('created_at', { ascending: false });

  if (type) {
    dbQuery = dbQuery.eq('post_type', type);
  }

  // OR 검색 (title, content, tags)
  dbQuery = dbQuery.or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.ilike.%${query}%`);

  const { data: posts, error } = await dbQuery;

  if (error) {
    console.error('search feed error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }

  return NextResponse.json({ posts });
}
