// app/api/places/move/route.ts

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
  const { planId, targetDayIndex, placeId, overPlaceId } = await req.json();
  if (!planId || !targetDayIndex || !placeId) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  // 3. 이동 대상 place의 현재 day_id 조회 (sourceDay)
  const { data: currentPlace, error: currentError } = await supabase
    .from('travel_place')
    .select('place_id, day_id, order_index')
    .eq('place_id', placeId)
    .single();
  if (!currentPlace || currentError) {
    return NextResponse.json({ error: 'Place not found' }, { status: 404 });
  }
  const sourceDayId = currentPlace.day_id;

  // 4. target day 찾기
  const { data: targetDay, error: dayError } = await supabase
    .from('travel_day')
    .select('day_id')
    .eq('plan_id', planId)
    .eq('day_index', Number(targetDayIndex))
    .single();

  if (!targetDay || dayError) {
    return NextResponse.json({ error: 'Target day not found' }, { status: 404 });
  }

  // 추가: 같은 day면 이동 불필요
  if (currentPlace.day_id === targetDay.day_id) {
    return NextResponse.json({ success: true });
  }

  // 5. 타겟 day의 현재 목록과 삽입 위치 계산
  const { data: targetPlaces, error: targetFetchError } = await supabase
    .from('travel_place')
    .select('place_id, order_index')
    .eq('day_id', targetDay.day_id)
    .order('order_index');
  if (targetFetchError) {
    return NextResponse.json({ error: targetFetchError.message }, { status: 500 });
  }

  // overPlaceId가 주어지면 그 위치로(앞에 삽입), 아니면 마지막에
  const overIdx = overPlaceId ? (targetPlaces?.findIndex((p) => p.place_id === overPlaceId) ?? -1) : -1;
  const insertOrder =
    overIdx >= 0
      ? (targetPlaces?.[overIdx]?.order_index ?? (targetPlaces?.length ?? 0) + 1)
      : (targetPlaces?.length ?? 0) + 1;

  // 6. 타겟 day: 삽입 위치 이후 항목들 order_index를 +1 시프트 (충돌 방지)
  if (targetPlaces && targetPlaces.length > 0) {
    for (const p of targetPlaces) {
      if (p.order_index >= insertOrder) {
        const { error: shiftError } = await supabase
          .from('travel_place')
          .update({ order_index: p.order_index + 1 })
          .eq('place_id', p.place_id);
        if (shiftError) {
          return NextResponse.json({ error: shiftError.message }, { status: 500 });
        }
      }
    }
  }

  // 6.1 place 이동: 해당 위치로 설정 (over 앞에 들어가도록)
  const { error: updateError } = await supabase
    .from('travel_place')
    .update({ day_id: targetDay.day_id, order_index: insertOrder })
    .eq('place_id', placeId);
  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // 6.2 타겟 day를 1..n으로 최종 정렬
  const { data: afterTargetPlaces, error: afterTargetFetchError } = await supabase
    .from('travel_place')
    .select('place_id, order_index')
    .eq('day_id', targetDay.day_id)
    .order('order_index');
  if (afterTargetFetchError) {
    return NextResponse.json({ error: afterTargetFetchError.message }, { status: 500 });
  }
  for (let i = 0; i < (afterTargetPlaces?.length ?? 0); i++) {
    const p = afterTargetPlaces![i];
    const { error: reindexTargetError } = await supabase
      .from('travel_place')
      .update({ order_index: i + 1 })
      .eq('place_id', p.place_id);
    if (reindexTargetError) {
      return NextResponse.json({ error: reindexTargetError.message }, { status: 500 });
    }
  }

  // 7. 원본 day의 order_index 재정렬 (1부터 연속)
  const { data: sourcePlaces, error: sourceFetchError } = await supabase
    .from('travel_place')
    .select('place_id, order_index')
    .eq('day_id', sourceDayId)
    .order('order_index');
  if (sourceFetchError) {
    return NextResponse.json({ error: sourceFetchError.message }, { status: 500 });
  }

  if (sourcePlaces && sourcePlaces.length > 0) {
    for (let i = 0; i < sourcePlaces.length; i++) {
      const p = sourcePlaces[i];
      const { error: reindexError } = await supabase
        .from('travel_place')
        .update({ order_index: i + 1 })
        .eq('place_id', p.place_id);
      if (reindexError) {
        return NextResponse.json({ error: reindexError.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: true });
}
