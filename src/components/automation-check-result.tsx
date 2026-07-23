'use client';

import { useRef, useState, type FormEvent } from 'react';
import AutomationCheckProgress from '@/components/automation-check-progress';
import { AutomationProcessDiagram } from '@/components/automation-process-preview';
import {
  CONSEQUENCE_OPTIONS,
  EFFORT_OPTIONS,
  FREQUENCY_OPTIONS,
  HUMAN_DECISION_OPTIONS,
  INPUT_OPTIONS,
  PROBLEM_OPTIONS,
  STANDARDIZATION_OPTIONS,
  VOLUME_OPTIONS,
  getAreaConfig,
  optionLabel
} from '@/lib/automation-check-config';
import { answerSummary } from '@/lib/automation-check-scoring';
import { trackAnalyticsEvent } from '@/lib/analytics';
import { sendContactRequest } from '@/lib/contact-api';
import type { AutomationAssessment, CheckAnswers } from '@/lib/automation-check-types';
import styles from './automation-check.module.css';

type Props = {
  answers: CheckAnswers;
  assessment: AutomationAssessment;
  onEdit: () => void;
  onRestart: () => void;
};

const msbSteps = [
  ['01', 'Prozess verstehen'],
  ['02', 'Daten & Systeme prüfen'],
  ['03', 'Pilot definieren'],
  ['04', 'Nutzen messen'],
  ['05', 'Über Ausbau entscheiden']
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildAssessmentMessage(
  answers: CheckAnswers,
  assessment: AutomationAssessment
) {
  const summary = answerSummary(answers);
  const problemOptions = answers.area ? PROBLEM_OPTIONS[answers.area] : [];
  const body = [
    'Guten Tag MSB-Team,',
    '',
    'ich möchte meine Automation-Check-Einschätzung besprechen.',
    '',
    'Ergebnis: ' + assessment.title,
    'Bereich: ' + summary.area,
    'Tätigkeiten: ' + answers.problems.map((id) => optionLabel(problemOptions, id) ?? id).join(', '),
    'Eingänge/Systeme: ' + answers.inputs.map((id) => optionLabel(INPUT_OPTIONS, id) ?? id).join(', '),
    answers.systemName.trim() ? 'Genanntes System: ' + answers.systemName.trim() : '',
    'Häufigkeit: ' + (optionLabel(FREQUENCY_OPTIONS, answers.frequency) ?? 'Keine Angabe'),
    'Vorgänge: ' + (optionLabel(VOLUME_OPTIONS, answers.volume) ?? 'Keine Angabe'),
    'Aufwand je Vorgang: ' + (optionLabel(EFFORT_OPTIONS, answers.effort) ?? 'Keine Angabe'),
    'Standardisierung: ' + (optionLabel(STANDARDIZATION_OPTIONS, answers.standardization) ?? 'Keine Angabe'),
    'Menschliche Entscheidungen: ' + (optionLabel(HUMAN_DECISION_OPTIONS, answers.humanDecision) ?? 'Keine Angabe'),
    'Fehlerfolgen: ' + (optionLabel(CONSEQUENCE_OPTIONS, answers.consequence) ?? 'Keine Angabe'),
    answers.note.trim() ? 'Optionaler Hinweis: ' + answers.note.trim() : '',
    '',
    'Bitte melden Sie sich bei mir, um den Prozess kurz einzuordnen.'
  ].filter(Boolean).join('\n');
  return body;
}

function ContactHandoff({ answers, assessment }: Pick<Props, 'answers' | 'assessment'>) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [privacyError, setPrivacyError] = useState('');
  const [status, setStatus] = useState('');
  const [statusTone, setStatusTone] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const openedAtRef = useRef(Date.now());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const form = event.currentTarget;
    const cleanEmail = email.trim();
    const nextEmailError = !cleanEmail
      ? 'Bitte geben Sie eine geschäftliche E-Mail-Adresse ein.'
      : !emailPattern.test(cleanEmail)
        ? 'Bitte prüfen Sie das Format der E-Mail-Adresse.'
        : '';
    const nextPrivacyError = privacy ? '' : 'Bitte bestätigen Sie, dass Sie die Datenschutzhinweise gelesen haben.';

    setEmailError(nextEmailError);
    setPrivacyError(nextPrivacyError);
    setStatus('');

    if (nextEmailError || nextPrivacyError) {
      window.requestAnimationFrame(() => {
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendContactRequest({
        source: 'automation_check_result',
        name: name.trim(),
        company: company.trim(),
        email: cleanEmail,
        message: buildAssessmentMessage(answers, assessment),
        privacy: true,
        website,
        startedAt: openedAtRef.current
      });
      setStatusTone('success');
      setStatus(result.message || 'Vielen Dank. Ihre Anfrage wurde sicher übermittelt.');
      setName('');
      setCompany('');
      setEmail('');
      setWebsite('');
      setPrivacy(false);
      openedAtRef.current = Date.now();
      trackAnalyticsEvent('contact_submit', {
        cta_location: 'automation_check_result',
        page_type: 'automation_check'
      });
    } catch (error) {
      setStatusTone('error');
      setStatus(error instanceof Error
        ? error.message
        : 'Die Nachricht konnte gerade nicht versendet werden. Bitte schreiben Sie direkt an kontakt@msb-ai.de.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.contactForm} noValidate onSubmit={submit} aria-busy={isSubmitting}>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="check-website">Website</label>
        <input
          id="check-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div className={styles.contactFormIntro}>
        <div>
          <p className="eyebrow">Freiwilliger nächster Schritt</p>
          <h3>Einschätzung mit MSB besprechen</h3>
        </div>
        <p>Mit Ihrer Zustimmung werden die angezeigten Angaben verschlüsselt an unser IONOS-Postfach übermittelt.</p>
      </div>
      <div className={styles.contactFields}>
        <div className={styles.contactField}>
          <label htmlFor="check-email">Geschäftliche E-Mail <span>erforderlich</span></label>
          <input
            id="check-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? 'check-email-error' : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError('');
            }}
          />
          {emailError && <p className={styles.fieldError} id="check-email-error">{emailError}</p>}
        </div>
        <div className={styles.contactField}>
          <label htmlFor="check-name">Name <span>optional</span></label>
          <input id="check-name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className={styles.contactField}>
          <label htmlFor="check-company">Unternehmen <span>optional</span></label>
          <input id="check-company" type="text" autoComplete="organization" value={company} onChange={(event) => setCompany(event.target.value)} />
        </div>
      </div>
      <label className={styles.privacyChoice} htmlFor="check-privacy">
        <input
          id="check-privacy"
          type="checkbox"
          checked={privacy}
          aria-invalid={privacyError ? true : undefined}
          aria-describedby={privacyError ? 'check-privacy-error' : 'check-privacy-note'}
          onChange={(event) => {
            setPrivacy(event.target.checked);
            setPrivacyError('');
          }}
        />
        <span>Ich habe die <a href="/datenschutz">Datenschutzhinweise</a> gelesen.</span>
      </label>
      <p className={styles.privacyNote} id="check-privacy-note">Bitte prüfen Sie die Angaben und entfernen Sie vertrauliche Informationen, bevor Sie sie senden.</p>
      {privacyError && <p className={styles.fieldError} id="check-privacy-error">{privacyError}</p>}
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Anfrage wird gesendet …' : 'Einschätzung sicher senden'}
        {!isSubmitting ? <span className="button-arrow" aria-hidden="true">→</span> : null}
      </button>
      {status && <p className={[styles.formStatus, statusTone === 'error' ? styles.formStatusError : ''].filter(Boolean).join(' ')} role="status" aria-live="polite">{status}</p>}
    </form>
  );
}

export function AutomationCheckResult({ answers, assessment, onEdit, onRestart }: Props) {
  const [contactOpen, setContactOpen] = useState(false);
  const area = getAreaConfig(answers.area);

  function openContact() {
    setContactOpen(true);
    trackAnalyticsEvent('automation_check_contact_start', {
      result_category: assessment.category,
      page_type: 'automation_check'
    });
    window.requestAnimationFrame(() => {
      document.getElementById('automation-check-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <main id="main-content" className={styles.resultPage}>
      <div className="container">
        <AutomationCheckProgress currentPhase="assessment" stepIndex={8} result />
      </div>

      <section className={styles.resultHero} aria-labelledby="assessment-result-heading">
        <div className={['container', styles.resultHeroGrid].join(' ')}>
          <div>
            <p className="eyebrow">Ihre erste Einschätzung · {area.label}</p>
            <div className={styles.resultLabel}>Ergebnis</div>
            <h1 id="assessment-result-heading">{assessment.title}</h1>
            <p className={styles.resultSummary}>{assessment.summary}</p>
            <p className={styles.orientationNote}>Diese Einordnung ist eine erste Orientierung, keine vollständige Prozessanalyse und kein technisches Angebot.</p>
          </div>
          <aside className={styles.reasonCard} aria-labelledby="reasons-heading">
            <p className={styles.previewEyebrow}>Warum diese Einordnung?</p>
            <h2 id="reasons-heading">Die wichtigsten Signale</h2>
            <ul>
              {assessment.reasons.map((reason) => (
                <li data-tone={reason.tone} key={reason.text}>
                  <span aria-hidden="true">{reason.tone === 'positive' ? '✓' : '!'}</span>
                  {reason.text}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.comparisonSection} aria-labelledby="comparison-heading">
        <div className="container">
          <div className={styles.resultSectionIntro}>
            <div><p className="eyebrow">Prozessbild</p><h2 id="comparison-heading">Heute und eine mögliche Richtung</h2></div>
            <p>Der Ansatz ist bewusst beispielhaft. Die konkrete Lösung hängt von Systemzugängen, Datenqualität, Ausnahmen und Verantwortlichkeiten ab.</p>
          </div>
          <div className={styles.comparisonGrid}>
            <article className={styles.workflowCard}>
              <header><span>Heute</span><h3>Der beschriebene Ablauf</h3></header>
              <AutomationProcessDiagram nodes={assessment.currentWorkflow} label="Heutiger Prozess" />
            </article>
            <article className={[styles.workflowCard, styles.workflowCardPossible].join(' ')}>
              <header><span>Beispielhafter Ansatz</span><h3>Eine mögliche Richtung</h3></header>
              <AutomationProcessDiagram nodes={assessment.possibleWorkflow} label="Möglicher zukünftiger Prozess" />
            </article>
          </div>
        </div>
      </section>

      <section className={styles.recommendationSection} aria-labelledby="recommendation-heading">
        <div className={['container', styles.recommendationGrid].join(' ')}>
          <div>
            <p className="eyebrow eyebrow-light">Empfehlung</p>
            <h2 id="recommendation-heading">Was jetzt sinnvoll wäre</h2>
          </div>
          <p>{assessment.recommendation}</p>
        </div>
      </section>

      <section className={styles.msbProcessSection} aria-labelledby="msb-process-heading">
        <div className="container">
          <div className={styles.resultSectionIntro}>
            <div><p className="eyebrow">Vorgehen mit MSB</p><h2 id="msb-process-heading">Vom Prozessbild zum belastbaren Pilot</h2></div>
            <p>Wir starten nicht mit einem Tool. Zuerst wird geklärt, welcher Normalfall häufig genug, verständlich genug und sicher genug für einen Pilot ist.</p>
          </div>
          <ol className={styles.msbSteps}>
            {msbSteps.map(([number, label]) => <li key={number}><span>{number}</span><strong>{label}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className={styles.resultActions} aria-labelledby="result-actions-heading">
        <div className="container">
          <div className={styles.actionPanel}>
            <div>
              <p className="eyebrow eyebrow-light">Das Ergebnis gehört Ihnen</p>
              <h2 id="result-actions-heading">Speichern oder freiwillig mit MSB besprechen.</h2>
              <p>Für die Einschätzung waren keine Kontaktdaten nötig.</p>
            </div>
            <div className={styles.actionButtons}>
              {!contactOpen && <button className="button button-light" type="button" onClick={openContact}>Einschätzung besprechen <span className="button-arrow" aria-hidden="true">→</span></button>}
              <button className={styles.printButton} type="button" onClick={() => window.print()}>Ergebnis drucken / als PDF</button>
              <button className={styles.editButton} type="button" onClick={onEdit}>Antworten anpassen</button>
            </div>
          </div>
          {contactOpen && <div id="automation-check-contact" className={styles.contactAnchor}><ContactHandoff answers={answers} assessment={assessment} /></div>}
          <button className={styles.restartButton} type="button" onClick={onRestart}>Neuen Check beginnen</button>
        </div>
      </section>
    </main>
  );
}

export default AutomationCheckResult;
