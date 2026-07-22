import styles from './service-visuals.module.css';

type IconName = 'inbox' | 'map' | 'check' | 'target' | 'engine';

function DiagramIcon({ name }: { name: IconName }) {
  if (name === 'inbox') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5h14v12H5zM5 13h4l1.5 2h3L15 13h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'map') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="7" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="18" cy="7" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="17" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8.2 7h7.6M7.4 8.7l3.4 6.3M16.6 8.7 13.2 15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'check') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5 19 6v5.3c0 4.2-2.8 7.5-7 9.2-4.2-1.7-7-5-7-9.2V6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m8.5 12 2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'target') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="m14.4 9.6 4.1-4.1M18.5 5.5v3M18.5 5.5h-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h5l2 3h9M4 17h5l2-3h9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="7" r="1.6" fill="currentColor" />
      <circle cx="4" cy="17" r="1.6" fill="currentColor" />
      <circle cx="20" cy="10" r="1.6" fill="currentColor" />
      <circle cx="20" cy="14" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function ProcessVisual() {
  const stages = [
    ['inbox', 'Eingang'],
    ['map', 'Ablauf'],
    ['check', 'Prüfung'],
    ['target', 'Potenzial']
  ] as const;

  return (
    <div className={styles.visualFrame} role="img" aria-label="Prozess-Scan vom Eingang über Ablauf und Prüfung bis zum Automatisierungspotenzial">
      <div className={styles.visualTopbar}>
        <span className={styles.visualKicker}>Prozess-Scan</span>
        <span className={styles.visualState}><i aria-hidden="true" /> strukturiert</span>
      </div>

      <div className={styles.processTrack}>
        {stages.map(([icon, label]) => (
          <div className={styles.processNode} key={label}>
            <span className={styles.nodeIcon}><DiagramIcon name={icon} /></span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>

      <div className={styles.processDimensions}>
        {['Systeme', 'Rollen', 'Daten', 'Freigaben'].map((dimension) => (
          <span className={styles.dimension} key={dimension}>{dimension}</span>
        ))}
      </div>

      <div className={styles.insight}>
        <span aria-hidden="true">✓</span>
        <div>
          <strong>Klares Prozessbild</strong>
          <small>Ansatzpunkte, Abhängigkeiten und Risiken werden sichtbar.</small>
        </div>
      </div>
    </div>
  );
}

export function IntegrationVisual() {
  return (
    <div className={styles.visualFrame} role="img" aria-label="Datenfluss aus E-Mail und Formular über eine Automatisierung mit menschlicher Freigabe in bestehende Systeme">
      <div className={styles.visualTopbar}>
        <span className={styles.visualKicker}>Workflow-Architektur</span>
        <span className={styles.visualState}><i aria-hidden="true" /> kontrolliert</span>
      </div>

      <div className={styles.integrationGrid}>
        <div className={styles.sourceStack}>
          <div className={styles.dataNode}><span>EM</span>E-Mail</div>
          <div className={styles.dataNode}><span>FO</span>Formular</div>
        </div>

        <span className={styles.flowRail} aria-hidden="true" />

        <div className={styles.engine}>
          <span className={styles.engineIcon}><DiagramIcon name="engine" /></span>
          <strong>Automatisierung</strong>
          <small>Regeln · Ausnahmen · Protokoll</small>
        </div>

        <span className={styles.flowRail} aria-hidden="true" />

        <div className={styles.systemStack}>
          <div className={styles.dataNode}><span>CR</span>CRM</div>
          <div className={styles.dataNode}><span>ER</span>ERP</div>
          <div className={styles.dataNode}><span>DM</span>DMS</div>
        </div>
      </div>

      <div className={styles.approval}>
        <span className={styles.approvalIcon} aria-hidden="true">✓</span>
        <div>
          <strong>Menschlicher Kontrollpunkt</strong>
          <small>Sensible Fälle und Ausnahmen bleiben bewusst prüfbar.</small>
        </div>
        <span className={styles.approvalState}>Freigabe</span>
      </div>
    </div>
  );
}

export function EnablementVisual() {
  const steps = [
    ['01', 'Testen', styles.stepOne],
    ['02', 'Rückmeldung', styles.stepTwo],
    ['03', 'Anpassen', styles.stepThree],
    ['04', 'Übergeben', styles.stepFour]
  ] as const;

  return (
    <div className={styles.visualFrame} role="img" aria-label="Einführungskreislauf aus Testen, Rückmeldung, Anpassen und Übergeben mit dem Team im Mittelpunkt">
      <div className={styles.visualTopbar}>
        <span className={styles.visualKicker}>Adoption Loop</span>
        <span className={styles.visualState}><i aria-hidden="true" /> gemeinsam</span>
      </div>

      <div className={styles.cycleCanvas}>
        <span className={styles.cycleRing} aria-hidden="true" />
        <div className={styles.cycleCenter}><strong>Team<br />befähigt</strong></div>
        {steps.map(([number, label, position]) => (
          <div className={`${styles.cycleStep} ${position}`} key={number}>
            <span className={styles.cycleNumber}>{number}</span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
