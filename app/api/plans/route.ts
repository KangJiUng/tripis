import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';
import { differenceInCalendarDays } from 'date-fns';

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();

  // 1. 로그인 유저 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. body 파싱
  const { title, country, startDate, endDate } = await req.json();

  if (!title || !country || !startDate || !endDate) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const totalDays = differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1;

  // 3. plan 생성
  const { data: plan, error: planError } = await supabase
    .from('travel_plan')
    .insert({
      user_id: user.id,
      title,
      country,
      start_date: startDate,
      end_date: endDate,
      total_days: totalDays,
    })
    .select()
    .single();

  if (planError || !plan) {
    return NextResponse.json({ error: planError?.message }, { status: 500 });
  }

  // 4. travel_day 생성
  const days = Array.from({ length: totalDays }).map((_, i) => ({
    plan_id: plan.plan_id,
    day_index: i + 1,
  }));

  const { error: dayError } = await supabase.from('travel_day').insert(days);

  if (dayError) {
    return NextResponse.json({ error: dayError.message }, { status: 500 });
  }

  return NextResponse.json({ planId: plan.plan_id });
}

export async function GET() {
  const supabase = await createSupabaseServer();

  // 1. 로그인 유저 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. 현재 유저의 여행 일정 조회
  const { data: plans, error } = await supabase
    .from('travel_plan')
    .select('plan_id, title, country, start_date, end_date')
    .eq('user_id', user.id)
    .order('start_date', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ plans });
}
