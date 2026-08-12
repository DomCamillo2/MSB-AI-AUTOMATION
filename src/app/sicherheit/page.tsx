import PageBreadcrumb from '@/components/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Sicherheit & Responsible Disclosure',
  description: 'Informationen zur Meldung von Sicherheitsproblemen auf der Website von MSB AI & Automation.',
  path: '/sicherheit'
});

export default function SicherheitPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageBreadcrumb
        items={[
          { label: 'Startseite', href: '/' },
          { label: 'Sicherheit' }
        ]}
      />
      <article className="container prose-panel legal-document">
        <header className="legal-header">
          <p className="eyebrow">Sicherheit</p>
          <h1>Responsible Disclosure &amp; Sicherheitskontakt</h1>
          <p className="legal-intro">
            Diese Seite beschreibt, wie Sicherheitsprobleme auf der Website von MSB AI &amp; Automation gemeldet werden
            können und wie wir mit entsprechenden Hinweisen umgehen.
          </p>
        </header>

        <section aria-labelledby="report-heading">
          <h2 id="report-heading">1. Sicherheitsprobleme melden</h2>
          <p>
            Bitte melden Sie Schwachstellen vertraulich per E-Mail an{' '}
            <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>. Alternativ können Sie das{' '}
            <a href="/kontakt/">Kontaktformular</a> verwenden und im Betreff deutlich auf einen Sicherheitshinweis verweisen.
          </p>
          <p>Hilfreich sind insbesondere:</p>
          <ul>
            <li>betroffene URL oder betroffener Pfad</li>
            <li>eine kurze Beschreibung des Risikos</li>
            <li>reproduzierbare Schritte, wenn möglich</li>
            <li>Hinweise zu Browser, Gerät oder Rolle, falls relevant</li>
          </ul>
        </section>

        <section aria-labelledby="scope-heading">
          <h2 id="scope-heading">2. Geltungsbereich</h2>
          <p>Diese Hinweise betreffen die öffentlich bereitgestellte Website unter <code>www.msb-ai.de</code> einschließlich:</p>
          <ul>
            <li>statischer Website-Ausgabe</li>
            <li>Kontaktformular und zugehörigem PHP-Endpunkt</li>
            <li>Consent- und Analytics-Einbindung auf der Website</li>
          </ul>
        </section>

        <section aria-labelledby="response-heading">
          <h2 id="response-heading">3. Umgang mit Meldungen</h2>
          <p>
            Wir prüfen eingehende Meldungen vertraulich und bemühen uns um eine erste Rückmeldung innerhalb weniger Werktage.
            Bestätigte Probleme priorisieren wir nach Auswirkung und Behebbarkeit.
          </p>
          <p>
            Bitte veröffentlichen Sie Details nicht vor einer abgestimmten Behebung. Wir bevorzugen eine koordinierte Offenlegung
            nach technischer Prüfung und Risikobewertung.
          </p>
        </section>

        <section aria-labelledby="baseline-heading">
          <h2 id="baseline-heading">4. Technische Basismaßnahmen</h2>
          <ul>
            <li>HTTPS-Weiterleitung und HSTS</li>
            <li>Content Security Policy, Referrer-Policy und weitere Sicherheitsheader</li>
            <li>lokal eingebundene Inhalte ohne Social-, Video- oder Karten-Embeds</li>
            <li>Consent-gesteuerte Analytics-Einbindung</li>
          </ul>
        </section>

        <section aria-labelledby="transparency-heading">
          <h2 id="transparency-heading">5. Transparenzgrenzen</h2>
          <p>
            Diese Seite ist keine Zusicherung bestimmter Zertifizierungen, Penetration-Tests, Versicherungen oder dauerhaft
            erreichbarer Statussysteme. Soweit es öffentlich kommunizierbare sicherheitsrelevante Änderungen auf dieser Website gibt,
            aktualisieren wir diese Angaben an geeigneter Stelle.
          </p>
        </section>

        <p className="legal-meta">Stand: 12. August 2026</p>
      </article>
    </main>
  );
}
