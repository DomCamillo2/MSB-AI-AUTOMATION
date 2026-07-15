import { ContactForm } from '@/components/contact-form';

const nextSteps = [
  ['Kurze Rückmeldung', 'Wir melden uns persönlich und klären, ob der Prozess zum Automation Check passt.'],
  ['30–45 Minuten Gespräch', 'Gemeinsam betrachten wir Ablauf, Systeme, Beteiligte und sensible Daten.'],
  ['Konkrete Einordnung', 'Sie erhalten erste Ansatzpunkte zu Nutzen, Aufwand und einem sinnvollen nächsten Schritt.']
];

export function ContactPanel() {
  return (
    <div className="contact-layout">
      <div className="contact-copy">
        <p className="eyebrow eyebrow-light">Kostenloser Automation Check</p>
        <h2 id="contact-panel-heading">Bringen Sie einen Prozess mit, der Ihr Team regelmäßig aufhält.</h2>
        <p className="contact-lead">
          Wir betrachten einen konkreten Ablauf und geben Ihnen eine ehrliche erste Einschätzung, wo Automatisierung sinnvoll ist und wo nicht.
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
          Lieber direkt schreiben? <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
        </p>
      </div>

      <div className="form-surface">
        <h3>Automation Check anfragen</h3>
        <p>Vier Angaben genügen für den ersten Kontakt.</p>
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactPanel;
