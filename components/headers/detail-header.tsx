'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '../../icons/back-icon';
import KebabMenuIcon from '../../icons/kebab-menu-icon';

export default function DetailHeader() {
  const router = useRouter();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <button onClick={() => router.back()} className="cursor-pointer">
          <BackIcon width={24} height={24} />
        </button>
        <button className="cursor-pointer">
          <KebabMenuIcon />
        </button>
      </header>
      <div className="h-12" />
    </>
  );
}
