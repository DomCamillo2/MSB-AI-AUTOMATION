import type { MetadataRoute } from 'next';
import { serviceCategories, useCaseDetails } from '@/lib/service-detail-content';
import { indexableRoutes, sitemapPriority, toCanonicalSitemapUrl } from '@/lib/sitemap-routes';
import { siteUrl } from '@/lib/seo';
import { isProductionSite } from '@/lib/site-env';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite) return [];

  const detailRoutes = [
    ...serviceCategories.map(({ slug }) => `/leistungen/${slug}`),
    ...useCaseDetails.map(({ slug }) => `/anwendungsfaelle/${slug}`)
  ];

  const lastModified = new Date();

  return [...indexableRoutes, ...detailRoutes].map((path) => ({
    url: toCanonicalSitemapUrl(siteUrl, path),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: sitemapPriority(path)
  }));
}
