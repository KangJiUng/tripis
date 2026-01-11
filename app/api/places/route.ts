import { NextResponse } from 'next/server';
import placesData from '@/data/places.json';
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
  const { planId, dayIndex, placeIds } = await req.json();

  if (!planId || !dayIndex || !Array.isArray(placeIds) || placeIds.length === 0) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  // 3. travel_day 조회
  const { data: day, error: dayError } = await supabase
    .from('travel_day')
    .select('day_id')
    .eq('plan_id', planId)
    .eq('day_index', Number(dayIndex))
    .single();

  if (!day || dayError) {
    return NextResponse.json({ error: 'Day not found' }, { status: 404 });
  }

  // 4. 선택된 장소 정보 추출 (places.json 기준)
  const selectedPlaces = placesData.predictions.filter((p) => placeIds.includes(p.place_id));

  if (selectedPlaces.length === 0) {
    return NextResponse.json({ error: 'No valid places' }, { status: 400 });
  }

  // 5. 현재 day의 마지막 order_index 조회
  const { data: lastPlace } = await supabase
    .from('travel_place')
    .select('order_index')
    .eq('day_id', day.day_id)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  const startOrder = lastPlace ? lastPlace.order_index + 1 : 1;

  // 6. insert payload 생성
  const rows = selectedPlaces.map((p, idx) => ({
    day_id: day.day_id,
    title: p.name,
    address: p.formatted_address,
    latitude: p.geometry.location.lat,
    longitude: p.geometry.location.lng,
    primary_type: p.primary_type,
    order_index: startOrder + idx,
  }));

  // 7. insert
  const { error: insertError } = await supabase.from('travel_place').insert(rows);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    insertedCount: rows.length,
  });
}
