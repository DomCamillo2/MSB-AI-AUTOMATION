import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Impressum',
  description: 'Anbieterkennzeichnung und Kontaktangaben von MSB AI Consulting gemäß § 5 DDG.',
  path: '/impressum'
});

export default function ImpressumPage() {
  return (
    <main id="main-content" className="page-shell">
      <article className="container prose-panel legal-document">
        <header className="legal-header">
          <p className="eyebrow">Rechtliches</p>
          <h1>Impressum</h1>
          <p className="legal-intro">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>
        </header>

        <section aria-labelledby="provider-heading">
          <h2 id="provider-heading">Diensteanbieter</h2>
          <address>
            Dominik Soballa<br />
            MSB AI Consulting<br />
            Inhaber: Dominik Soballa<br />
            Haußerstraße 150<br />
            72076 Tübingen<br />
            Deutschland
          </address>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading">Kontakt</h2>
          <p>E-Mail: <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a></p>
        </section>
      </article>
    </main>
  );
}
