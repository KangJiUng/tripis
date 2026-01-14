// app/api/places/reorder/route.ts

import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();

  // 1. 로그인 체크
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. body 파싱
  const { planId, dayIndex, activePlaceId, overPlaceId } = await req.json();

  if (!planId || dayIndex === undefined || !activePlaceId || !overPlaceId) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  // 3. plan + dayIndex 기준으로 day_id 조회
  const { data: day, error: dayError } = await supabase
    .from('travel_day')
    .select('day_id')
    .eq('plan_id', planId)
    .eq('day_index', Number(dayIndex))
    .single();

  if (!day || dayError) {
    return NextResponse.json({ error: 'Day not found' }, { status: 404 });
  }

  // 4. 해당 day의 장소 목록 조회 (순서 기준)
  const { data: places, error: placesError } = await supabase
    .from('travel_place')
    .select('place_id, order_index')
    .eq('day_id', day.day_id)
    .order('order_index');

  if (!places || placesError) {
    return NextResponse.json({ error: 'Places fetch failed' }, { status: 500 });
  }

  // 5. 이동 전/후 index 계산
  const fromIndex = places.findIndex((p) => p.place_id === activePlaceId);
  const toIndex = places.findIndex((p) => p.place_id === overPlaceId);

  if (fromIndex === -1 || toIndex === -1) {
    return NextResponse.json({ error: 'Invalid place id' }, { status: 400 });
  }

  // 6. 배열 reorder
  const reordered = [...places];
  const [moved] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, moved);

  // 7. order_index 재저장 (1부터 연속)
  for (let i = 0; i < reordered.length; i++) {
    const { error } = await supabase
      .from('travel_place')
      .update({ order_index: i + 1 })
      .eq('place_id', reordered[i].place_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
