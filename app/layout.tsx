import './globals.css';
import Sidebar from '@/components/sidebar/sidebar';
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="container">
            {children}
            <Sidebar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
