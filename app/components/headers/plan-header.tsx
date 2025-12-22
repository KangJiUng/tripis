'use client';

import { useState, useEffect } from 'react';
import MapIcon from '../../icons/map-icon';
import MenuIcon from '../../icons/menu-icon';

interface PlanHeaderProps {
  tripName?: string;
  tripDate?: string;
}

export default function PlanHeader({ tripName, tripDate }: PlanHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 100px 이상 스크롤하면 여행 정보 표시
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <MenuIcon />
        </div>
      </header>
      <div className="h-12" />
    </>
  );
}
