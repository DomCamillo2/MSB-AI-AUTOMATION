import ContactPanel from '@/components/contact-panel';
import PageIntro from '@/components/page-intro';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Automation Check',
  description: 'Einen wiederkehrenden Prozess unverbindlich beschreiben und eine erste Einschätzung zu Nutzen, Aufwand und Risiken erhalten.',
  path: '/automation-check'
});

export default function AutomationCheckPage() {
  return (
    <main id="main-content">
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
    </main>
  );
}
