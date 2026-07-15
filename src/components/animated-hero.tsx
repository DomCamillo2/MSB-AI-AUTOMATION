const workflowSteps = [
  ['Eingang', 'E-Mail, Formular oder Datei'],
  ['Verarbeitung', 'Regeln und Daten strukturieren'],
  ['Bestehendes System', 'CRM, ERP oder SharePoint'],
  ['Menschliche Freigabe', 'Prüfen, anpassen, entscheiden'],
  ['Erledigte Aufgabe', 'Update, Dokument oder Nachricht']
];

export function AnimatedHero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">KI- &amp; Prozessautomatisierung für KMU in der Region Tübingen–Stuttgart</p>
          <h1>Wir automatisieren die Arbeit, die Ihr Team jeden Tag Zeit kostet.</h1>
          <p className="hero-lead">
            MSB analysiert wiederkehrende Abläufe, entwickelt pragmatische Automatisierungs- und KI-Lösungen und begleitet Ihre Mitarbeitenden bei der erfolgreichen Einführung.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#kontakt">
              Kostenlosen Automation Check anfragen
            </a>
            <a className="button button-secondary" href="#anwendungsfaelle">
              Konkrete Anwendungsfälle ansehen
            </a>
          </div>
          <p className="trust-line">Prozessanalyse · Pilotierung · Umsetzung · Schulung</p>
        </div>

        <aside className="workflow-visual" aria-labelledby="workflow-title">
          <div className="workflow-heading">
            <p className="eyebrow eyebrow-light">Beispielhafter Ablauf</p>
            <h2 id="workflow-title">Vom Eingang bis zur erledigten Aufgabe</h2>
            <p>Die Automatisierung verbindet vorhandene Systeme. Sensible Schritte bleiben kontrollierbar.</p>
          </div>
          <ol className="workflow-list">
            {workflowSteps.map(([title, description], index) => (
              <li key={title} className="workflow-step">
                <span className="workflow-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="workflow-detail">
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <span className="workflow-check" aria-hidden="true">✓</span>
              </li>
            ))}
          </ol>
          <p className="workflow-note">Ihr Team behält Einblick, Freigabe und Entscheidungshoheit.</p>
        </aside>
      </div>
    </section>
  );
}

export default AnimatedHero;
