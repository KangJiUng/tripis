'use client';

import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function HorizontalScroll({ children, className = '' }: Props) {
  const scroll = useHorizontalScroll();

  return (
    <div
      ref={scroll.ref}
      className={`scrollbar-hide flex overflow-x-auto overscroll-x-contain overscroll-y-none whitespace-nowrap ${className}`}
      style={{ cursor: 'grab' }}
      onMouseDown={scroll.onMouseDown}
      onMouseMove={scroll.onMouseMove}
      onMouseUp={scroll.onMouseUp}
      onMouseLeave={scroll.onMouseLeave}
      onWheel={scroll.onWheel}
    >
      {children}
    </div>
  );
}
