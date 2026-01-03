'use client';

import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/stores/sidebar-store';

export default function LogoutButtonTest() {
  const router = useRouter();
  const closeSidebar = useSidebarStore((s) => s.close);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    closeSidebar();
    router.push('/login');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="mt-4 block rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
      로그아웃 (테스트)
    </button>
  );
}
