import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

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

  return routes.map((path) => ({ url: `${siteUrl}${path}` }));
}
