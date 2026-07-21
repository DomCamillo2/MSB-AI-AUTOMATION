import { ContactForm } from '@/components/contact-form';
import ProcessFlow from '@/components/process-flow';

const nextSteps = [
  ['Persönliche Rückmeldung', 'Wir prüfen, ob der Prozess für einen Automation Check geeignet ist.'],
  ['30–45 Minuten Gespräch', 'Wir betrachten Ablauf, Systeme, Beteiligte und relevante Daten.'],
  ['Konkreter nächster Schritt', 'Sie erhalten eine erste Einschätzung zu Nutzen, Aufwand und Risiken.']
];

export function ContactPanel() {
  return (
    <div className="contact-layout">
      <div className="contact-copy">
        <p className="eyebrow eyebrow-light">So geht es weiter</p>
        <h2 id="contact-panel-heading" tabIndex={-1}>In drei Schritten zur ersten Einschätzung</h2>
        <p className="contact-lead">
          Sie beschreiben den Ablauf – wir ordnen Nutzen, Aufwand und Risiken ehrlich ein.
        </p>

        <ProcessFlow
          className="check-process"
          ariaLabel="Ablauf des kostenlosen Automation Checks"
          size="compact"
          tone="dark"
          steps={nextSteps.map(([title, description]) => ({ title, description }))}
        />

        <p className="direct-contact">
          Direkt schreiben: <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
        </p>
      </div>

      <div className="form-surface">
        <h3>Prozess beschreiben</h3>
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactPanel;
