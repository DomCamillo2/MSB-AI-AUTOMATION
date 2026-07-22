import styles from './service-visuals.module.css';

function Arrow() {
  return <span className={styles.routeArrow} aria-hidden="true">→</span>;
}

export function ProcessVisual() {
  const columns = ['Eingang', 'Prüfung', 'Entscheidung', 'Ergebnis'] as const;

  return (
    <div
      className={styles.visualFrame}
      role="img"
      aria-label="Beispiel eines Ist-Prozesses mit getrennten Spuren für menschliche Arbeit und Systemschritte sowie einem dokumentierten Ausnahmefall"
    >
      <div className={styles.visualTopbar}>
        <span className={styles.visualKicker}>Ist-Prozess</span>
        <span className={styles.visualState}>Rollen · Systeme · Ausnahmen</span>
      </div>

      <div className={styles.processMap}>
        <div className={styles.processHeader}>
          <span aria-hidden="true" />
          {columns.map((column) => <strong key={column}>{column}</strong>)}
        </div>

        <div className={styles.processLane}>
          <strong className={styles.laneLabel}>Mensch</strong>
          <div className={styles.laneCells}>
            <span className={styles.mapNode}>Anfrage sichten</span>
            <Arrow />
            <span className={styles.mapNode}>Angaben prüfen</span>
            <Arrow />
            <span className={styles.mapDecision}>vollständig?</span>
            <Arrow />
            <span className={styles.mapNode}>Freigeben</span>
          </div>
        </div>

        <div className={styles.processLane}>
          <strong className={styles.laneLabel}>System</strong>
          <div className={styles.laneCells}>
            <span className={styles.mapEmpty}>—</span>
            <Arrow />
            <span className={styles.mapNode}>Daten abgleichen</span>
            <Arrow />
            <span className={styles.mapNode}>Vorgang anlegen</span>
            <Arrow />
            <span className={styles.mapNode}>Status schreiben</span>
          </div>
        </div>

        <div className={styles.exceptionNote}>
          <strong>Ausnahme</strong>
          <span>Pflichtangabe fehlt → Rückfrage statt automatischer Weiterverarbeitung</span>
        </div>
      </div>

      <p className={styles.diagramCaption}>
        Erst wenn Normalfall und Ausnahmen sichtbar sind, lässt sich sinnvoll über Automatisierung entscheiden.
      </p>
    </div>
  );
}

export function IntegrationVisual() {
  return (
    <div
      className={styles.visualFrame}
      role="img"
      aria-label="Pilotablauf mit Eingang, Regelprüfung und getrennten Wegen für Normalfall und menschlich zu prüfende Ausnahme"
    >
      <div className={styles.visualTopbar}>
        <span className={styles.visualKicker}>Pilot</span>
        <span className={styles.visualState}>Normalfall und Ausnahme testen</span>
      </div>

      <div className={styles.pilotFlow}>
        <div className={styles.pilotStage}>
          <span className={styles.stageNumber}>01</span>
          <strong>Eingang</strong>
          <small>E-Mail oder Formular</small>
        </div>

        <span className={styles.signalRoute} aria-hidden="true"><i /></span>

        <div className={styles.pilotStage}>
          <span className={styles.stageNumber}>02</span>
          <strong>Regelprüfung</strong>
          <small>Pflichtfelder · Zuordnung · Dublette</small>
        </div>

        <div className={styles.branchLabel}>Regel erfüllt?</div>

        <div className={styles.branchGrid}>
          <div className={styles.branchCard}>
            <span>Normalfall</span>
            <strong>Datensatz anlegen</strong>
            <small>Vorgang wird protokolliert</small>
          </div>
          <div className={styles.branchCard}>
            <span>Ausnahme</span>
            <strong>Mensch prüft</strong>
            <small>Grund und Entscheidung bleiben sichtbar</small>
          </div>
        </div>
      </div>

      <div className={styles.testCriteria}>
        <strong>Im Pilot messen</strong>
        <span>Bearbeitungszeit</span>
        <span>Fehler</span>
        <span>manuelle Eingriffe</span>
      </div>
    </div>
  );
}

export function EnablementVisual() {
  const steps = [
    ['01', 'Testfälle', 'MSB + Fachteam'],
    ['02', 'Schulung', 'spätere Anwender'],
    ['03', 'Go-live', 'Prozessverantwortliche'],
    ['04', 'Nachsteuerung', 'benannter Betrieb']
  ] as const;

  return (
    <div
      className={styles.visualFrame}
      role="img"
      aria-label="Übergabeplan von Testfällen über Schulung und Go-live bis zur Nachsteuerung mit benannten Verantwortlichen"
    >
      <div className={styles.visualTopbar}>
        <span className={styles.visualKicker}>Übergabeplan</span>
        <span className={styles.visualState}>Verantwortung vor dem Start klären</span>
      </div>

      <ol className={styles.handoverTrack}>
        {steps.map(([number, title, owner]) => (
          <li key={number}>
            <span className={styles.handoverNumber}>{number}</span>
            <div>
              <strong>{title}</strong>
              <small>{owner}</small>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.responsibilityGrid}>
        <div><span>Prüft</span><strong>Fachverantwortliche</strong></div>
        <div><span>Greift ein</span><strong>benannte Rolle</strong></div>
        <div><span>Gibt Änderungen frei</span><strong>Prozessverantwortung</strong></div>
      </div>

      <p className={styles.diagramCaption}>
        Die Technik geht erst live, wenn Prüfung, Eingriff und Änderung geregelt sind.
      </p>
    </div>
  );
}
