import WorkflowAnimation from '@/components/workflow-animation';

export function AnimatedHero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">KI- &amp; Prozessautomatisierung für KMU</p>
          <h1 id="hero-heading" tabIndex={-1}>
            <span>Weniger manuelle Arbeit.</span>
            <span>Mehr Zeit fürs Kerngeschäft.</span>
          </h1>
          <p className="hero-lead">
            Wir automatisieren wiederkehrende Abläufe in Verwaltung, HR und Reporting – passend zu Ihren Systemen und mit klarer menschlicher Kontrolle.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/automation-check">
              Prozess kostenlos prüfen lassen <span className="button-arrow" aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="/anwendungsfaelle">
              Anwendungsfälle ansehen <span className="button-arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-meta">
            <p className="trust-line">Analyse · Pilot · Umsetzung · Schulung</p>
            <p className="regional-line">Region Tübingen–Stuttgart</p>
          </div>
        </div>

        <WorkflowAnimation />
      </div>
    </section>
  );
}

export default AnimatedHero;
