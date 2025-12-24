'use client';

import Link from 'next/link';
import BellIcon from '../../icons/bell-icon';
import MenuIcon from '../../icons/menu-icon';
import { useSidebarStore } from '@/stores/sidebar-store';

export default function ExpenseHeader() {
  const open = useSidebarStore((s) => s.open);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="w-16" />
        <div className="text-medium16">가계부</div>
        <div className="flex w-16 items-center justify-end gap-4">
          <Link href="/notice">
            <BellIcon />
          </Link>
          <button onClick={open}>
            <MenuIcon />
          </button>
        </div>
      </header>
      <div className="h-12" />
    </>
  );
}
