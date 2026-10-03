import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from './components/SiteChrome';

export const metadata: Metadata = {
  title: 'Fast Track Rack, LLC | World-Class Fitness Equipment',
  description: 'We design, develop, and manufacture cutting-edge fitness equipment for athletes and organizations. Custom racks, training programs, and elite coaching.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
