import PageCta from '@/components/page-cta';
import PageIntro from '@/components/page-intro';
import UseCaseExplorer from '@/components/use-case-explorer';
import { useCaseDetails } from '@/lib/service-detail-content';
import { createPageMetadata } from '@/lib/seo';
import styles from '@/components/service-detail-pages.module.css';

export const metadata = createPageMetadata({
  title: 'Automatisierung für HR, CRM & Reporting',
  description: 'Konkrete Automatisierungsbeispiele für HR, Verwaltung, CRM, Reporting und internes Wissen – mit klaren menschlichen Prüfungen.',
  path: '/anwendungsfaelle'
});

const fitSignals = [
  ['Wiederholung', 'Der Ablauf tritt regelmäßig auf und folgt in weiten Teilen bekannten Schritten.'],
  ['Klare Eingänge', 'Benötigte Informationen kommen über definierte Kanäle, Dateien oder Systeme an.'],
  ['Prüfbare Ergebnisse', 'Fachverantwortliche können erkennen, ob der Workflow korrekt gearbeitet hat.']
] as const;

export default function AnwendungsfaellePage() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="Anwendungsfälle"
        title="Konkrete Abläufe statt abstrakter KI-Projekte."
        lead="Geeignete Anwendungsfälle entstehen dort, wo Informationen wiederholt erfasst, geprüft, übertragen oder aufbereitet werden."
        aside="Die konkrete Lösung hängt von Systemen, Daten, Ausnahmen und den gewünschten menschlichen Freigaben ab."
      />

      <section className="section use-case-section" aria-labelledby="use-case-detail-heading">
        <div className="container">
          <div className="section-heading heading-split">
            <div><h2 id="use-case-detail-heading">Vier typische Ausgangspunkte</h2></div>
            <p>Wählen Sie einen Bereich, um Ausgangslage, Workflow, Kontrolle und betrieblichen Nutzen zu vergleichen.</p>
          </div>
          <UseCaseExplorer />
        </div>
      </section>

      <section className="section" aria-labelledby="fit-signals-heading">
        <div className="container editorial-split">
          <div className="section-heading sticky-heading">
            <p className="eyebrow">Erste Einordnung</p>
            <h2 id="fit-signals-heading">Wann sich eine genauere Prüfung lohnt</h2>
            <p>Nicht jeder manuelle Schritt sollte automatisiert werden. Diese Merkmale sind ein sinnvoller Ausgangspunkt.</p>
          </div>
          <dl className="editorial-list">
            {fitSignals.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="deep-dive-heading">
        <div className="container">
          <div className={styles.sectionIntro}>
            <div>
              <p className="eyebrow">Vertiefungen</p>
              <h2 id="deep-dive-heading">Sechs Abläufe im Detail</h2>
            </div>
            <p>Von der Ausgangslage bis zur technischen Einbindung: Jede Vertiefung zeigt, was der Workflow übernehmen kann und welche Verantwortung bewusst beim Menschen bleibt.</p>
          </div>
          <div className={styles.directory}>
            {useCaseDetails.map((useCase, index) => (
              <a className={styles.useCaseCard} href={`/anwendungsfaelle/${useCase.slug}`} key={useCase.slug}>
                <small>{String(index + 1).padStart(2, '0')} · {useCase.categoryName}</small>
                <h3>{useCase.metaTitle}</h3>
                <p>{useCase.metaDescription}</p>
                <span>Vertiefung ansehen →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </main>
  );
}
