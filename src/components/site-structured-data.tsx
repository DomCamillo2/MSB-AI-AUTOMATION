import { serviceCategories } from '@/lib/service-detail-content';
import { defaultDescription, siteName, siteUrl } from '@/lib/seo';
import { team } from '@/lib/site-content';

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
      legalName: 'MSB AI & Automation GbR',
      url: siteUrl,
      alternateName: ['MSB AI', 'MSB AI & Automation'],
      logo: `${siteUrl}/msb-logo-lockup.png`,
      email: 'kontakt@msb-ai.de',
      description: defaultDescription,
      slogan: 'Automatisierung mit Menschenverstand',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Beratung und Projektanfragen',
        email: 'kontakt@msb-ai.de',
        availableLanguage: ['de', 'en'],
        areaServed: 'DE'
      },
      founder: team.map((member) => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
          description: member.text,
          sameAs: member.linkedin,
          worksFor: { '@id': `${siteUrl}/#organization` }
      })),
      knowsAbout: [
        'Geschäftsprozessautomatisierung',
        'Workflow-Automatisierung',
        'KI-gestützte Prozessautomatisierung',
        'Human-in-the-Loop-Automatisierung',
        'CRM-Automatisierung',
        'HR- und Recruiting-Automatisierung',
        'Reporting-Automatisierung',
        'Dokumentenverarbeitung',
        'Wissensassistenten'
      ],
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
        { '@type': 'State', name: 'Baden-Württemberg' },
        { '@type': 'Country', name: 'Deutschland' }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Leistungen für kontrollierte Prozessautomatisierung',
        itemListElement: serviceCategories.map((category) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            '@id': `${siteUrl}/leistungen/${category.slug}#service`,
            name: category.name,
            description: category.cardTeaser,
            url: `${siteUrl}/leistungen/${category.slug}`,
            serviceType: category.name,
            audience: {
              '@type': 'BusinessAudience',
              audienceType: 'Kleine und mittlere Unternehmen'
            }
          }
        }))
      }
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
