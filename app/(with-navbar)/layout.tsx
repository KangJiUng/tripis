import { ReactNode } from 'react';
import NavBar from '../components/navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main>{children}</main>
      <NavBar />
    </div>
  );
}
