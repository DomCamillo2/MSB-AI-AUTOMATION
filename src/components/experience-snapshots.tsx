import { RevealGroup } from '@/components/reveal';

const expertiseAreas = [
  {
    title: 'Prozesse und Automatisierung',
    text: 'Erfahrung mit CRM-Workflows, Recruiting-Prozessen, Datenpflege und wiederkehrenden administrativen Abläufen.',
    contexts: 'Energie · Personalberatung · Automotive'
  },
  {
    title: 'Daten und Analyse',
    text: 'Erfahrung mit KPI-Auswertung, Reporting, Python, R, Excel und datenbasierter Prozessoptimierung.',
    contexts: 'Industrie · Organisationsentwicklung · Learning'
  },
  {
    title: 'Einführung und Nutzerakzeptanz',
    text: 'Erfahrung mit Projektkoordination, Customer Experience, Schulungen und der Einführung neuer digitaler Abläufe.',
    contexts: 'Professional Services · HR · interne Transformation'
  }
];

export function ExperienceSnapshots() {
  return (
    <section className="section experience-snapshots" aria-labelledby="snapshots-heading">
      <div className="container">
        <div className="section-heading heading-split">
          <div>
            <h2 id="snapshots-heading" tabIndex={-1}>Erfahrung, die in Ihre Prozesse einfließt</h2>
          </div>
          <p>Die Beispiele stammen aus beruflichen Tätigkeiten unserer Teammitglieder und sind keine MSB-Kundenprojekte.</p>
        </div>

        <RevealGroup className="snapshot-grid">
          {expertiseAreas.map((area) => (
            <article key={area.title} className="snapshot-card">
              <h3>{area.title}</h3>
              <p>{area.text}</p>
              <p className="snapshot-context">{area.contexts}</p>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default ExperienceSnapshots;
