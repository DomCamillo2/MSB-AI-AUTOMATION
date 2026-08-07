import styles from './regional-page-hero.module.css';

const cities = ['Tübingen', 'Reutlingen', 'Stuttgart'] as const;

type RegionalPageHeroProps = {
  lead: string;
  aside: string;
};

export function RegionalPageHero({ lead, aside }: RegionalPageHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="regional-page-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.main}>
          <p className="eyebrow">Tübingen · Reutlingen · Stuttgart</p>
          <h1 id="regional-page-heading">Prozess&shy;automatisierung für KMU in der Region.</h1>
          <ul className={styles.cities} aria-label="Regionale Schwerpunkte">
            {cities.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>
        <div className={styles.copy}>
          <p>{lead}</p>
          <p className={styles.aside}>{aside}</p>
        </div>
      </div>
    </section>
  );
}

export default RegionalPageHero;
