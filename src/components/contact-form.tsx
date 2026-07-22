'use client';

import { useRef, useState, type FormEvent } from 'react';

type FormField = 'name' | 'company' | 'email' | 'process' | 'privacy';
type FormErrors = Partial<Record<FormField, string>>;
type FormStatus = { kind: 'success' | 'error'; text: string } | null;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [process, setProcess] = useState('');
  const [website, setWebsite] = useState('');
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAt = useRef(Date.now());

  function clearFeedback(field: FormField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const nextErrors: FormErrors = {};

    if (!name.trim()) nextErrors.name = 'Bitte geben Sie Ihren Namen ein.';
    if (!company.trim()) nextErrors.company = 'Bitte geben Sie Ihr Unternehmen ein.';
    if (!email.trim()) nextErrors.email = 'Bitte geben Sie Ihre geschäftliche E-Mail-Adresse ein.';
    else if (!emailPattern.test(email.trim())) nextErrors.email = 'Bitte prüfen Sie das Format der E-Mail-Adresse.';
    if (process.trim().length < 20) nextErrors.process = 'Bitte beschreiben Sie den Prozess mit mindestens 20 Zeichen.';
    if (!privacyAcknowledged) nextErrors.privacy = 'Bitte bestätigen Sie, dass Sie die Datenschutzerklärung zur Kenntnis genommen haben.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus(null);
      window.requestAnimationFrame(() => {
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setErrors({});
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          process: process.trim(),
          privacy: privacyAcknowledged,
          website,
          startedAt: startedAt.current
        })
      });

      const result = await response.json() as {
        message?: string;
        errors?: FormErrors;
      };

      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.message || 'Die Nachricht konnte nicht versendet werden.');
      }

      setStatus({
        kind: 'success',
        text: result.message || 'Vielen Dank. Ihre Anfrage wurde direkt an unser Team gesendet.'
      });
      setName('');
      setCompany('');
      setEmail('');
      setProcess('');
      setWebsite('');
      setPrivacyAcknowledged(false);
      startedAt.current = Date.now();
    } catch (error) {
      setStatus({
        kind: 'error',
        text: error instanceof Error
          ? error.message
          : 'Die Nachricht konnte nicht versendet werden. Bitte schreiben Sie an kontakt@msb-ai.de.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
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
            maxLength={160}
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
          maxLength={254}
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
          minLength={20}
          maxLength={3000}
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

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
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

      <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Nachricht wird gesendet …' : 'Prozess kostenlos prüfen lassen'}
        {!isSubmitting ? <span className="button-arrow" aria-hidden="true">→</span> : null}
      </button>
      {status ? (
        <p
          className={`form-status${status.kind === 'error' ? ' form-status-error' : ''}`}
          role={status.kind === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {status.text}
        </p>
      ) : null}
      <p className="form-note">Ihre Angaben werden verschlüsselt übertragen und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Antworten gehen an die angegebene E-Mail-Adresse.</p>
    </form>
  );
}
