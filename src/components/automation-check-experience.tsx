'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import AutomationCheckIcon from '@/components/automation-check-icon';
import AutomationCheckProgress from '@/components/automation-check-progress';
import AutomationCheckResult from '@/components/automation-check-result';
import AutomationProcessPreview from '@/components/automation-process-preview';
import {
  CHECK_QUESTIONS,
  CONSEQUENCE_OPTIONS,
  EFFORT_OPTIONS,
  FREQUENCY_OPTIONS,
  HUMAN_DECISION_OPTIONS,
  INPUT_OPTIONS,
  PROCESS_AREAS,
  PROBLEM_OPTIONS,
  STANDARDIZATION_OPTIONS,
  VOLUME_OPTIONS
} from '@/lib/automation-check-config';
import { assessAutomationPotential } from '@/lib/automation-check-scoring';
import { trackAnalyticsEvent } from '@/lib/analytics';
import {
  createEmptyCheckAnswers,
  type CheckAnswers,
  type CheckQuestionId,
  type ChoiceOption,
  type ConsequenceId,
  type EffortId,
  type FrequencyId,
  type HumanDecisionId,
  type ProcessAreaId,
  type StandardizationId,
  type VolumeId
} from '@/lib/automation-check-types';
import styles from './automation-check.module.css';

const SESSION_KEY = 'msb_automation_check_v1';
const SESSION_VERSION = 1;
const AREA_IDS = new Set(PROCESS_AREAS.map((item) => item.id));
const PROBLEM_IDS = new Set(Object.values(PROBLEM_OPTIONS).flat().map((item) => item.id));
const INPUT_IDS = new Set(INPUT_OPTIONS.map((item) => item.id));
const FREQUENCY_IDS = new Set(FREQUENCY_OPTIONS.map((item) => item.id));
const VOLUME_IDS = new Set(VOLUME_OPTIONS.map((item) => item.id));
const EFFORT_IDS = new Set(EFFORT_OPTIONS.map((item) => item.id));
const STANDARDIZATION_IDS = new Set(STANDARDIZATION_OPTIONS.map((item) => item.id));
const HUMAN_DECISION_IDS = new Set(HUMAN_DECISION_OPTIONS.map((item) => item.id));
const CONSEQUENCE_IDS = new Set(CONSEQUENCE_OPTIONS.map((item) => item.id));

type CheckView = 'start' | 'check' | 'result';
type StoredCheck = {
  version: typeof SESSION_VERSION;
  view: Exclude<CheckView, 'start'>;
  stepIndex: number;
  answers: CheckAnswers;
};

type ChoiceListProps<T extends string> = {
  options: ChoiceOption<T>[];
  value?: T;
  values?: string[];
  onSelect: (id: T) => void;
  multiple?: boolean;
  detailed?: boolean;
  compact?: boolean;
  label: string;
};

function ChoiceList<T extends string>({
  options,
  value,
  values = [],
  onSelect,
  multiple = false,
  detailed = false,
  compact = false,
  label
}: ChoiceListProps<T>) {
  return (
    <div
      className={[
        styles.choiceGrid,
        detailed ? styles.choiceGridDetailed : '',
        compact ? styles.choiceGridCompact : ''
      ].filter(Boolean).join(' ')}
      role={multiple ? 'group' : 'radiogroup'}
      aria-label={label}
    >
      {options.map((option) => {
        const selected = multiple ? values.includes(option.id) : value === option.id;
        return (
          <button
            className={styles.choice}
            data-selected={selected ? 'true' : 'false'}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={selected}
            key={option.id}
            onClick={() => onSelect(option.id)}
          >
            <span className={styles.choiceIndicator} aria-hidden="true">{selected ? '✓' : ''}</span>
            <strong>{option.label}</strong>
            {option.description && <small>{option.description}</small>}
          </button>
        );
      })}
    </div>
  );
}

