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
        <div className="container">
          {children} <Sidebar />
        </div>
      </body>
    </html>
  );
}
