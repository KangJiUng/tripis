import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: 'Missing plan id' }, { status: 400 });
  }

  const supabase = await createSupabaseServer();

  const { data: plan, error } = await supabase
    .from('travel_plan')
    .select('plan_id, title, country, start_date, end_date')
    .eq('plan_id', id)
    .single();

  if (error || !plan) {
    return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
  }

  return NextResponse.json({ plan });
}
