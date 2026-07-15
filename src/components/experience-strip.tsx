import React from 'react';

export function ExperienceStrip() {
  const companies = ['KPMG', 'Siemens', 'BMW Group', 'prognum Automotive', 'Callidus Energie'];
  return (
    <section className="section-tight" aria-label="Erfahrung aus Unternehmenskontexten">
      <div className="container">
        <div className="section-intro">
          <p className="kicker">Erfahrung</p>
          <h2>Erfahrung aus realen Unternehmenskontexten</h2>
          <p className="lead" style={{ marginTop: '0.6rem' }}>
            Unser Team verbindet praktische Erfahrung aus Automotive, Industrie, Energie, Professional Services und datengetriebener Prozessoptimierung.
          </p>
        </div>

        <div className="prose-panel" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {companies.map((c) => (
            <div key={c} className="callout" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.06)', padding: '0.45rem 0.9rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{c}</span>
            </div>
          ))}
        </div>

        <p className="small muted" style={{ marginTop: '0.85rem' }}>
          Die genannten Unternehmen sind ausgewählte berufliche Stationen einzelner Teammitglieder und keine Referenzkunden von MSB AI & Automation.
        </p>
      </div>
    </section>
  );
}

export default ExperienceStrip;
