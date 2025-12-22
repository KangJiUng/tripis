'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '../../icons/back-icon';

export default function NoticeHeader() {
  const router = useRouter();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <button onClick={() => router.back()} className="cursor-pointer">
          <BackIcon />
        </button>
        <div className="text-medium16">알림함</div>
        <div className="w-6" />
      </header>
      <div className="h-12" />
    </>
  );
}
