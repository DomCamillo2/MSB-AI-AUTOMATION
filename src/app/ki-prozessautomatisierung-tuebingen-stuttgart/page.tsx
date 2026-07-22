import PageCta from '@/components/page-cta';
import PageIntro from '@/components/page-intro';
import { Reveal, RevealGroup } from '@/components/reveal';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Prozessautomatisierung in Tübingen & Stuttgart',
  description: 'MSB begleitet KMU in Tübingen, Reutlingen und Stuttgart bei Prozessanalyse, Automatisierungspiloten und kontrollierter Einführung.',
  path: '/ki-prozessautomatisierung-tuebingen-stuttgart'
});

const collaborationPoints = [
  ['Prozesswissen zusammenbringen', 'Fachbereich, IT und spätere Nutzende beschreiben denselben Ablauf aus unterschiedlichen Perspektiven. Wir machen Übergaben und Ausnahmen sichtbar.'],
  ['Pilot im Alltag prüfen', 'Ein kleiner Workflow wird mit typischen Fällen und bewusst gewählten Ausnahmen getestet, bevor weitere Systeme angebunden werden.'],
  ['Verantwortung klar übergeben', 'Prüfpunkte, Dokumentation und Zuständigkeiten gehören zur Lösung – nicht erst zur Nacharbeit.']
] as const;

const regionalUseCases = [
  'Anfragen aus E-Mail oder Formular strukturiert in CRM und Aufgaben überführen',
  'wiederkehrende Reports aus abgestimmten Datenquellen vorbereiten',
  'Dokumente und Pflichtangaben prüfen, ohne Ausnahmen zu verstecken',
  'administrative Schritte in HR und Verwaltung nachvollziehbar koordinieren'
] as const;

export default function RegionalPage() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="Tübingen · Reutlingen · Stuttgart"
        title="Prozessautomatisierung für KMU in der Region."
        lead="MSB sitzt in Tübingen und unterstützt Unternehmen dabei, wiederkehrende Abläufe zu klären, kontrolliert zu automatisieren und sauber in den Arbeitsalltag zu übergeben."
        aside="Wir arbeiten mit bestehenden Systemen. KI kommt nur dort zum Einsatz, wo sie gegenüber einer festen Regel einen nachvollziehbaren Vorteil hat."
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
          <RevealGroup className="regional-points-grid" stagger="normal">
            {collaborationPoints.map(([title, text], index) => (
              <article key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </RevealGroup>
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
          <Reveal>
            <ul className="regional-use-case-list">
              {regionalUseCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="regional-scope-band" aria-labelledby="regional-scope-heading">
        <Reveal className="container regional-scope-layout">
          <div>
            <p className="eyebrow eyebrow-light">Leistungsgebiet</p>
            <h2 id="regional-scope-heading">Regional verankert, bei Bedarf remote umsetzbar.</h2>
          </div>
          <div>
            <p>Unser Sitz ist in Tübingen. Der regionale Schwerpunkt umfasst Tübingen, Reutlingen und Stuttgart; geeignete Projekte lassen sich darüber hinaus remote begleiten.</p>
            <a className="text-link text-link-light" href="/leistungen">Leistungen ansehen <span aria-hidden="true">→</span></a>
          </div>
        </Reveal>
      </section>

      <PageCta
        title="Welcher Ablauf soll in Ihrem Unternehmen verlässlicher werden?"
        text="Im kostenlosen Automation Check betrachten wir einen konkreten Prozess – ohne Toolvorgabe und ohne Projektbindung."
      />
    </main>
  );
}
