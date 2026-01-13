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
  const { planId, targetDayIndex, placeId } = await req.json();
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

  // 5. 현재 대상 day의 마지막 order_index 조회
  const { data: lastPlace } = await supabase
    .from('travel_place')
    .select('order_index')
    .eq('day_id', targetDay.day_id)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = lastPlace ? lastPlace.order_index + 1 : 1;

  // 6. place 이동 (day_id 변경 및 order_index 재배치)
  const { error: updateError } = await supabase
    .from('travel_place')
    .update({ day_id: targetDay.day_id, order_index: nextOrder })
    .eq('place_id', placeId);
  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
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
    // 새 인덱스 맵 구성
    const updates = sourcePlaces.map((p, idx) => ({ place_id: p.place_id, order_index: idx + 1 }));

    // Supabase는 다중 다른 값 업데이트를 한 번에 지원하지 않으므로 루프 처리
    for (const u of updates) {
      const { error: reindexError } = await supabase
        .from('travel_place')
        .update({ order_index: u.order_index })
        .eq('place_id', u.place_id);
      if (reindexError) {
        return NextResponse.json({ error: reindexError.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: true });
}
