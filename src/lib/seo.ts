import type { Metadata } from 'next';

export const siteName = 'MSB AI & Automation';
export const siteUrl = 'https://www.msb-ai.de';
export const defaultDescription =
  'Kontrollierte KI- und Prozessautomatisierung für KMU in der Region Tübingen–Stuttgart – passend zu bestehenden Systemen und Arbeitsabläufen.';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | '/';
  index?: boolean;
};

export function createPageMetadata({ title, description, path, index = true }: PageMetadataOptions): Metadata {
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
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'MSB AI & Automation – Automatisierung mit Menschenverstand'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/opengraph-image']
    },
    robots: {
      index,
      follow: true
    }
  };
}
