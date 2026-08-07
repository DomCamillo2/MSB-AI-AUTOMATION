import PageCta from '@/components/page-cta';
import RegionalCollaborationGrid from '@/components/regional-collaboration-grid';
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

      <section className="section regional-scope-section" aria-labelledby="regional-scope-heading">
        <Reveal className="container heading-split">
          <div>
            <p className="eyebrow">Leistungsgebiet</p>
            <h2 id="regional-scope-heading">Regional verankert, bei Bedarf remote umsetzbar.</h2>
          </div>
          <div>
            <p>Unser Sitz ist in Tübingen. Der regionale Schwerpunkt umfasst Tübingen, Reutlingen und Stuttgart; geeignete Projekte lassen sich darüber hinaus remote begleiten.</p>
            <a className="text-link" href="/leistungen">Leistungen ansehen <span aria-hidden="true">→</span></a>
          </div>
        </Reveal>
      </section>

      <PageCta
        compact
        title="Welcher Ablauf soll in Ihrem Unternehmen verlässlicher werden?"
        text="Im kostenlosen Automation Check betrachten wir einen konkreten Prozess – ohne Toolvorgabe und ohne Projektbindung."
      />
    </main>
  );
}
