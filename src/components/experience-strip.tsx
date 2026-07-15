const companies = ['KPMG', 'Siemens', 'BMW Group', 'prognum Automotive', 'Callidus Energie'];

export function ExperienceStrip() {
  return (
    <section className="experience-band" aria-labelledby="experience-heading">
      <div className="container experience-layout">
        <div>
          <h2 id="experience-heading" tabIndex={-1}>Erfahrung aus realen Unternehmenskontexten</h2>
          <p className="experience-intro">Unser Team bringt praktische Erfahrung aus Automotive, Industrie, Energie und Professional Services mit.</p>
        </div>
        <div>
          <div className="company-wordmarks" aria-label="Berufliche Stationen einzelner Teammitglieder">
            {companies.map((company) => <span key={company}>{company}</span>)}
          </div>
          <p className="experience-disclaimer">
            Berufliche Stationen einzelner Teammitglieder. Die genannten Unternehmen sind keine Referenzkunden von MSB AI &amp; Automation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ExperienceStrip;