function isStoredCheck(value: unknown): value is StoredCheck {
  if (!value || typeof value !== 'object') return false;
  const stored = value as Partial<StoredCheck>;
  return (
    stored.version === SESSION_VERSION &&
    (stored.view === 'check' || stored.view === 'result') &&
    typeof stored.stepIndex === 'number' &&
    Number.isInteger(stored.stepIndex) &&
    stored.stepIndex >= 0 &&
    stored.stepIndex < CHECK_QUESTIONS.length &&
    Boolean(stored.answers) &&
    Array.isArray(stored.answers?.problems) &&
    stored.answers.problems.every((item) => typeof item === 'string' && PROBLEM_IDS.has(item)) &&
    Array.isArray(stored.answers?.inputs) &&
    stored.answers.inputs.every((item) => typeof item === 'string' && INPUT_IDS.has(item)) &&
    (!stored.answers.area || AREA_IDS.has(stored.answers.area)) &&
    (!stored.answers.frequency || FREQUENCY_IDS.has(stored.answers.frequency)) &&
    (!stored.answers.volume || VOLUME_IDS.has(stored.answers.volume)) &&
    (!stored.answers.effort || EFFORT_IDS.has(stored.answers.effort)) &&
    (!stored.answers.standardization || STANDARDIZATION_IDS.has(stored.answers.standardization)) &&
    (!stored.answers.humanDecision || HUMAN_DECISION_IDS.has(stored.answers.humanDecision)) &&
    (!stored.answers.consequence || CONSEQUENCE_IDS.has(stored.answers.consequence)) &&
    typeof stored.answers?.systemName === 'string' &&
    stored.answers.systemName.length <= 80 &&
    typeof stored.answers?.note === 'string' &&
    stored.answers.note.length <= 500
  );
}

function historyPayload(view: CheckView, stepIndex: number) {
  return { view, stepIndex };
}

