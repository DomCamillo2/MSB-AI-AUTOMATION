const companies = ['KPMG', 'Siemens', 'BMW Group', 'prognum Automotive', 'Callidus Energie'];

export function ExperienceStrip() {
  return (
    <section className="experience-band" aria-labelledby="experience-heading">
      <div className="container experience-layout">
        <div>
          <p className="eyebrow">Berufliche Erfahrung</p>
          <h2 id="experience-heading">Erfahrung aus realen Unternehmenskontexten</h2>
        </div>
        <div>
          <div className="company-wordmarks" aria-label="Ausgewählte berufliche Stationen">
            {companies.map((company) => (
              <span key={company}>{company}</span>
            ))}
          </div>
          <p className="experience-disclaimer">
            Ausgewählte berufliche Stationen einzelner Teammitglieder. Die genannten Unternehmen sind keine Referenzkunden von MSB AI &amp; Automation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ExperienceStrip;
