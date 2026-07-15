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
    'Aktuelles Prozessproblem:',
    process
  ].join('\n');

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [process, setProcess] = useState('');
  const [consent, setConsent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
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
          aria-describedby="email-hint"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <small id="email-hint">Für Rückfragen und die Terminabstimmung.</small>
      </div>

      <div className="field">
        <label htmlFor="process">Welcher Ablauf kostet aktuell Zeit?</label>
        <textarea
          id="process"
          name="process"
          rows={5}
          required
          aria-describedby="process-hint"
          value={process}
          onChange={(event) => setProcess(event.target.value)}
        />
        <small id="process-hint">Eine kurze Beschreibung reicht. Bitte keine sensiblen Personen- oder Bewerberdaten eintragen.</small>
      </div>

      <label className="checkbox" htmlFor="privacy">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
        />
        <span>Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu.</span>
      </label>
      <a className="privacy-link" href="/datenschutz">Datenschutzhinweise lesen</a>

      <button className="button button-primary form-submit" type="submit" disabled={!consent}>
        Automation Check anfragen
      </button>
      <p className="form-note">Beim Absenden öffnet sich Ihr E-Mail-Programm mit den eingetragenen Angaben. Es wird kein externer Formulardienst verwendet.</p>
    </form>
  );
}
