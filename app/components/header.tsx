import Link from 'next/link';
import BellIcon from '../icons/bell-icon';
import MenuIcon from '../icons/menu-icon';

export default function Header() {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex h-12 max-w-[600px] items-center justify-between bg-white px-4">
        <div className="text-medium18">여행자님!</div>
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
