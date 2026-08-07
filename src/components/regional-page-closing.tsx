import styles from './regional-page-closing.module.css';

export function RegionalPageClosing() {
  return (
    <section className={styles.band} aria-labelledby="regional-scope-heading">
      <div className="container">
        <div className={styles.scopeLayout}>
          <div>
            <p className="eyebrow eyebrow-light">Leistungsgebiet</p>
            <h2 id="regional-scope-heading">Regional verankert, bei Bedarf remote umsetzbar.</h2>
          </div>
          <div>
            <p>Unser Sitz ist in Tübingen. Der regionale Schwerpunkt umfasst Tübingen, Reutlingen und Stuttgart; geeignete Projekte lassen sich darüber hinaus remote begleiten.</p>
            <a className="text-link text-link-light" href="/leistungen">Leistungen ansehen <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <div className={styles.ctaLayout} aria-labelledby="regional-cta-heading">
          <div>
            <p className="eyebrow eyebrow-light">Nächster Schritt</p>
            <h2 id="regional-cta-heading">Welcher Ablauf soll in Ihrem Unternehmen verlässlicher werden?</h2>
            <p>Im kostenlosen Automation Check betrachten wir einen konkreten Prozess – ohne Toolvorgabe und ohne Projektbindung.</p>
          </div>
          <a className="button button-light" href="/automation-check">
            Prozess kostenlos prüfen lassen <span className="button-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default RegionalPageClosing;
