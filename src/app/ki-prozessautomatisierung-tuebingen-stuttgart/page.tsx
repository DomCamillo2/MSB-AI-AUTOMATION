import RegionalCollaborationGrid from '@/components/regional-collaboration-grid';
import RegionalPageClosing from '@/components/regional-page-closing';
import RegionalPageHero from '@/components/regional-page-hero';
import RegionalUseCasesPanel from '@/components/regional-use-cases-panel';
import { Reveal } from '@/components/reveal';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Prozessautomatisierung in Tübingen & Stuttgart',
  description: 'MSB begleitet KMU in Tübingen, Reutlingen und Stuttgart bei Prozessanalyse, Automatisierungspiloten und schrittweiser Einführung.',
  path: '/ki-prozessautomatisierung-tuebingen-stuttgart'
});

export default function RegionalPage() {
  return (
    <main id="main-content">
      <RegionalPageHero
        lead="MSB sitzt in Tübingen und unterstützt Unternehmen dabei, wiederkehrende Abläufe zu klären, schrittweise zu automatisieren und sauber in den Arbeitsalltag zu übergeben."
        aside="Wir arbeiten mit bestehenden Systemen. KI kommt nur dort zum Einsatz, wo sie gegenüber einer festen Regel einen klaren Vorteil hat."
      />

      <section className="section regional-collaboration" aria-labelledby="regional-collaboration-heading">
        <div className="container">
          <Reveal className="section-heading heading-split">
            <div>
              <p className="eyebrow">Regionale Zusammenarbeit</p>
              <h2 id="regional-collaboration-heading">Nähe ist hilfreich, wenn Prozesswissen verteilt ist.</h2>
            </div>
            <p>Bei Automatisierung geht es selten nur um Software. Entscheidend ist, dass Fachlichkeit, Technik und spätere Nutzung zusammenpassen.</p>
          </Reveal>
          <RegionalCollaborationGrid />
        </div>
      </section>

      <section className="section regional-use-cases" aria-labelledby="regional-use-cases-heading">
        <div className="container editorial-split">
          <Reveal className="section-heading sticky-heading">
            <p className="eyebrow">Typische Ausgangspunkte</p>
            <h2 id="regional-use-cases-heading">Nicht die Branche entscheidet, sondern der Ablauf.</h2>
            <p>Besonders prüfenswert sind wiederkehrende Informations- und Verwaltungsprozesse mit klaren Eingängen, Ergebnissen und Verantwortlichen.</p>
            <a className="text-link" href="/anwendungsfaelle">Anwendungsfälle vergleichen <span aria-hidden="true">→</span></a>
          </Reveal>
          <RegionalUseCasesPanel />
        </div>
      </section>

      <RegionalPageClosing />
    </main>
  );
}
