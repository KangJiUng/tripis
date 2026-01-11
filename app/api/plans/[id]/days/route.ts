import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const supabase = await createSupabaseServer();
  const { id: planId } = await context.params;

  // 1. 로그인 체크
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. travel_day 조회
  const { data: days, error: dayError } = await supabase
    .from('travel_day')
    .select('day_id, day_index')
    .eq('plan_id', planId)
    .order('day_index');

  if (dayError) {
    return NextResponse.json({ error: dayError.message }, { status: 500 });
  }

  if (!days || days.length === 0) {
    return NextResponse.json({ days: [] });
  }

  // 3. day_id 목록
  const dayIds = days.map((d) => d.day_id);

  // 4. travel_place 조회
  const { data: places, error: placeError } = await supabase
    .from('travel_place')
    .select('place_id, day_id, title, address, latitude, longitude, memo, order_index, primary_type')
    .in('day_id', dayIds)
    .order('order_index');

  if (placeError) {
    return NextResponse.json({ error: placeError.message }, { status: 500 });
  }

  // 5. day 기준으로 묶기
  const result = days.map((day) => ({
    day_id: day.day_id,
    day_index: day.day_index,
    places: (places ?? []).filter((p) => p.day_id === day.day_id),
  }));

  return NextResponse.json({ days: result });
}
