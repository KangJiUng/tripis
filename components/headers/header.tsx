import Link from 'next/link';
import { createSupabaseServer } from '@/lib/supabase/server';
import BellIcon from '../../icons/bell-icon';
import MenuIcon from '../../icons/menu-icon';

export default async function Header() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let nickname = '여행자';

  if (user) {
    const { data: profile } = await supabase.from('users').select('nickname').eq('id', user.id).maybeSingle();

    if (profile?.nickname) {
      nickname = `여행자, ${profile.nickname}`;
    }
  }

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="text-medium18">{nickname}님!</div>
        <div className="flex items-center gap-4">
          <Link href="/notice">
            <BellIcon />
          </Link>
          <MenuIcon />
        </div>
      </header>
      <div className="h-12" />
    </>
  );
}
