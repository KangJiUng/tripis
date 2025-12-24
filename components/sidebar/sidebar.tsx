import { createSupabaseServer } from '@/lib/supabase/server';
import SidebarClient from './sidebar-client';

export default async function Sidebar() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <SidebarClient initialUser={user} />;
}
