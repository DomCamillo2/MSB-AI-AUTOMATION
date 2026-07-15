'use client';

import { useState, type FormEvent } from 'react';

const recipient = 'kontakt@msb-ai.de';

function buildMailtoUrl(name: string, company: string, email: string, process: string) {
  const subject = 'Anfrage: Kostenloser Automation Check';
  const body = [
    `Name: ${name}`,
    `Unternehmen: ${company}`,
    `Geschäftliche E-Mail: ${email}`,
    '',
    'Prozessbeschreibung:',
    process
  ].join('\n');

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [process, setProcess] = useState('');
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!privacyAcknowledged) return;
    window.location.href = buildMailtoUrl(name, company, email, process);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="company">Unternehmen</label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">Geschäftliche E-Mail</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="process">Welcher Prozess kostet regelmäßig Zeit?</label>
        <textarea
          id="process"
          name="process"
          rows={5}
          required
          aria-describedby="process-hint"
          placeholder="Zum Beispiel: Bewerberdaten aus E-Mails ins CRM übertragen."
          value={process}
          onChange={(event) => setProcess(event.target.value)}
        />
        <small id="process-hint">Bitte keine sensiblen Personen-, Kunden- oder Bewerberdaten eintragen.</small>
      </div>

      <label className="checkbox" htmlFor="privacy">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          checked={privacyAcknowledged}
          onChange={(event) => setPrivacyAcknowledged(event.target.checked)}
          required
        />
        <span>Ich habe die Datenschutzerklärung zur Kenntnis genommen.</span>
      </label>
      <a className="privacy-link" href="/datenschutz">Datenschutzerklärung lesen</a>

      <button className="button button-primary form-submit" type="submit" disabled={!privacyAcknowledged}>
        Prozess kostenlos prüfen lassen <span className="button-arrow" aria-hidden="true">→</span>
      </button>
      <p className="form-note">Beim Absenden öffnet sich Ihr E-Mail-Programm mit den eingetragenen Angaben. Es wird kein externer Formulardienst verwendet.</p>
    </form>
  );
}
