import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
import Login from '@/components/login';

export default async function LoginPage() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/');
  }

  return <Login />;
}
