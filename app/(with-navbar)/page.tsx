import Header from '@/components/headers/header';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <Header /> 홈
    </div>
  );
}
