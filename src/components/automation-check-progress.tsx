import { CHECK_QUESTIONS, PHASES } from '@/lib/automation-check-config';
import type { CheckPhaseId } from '@/lib/automation-check-types';
import styles from './automation-check.module.css';

type Props = {
  currentPhase: CheckPhaseId;
  stepIndex: number;
  result?: boolean;
};

export function AutomationCheckProgress({ currentPhase, stepIndex, result = false }: Props) {
  const progress = result ? 100 : Math.round(((stepIndex + 1) / CHECK_QUESTIONS.length) * 100);

  return (
    <div className={styles.progress} aria-label="Fortschritt im Automation Check">
      <div className={styles.phaseList}>
        {PHASES.map((phase) => {
          const activeIndex = PHASES.findIndex((item) => item.id === currentPhase);
          const phaseIndex = PHASES.findIndex((item) => item.id === phase.id);
          const state = phaseIndex < activeIndex || result ? 'complete' : phase.id === currentPhase ? 'active' : 'upcoming';
          return (
            <div className={styles.phase} data-state={state} key={phase.id}>
              <span>{phase.number}</span>
              <strong>{phase.label}</strong>
            </div>
          );
        })}
      </div>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={result ? 'Automation Check abgeschlossen' : `Automation Check zu ${progress} Prozent bearbeitet`}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default AutomationCheckProgress;
