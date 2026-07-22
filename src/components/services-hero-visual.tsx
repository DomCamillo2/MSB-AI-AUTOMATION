import styles from './service-visuals.module.css';

const nodes = [
  { label: 'Eingang', value: 'E-Mail · Formular', icon: 'inbox' },
  { label: 'Erkennen', value: 'Daten · Anliegen', icon: 'scan' },
  { label: 'Verarbeiten', value: 'Regeln · KI', icon: 'logic' },
  { label: 'Prüfen', value: 'Mensch bei Bedarf', icon: 'person' },
  { label: 'Übergeben', value: 'CRM · ERP · Report', icon: 'system' }
] as const;

function FlowIcon({ type }: { type: (typeof nodes)[number]['icon'] }) {
  if (type === 'inbox') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m4 7 8 6 8-6" /></svg>;
  if (type === 'scan') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M8 21H4a1 1 0 0 1-1-1v-4M16 21h4a1 1 0 0 0 1-1v-4M7 12h10" /></svg>;
  if (type === 'logic') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="12" r="2" /><path d="M7 6h3c4 0 4 6 7 6M7 18h3c4 0 4-6 7-6" /></svg>;
  if (type === 'person') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3.5 20c.4-4.5 2.2-6.5 5.5-6.5s5.1 2 5.5 6.5M15 12l2 2 4-5" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" /></svg>;
}

export function ServicesHeroVisual() {
  return (
    <aside className={styles.heroModel} aria-labelledby="services-model-title">
      <div className={styles.heroTopbar}>
        <span>Beispielhafter Datenfluss</span>
        <span>kontrolliert</span>
      </div>
      <h2 className={styles.visuallyHidden} id="services-model-title">Vom Eingang bis zum bestehenden Zielsystem</h2>
      <ol className={styles.heroFlow}>
        {nodes.map((node, index) => (
          <li key={node.label} className={index === 3 ? styles.approvalNode : undefined}>
            <span className={styles.flowIcon}><FlowIcon type={node.icon} /></span>
            <div><small>{node.label}</small><strong>{node.value}</strong></div>
            {index < nodes.length - 1 && <span className={styles.flowConnector} aria-hidden="true"><i /></span>}
          </li>
        ))}
      </ol>
      <div className={styles.heroVisualNote}>
        <span aria-hidden="true">↳</span>
        <p>Der Normalfall läuft weiter. Unklare oder kritische Fälle werden gezielt vorgelegt.</p>
      </div>
    </aside>
  );
}

export default ServicesHeroVisual;
