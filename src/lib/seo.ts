import type { Metadata } from 'next';

export const siteName = 'MSB AI & Automation';
export const siteUrl = 'https://msb-ai.de';
export const defaultDescription =
  'Pragmatische KI- und Prozessautomatisierung für KMU: weniger manuelle Arbeit in Verwaltung, HR und Reporting, passend zu bestehenden Systemen.';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | '/';
};

export function createPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      url: path,
      siteName,
      title: socialTitle,
      description,
      images: [
        {
          url: '/msb-logo-lockup.png',
          width: 1813,
          height: 793,
          alt: 'MSB AI & Automation'
        }
      ]
    },
    twitter: {
      card: 'summary',
      title: socialTitle,
      description,
      images: ['/msb-logo-lockup.png']
    }
  };
}
