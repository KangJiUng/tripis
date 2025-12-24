'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import UserInfo from './user-info';
import UserMenu from './user-menu';
import GuestMenu from './guest-menu';
import SidebarWrapper from './sidebar-wrapper';

export default function SidebarClient({ initialUser }: { initialUser: any }) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <SidebarWrapper>
      <UserInfo user={user} />
      {user ? <UserMenu /> : <GuestMenu />}
    </SidebarWrapper>
  );
}
