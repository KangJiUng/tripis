'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

import HomeIcon from '../icons/home-icon';
import CommunityIcon from '../icons/community-icon';
import PlusIcon from '../icons/plus-icon';
import PlanIcon from '../icons/plan-icon';
import ExpenseIcon from '../icons/expense-icon';

import FloatingMenu from './floating-menu';

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <FloatingMenu open={open} onClose={() => setOpen(false)} />

      <nav className="fixed bottom-0 left-1/2 z-50 flex h-13 w-full max-w-[600px] -translate-x-1/2 items-center justify-between border-t bg-white px-3">
        <Link href="/" className="flex h-full flex-1 flex-col items-center justify-end pb-1">
          <div className="mb-1 flex h-4 items-center justify-center">
            <HomeIcon color={isActive('/') ? 'var(--color-black)' : 'var(--color-inactive)'} />
          </div>
          <span className={`text-regular12 ${isActive('/') ? 'text-black' : 'text-inactive'}`}>여행홈</span>
        </Link>

        <Link href="/community" className="flex h-full flex-1 flex-col items-center justify-end pb-1">
          <div className="mb-1 flex h-4 items-center justify-center">
            <CommunityIcon color={isActive('/community') ? 'var(--color-black)' : 'var(--color-inactive)'} />
          </div>
          <span className={`text-regular12 ${isActive('/community') ? 'text-black' : 'text-inactive'}`}>커뮤니티</span>
        </Link>

        <button onClick={() => setOpen(!open)} className="z-50 flex flex-1 items-center justify-center">
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-500 shadow-md"
          >
            <PlusIcon />
          </motion.div>
        </button>

        <Link href="/plan" className="flex h-full flex-1 flex-col items-center justify-end pb-1">
          <div className="mb-1 flex h-4 items-center justify-center">
            <PlanIcon color={isActive('/plan') ? 'var(--color-black)' : 'var(--color-inactive)'} />
          </div>
          <span className={`text-regular12 ${isActive('/plan') ? 'text-black' : 'text-inactive'}`}>일정</span>
        </Link>

        <Link href="/expense" className="flex h-full flex-1 flex-col items-center justify-end pb-1">
          <div className="mb-1 flex h-4 items-center justify-center">
            <ExpenseIcon color={isActive('/expense') ? 'var(--color-black)' : 'var(--color-inactive)'} />
          </div>
          <span className={`text-regular12 ${isActive('/expense') ? 'text-black' : 'text-inactive'}`}>가계부</span>
        </Link>
      </nav>
    </>
  );
}
