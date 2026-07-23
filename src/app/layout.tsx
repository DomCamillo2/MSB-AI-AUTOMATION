import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import AnalyticsInteractions from '@/components/analytics-interactions';
import ConsentManager from '@/components/consent-manager';
import MotionProvider from '@/components/motion-provider';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { defaultDescription, siteName, siteUrl } from '@/lib/seo';
import './globals.css';

const allowIndexing = process.env.VERCEL_ENV !== 'preview';
const analyticsEnabled =
  process.env.VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_SITE_ENV === 'production';

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
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Prozessautomatisierung für KMU`,
    template: `%s | ${siteName}`
  },
  description: defaultDescription,
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  category: 'Business process automation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
    googleBot: {
      index: allowIndexing,
      follow: allowIndexing,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fbfaf6'
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
          <AnalyticsInteractions />
          <ConsentManager analyticsEnabled={analyticsEnabled} />
        </MotionProvider>
      </body>
    </html>
  );
}
