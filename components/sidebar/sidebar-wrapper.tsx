'use client';

import { ReactNode } from 'react';
import CloseIcon from '@/icons/close-icon';
import { useSidebarStore } from '@/stores/sidebar-store';

interface SidebarWrapperProps {
  children: ReactNode;
}

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
  const isOpen = useSidebarStore((s) => s.isOpen);
  const close = useSidebarStore((s) => s.close);

  return (
    <div
      className={`absolute inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      <aside
        className={`absolute right-0 bottom-0 h-[94%] w-full max-w-[320px] transform bg-white shadow-xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} rounded-tl-2xl p-2`}
      >
        <div>
          <div className="flex justify-end">
            <button onClick={close}>
              <CloseIcon />
            </button>
          </div>
          {children}
        </div>
      </aside>
    </div>
  );
}
