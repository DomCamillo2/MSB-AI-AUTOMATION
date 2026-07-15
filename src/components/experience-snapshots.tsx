type Snapshot = {
  title: string;
  context: string;
  points: string[];
  transfer: string;
};

const snapshots: Snapshot[] = [
  {
    title: 'CRM- und Recruiting-Automatisierung',
    context: 'Personalberatung und Energiewirtschaft',
    points: [
      'Wiederkehrende administrative Abläufe analysiert',
      'CRM-Workflows technisch konfiguriert und weiterentwickelt',
      'Fachliche HR-Anforderungen in umsetzbare Prozesse übersetzt'
    ],
    transfer: 'Relevant für Recruiting, Vertrieb und interne Administration.'
  },
  {
    title: 'Datenbasierte Prozessoptimierung',
    context: 'Industrie und globale Unternehmensprozesse',
    points: [
      'Prozess- und Marketing-KPIs analysiert und visualisiert',
      'Funktionsübergreifende Reports entwickelt',
      'Schulungs- und Learning-Prozesse datenbasiert verbessert'
    ],
    transfer: 'Relevant für Reporting, Controlling und operative Entscheidungen.'
  },
  {
    title: 'Automatisierte Analysewerkzeuge',
    context: 'Automotive und Organisationsentwicklung',
    points: [
      'Excel-basiertes Analysewerkzeug entwickelt',
      'Kompetenzmatrizen strukturiert und automatisiert',
      'Workshops und Veränderungsprozesse begleitet'
    ],
    transfer: 'Relevant für Kompetenzmanagement und interne Planung.'
  },
  {
    title: 'Projektmanagement und Customer Experience',
    context: 'Professional Services und digitale Projekte',
    points: [
      'Projekte und unterschiedliche Stakeholder koordiniert',
      'Customer-Experience- und Prozessdaten ausgewertet',
      'Erkenntnisse nutzerorientiert aufbereitet'
    ],
    transfer: 'Relevant für Kundenprozesse, Projektsteuerung und digitale Services.'
  }
];

export function ExperienceSnapshots() {
  return (
    <section className="section experience-snapshots" aria-labelledby="snapshots-heading">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <p className="eyebrow">Erfahrungsfelder</p>
            <h2 id="snapshots-heading">Praxis, die sich auf Ihre Prozesse übertragen lässt</h2>
          </div>
          <p>
            Diese Beispiele stammen aus beruflichen Tätigkeiten einzelner Teammitglieder. Sie sind keine MSB-Kundenprojekte.
          </p>
        </div>

        <div className="snapshot-grid">
          {snapshots.map((snapshot, index) => (
            <article key={snapshot.title} className="snapshot-card">
              <div className="snapshot-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>Berufserfahrung eines Teammitglieds</span>
              </div>
              <h3>{snapshot.title}</h3>
              <p className="snapshot-context">Kontext: {snapshot.context}</p>
              <ul className="plain-list">
                {snapshot.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="snapshot-transfer">{snapshot.transfer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSnapshots;
