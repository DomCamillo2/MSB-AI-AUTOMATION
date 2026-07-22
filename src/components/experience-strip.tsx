import { Reveal } from '@/components/reveal';
import styles from './experience-strip.module.css';

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
    <section className={styles.band} aria-labelledby="experience-heading">
      <Reveal className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Praxiserfahrung</p>
          <h2 id="experience-heading" className={styles.title} tabIndex={-1}>
            Erfahrung aus realen Unternehmens&shy;kontexten
          </h2>
          <p className={styles.introText}>
            Unser Team bringt praktische Erfahrung aus Automotive, Industrie, Energie und Professional Services mit.
          </p>
        </div>

        <div className={styles.contextColumn}>
          <ul className={styles.cards} aria-label="Ausgewählte berufliche Kontexte einzelner Teammitglieder">
            {experienceContexts.map((context, index) => (
              <li className={styles.card} key={context.organizations}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.area}>{context.area}</span>
                <strong className={styles.organizations}>{context.organizations}</strong>
                <p className={styles.description}>{context.experience}</p>
              </li>
            ))}
          </ul>
          <p className={styles.disclaimer}>
            Ausgewählte berufliche Kontexte einzelner Teammitglieder. Die genannten Unternehmen sind keine
            Referenzkunden von MSB AI &amp; Automation.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export default ExperienceStrip;
