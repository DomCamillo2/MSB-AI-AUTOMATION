import { defaultDescription, siteName, siteUrl } from '@/lib/seo';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      alternateName: 'MSB AI Consulting',
      description: defaultDescription,
      inLanguage: 'de-DE',
      publisher: {
        '@id': `${siteUrl}/#organization`
      }
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      alternateName: 'MSB AI Consulting',
      url: siteUrl,
      logo: `${siteUrl}/msb-logo.webp`,
      email: 'kontakt@msb-ai.de',
      description: defaultDescription
    }
  ]
};

export function HomeStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
    />
  );
}

export default HomeStructuredData;
