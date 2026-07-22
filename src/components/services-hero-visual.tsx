import styles from './service-visuals.module.css';

const stages = [
  {
    number: '01',
    title: 'Ablauf klären',
    meta: 'Ist-Prozess · Ausnahmen · Entscheidung',
    icon: 'analysis'
  },
  {
    number: '02',
    title: 'Pilot testen',
    meta: 'Regeln · Testfälle · Messwerte',
    icon: 'workflow'
  },
  {
    number: '03',
    title: 'Betrieb übergeben',
    meta: 'Dokumentation · Rollen · Änderungen',
    icon: 'adoption'
  }
] as const;

function StageIcon({ type }: { type: (typeof stages)[number]['icon'] }) {
  if (type === 'analysis') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="7" cy="7" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17" cy="7" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="17" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9.3 7h5.4M8.2 8.8l2.7 6M15.8 8.8l-2.7 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'workflow') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h6l2 3h8M4 18h6l2-3h8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="6" r="1.7" fill="currentColor" />
        <circle cx="4" cy="18" r="1.7" fill="currentColor" />
        <circle cx="20" cy="9" r="1.7" fill="currentColor" />
        <circle cx="20" cy="15" r="1.7" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 18c.5-3 2-4.5 4.5-4.5s4 1.5 4.5 4.5M14 10.5l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServicesHeroVisual() {
  return (
    <aside className={styles.heroModel} aria-labelledby="services-model-title">
      <div className={styles.heroTopbar}>
        <span className={styles.heroBrand}>Projektweg</span>
        <span className={styles.heroState}>3 Arbeitspakete</span>
      </div>

      <h2 className={styles.heroTitle} id="services-model-title">
        Vom Ist-Ablauf bis zur geregelten Übergabe.
      </h2>

      <div className={styles.heroStages}>
        {stages.map((stage) => (
          <div className={styles.heroStage} key={stage.number}>
            <span className={styles.heroIcon}><StageIcon type={stage.icon} /></span>
            <span className={styles.heroCopy}>
              <strong>{stage.title}</strong>
              <small>{stage.meta}</small>
            </span>
            <span className={styles.heroIndex}>{stage.number}</span>
          </div>
        ))}
      </div>

      <p className={styles.heroFooter}>
        <span aria-hidden="true">—</span>
        Jede Phase endet mit einem prüfbaren Ergebnis.
      </p>
    </aside>
  );
}

export default ServicesHeroVisual;
