import ProcessFlow from '@/components/process-flow';

const stages = [
  ['Prozess verstehen', 'Systeme · Rollen · Daten · Risiken'],
  ['Workflow entwickeln', 'Schnittstellen · Regeln · Ausnahmen · Pilot'],
  ['Im Alltag verankern', 'Dokumentation · Schulung · Übergabe']
] as const;

export function ServicesHeroVisual() {
  return (
    <aside className="services-model" aria-labelledby="services-model-title">
      <div className="services-model-head">
        <p className="eyebrow">Leistungsmodell</p>
        <h2 id="services-model-title">Drei Bausteine, ein durchgängiger Prozess</h2>
      </div>
      <div className="services-model-track">
        <ProcessFlow
          ariaLabel="Drei Bausteine des Leistungsmodells"
          size="compact"
          steps={stages.map(([title, meta]) => ({ title, meta }))}
        />
      </div>
      <p className="services-model-note">Analyse, Technik und Einführung greifen ineinander.</p>
    </aside>
  );
}

export default ServicesHeroVisual;
