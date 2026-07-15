import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'MSB AI & Automation | Prozessautomatisierung für KMU',
  description:
    'MSB analysiert wiederkehrende Abläufe, entwickelt pragmatische KI- und Automatisierungslösungen und begleitet KMU in der Region Tübingen–Stuttgart bei der Einführung.',
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
    <html lang="de" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
