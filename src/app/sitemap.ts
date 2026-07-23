import type { MetadataRoute } from 'next';
import { serviceCategories, useCaseDetails } from '@/lib/service-detail-content';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const routes = [
  '/',
  '/leistungen',
  '/anwendungsfaelle',
  '/vorgehen',
  '/ueber-uns',
  '/automation-check',
  '/kontakt',
  '/ki-prozessautomatisierung-tuebingen-stuttgart'
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV === 'preview') return [];

  const detailRoutes = [
    ...serviceCategories.map(({ slug }) => `/leistungen/${slug}`),
    ...useCaseDetails.map(({ slug }) => `/anwendungsfaelle/${slug}`)
  ];

  return [...routes, ...detailRoutes].map((path) => ({ url: `${siteUrl}${path}` }));
}
