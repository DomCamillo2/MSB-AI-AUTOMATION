import { ContactForm } from '@/components/contact-form';

const nextSteps = [
  ['Persönliche Rückmeldung', 'Wir prüfen, ob der Prozess für einen Automation Check geeignet ist.'],
  ['30–45 Minuten Gespräch', 'Wir betrachten Ablauf, Systeme, Beteiligte und relevante Daten.'],
  ['Konkreter nächster Schritt', 'Sie erhalten eine erste Einschätzung zu Nutzen, Aufwand und Risiken.']
];

export function ContactPanel() {
  return (
    <div className="contact-layout">
      <div className="contact-copy">
        <p className="eyebrow eyebrow-light">Kostenloser Automation Check</p>
        <h2 id="contact-panel-heading" tabIndex={-1}>Welcher Prozess kostet Ihr Team regelmäßig Zeit?</h2>
        <p className="contact-lead">
          Beschreiben Sie uns einen wiederkehrenden Ablauf. Sie erhalten eine ehrliche erste Einschätzung, ob eine Automatisierung sinnvoll ist.
        </p>

        <ol className="next-steps">
          {nextSteps.map(([title, text], index) => (
            <li key={title}>
              <span>{index + 1}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>

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
