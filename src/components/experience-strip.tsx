import { Reveal } from '@/components/reveal';

const experienceContexts = [
  {
    area: 'Professional Services',
    organizations: 'KPMG',
    experience: 'Projektmanagement, Customer Experience und Datenanalyse'
  },
  {
    area: 'Industrie & Automotive',
    organizations: 'Siemens · BMW Group',
    experience: 'Datenanalyse, Prozessoptimierung und praktische Umsetzung'
  },
  {
    area: 'Automotive & Energie',
    organizations: 'prognum Automotive · Callidus Energie',
    experience: 'CRM-Implementierung, Workflow-Automatisierung und HR-Prozesse'
  }
] as const;

export function ExperienceStrip() {
  return (
    <section className="experience-band" aria-labelledby="experience-heading">
      <Reveal className="container experience-layout">
        <div>
          <p className="eyebrow">Praxiserfahrung</p>
          <h2 id="experience-heading" tabIndex={-1}>Erfahrung aus realen Unternehmens&shy;kontexten</h2>
          <p className="experience-intro">Unser Team bringt praktische Erfahrung aus Automotive, Industrie, Energie und Professional Services mit.</p>
        </div>
        <div className="experience-context-column">
          <ul
            className="experience-contexts"
            aria-label="Ausgewählte berufliche Kontexte einzelner Teammitglieder"
            tabIndex={0}
          >
            {experienceContexts.map((context, index) => (
              <li key={context.organizations}>
                <span>{String(index + 1).padStart(2, '0')} · {context.area}</span>
                <strong>{context.organizations}</strong>
                <p>{context.experience}</p>
              </li>
            ))}
          </ul>
          <p className="experience-disclaimer">
            Ausgewählte berufliche Kontexte einzelner Teammitglieder. Die genannten Unternehmen sind keine Referenzkunden von MSB AI &amp; Automation.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export default ExperienceStrip;
