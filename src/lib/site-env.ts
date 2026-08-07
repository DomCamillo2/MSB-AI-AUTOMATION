/** Production builds for IONOS set NEXT_PUBLIC_SITE_ENV=production in CI. */
export const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === 'production';
