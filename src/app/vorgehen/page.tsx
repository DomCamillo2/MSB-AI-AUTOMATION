import Accordion from '@/components/accordion';
import PageCta from '@/components/page-cta';
import PageIntro from '@/components/page-intro';
import ProcessFlow from '@/components/process-flow';
import StructuredData from '@/components/structured-data';
import { createPageMetadata, siteUrl } from '@/lib/seo';
import { engagementSteps, faqs, principles } from '@/lib/site-content';

export const metadata = createPageMetadata({
  title: 'Automation Check, Pilot & Einführung',
  description: 'So führt MSB Automatisierung ein: Prozess prüfen, begrenzten Pilot testen, Systeme kontrolliert anbinden und das Team befähigen.',
  path: '/vorgehen'
});

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteUrl}/vorgehen#faq`,
  mainEntity: faqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
};

export default function VorgehenPage() {
  return (
    <main id="main-content">
      <StructuredData data={faqStructuredData} />
      <PageIntro
        eyebrow="Vorgehen"
        title="Klein starten. Wirkung prüfen. Sauber übergeben."
        lead="Wir strukturieren das Vorhaben in überschaubare Schritte und machen Annahmen, Risiken und Ergebnisse nachvollziehbar."
        aside="Ein Pilot ist kein Selbstzweck: Er soll zeigen, ob ein Workflow im konkreten Arbeitsalltag sinnvoll funktioniert."
      />

      <section className="section engagement-section" aria-labelledby="process-detail-heading">
        <div className="container">
          <div className="section-heading heading-split">
            <div><h2 id="process-detail-heading">Vom ersten Prozessbild zur Übergabe</h2></div>
            <p>Jede Phase liefert ein konkretes Ergebnis und eine bewusste Entscheidung über den nächsten Schritt.</p>
          </div>
          <ProcessFlow
            className="engagement-process"
            ariaLabel="Vier Schritte vom Automation Check bis zur Übergabe"
            layout="horizontal"
            steps={engagementSteps.map((step) => ({
              title: step.title,
              description: step.text,
              outcome: step.deliverable,
              details: step.details
            }))}
          />
        </div>
      </section>

      <section className="section responsible-section" aria-labelledby="responsible-heading">
        <div className="container">
          <div className="responsible-intro">
            <p className="eyebrow eyebrow-light">Verantwortung</p>
            <h2 id="responsible-heading">Automatisierung mit Kontrolle</h2>
            <p>Wir automatisieren Routine – nicht Verantwortung.</p>
          </div>
          <dl className="principle-list">
            {principles.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
          </dl>
          <p className="technical-fit">Die Umsetzung orientiert sich an Ihrer bestehenden IT und vermeidet unnötige Systemwechsel.</p>
          <p className="responsible-disclaimer">Datenschutz und rechtliche Anforderungen werden projektspezifisch mit den zuständigen Stellen des Unternehmens geprüft. MSB ersetzt keine Rechts- oder Datenschutzberatung.</p>

          <div className="faq-block">
            <div className="faq-heading"><h3>Häufige Fragen</h3></div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => <Accordion key={question} className="faq-item" label={question}><p>{answer}</p></Accordion>)}
            </div>
          </div>
        </div>
      </section>

      <PageCta />
    </main>
  );
}
