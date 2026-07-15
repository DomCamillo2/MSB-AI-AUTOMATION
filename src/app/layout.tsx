import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MSB AI Consulting',
  description:
    'MSB AI Consulting unterstützt KMU bei HR-Automation, Prozessklarheit und verantwortungsvollem KI-Einsatz.',
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
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
