import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="-mx-3">{children}</div>;
}
