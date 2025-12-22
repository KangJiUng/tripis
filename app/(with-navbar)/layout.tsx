import { ReactNode } from 'react';
import NavBar from '../components/navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <main>{children}</main>
      <NavBar />
    </div>
  );
}
