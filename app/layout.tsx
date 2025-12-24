import './globals.css';
import Sidebar from '@/components/sidebar/sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="relative container overflow-hidden">
          {children}
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
