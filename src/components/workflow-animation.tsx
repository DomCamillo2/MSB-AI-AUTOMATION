import ProcessFlow from '@/components/process-flow';

const workflowSteps = [
  ['Eingang', 'Neue Information kommt an', 'Trigger'],
  ['Strukturieren', 'Daten erkennen und zuordnen', 'Regeln + KI'],
  ['Freigeben', 'Sensible Schritte kontrollieren', 'Mensch'],
  ['System aktualisieren', 'Bestehende Werkzeuge anbinden', 'CRM · ERP'],
  ['Erledigen', 'Aufgabe oder Dokument ausgeben', 'Ergebnis']
] as const;

export function WorkflowAnimation() {
  return (
    <aside className="workflow-visual" aria-labelledby="workflow-title">
      <h2 id="workflow-title" className="visually-hidden">Beispielhafter Automationsablauf</h2>
      <div className="workflow-visual-head">
        <div>
          <span className="workflow-kicker">Beispielprozess</span>
          <strong>Ein kontrollierter Ablauf</strong>
        </div>
        <span className="workflow-live-state"><span aria-hidden="true" /> Einmaliger Durchlauf</span>
      </div>

      <div className="workflow-inputs" aria-label="Mögliche Eingänge">
        <span>E-Mail</span>
        <span>Formular</span>
        <span>Datei</span>
      </div>

      <ProcessFlow
        className="workflow-process"
        ariaLabel="Schritte des beispielhaften Automationsablaufs"
        size="compact"
        tone="dark"
        steps={workflowSteps.map(([title, description, meta]) => ({ title, description, meta }))}
      />
      <p className="workflow-note">Routine läuft automatisch. Entscheidungen bleiben bei Ihrem Team.</p>
    </aside>
  );
}

export default WorkflowAnimation;
