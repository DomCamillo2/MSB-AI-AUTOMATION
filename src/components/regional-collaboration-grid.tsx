import { RevealGroup } from '@/components/reveal';
import styles from './regional-collaboration-grid.module.css';

type CollaborationIconName = 'knowledge' | 'pilot' | 'handoff';

const collaborationPoints = [
  {
    icon: 'knowledge' as const,
    title: 'Prozesswissen zusammenbringen',
    text: 'Fachbereich, IT und spätere Nutzende beschreiben denselben Ablauf aus unterschiedlichen Perspektiven. Wir machen Übergaben und Ausnahmen sichtbar.'
  },
  {
    icon: 'pilot' as const,
    title: 'Pilot im Alltag prüfen',
    text: 'Ein kleiner Workflow wird mit typischen Fällen und bewusst gewählten Ausnahmen getestet, bevor weitere Systeme angebunden werden.'
  },
  {
    icon: 'handoff' as const,
    title: 'Verantwortung klar übergeben',
    text: 'Prüfpunkte, Dokumentation und Zuständigkeiten gehören zur Lösung – nicht erst zur Nacharbeit.'
  }
] as const;

function CollaborationIcon({ name }: { name: CollaborationIconName }) {
  if (name === 'knowledge') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16.5" cy="9" r="2.5" />
        <path d="M3.8 19c.4-3.8 2-5.5 4.8-5.5s4.4 1.7 4.8 5.5M14.5 13.5c2 .35 3.2 1.8 3.5 4.5" />
      </svg>
    );
  }

  if (name === 'pilot') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
        <circle cx="12" cy="12" r="8.5" />
        <path d="m9.5 12 1.8 1.8L15 10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 12.5 10.5 15 16 9.5" />
      <path d="M4.5 7.5h15v11h-15z" />
      <path d="M8.5 7.5V5.5h7v2" />
    </svg>
  );
}

export function RegionalCollaborationGrid() {
  return (
    <RevealGroup className={styles.grid} stagger="normal">
      {collaborationPoints.map((point, index) => (
        <article className={styles.card} key={point.title}>
          <div className={styles.cardHead}>
            <span className={styles.iconWrap}>
              <CollaborationIcon name={point.icon} />
            </span>
            <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3>{point.title}</h3>
          <p>{point.text}</p>
        </article>
      ))}
    </RevealGroup>
  );
}

export default RegionalCollaborationGrid;
