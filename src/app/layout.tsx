import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import MotionProvider from '@/components/motion-provider';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: {
    default: 'MSB AI & Automation | Prozessautomatisierung für KMU',
    template: '%s | MSB AI & Automation'
  },
  description:
    'Pragmatische KI- und Prozessautomatisierung für KMU: weniger manuelle Arbeit in Verwaltung, HR und Reporting, passend zu bestehenden Systemen.',
  icons: {
    icon: '/msb-logo.webp'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
