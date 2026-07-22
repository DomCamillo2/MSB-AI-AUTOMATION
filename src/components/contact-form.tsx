'use client';

import { useRef, useState, type FormEvent } from 'react';
import { trackAnalyticsEvent } from '@/lib/analytics';

const recipient = 'kontakt@msb-ai.de';
type FormField = 'name' | 'company' | 'email' | 'process' | 'privacy';
type FormErrors = Partial<Record<FormField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState('');
  const startedRef = useRef(false);

  function trackStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackAnalyticsEvent('automation_check_start', {
      cta_location: 'automation_check_form',
      page_type: 'automation_check'
    });
  }

  function clearFeedback(field: FormField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!name.trim()) nextErrors.name = 'Bitte geben Sie Ihren Namen ein.';
    if (!company.trim()) nextErrors.company = 'Bitte geben Sie Ihr Unternehmen ein.';
    if (!email.trim()) nextErrors.email = 'Bitte geben Sie Ihre geschäftliche E-Mail-Adresse ein.';
    else if (!emailPattern.test(email.trim())) nextErrors.email = 'Bitte prüfen Sie das Format der E-Mail-Adresse.';
    if (!process.trim()) nextErrors.process = 'Bitte beschreiben Sie den wiederkehrenden Prozess kurz.';
    if (!privacyAcknowledged) nextErrors.privacy = 'Bitte bestätigen Sie, dass Sie die Datenschutzerklärung zur Kenntnis genommen haben.';

    if (Object.keys(nextErrors).length) {
      const form = event.currentTarget;
      setErrors(nextErrors);
      setStatus('');
      window.requestAnimationFrame(() => {
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setErrors({});
    setStatus('Ihr E-Mail-Programm wird geöffnet. Prüfen und senden Sie die vorbereitete Nachricht dort ab.');
    trackAnalyticsEvent('email_click', {
      cta_location: 'automation_check_form',
      page_type: 'automation_check'
    });
    window.location.href = buildMailtoUrl(name, company, email, process);
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit} onInputCapture={trackStart}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearFeedback('name');
            }}
          />
          {errors.name ? <p className="form-error" id="name-error">{errors.name}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="company">Unternehmen</label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? 'company-error' : undefined}
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              clearFeedback('company');
            }}
          />
          {errors.company ? <p className="form-error" id="company-error">{errors.company}</p> : null}
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
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearFeedback('email');
          }}
        />
        {errors.email ? <p className="form-error" id="email-error">{errors.email}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="process">Welcher Prozess kostet regelmäßig Zeit?</label>
        <textarea
          id="process"
          name="process"
          rows={5}
          required
          aria-invalid={errors.process ? true : undefined}
          aria-describedby={errors.process ? 'process-hint process-error' : 'process-hint'}
          placeholder="Zum Beispiel: Bewerberdaten aus E-Mails ins CRM übertragen."
          value={process}
          onChange={(event) => {
            setProcess(event.target.value);
            clearFeedback('process');
          }}
        />
        <small id="process-hint">Bitte keine sensiblen Personen-, Kunden- oder Bewerberdaten eintragen.</small>
        {errors.process ? <p className="form-error" id="process-error">{errors.process}</p> : null}
      </div>

      <div className="privacy-field">
        <label className="checkbox" htmlFor="privacy">
          <input
            id="privacy"
            name="privacy"
            type="checkbox"
            checked={privacyAcknowledged}
            onChange={(event) => {
              setPrivacyAcknowledged(event.target.checked);
              clearFeedback('privacy');
            }}
            required
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={errors.privacy ? 'privacy-error' : undefined}
          />
          <span>Ich habe die Datenschutzerklärung zur Kenntnis genommen.</span>
        </label>
        {errors.privacy ? <p className="form-error" id="privacy-error">{errors.privacy}</p> : null}
      </div>
      <a className="privacy-link" href="/datenschutz">Datenschutzerklärung lesen</a>

      <button className="button button-primary form-submit" type="submit">
        Prozess kostenlos prüfen lassen <span className="button-arrow" aria-hidden="true">→</span>
      </button>
      {status ? <p className="form-status" role="status" aria-live="polite">{status}</p> : null}
      <p className="form-note">Beim Absenden öffnet sich Ihr E-Mail-Programm mit den eingetragenen Angaben. Es wird kein externer Formulardienst verwendet.</p>
    </form>
  );
}
