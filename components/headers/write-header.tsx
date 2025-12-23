'use client';

import { useRouter } from 'next/navigation';
import CloseIcon from '../../icons/close-icon';

interface WriteHeaderProps {
  title: string;
}

export default function WriteHeader({ title }: WriteHeaderProps) {
  const router = useRouter();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="w-10" />
        <div className="text-medium16">{title}</div>
        <button onClick={() => router.back()} className="cursor-pointer">
          <CloseIcon />
        </button>
      </header>
      <div className="h-12" />
    </>
  );
}
