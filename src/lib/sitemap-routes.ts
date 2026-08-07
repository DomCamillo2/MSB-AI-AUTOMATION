/** Indexierbare Produktions-URLs (ohne Impressum/Datenschutz: dort noindex). */
export const indexableRoutes = [
  '/',
  '/leistungen',
  '/anwendungsfaelle',
  '/vorgehen',
  '/ueber-uns',
  '/automation-check',
  '/kontakt',
  '/ki-prozessautomatisierung-tuebingen-stuttgart'
] as const;

export function toCanonicalSitemapUrl(siteUrl: string, path: string): string {
  if (path === '/') {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path}/`;
}

export function sitemapPriority(path: string): number {
  if (path === '/') return 1;
  if (path.split('/').filter(Boolean).length === 1) return 0.8;
  return 0.6;
}
