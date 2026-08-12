import type { Metadata } from 'next';
import { isProductionSite } from '@/lib/site-env';

export const siteName = 'MSB AI & Automation';
export const siteUrl = 'https://www.msb-ai.de';
export const defaultDescription =
  'Kontrollierte KI- und Prozessautomatisierung für KMU in der Region Tübingen–Stuttgart – passend zu bestehenden Systemen und Arbeitsabläufen.';

const allowIndexing = isProductionSite;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | '/';
  index?: boolean;
};

export function createPageMetadata({ title, description, path, index = true }: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${siteName}`;
  const normalizedPath = path === '/' ? '/' : `${path}/`;

  return {
    title: path === '/' ? { absolute: socialTitle } : title,
    description,
    alternates: {
      canonical: normalizedPath
    },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      url: normalizedPath,
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
      index: index && allowIndexing,
      follow: allowIndexing
    }
  };
}
