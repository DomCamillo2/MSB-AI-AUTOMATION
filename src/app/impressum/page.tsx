import PageBreadcrumb from '@/components/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Impressum',
  description: 'Anbieterkennzeichnung und Kontaktangaben der MSB AI & Automation GbR gemäß § 5 DDG.',
  path: '/impressum',
  index: false
});

export default function ImpressumPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageBreadcrumb
        items={[
          { label: 'Startseite', href: '/' },
          { label: 'Impressum' }
        ]}
      />
      <article className="container prose-panel legal-document">
        <header className="legal-header">
          <p className="eyebrow">Rechtliches</p>
          <h1>Impressum</h1>
          <p className="legal-intro">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>
        </header>

        <section aria-labelledby="provider-heading">
          <h2 id="provider-heading">Diensteanbieter</h2>
          <address>
            MSB AI &amp; Automation GbR<br />
            Gesellschafter:<br />
            Dominik Soballa<br />
            Erik Müller<br />
            Luca Bouché<br />
            Haußerstraße 150<br />
            72076 Tübingen<br />
            Deutschland
          </address>
        </section>

        <section aria-labelledby="representation-heading">
          <h2 id="representation-heading">Vertretung</h2>
          <p>Die Gesellschafter vertreten die Gesellschaft gemeinsam.</p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading">Kontakt</h2>
          <p>E-Mail: <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a></p>
          <p>
            Telefon:{' '}
            <a href="tel:+491606969914">0160&nbsp;6969914</a>
          </p>
          <p>Direkte Kontaktaufnahme: <a href="/kontakt">Kontaktformular öffnen</a></p>
          <p>Website: <a href="https://www.msb-ai.de">www.msb-ai.de</a></p>
        </section>

        <p className="legal-meta">Stand: 6. August 2026</p>
      </article>
    </main>
  );
}
