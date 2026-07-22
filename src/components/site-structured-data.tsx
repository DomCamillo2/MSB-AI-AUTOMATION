import { defaultDescription, siteName, siteUrl } from '@/lib/seo';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: defaultDescription,
      inLanguage: 'de-DE',
      publisher: { '@id': `${siteUrl}/#organization` }
    },
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      legalName: 'Dominik Soballa',
      url: siteUrl,
      logo: `${siteUrl}/msb-logo-lockup.png`,
      email: 'kontakt@msb-ai.de',
      description: defaultDescription,
      slogan: 'Automatisierung mit Menschenverstand',
      founder: {
        '@type': 'Person',
        name: 'Dominik Soballa'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Haußerstraße 150',
        postalCode: '72076',
        addressLocality: 'Tübingen',
        addressCountry: 'DE'
      },
      areaServed: [
        { '@type': 'City', name: 'Tübingen' },
        { '@type': 'City', name: 'Reutlingen' },
        { '@type': 'City', name: 'Stuttgart' },
        { '@type': 'State', name: 'Baden-Württemberg' }
      ]
    }
  ]
};

export function SiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
    />
  );
}

export default SiteStructuredData;
