import { ReactNode } from 'react';
import NavBar from '../../components/navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto">{children}</main>

      <div className="h-13 shrink-0">
        <NavBar />
      </div>
    </div>
  );
}