export function AutomationCheckExperience() {
  const [view, setView] = useState<CheckView>('start');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<CheckAnswers>(createEmptyCheckAnswers);
  const [hydrated, setHydrated] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackedQuestions = useRef(new Set<CheckQuestionId>());
  const completionTracked = useRef(false);
  const editingAnswers = useRef(false);

  const question = CHECK_QUESTIONS[stepIndex];
  const assessment = useMemo(() => assessAutomationPotential(answers), [answers]);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isStoredCheck(parsed)) {
          setAnswers(parsed.answers);
          setStepIndex(parsed.stepIndex);
          setView(parsed.view);
          window.history.replaceState(
            { ...window.history.state, msbAutomationCheck: historyPayload(parsed.view, parsed.stepIndex) },
            ''
          );
        } else {
          window.sessionStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || view === 'start') return;
    const stored: StoredCheck = { version: SESSION_VERSION, view, stepIndex, answers };
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(stored));
    } catch {
      // The check still works for the current page when session storage is unavailable.
    }
  }, [answers, hydrated, stepIndex, view]);

  useEffect(() => {
    function handlePopState(event: PopStateEvent) {
      const state = event.state?.msbAutomationCheck as ReturnType<typeof historyPayload> | undefined;
      if (!state || state.view === 'start') {
        editingAnswers.current = false;
        setView('start');
        return;
      }
      if (state.view === 'result') editingAnswers.current = false;
      setStepIndex(Math.min(Math.max(state.stepIndex, 0), CHECK_QUESTIONS.length - 1));
      setView(state.view);
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (view !== 'check' || !question || trackedQuestions.current.has(question.id)) return;
    trackedQuestions.current.add(question.id);
    trackAnalyticsEvent('automation_check_step', {
      phase: question.phase,
      question_id: question.id
    });
  }, [question, view]);

  useEffect(() => {
    if (view !== 'check') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }, [stepIndex, view]);

  function pushHistory(nextView: CheckView, nextStep: number) {
    window.history.pushState(
      { ...window.history.state, msbAutomationCheck: historyPayload(nextView, nextStep) },
      ''
    );
  }

  function replaceHistory(nextView: CheckView, nextStep: number) {
    window.history.replaceState(
      { ...window.history.state, msbAutomationCheck: historyPayload(nextView, nextStep) },
      ''
    );
  }

  function startCheck() {
    const fresh = createEmptyCheckAnswers();
    setAnswers(fresh);
    setStepIndex(0);
    setView('check');
    completionTracked.current = false;
    editingAnswers.current = false;
    trackedQuestions.current.clear();
    window.sessionStorage.removeItem(SESSION_KEY);
    pushHistory('check', 0);
    trackAnalyticsEvent('automation_check_start', {
      cta_location: 'automation_check_start',
      page_type: 'automation_check'
    });
  }

  function updateAnswer<K extends keyof CheckAnswers>(key: K, value: CheckAnswers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function toggleAnswer(key: 'problems' | 'inputs', id: string) {
    setAnswers((current) => {
      const selected = current[key];
      return {
        ...current,
        [key]: selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]
      };
    });
  }

  function selectArea(area: ProcessAreaId) {
    setAnswers((current) => ({
      ...current,
      area,
      problems: current.area === area ? current.problems : []
    }));
  }

  function canContinue() {
    switch (question.id) {
      case 'area': return Boolean(answers.area);
      case 'problems': return answers.problems.length > 0;
      case 'inputs': return answers.inputs.length > 0;
      case 'frequency': return Boolean(answers.frequency);
      case 'effort': return Boolean(answers.effort);
      case 'standardization': return Boolean(answers.standardization);
      case 'humanDecision': return Boolean(answers.humanDecision);
      case 'consequence': return Boolean(answers.consequence);
      case 'note': return true;
    }
  }

  function next() {
    if (!canContinue()) return;
    if (stepIndex < CHECK_QUESTIONS.length - 1) {
      const nextStep = stepIndex + 1;
      setStepIndex(nextStep);
      pushHistory('check', nextStep);
      return;
    }

    setView('result');
    editingAnswers.current = false;
    pushHistory('result', stepIndex);
    if (!completionTracked.current) {
      completionTracked.current = true;
      trackAnalyticsEvent('automation_check_complete', {
        result_category: assessment.category,
        page_type: 'automation_check'
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function back() {
    if (stepIndex === 0) {
      setView('start');
      editingAnswers.current = false;
      replaceHistory('start', 0);
      return;
    }

    if (!editingAnswers.current) {
      window.history.back();
      return;
    }

    const previous = stepIndex - 1;
    setStepIndex(previous);
    replaceHistory('check', previous);
  }

  function editAnswers() {
    const finalStep = CHECK_QUESTIONS.length - 1;
    editingAnswers.current = true;
    setStepIndex(finalStep);
    setView('check');
    pushHistory('check', finalStep);
  }

  function restart() {
    setView('start');
    setStepIndex(0);
    setAnswers(createEmptyCheckAnswers());
    completionTracked.current = false;
    editingAnswers.current = false;
    trackedQuestions.current.clear();
    window.sessionStorage.removeItem(SESSION_KEY);
    pushHistory('start', 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderQuestion() {
    switch (question.id) {
      case 'area':
        return (
          <div className={styles.areaChoices} role="radiogroup" aria-label="Prozessbereich auswählen">
            {PROCESS_AREAS.map((area) => {
              const selected = answers.area === area.id;
              return (
                <button
                  className={styles.areaChoice}
                  data-selected={selected ? 'true' : 'false'}
                  role="radio"
                  aria-checked={selected}
                  type="button"
                  key={area.id}
                  onClick={() => selectArea(area.id)}
                >
                  <span className={styles.areaIcon}><AutomationCheckIcon name={area.icon} /></span>
                  <strong>{area.label}</strong>
                  <small>{area.description}</small>
                  <span className={styles.areaCheck} aria-hidden="true">{selected ? '✓' : ''}</span>
                </button>
              );
            })}
          </div>
        );
      case 'problems':
        return (
          <ChoiceList
            options={PROBLEM_OPTIONS[answers.area ?? 'other']}
            values={answers.problems}
            onSelect={(id) => toggleAnswer('problems', id)}
            multiple
            label="Zeitaufwendige Tätigkeiten auswählen"
          />
        );
      case 'inputs':
        return (
          <>
            <ChoiceList
              options={INPUT_OPTIONS}
              values={answers.inputs}
              onSelect={(id) => toggleAnswer('inputs', id)}
              multiple
              compact
              label="Informationsquellen und Systeme auswählen"
            />
            <div className={styles.optionalField}>
              <label htmlFor="system-name">Welches System? <span>optional</span></label>
              <input
                id="system-name"
                type="text"
                maxLength={80}
                placeholder="z. B. Personio, SAP oder ein internes Tool"
                value={answers.systemName}
                onChange={(event) => updateAnswer('systemName', event.target.value)}
              />
            </div>
          </>
        );
      case 'frequency':
        return (
          <>
            <ChoiceList<FrequencyId>
              options={FREQUENCY_OPTIONS}
              value={answers.frequency}
              onSelect={(id) => updateAnswer('frequency', id)}
              compact
              label="Häufigkeit auswählen"
            />
            <fieldset className={styles.volumeFieldset}>
              <legend>Wie viele Vorgänge ungefähr? <span>optional</span></legend>
              <ChoiceList<VolumeId>
                options={VOLUME_OPTIONS}
                value={answers.volume}
                onSelect={(id) => updateAnswer('volume', id)}
                compact
                label="Ungefähre Anzahl der Vorgänge auswählen"
              />
            </fieldset>
          </>
        );
      case 'effort':
        return <ChoiceList<EffortId> options={EFFORT_OPTIONS} value={answers.effort} onSelect={(id) => updateAnswer('effort', id)} compact label="Manuellen Aufwand auswählen" />;
      case 'standardization':
        return <ChoiceList<StandardizationId> options={STANDARDIZATION_OPTIONS} value={answers.standardization} onSelect={(id) => updateAnswer('standardization', id)} detailed label="Standardisierung auswählen" />;
      case 'humanDecision':
        return (
          <>
            <ChoiceList<HumanDecisionId> options={HUMAN_DECISION_OPTIONS} value={answers.humanDecision} onSelect={(id) => updateAnswer('humanDecision', id)} detailed label="Menschliche Entscheidungen auswählen" />
            {(answers.humanDecision === 'exceptions' || answers.humanDecision === 'central') && (
              <div className={styles.humanInsight} role="note">
                <span aria-hidden="true">↳</span>
                <p><strong>Das schließt Automatisierung nicht aus.</strong> Routine kann automatisiert werden, während unklare oder verantwortungskritische Fälle gezielt bei Menschen bleiben.</p>
              </div>
            )}
          </>
        );
      case 'consequence':
        return <ChoiceList<ConsequenceId> options={CONSEQUENCE_OPTIONS} value={answers.consequence} onSelect={(id) => updateAnswer('consequence', id)} compact label="Mögliche Fehlerfolgen auswählen" />;
      case 'note':
        return (
          <div className={styles.noteField}>
            <label htmlFor="process-note">Optionaler Hinweis</label>
            <textarea
              id="process-note"
              rows={6}
              maxLength={500}
              placeholder="Zum Beispiel: Ein Teil der Fälle kommt noch auf Papier an."
              value={answers.note}
              aria-describedby="process-note-limit"
              onChange={(event) => updateAnswer('note', event.target.value)}
            />
            <small id="process-note-limit">{answers.note.length} / 500 Zeichen · Wird nicht an Google Analytics gesendet.</small>
          </div>
        );
    }
  }

  if (view === 'result') {
    return <AutomationCheckResult answers={answers} assessment={assessment} onEdit={editAnswers} onRestart={restart} />;
  }

  if (view === 'start') {
    return (
      <main id="main-content" className={styles.startPage}>
        <section className={styles.startHero} aria-labelledby="automation-check-heading">
          <div className={`container ${styles.startGrid}`}>
            <div>
              <p className="eyebrow">Automation Check</p>
              <h1 id="automation-check-heading">Wie viel Automatisierungspotenzial steckt in Ihrem Prozess?</h1>
              <p className={styles.startLead}>Beantworten Sie einige kurze Fragen zu einem wiederkehrenden Ablauf und erhalten Sie direkt eine erste, nachvollziehbare Einschätzung.</p>
              <div className={styles.startActions}>
                <button className="button button-primary" type="button" onClick={startCheck}>Automation Check starten <span className="button-arrow" aria-hidden="true">→</span></button>
                <p>Für die erste Einschätzung sind keine Kontaktdaten erforderlich.</p>
              </div>
            </div>
            <aside className={styles.startProductCard} aria-label="Informationen zum Automation Check">
              <div className={styles.startCardTop}><span>MSB / PROCESS DIAGNOSTIC</span><span>V1</span></div>
              <ol>
                <li><span>01</span><strong>Prozess beschreiben</strong></li>
                <li><span>02</span><strong>Potenzial einordnen</strong></li>
                <li><span>03</span><strong>Ergebnis erhalten</strong></li>
              </ol>
              <p>Automatisierung mit Menschenverstand.</p>
            </aside>
          </div>
        </section>
        <section className={styles.startTrust} aria-label="Rahmen des Automation Checks">
          <div className="container">
            <ul>
              <li><strong>ca. 90 Sekunden</strong><span>Kurz und fokussiert</span></li>
              <li><strong>Keine technischen Vorkenntnisse</strong><span>Fragen aus dem Arbeitsalltag</span></li>
              <li><strong>Erste Einschätzung direkt</strong><span>Keine vollständige Prozessanalyse</span></li>
            </ul>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" className={styles.checkPage} data-hydrated={hydrated ? 'true' : 'false'}>
      <div className="container">
        <AutomationCheckProgress currentPhase={question.phase} stepIndex={stepIndex} />
        <div className={styles.checkGrid}>
          <section className={styles.questionPanel} aria-labelledby="check-question-heading">
            <div className={styles.questionContent} key={question.id}>
              <p className="eyebrow">{question.eyebrow}</p>
              <h1 id="check-question-heading" ref={headingRef} tabIndex={-1}>{question.title}</h1>
              <p className={styles.questionHelp}>{question.help}</p>
              <div className={styles.answerArea}>{renderQuestion()}</div>
            </div>
            <nav className={styles.checkNavigation} aria-label="Navigation im Automation Check">
              <button className={styles.backButton} type="button" onClick={back}>← Zurück</button>
              <button className="button button-primary" type="button" disabled={!canContinue()} onClick={next}>
                {question.id === 'note' ? 'Einschätzung anzeigen' : 'Weiter'} <span className="button-arrow" aria-hidden="true">→</span>
              </button>
            </nav>
          </section>
          <AutomationProcessPreview answers={answers} />
        </div>
      </div>
    </main>
  );
}

export default AutomationCheckExperience;
