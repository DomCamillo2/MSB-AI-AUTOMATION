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
  const activeIndex = PHASES.findIndex((phase) => phase.id === currentPhase);
  const currentPhaseLabel = result
    ? 'Check abgeschlossen'
    : PHASES.find((phase) => phase.id === currentPhase)?.label;
  const progressStatus = result
    ? 'Einschätzung bereit'
    : `Frage ${Math.min(stepIndex + 1, CHECK_QUESTIONS.length)} von ${CHECK_QUESTIONS.length}`;

  return (
    <div className={styles.progress} data-result={result ? 'true' : undefined} aria-label="Fortschritt im Automation Check">
      <div className={styles.progressMeta}>
        <span>MSB Prozessdiagnostik</span>
        <strong>{progressStatus}<span>{progress} %</span></strong>
      </div>
      <div className={styles.phaseRail}>
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
        <div className={styles.phaseList}>
          {PHASES.map((phase, phaseIndex) => {
            const state = result
              ? phase.id === 'assessment' ? 'active' : 'complete'
              : phaseIndex < activeIndex ? 'complete' : phase.id === currentPhase ? 'active' : 'upcoming';
            return (
              <div className={styles.phase} data-state={state} key={phase.id} aria-current={state === 'active' ? 'step' : undefined}>
                <span>{phase.number}</span>
                <strong>{phase.label}</strong>
              </div>
            );
          })}
        </div>
      </div>
      <p className={styles.mobilePhaseLabel} role="status" aria-live="polite" aria-atomic="true">
        <span>Aktuell</span>
        <strong>{currentPhaseLabel}</strong>
      </p>
    </div>
  );
}

export default AutomationCheckProgress;
