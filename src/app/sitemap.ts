import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

const routes = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/leistungen', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/anwendungsfaelle', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/vorgehen', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/ueber-uns', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/automation-check', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/impressum', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/datenschutz', changeFrequency: 'yearly', priority: 0.2 }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority
  }));
}
