import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Script from 'next/script';
import AnalyticsInteractions from '@/components/analytics-interactions';
import ConsentManager from '@/components/consent-manager';
import MotionProvider from '@/components/motion-provider';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import { defaultDescription, siteName, siteUrl } from '@/lib/seo';
import { isProductionSite } from '@/lib/site-env';
import './globals.css';

const allowIndexing = isProductionSite;
const analyticsEnabled = isProductionSite;

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
        {analyticsEnabled ? (
          <>
            <Script id="msb-consent-default" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
                window.gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  wait_for_update: 500
                });
                window.gtag('set', 'ads_data_redaction', true);
              `}
            </Script>
            <Script
              id="msb-google-analytics"
              src="https://www.googletagmanager.com/gtag/js?id=G-P2P7JJ6QV2"
              strategy="afterInteractive"
            />
            <Script id="msb-google-config" strategy="afterInteractive">
              {`
                window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
                window.gtag('js', new Date());
                window.gtag('config', 'G-P2P7JJ6QV2', {
                  send_page_view: false,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false,
                  cookie_flags: 'SameSite=Lax;Secure',
                  cookie_expires: 31536000,
                  cookie_update: false,
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        ) : null}
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
