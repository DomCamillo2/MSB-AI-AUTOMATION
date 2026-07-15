import type { Metadata } from 'next';
import Accordion from '@/components/accordion';
import PageCta from '@/components/page-cta';
import PageIntro from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { engagementSteps, faqs, principles } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Vorgehen',
  description: 'Vom Automation Check über einen abgegrenzten Pilot bis zur dokumentierten Übergabe in den Arbeitsalltag.'
};

export default function VorgehenPage() {
  return (
    <main id="main-content">
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
          <Reveal>
            <ol className="engagement-grid">
              {engagementSteps.map((step, index) => (
                <li key={step.title} className="engagement-step">
                  <div className="engagement-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                  <h3>{index + 1}. {step.title}</h3>
                  <p>{step.text}</p>
                  <p className="step-deliverable"><span>Ergebnis</span><strong>{step.deliverable}</strong></p>
                  <Accordion className="compact-accordion" label="Details anzeigen">
                    <ul className="plain-list">{step.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </Accordion>
                </li>
              ))}
            </ol>
          </Reveal>
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
