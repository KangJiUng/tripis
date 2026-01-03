'use client';

import { useState, useEffect } from 'react';
import MapIcon from '../../icons/map-icon';
import MenuIcon from '../../icons/menu-icon';
import { useSidebarStore } from '@/stores/sidebar-store';

interface PlanHeaderProps {
  tripName?: string;
  tripDate?: string;
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLElement | null>;
}

export default function PlanHeader({ tripName, tripDate, scrollRootRef, titleRef }: PlanHeaderProps) {
  const open = useSidebarStore((s) => s.open);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!scrollRootRef.current || !titleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 제목이 스크롤 컨테이너 밖으로 나가면 true
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: scrollRootRef.current,
        threshold: 0,
      },
    );

    observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, [scrollRootRef, titleRef]);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="w-16" />
        <div className="flex flex-1 flex-col items-center">
          {isScrolled && tripName ? (
            <>
              <span className="text-sm font-medium">{tripName}</span>
              <span className="text-xs text-gray-500">{tripDate}</span>
            </>
          ) : (
            <span className="text-medium16">일정</span>
          )}
        </div>
        <div className="flex w-16 items-center justify-end gap-4">
          <MapIcon />
          <button onClick={open}>
            <MenuIcon />
          </button>
        </div>
      </header>

      <div className="h-12" />
    </>
  );
}
