import PageCta from '@/components/page-cta';
import { Reveal } from '@/components/reveal';
import ServiceIcon from '@/components/service-icon';
import StructuredData from '@/components/structured-data';
import type { ServiceCategory } from '@/lib/service-detail-content';
import { siteUrl } from '@/lib/seo';
import styles from '@/components/service-detail-pages.module.css';

type Props = {
  category: ServiceCategory;
};

export function ServiceCategoryPage({ category }: Props) {
  const pageUrl = `${siteUrl}/leistungen/${category.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: category.metaTitle,
        description: category.metaDescription,
        serviceType: category.name,
        url: pageUrl,
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: 'Deutschland'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${siteUrl}/leistungen` },
          { '@type': 'ListItem', position: 3, name: category.name, item: pageUrl }
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
          <li><a href="/leistungen">Leistungen</a></li>
          <li aria-current="page">{category.name}</li>
        </ol>
      </nav>

      <section className={styles.detailHero} aria-labelledby="category-heading">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">Leistungsbereich · {category.name}</p>
            <h1 id="category-heading">{category.heroTitle}</h1>
            <p className={styles.heroLead}>{category.heroLead}</p>
            <div className={styles.heroActions}>
              <a className="button button-primary" href="/automation-check">{category.ctaLabel} <span className="button-arrow" aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="#beispiele">Beispiele ansehen</a>
            </div>
          </div>
          <aside className={styles.heroMarker} aria-label={`Leistungsbereich ${category.number}`}>
            <div className={styles.markerHead}>
              <span className={styles.markerIcon}><ServiceIcon name={category.icon} /></span>
              <span>{category.number} / 06</span>
            </div>
            <p>{category.cardTeaser}</p>
          </aside>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="pain-heading">
        <div className="container">
          <Reveal>
            <div className={styles.sectionIntro}>
              <div><p className="eyebrow">Ausgangslage</p><h2 id="pain-heading">Wo heute unnötige Arbeit entsteht</h2></div>
              <p>Automatisierung lohnt sich nicht wegen eines einzelnen Klicks. Relevant sind wiederkehrende Übergaben, Prüfungen und Medienbrüche, die im Alltag verlässlich Zeit binden.</p>
            </div>
          </Reveal>
          <div className={styles.painGrid}>
            {category.pains.map((pain, index) => (
              <article key={pain.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} id="beispiele" aria-labelledby="use-cases-heading">
        <div className="container">
          <Reveal>
            <div className={styles.sectionIntro}>
              <div><p className="eyebrow">Konkrete Abläufe</p><h2 id="use-cases-heading">Typische Anwendungsfälle</h2></div>
              <p>Die Beispiele zeigen sinnvolle Einstiegspunkte. Verlinkte Vertiefungen beschreiben den Ablauf, die technische Vorbereitung und die menschliche Verantwortung im Detail.</p>
            </div>
          </Reveal>
          <div className={styles.useCaseGrid}>
            {category.useCases.map((item, index) => {
              const content = (
                <>
                  <small>{String(index + 1).padStart(2, '0')} · {item.href ? 'Vertiefung' : 'Beispiel'}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.href && <span>Details ansehen →</span>}
                </>
              );
              return item.href
                ? <a className={styles.useCaseCard} href={item.href} key={item.title}>{content}</a>
                : <article className={styles.useCaseCard} key={item.title}>{content}</article>;
            })}
          </div>
        </div>
      </section>

      <section className={styles.sectionNavy} aria-labelledby="workflow-heading">
        <div className="container">
          <Reveal>
            <div className={styles.sectionIntro}>
              <div><p className="eyebrow eyebrow-light">Beispielhafter Workflow</p><h2 id="workflow-heading">Ein klarer Weg vom Eingang bis zur Übergabe</h2></div>
              <p>Die genaue Logik entsteht aus Ihrem Prozess. Jeder Schritt hat einen definierten Eingang, ein prüfbares Ergebnis und einen benannten Ausnahmeweg.</p>
            </div>
          </Reveal>
          <ol className={styles.workflow}>
            {category.workflow.map((step, index) => (
              <li className={step.human ? styles.humanStep : undefined} key={step.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step.label}</strong>
              </li>
            ))}
          </ol>
          <p className={styles.workflowLegend}>Teal markiert einen bewussten menschlichen Prüf- oder Entscheidungspunkt.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="control-heading">
        <div className="container">
          <Reveal>
            <div className={styles.sectionIntro}>
              <div><p className="eyebrow">Aufgabenteilung</p><h2 id="control-heading">Was sich verändert – und was verantwortlich bleibt</h2></div>
              <p>Der Normalfall darf schneller werden, ohne Unsicherheit zu verstecken. Deshalb trennen wir klar zwischen automatisierter Vorbereitung und menschlicher Verantwortung.</p>
            </div>
          </Reveal>
          <div className={styles.frameworkGrid}>
            <article className={styles.frameworkCard}><span>Heute</span><h3>Manuell verteilt</h3><p>{category.framework.today}</p></article>
            <article className={styles.frameworkCard}><span>Automatisiert</span><h3>Nachvollziehbar vorbereitet</h3><p>{category.framework.automated}</p></article>
            <article className={`${styles.frameworkCard} ${styles.frameworkHuman}`}><span>Mensch bleibt</span><h3>Verantwortlich im Prozess</h3><p>{category.framework.human}</p></article>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="integration-heading">
        <div className={`container ${styles.integrationGrid}`}>
          <div>
            <p className="eyebrow">Technik & Schnittstellen</p>
            <h2 id="integration-heading">Bestehende Systeme zuerst</h2>
          </div>
          <div>
            <p className={styles.integrationCopy}>{category.integrationIntro}</p>
            <ul className={styles.integrationList}>{category.integrations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <PageCta
        title={`Einen konkreten Prozess aus ${category.name} prüfen?`}
        text="Wir betrachten einen realen Ablauf, seine Systeme, Ausnahmen und Verantwortlichkeiten. Danach ist klar, ob ein Pilot sinnvoll ist."
        buttonLabel={category.ctaLabel}
      />
    </main>
  );
}

export default ServiceCategoryPage;
