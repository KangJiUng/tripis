import { createSupabaseServer } from '@/lib/supabase/server';
import UserInfo from './user-info';
import UserMenu from './user-menu';
import GuestMenu from './guest-menu';
import SidebarWrapper from './sidebar-wrapper';

export default async function Sidebar() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  return (
    <SidebarWrapper>
      <UserInfo />
      {isLoggedIn ? <UserMenu /> : <GuestMenu />}
    </SidebarWrapper>
  );
}
