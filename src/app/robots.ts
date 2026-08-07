import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
import { isProductionSite } from '@/lib/site-env';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      }
    };
  }

  return {
    rules: [
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: '*', allow: '/' }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
