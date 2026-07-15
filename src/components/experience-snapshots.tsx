import React from 'react';

type Snapshot = {
  title: string;
  context: string;
  points: string[];
  transfer: string;
};

const snapshots: Snapshot[] = [
  {
    title: 'CRM- und Recruiting-Automatisierung',
    context: 'Erfahrung aus Personalberatung und Energiewirtschaft',
    points: [
      'Analyse wiederkehrender administrativer Abläufe',
      'Entwicklung automatisierter Workflows',
      'technische Konfiguration und Weiterentwicklung eines CRM-Systems',
      'Verbesserung von Datenpflege und Datenqualität',
      'Verbindung fachlicher HR-Anforderungen mit technischer Umsetzung'
    ],
    transfer: 'Übertragbar auf Recruiting, Vertrieb, Kundenverwaltung und interne Administration.'
  },
  {
    title: 'Datenbasierte Prozessoptimierung',
    context: 'Erfahrung aus Industrie und globalen Unternehmensprozessen',
    points: [
      'Analyse und Visualisierung von Prozess- und Marketing-KPIs',
      'Entwicklung funktionsübergreifender Reports',
      'statistische Bedarfsanalysen',
      'Optimierung und Skalierung von Schulungs- und Learning-Prozessen',
      'Arbeit mit Python, R, Excel und quantitativen Methoden'
    ],
    transfer: 'Übertragbar auf Reporting, Controlling, Schulungen und operative Entscheidungsprozesse.'
  },
  {
    title: 'Automatisierte Analysewerkzeuge',
    context: 'Erfahrung aus Automotive und Organisationsentwicklung',
    points: [
      'Entwicklung eines Excel-basierten Analyse-Tools',
      'Automatisierung einer Kompetenzmatrix',
      'Unterstützung von Organisations- und Veränderungsprozessen',
      'Strukturierung und Auswertung komplexer Unternehmensdaten',
      'Durchführung und Begleitung von Workshops und Schulungen'
    ],
    transfer: 'Übertragbar auf Kompetenzmanagement, Personalentwicklung und interne Planung.'
  },
  {
    title: 'Projektmanagement und Customer Experience',
    context: 'Erfahrung aus Professional Services',
    points: [
      'Projektmanagement und strukturierte Projektkoordination',
      'Customer-Experience- und Datenanalyse',
      'Aufbereitung von Erkenntnissen für unterschiedliche Stakeholder',
      'Verbindung von Analyse, Kommunikation und nutzerorientierter Gestaltung'
    ],
    transfer: 'Übertragbar auf Kundenprozesse, Projektsteuerung und digitale Serviceangebote.'
  }
];

export function ExperienceSnapshots() {
  return (
    <section className="section" aria-label="Experience Snapshots">
      <div className="container">
        <div className="section-intro">
          <p className="kicker">Erfahrung</p>
          <h2>Erfahrung, die wir in Ihre Prozesse übertragen</h2>
        </div>
        <div className="grid-2">
          {snapshots.map((s) => (
            <article key={s.title} className="prose-panel" style={{ marginBottom: '1rem' }}>
              <p className="muted small" style={{ marginBottom: '0.5rem' }}>{s.context}</p>
              <h3>{s.title}</h3>
              <ul style={{ marginTop: '0.75rem' }}>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="small" style={{ marginTop: '0.8rem', fontWeight: 600 }}>{s.transfer}</p>
            </article>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: '0.85rem' }}>
          Die dargestellten Erfahrungen stammen aus früheren oder aktuellen beruflichen Tätigkeiten einzelner Teammitglieder. Sie werden nicht als eigenständige MSB‑Kundenprojekte dargestellt.
        </p>
      </div>
    </section>
  );
}

export default ExperienceSnapshots;
