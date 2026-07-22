import Accordion from '@/components/accordion';
import ContactPanel from '@/components/contact-panel';
import PageIntro from '@/components/page-intro';
import { Reveal, RevealGroup } from '@/components/reveal';
import StructuredData from '@/components/structured-data';
import { createPageMetadata, siteUrl } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Kostenloser Automation Check für KMU',
  description: 'Lohnt sich Ihr Prozess für Automatisierung? Im kostenlosen Check erhalten Sie eine erste Einschätzung zu Ablauf, Nutzen, Risiken und nächstem Schritt.',
  path: '/automation-check'
});

const checkDetails = [
  ['Sie bringen mit', 'Einen wiederkehrenden Ablauf, der Zeit kostet – noch keine fertige technische Lösung.'],
  ['Wir betrachten', 'Auslöser, Bearbeitung, Systeme, Daten, Ausnahmen und notwendige Freigaben.'],
  ['Sie erhalten', 'Eine ehrliche Ersteinschätzung und einen klaren nächsten Schritt – auch wenn Automatisierung nicht sinnvoll ist.']
] as const;

const checkFaqs = [
  ['Welche Prozesse lassen sich automatisieren?', 'Gut prüfbar sind wiederkehrende Abläufe mit erkennbaren Eingängen, Regeln und Ergebnissen. Ausnahmen und sensible Entscheidungen können bewusst bei Menschen bleiben.'],
  ['Braucht der Prozess bereits KI?', 'Nein. Häufig reicht eine verlässliche regelbasierte Automatisierung. KI setzen wir nur dort ein, wo sie für unstrukturierte Informationen einen konkreten Vorteil bietet.'],
  ['Was bekomme ich nach dem Automation Check?', 'Sie erhalten eine erste Einordnung zu Nutzen, Machbarkeit, Risiken und dem sinnvollsten nächsten Schritt. Das ist noch kein verbindliches Projektangebot.'],
  ['Was passiert danach?', 'Nur wenn der Ablauf geeignet ist, besprechen wir einen klar abgegrenzten Pilot. Aus dem kostenlosen Check entsteht keine Projektbindung.']
] as const;

const checkFaqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteUrl}/automation-check#faq`,
  mainEntity: checkFaqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
};

export default function AutomationCheckPage() {
  return (
    <main id="main-content">
      <StructuredData data={checkFaqStructuredData} />
      <PageIntro
        eyebrow="Kostenloser Automation Check"
        title="Welcher Prozess kostet Ihr Team regelmäßig Zeit?"
        lead="Beschreiben Sie einen wiederkehrenden Ablauf. Wir prüfen, ob er sich für eine genauere Automatisierungsanalyse eignet."
        aside="Bitte tragen Sie keine sensiblen Personen-, Kunden- oder Bewerberdaten ein."
        compact
      />
      <section className="contact-section contact-page-section" aria-labelledby="contact-panel-heading">
        <div className="container"><ContactPanel /></div>
      </section>

      <section className="section check-details-section" aria-labelledby="check-details-heading">
        <div className="container">
          <Reveal className="section-heading heading-split">
            <div>
              <p className="eyebrow">Was Sie erwartet</p>
              <h2 id="check-details-heading">Erste Klarheit, bevor ein Projekt beginnt.</h2>
            </div>
            <p>Der Check ist ein Arbeitsgespräch über einen konkreten Prozess. Wir verkaufen darin weder ein bestimmtes Tool noch eine pauschale KI-Lösung.</p>
          </Reveal>
          <RevealGroup className="check-details-grid" stagger="normal">
            {checkDetails.map(([title, text], index) => (
              <article key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section check-faq-section" aria-labelledby="check-faq-heading">
        <div className="container editorial-split">
          <Reveal className="section-heading sticky-heading">
            <p className="eyebrow">Häufige Fragen</p>
            <h2 id="check-faq-heading">Passt der Automation Check zu meinem Prozess?</h2>
            <p>Vier Antworten zur Vorbereitung und zum möglichen nächsten Schritt.</p>
          </Reveal>
          <div className="faq-list check-faq-list">
            {checkFaqs.map(([question, answer]) => (
              <Accordion key={question} className="faq-item" label={question}><p>{answer}</p></Accordion>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
