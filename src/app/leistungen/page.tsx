import { Reveal } from '@/components/reveal';
import ServicesHeroVisual from '@/components/services-hero-visual';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Leistungen',
  description: 'Prozessanalyse, Workflow-Automatisierung sowie Einführung und Befähigung für klar abgegrenzte Abläufe.',
  path: '/leistungen'
});

const serviceBlocks = [
  {
    number: '01',
    title: 'Prozessanalyse',
    lead: 'Bevor wir automatisieren, machen wir den bestehenden Ablauf sichtbar.',
    description: 'Wir erfassen wiederkehrende Aufgaben, beteiligte Systeme, Rollen, Datenquellen und Freigaben. Dabei prüfen wir auch Ausnahmen, Abhängigkeiten und mögliche Risiken.',
    outputs: ['verständliches Prozessbild', 'priorisierte Automatisierungspotenziale', 'Empfehlung für einen klaren nächsten Schritt'],
    link: '/automation-check',
    linkLabel: 'Automation Check kennenlernen',
    visual: 'process'
  },
  {
    number: '02',
    title: 'Workflow-Automatisierung',
    lead: 'Wir entwickeln einen abgegrenzten Workflow, der zu Ihrer bestehenden IT passt.',
    description: 'Schnittstellen, Regeln, Ausnahmen und menschliche Kontrollpunkte werden nachvollziehbar umgesetzt und zunächst in einem kontrollierten Pilot geprüft.',
    outputs: ['funktionsfähiger Pilot', 'definierte Regeln und Ausnahmen', 'klare Erfolgskriterien'],
    link: '/anwendungsfaelle',
    linkLabel: 'Anwendungsfälle ansehen',
    visual: 'integration'
  },
  {
    number: '03',
    title: 'Einführung und Befähigung',
    lead: 'Eine Lösung ist erst erfolgreich, wenn das Team sie versteht und zuverlässig nutzen kann.',
    description: 'Wir dokumentieren den Ablauf, definieren Verantwortlichkeiten, begleiten die Einführung und schulen die beteiligten Mitarbeitenden.',
    outputs: ['verständliche Dokumentation', 'Schulung der beteiligten Personen', 'geregelte Übergabe und Verbesserungsprozess'],
    link: '/vorgehen',
    linkLabel: 'Unser Vorgehen ansehen',
    visual: 'enablement'
  }
] as const;

const boundaries = [
  ['Keine Automatisierung um jeden Preis', 'Wenn ein Prozess ungeeignet ist, sprechen wir das offen an.'],
  ['Keine pauschalen Einsparversprechen', 'Nutzen und Aufwand werden erst nach Betrachtung des konkreten Ablaufs eingeordnet.'],
  ['Keine unnötigen Systemwechsel', 'Wir prüfen zuerst, was sich mit Ihrer bestehenden IT umsetzen lässt.'],
  ['Keine Lösung ohne Übergabe', 'Dokumentation und Befähigung gehören zur Umsetzung.']
] as const;

