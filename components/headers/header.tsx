'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import BellIcon from '../../icons/bell-icon';
import MenuIcon from '../../icons/menu-icon';
import { useSidebarStore } from '@/stores/sidebar-store';

export default function Header() {
  const open = useSidebarStore((s) => s.open);
  const [nickname, setNickname] = useState('여행자');

  useEffect(() => {
    let mounted = true;

    async function loadNickname() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase.from('users').select('nickname').eq('id', user.id).maybeSingle();

      if (mounted && profile?.nickname) {
        setNickname(`여행자, ${profile.nickname}`);
      }
    }

    loadNickname();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="text-medium18">{nickname}님!</div>

        <div className="flex items-center gap-4">
          <Link href="/notice">
            <BellIcon />
          </Link>
          <button onClick={open} className="cursor-pointer">
            <MenuIcon />
          </button>
        </div>
      </header>
      <div className="h-12" />
    </>
  );
}
