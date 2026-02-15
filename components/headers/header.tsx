'use client';

import Link from 'next/link';
import BellIcon from '../../icons/bell-icon';
import MenuIcon from '../../icons/menu-icon';
import { useSidebarStore } from '@/stores/sidebar-store';
import { useUserStore } from '@/stores/user-store';

export default function Header() {
  const open = useSidebarStore((s) => s.open);
  const nickname = useUserStore((s) => s.nickname);
  const greeting = nickname ? `여행자, ${nickname}님!` : '여행자님!';

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="text-medium18">{greeting}</div>

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