function ProcessVisual() {
  return (
    <div className="service-visual service-process-map" aria-label="Vereinfachtes Prozessbild von Eingang bis Ergebnis">
      <div className="process-map-flow">
        {['Eingang', 'Bearbeitung', 'Prüfung', 'Ergebnis'].map((step, index) => (
          <div key={step}><span>{step}</span>{index < 3 ? <i aria-hidden="true">→</i> : null}</div>
        ))}
      </div>
      <div className="service-visual-tags" aria-label="Betrachtete Prozessdimensionen">
        {['Systeme', 'Rollen', 'Daten', 'Freigaben'].map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <p>Der bestehende Ablauf wird gemeinsam nachvollziehbar gemacht.</p>
    </div>
  );
}

function IntegrationVisual() {
  return (
    <div className="service-visual service-integration" aria-label="Vereinfachte Integration in bestehende Systeme">
      <div className="integration-sources"><span>E-Mail</span><span>Formular</span></div>
      <span className="integration-arrow" aria-hidden="true">↓</span>
      <strong>Automatisierung</strong>
      <span className="integration-arrow" aria-hidden="true">↓</span>
      <div className="integration-approval"><span aria-hidden="true">✓</span> Menschliche Freigabe</div>
      <span className="integration-arrow" aria-hidden="true">↓</span>
      <div className="integration-systems"><span>CRM</span><span>ERP</span><span>bestehendes Tool</span></div>
    </div>
  );
}

function EnablementVisual() {
  return (
    <div className="service-visual service-enablement" aria-label="Einführungskreislauf von Test bis Übergabe">
      <div className="enablement-cycle">
        {['Testen', 'Rückmeldung', 'Anpassen', 'Übergeben'].map((step, index) => (
          <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>
        ))}
      </div>
      <div className="enablement-feedback"><span aria-hidden="true">✓</span><p><strong>Team-Feedback</strong> fließt vor der Übergabe in den Ablauf ein.</p></div>
    </div>
  );
}

function ServiceVisual({ type }: { type: (typeof serviceBlocks)[number]['visual'] }) {
  if (type === 'process') return <ProcessVisual />;
  if (type === 'integration') return <IntegrationVisual />;
  return <EnablementVisual />;
}

export default function LeistungenPage() {
  return (
    <main id="main-content">
      <section className="services-hero">
        <div className="container services-hero-grid">
          <div className="services-hero-copy">
            <p className="eyebrow">Leistungen</p>
            <h1><span>Automatisierung, die</span>{' '}<span>zu Ihren Abläufen passt.</span></h1>
            <p>Wir verbinden Prozessanalyse, technische Umsetzung und Einführung. Ausgangspunkt ist ein konkreter Ablauf – passend zu Ihrer bestehenden IT und den Menschen, die damit arbeiten.</p>
          </div>
          <ServicesHeroVisual />
        </div>
      </section>

      <section className="services-editorial-section" aria-labelledby="service-detail-heading">
        <div className="container">
          <div className="services-section-intro">
            <div><p className="eyebrow">Unsere Leistungen</p><h2 id="service-detail-heading">Drei Bausteine für eine tragfähige Lösung</h2></div>
            <p>Die Gewichtung richtet sich nach Ihrem Prozess, Ihrer Systemlandschaft und dem aktuellen Reifegrad.</p>
          </div>

          <div className="services-rows">
            {serviceBlocks.map((service, index) => (
              <Reveal key={service.title} className="service-row-reveal">
                <article className={`service-editorial-row${index % 2 ? ' service-row-reverse' : ''}`}>
                  <div className="service-content">
                    <div className="service-title-line"><span>{service.number}</span><h3>{service.title}</h3></div>
                    <p className="service-lead">{service.lead}</p>
                    <p className="service-description">{service.description}</p>
                    <div className="service-outputs">
                      <h4>Was Sie erhalten</h4>
                      <ul>{service.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
                    </div>
                    <a className="text-link" href={service.link}>{service.linkLabel} <span aria-hidden="true">→</span></a>
                  </div>
                  <ServiceVisual type={service.visual} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-boundaries" aria-labelledby="boundaries-heading">
        <div className="container">
          <div className="services-boundaries-head"><p className="eyebrow">Klare Erwartungen</p><h2 id="boundaries-heading">Was wir bewusst nicht versprechen</h2></div>
          <div className="services-boundaries-grid">
            {boundaries.map(([title, text]) => <article key={title}><span aria-hidden="true">✓</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="services-final-cta" aria-labelledby="services-cta-heading">
        <div className="container services-final-cta-grid">
          <div>
            <p className="eyebrow eyebrow-light">Nächster Schritt</p>
            <h2 id="services-cta-heading">Welcher Prozess kostet Ihr Team regelmäßig Zeit?</h2>
            <p>Im kostenlosen Automation Check betrachten wir einen konkreten Ablauf und geben Ihnen eine erste Einschätzung zu Nutzen, Aufwand und Risiken.</p>
          </div>
          <div className="services-final-actions">
            <a className="button button-light" href="/automation-check">Prozess kostenlos prüfen lassen <span className="button-arrow" aria-hidden="true">→</span></a>
            <a className="text-link text-link-light" href="/vorgehen">So läuft der Automation Check ab <span aria-hidden="true">→</span></a>
            <p>Unverbindlich · 30–45 Minuten · konkrete erste Einschätzung</p>
          </div>
        </div>
      </section>
    </main>
  );
}
