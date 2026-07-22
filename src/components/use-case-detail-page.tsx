import PageCta from '@/components/page-cta';
import { Reveal } from '@/components/reveal';
import StructuredData from '@/components/structured-data';
import type { UseCaseDetail } from '@/lib/service-detail-content';
import { siteUrl } from '@/lib/seo';
import styles from '@/components/service-detail-pages.module.css';

type Props = {
  useCase: UseCaseDetail;
};

export function UseCaseDetailPage({ useCase }: Props) {
  const pageUrl = `${siteUrl}/anwendungsfaelle/${useCase.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: useCase.metaTitle,
        description: useCase.metaDescription,
        serviceType: 'Prozessautomatisierung',
        url: pageUrl,
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: 'Deutschland'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Anwendungsfälle', item: `${siteUrl}/anwendungsfaelle` },
          { '@type': 'ListItem', position: 3, name: useCase.title, item: pageUrl }
        ]
      }
    ]
  };

  return (
    <main id="main-content">
      <StructuredData data={structuredData} />
      <nav className={styles.breadcrumb} aria-label="Brotkrümelnavigation">
        <ol className="container">
          <li><a href="/">Startseite</a></li>
          <li><a href="/anwendungsfaelle">Anwendungsfälle</a></li>
          <li aria-current="page">{useCase.title}</li>
        </ol>
      </nav>

      <section className={styles.detailHero} aria-labelledby="use-case-heading">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">{useCase.eyebrow}</p>
            <h1 id="use-case-heading">{useCase.title}</h1>
            <p className={styles.heroLead}>{useCase.lead}</p>
            <div className={styles.heroActions}>
              <a className="button button-primary" href="/automation-check">{useCase.ctaLabel} <span className="button-arrow" aria-hidden="true">→</span></a>
              <a className="button button-secondary" href={`/leistungen/${useCase.categorySlug}`}>{useCase.categoryName} ansehen</a>
            </div>
          </div>
          <aside className={styles.heroMarker} aria-label="Grundprinzip des Anwendungsfalls">
            <div className={styles.markerHead}><span className={styles.markerIcon}>↳</span><span>PROZESSBILD</span></div>
            <p>Eingang → Prüfung → Ausnahme → kontrollierte Übergabe</p>
          </aside>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="problem-heading">
        <div className={`container ${styles.problemGrid}`}>
          <div className={styles.problemCopy}>
            <p className="eyebrow">Ausgangslage</p>
            <h2 id="problem-heading">{useCase.problemTitle}</h2>
          </div>
          <div className={styles.problemCopy}>{useCase.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </section>

      <section className={styles.sectionNavy} aria-labelledby="detail-workflow-heading">
        <div className="container">
          <Reveal>
            <div className={styles.sectionIntro}>
              <div><p className="eyebrow eyebrow-light">Ablauf</p><h2 id="detail-workflow-heading">So kann der kontrollierte Workflow aussehen</h2></div>
              <p>Die Darstellung ist ein fachliches Prozessbild. Systeme, Regeln und Freigabepunkte werden erst nach Prüfung des tatsächlichen Ablaufs festgelegt.</p>
            </div>
          </Reveal>
          <ol className={`${styles.workflow} ${useCase.workflow.length === 7 ? styles.workflowSeven : ''}`}>
            {useCase.workflow.map((step, index) => (
              <li className={step.human ? styles.humanStep : undefined} key={step.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step.label}</strong>
              </li>
            ))}
          </ol>
          <p className={styles.workflowLegend}>Teal markiert einen bewussten menschlichen Prüf- oder Entscheidungspunkt.</p>
        </div>
      </section>

      <section className={styles.sectionTint} aria-label="Aufgabenteilung im Workflow">
        <div className={`container ${styles.responsibilityGrid}`}>
          <article className={styles.responsibilityPanel}>
            <header className={styles.panelHeader}><h2>Was sich automatisieren lässt</h2><span>WORKFLOW</span></header>
            <div className={styles.responsibilityList}>{useCase.automatable.map((item) => <section key={item.title}><h3>{item.title}</h3><p>{item.text}</p></section>)}</div>
          </article>
          <article className={`${styles.responsibilityPanel} ${styles.responsibilityPanelHuman}`}>
            <header className={styles.panelHeader}><h2>Was menschlich verantwortlich bleibt</h2><span>KONTROLLE</span></header>
            <div className={styles.responsibilityList}>{useCase.human.map((item) => <section key={item.title}><h3>{item.title}</h3><p>{item.text}</p></section>)}</div>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="detail-integration-heading">
        <div className={`container ${styles.integrationGrid}`}>
          <div>
            <p className="eyebrow">Technische Einbindung</p>
            <h2 id="detail-integration-heading">Passend zum vorhandenen Systemzugang</h2>
          </div>
          <div>
            <p className={styles.integrationCopy}>{useCase.integrationIntro}</p>
            <ul className={styles.integrationList}>{useCase.integrations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="outcome-heading">
        <div className="container">
          <div className={styles.outcome}>
            <h2 id="outcome-heading">{useCase.outcomeTitle}</h2>
            <p>{useCase.outcome}</p>
          </div>
          <nav className={styles.related} aria-label="Verwandte Inhalte">
            {useCase.related.map((item) => <a className={styles.relatedLink} href={item.href} key={item.href}>{item.label}<span aria-hidden="true">→</span></a>)}
          </nav>
        </div>
      </section>

      <PageCta
        title="Diesen Ablauf im eigenen Unternehmen prüfen?"
        text="Wir starten mit einem konkreten Eingang, den beteiligten Systemen und echten Ausnahmefällen. So wird aus einer Idee ein belastbarer nächster Schritt."
        buttonLabel={useCase.ctaLabel}
      />
    </main>
  );
}

export default UseCaseDetailPage;
