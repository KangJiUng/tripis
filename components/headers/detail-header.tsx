'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BackIcon from '../../icons/back-icon';
import KebabMenuIcon from '../../icons/kebab-menu-icon';
import HomeIcon from '@/icons/home-icon';

export default function DetailHeader() {
  const router = useRouter();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="cursor-pointer">
            <BackIcon width={24} height={24} />
          </button>
          <Link href={'/'} className="cursor-pointer pb-0.5">
            <HomeIcon color="black" />
          </Link>
        </div>
        <button className="cursor-pointer">
          <KebabMenuIcon />
        </button>
      </header>
      <div className="h-12" />
    </>
  );
}
