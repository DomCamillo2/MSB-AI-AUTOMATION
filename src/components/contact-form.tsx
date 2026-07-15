'use client';

import { useState, type FormEvent } from 'react';

const recipient = 'kontakt@msb-ai.de';

function buildMailtoUrl(name: string, company: string, email: string, message: string) {
  const subject = 'Anfrage HR-Automation-Quick-Check';
  const body = [
    `Name: ${name}`,
    `Unternehmen: ${company}`,
    `E-Mail: ${email}`,
    '',
    message
  ].join('\n');

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consent) {
      return;
    }

    window.location.href = buildMailtoUrl(name, company, email, message);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="company">Unternehmen</label>
          <input id="company" name="company" type="text" autoComplete="organization" value={company} onChange={(event) => setCompany(event.target.value)} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">E-Mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="message">Nachricht</label>
        <textarea id="message" name="message" rows={6} value={message} onChange={(event) => setMessage(event.target.value)} />
      </div>
      <label className="checkbox" htmlFor="privacy">
        <input id="privacy" name="privacy" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
        <span>Ich habe die Datenschutzhinweise gelesen.</span>
      </label>
      <p className="notice">
        Bitte senden Sie uns über dieses Formular keine sensiblen personenbezogenen Daten, Bewerbungsunterlagen oder Mitarbeiterdaten.
      </p>
      <button className="cta" type="submit" disabled={!consent}>
        Anfrage per E-Mail öffnen
      </button>
    </form>
  );
}
