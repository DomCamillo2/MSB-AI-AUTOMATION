import PageBreadcrumb from '@/components/page-breadcrumb';
import { Reveal } from '@/components/reveal';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Anfrage erhalten',
  description: 'Vielen Dank für Ihre Anfrage an MSB AI & Automation. Wir melden uns in der Regel innerhalb von 1–2 Werktagen.',
  path: '/danke',
  index: false
});

export default function DankePage() {
  return (
    <main id="main-content">
      <PageBreadcrumb
        items={[
          { label: 'Startseite', href: '/' },
          { label: 'Kontakt', href: '/kontakt' },
          { label: 'Anfrage erhalten' }
        ]}
      />

      <section className="section">
        <Reveal className="container not-found-panel">
          <p className="eyebrow">Anfrage erhalten</p>
          <h1>Vielen Dank. Ihre Nachricht ist bei uns angekommen.</h1>
          <p>
            Wir prüfen Ihre Anfrage und melden uns in der Regel innerhalb von <strong>1–2 Werktagen</strong> mit einer ersten Rückmeldung.
            Für dringende Rückfragen erreichen Sie uns direkt unter{' '}
            <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a> oder{' '}
            <a href="tel:+491606969914">0160&nbsp;6969914</a>.
          </p>
          <div className="not-found-actions">
            <a className="button button-primary" href="/">
              Zur Startseite <span className="button-arrow" aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="/vorgehen/">
              So arbeiten wir <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
