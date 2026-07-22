import {
  EFFORT_OPTIONS,
  FREQUENCY_OPTIONS,
  INPUT_OPTIONS,
  PROBLEM_OPTIONS,
  getAreaConfig,
  optionLabel
} from './automation-check-config.ts';
import type {
  AssessmentCategory,
  AssessmentReason,
  AutomationAssessment,
  CheckAnswers,
  ScoreFactor,
  WorkflowNode
} from './automation-check-types';

const frequencyPoints = {
  multiple_daily: 4,
  daily: 3,
  weekly: 2,
  monthly: 1,
  rare: 0
} as const;

const volumePoints = {
  under_10: 0,
  '10_50': 1,
  '50_200': 2,
  over_200: 3,
  unknown: 0
} as const;

const effortPoints = {
  few_minutes: 0,
  '5_15': 1,
  '15_30': 2,
  '30_60': 3,
  over_60: 4,
  unknown: 1
} as const;

const standardizationPoints = {
  structured: 4,
  partial: 2,
  individual: -2
} as const;

const humanDecisionPoints = {
  low: 2,
  exceptions: 0,
  central: -2
} as const;

const consequencePoints = {
  easy: 1,
  extra_work: 0,
  people: -1,
  financial_legal: -2,
  unknown: 0
} as const;

const categoryCopy: Record<AssessmentCategory, Pick<AutomationAssessment, 'title' | 'summary' | 'recommendation'>> = {
  good: {
    title: 'Gutes Automatisierungspotenzial',
    summary: 'Der beschriebene Ablauf wiederholt sich regelmäßig, enthält strukturierbare Schritte und nutzt bereits digitale Informationen oder Systeme.',
    recommendation: 'Ein klar abgegrenzter Pilot könnte sinnvoll sein. Entscheidend ist, einen häufigen Normalfall mit messbarem Ergebnis auszuwählen.'
  },
  partial: {
    title: 'Teilautomatisierung wahrscheinlich sinnvoll',
    summary: 'Der Prozess enthält wiederkehrende Arbeit. Gleichzeitig spielen Ausnahmen, hohe Fehlerfolgen oder menschliche Entscheidungen eine wichtige Rolle.',
    recommendation: 'Wahrscheinlich lohnt es sich, einzelne Routinen zu automatisieren und verantwortliche Prüfungen bewusst im Ablauf zu belassen.'
  },
  review: {
    title: 'Genauer prüfen',
    summary: 'Es gibt erkennbare Ansatzpunkte. Das Potenzial hängt jedoch davon ab, wie Eingänge, Sonderfälle und Systemübergaben im konkreten Ablauf aussehen.',
    recommendation: 'Der Prozess sollte zunächst enger abgegrenzt werden. Ein reales Beispiel hilft zu entscheiden, welcher Teil einen belastbaren Pilot ergibt.'
  },
  limited: {
    title: 'Nur begrenzt geeignet',
    summary: 'Der Ablauf scheint selten, stark individuell oder insgesamt wenig aufwendig zu sein. Eine vollständige Automatisierung wäre wahrscheinlich nicht der sinnvollste erste Schritt.',
    recommendation: 'Einzelne administrative oder vorbereitende Tätigkeiten können trotzdem prüfenswert sein – besonders dann, wenn sie Fehler oder unnötige Übergaben verursachen.'
  }
};

function calculateFactors(answers: CheckAnswers): ScoreFactor[] {
  const digitalInputs = answers.inputs.filter((input) => input !== 'paper' && input !== 'other').length;
  const factors: ScoreFactor[] = [];

  if (answers.frequency) {
    factors.push({
      id: 'frequency',
      points: frequencyPoints[answers.frequency],
      explanation: 'Häufig wiederkehrende Abläufe rechtfertigen eher den Aufbau eines stabilen Workflows.'
    });
  }

  if (answers.volume) {
    factors.push({
      id: 'volume',
      points: volumePoints[answers.volume],
      explanation: 'Mehr Vorgänge verstärken den Nutzen eines wiederholbaren Ablaufs, ohne allein über Eignung zu entscheiden.'
    });
  }

  if (answers.effort) {
    factors.push({
      id: 'effort',
      points: effortPoints[answers.effort],
      explanation: 'Wiederkehrender manueller Aufwand ist ein relevantes Potenzialsignal; daraus wird keine exakte Einsparung abgeleitet.'
    });
  }

  if (answers.standardization) {
    factors.push({
      id: 'standardization',
      points: standardizationPoints[answers.standardization],
      explanation: 'Gleichbleibende Regeln erleichtern verlässliche Automatisierung; individuelle Abläufe sprechen eher für Teilautomatisierung.'
    });
  }

  if (answers.humanDecision) {
    factors.push({
      id: 'human_decision',
      points: humanDecisionPoints[answers.humanDecision],
      explanation: 'Verantwortliche Entscheidungen reduzieren die Eignung für Vollautomatisierung, nicht zwingend für unterstützende Workflows.'
    });
  }

  if (answers.consequence) {
    factors.push({
      id: 'consequence',
      points: consequencePoints[answers.consequence],
      explanation: 'Hohe Fehlerfolgen erfordern Schutzmechanismen, Tests und menschliche Freigaben.'
    });
  }

  factors.push({
    id: 'digital_inputs',
    points: digitalInputs >= 2 ? 2 : digitalInputs === 1 ? 1 : 0,
    explanation: 'Digitale Eingänge und mehrere Systemübergaben lassen sich meist besser kontrolliert verbinden.'
  });

  if (answers.problems.length >= 2) {
    factors.push({
      id: 'repeated_steps',
      points: 1,
      explanation: 'Mehrere wiederkehrende Tätigkeiten deuten auf einen zusammenhängenden Workflow statt auf einen isolierten Klick.'
    });
  }

  return factors;
}

function selectCategory(answers: CheckAnswers, score: number): AssessmentCategory {
  const isRareAndIndividual = answers.frequency === 'rare' && answers.standardization === 'individual';
  const lowEffort = answers.effort === 'few_minutes';
  const needsHybrid =
    answers.humanDecision === 'central' ||
    answers.humanDecision === 'exceptions' ||
    answers.standardization === 'partial' ||
    answers.consequence === 'people' ||
    answers.consequence === 'financial_legal';

  if (isRareAndIndividual || (score <= 3 && (lowEffort || answers.standardization === 'individual'))) return 'limited';

  if (
    score >= 11 &&
    answers.standardization !== 'individual' &&
    answers.humanDecision !== 'central' &&
    answers.consequence !== 'financial_legal'
  ) {
    return 'good';
  }

  if (score >= 6 && needsHybrid) return 'partial';
  if (score <= 3) return 'limited';
  return 'review';
}

function buildReasons(answers: CheckAnswers): AssessmentReason[] {
  const reasons: AssessmentReason[] = [];
  const digitalInputs = answers.inputs.filter((input) => input !== 'paper' && input !== 'other').length;

  if (answers.frequency === 'multiple_daily' || answers.frequency === 'daily') {
    reasons.push({ tone: 'positive', text: 'Der Ablauf wiederholt sich sehr häufig.' });
  } else if (answers.frequency === 'weekly') {
    reasons.push({ tone: 'positive', text: 'Der Ablauf kehrt regelmäßig im Arbeitsalltag wieder.' });
  } else if (answers.frequency === 'rare') {
    reasons.push({ tone: 'caution', text: 'Der Ablauf tritt nur selten auf.' });
  }

  if (answers.effort === '30_60' || answers.effort === 'over_60') {
    reasons.push({ tone: 'positive', text: 'Ein einzelner Vorgang bindet spürbar manuelle Zeit.' });
  } else if (answers.effort === 'few_minutes') {
    reasons.push({ tone: 'caution', text: 'Der manuelle Aufwand pro Vorgang ist eher gering.' });
  }

  if (digitalInputs >= 2) {
    reasons.push({ tone: 'positive', text: 'Mehrere digitale Quellen oder Systeme sind beteiligt.' });
  } else if (answers.inputs.includes('paper')) {
    reasons.push({ tone: 'caution', text: 'Papier oder manuelle Eingänge erschweren eine direkte Systemübergabe.' });
  }

  if (answers.standardization === 'structured') {
    reasons.push({ tone: 'positive', text: 'Der Normalfall folgt weitgehend denselben Regeln.' });
  } else if (answers.standardization === 'partial') {
    reasons.push({ tone: 'caution', text: 'Regelmäßige Ausnahmen brauchen einen klaren Übergabeweg.' });
  } else if (answers.standardization === 'individual') {
    reasons.push({ tone: 'caution', text: 'Viele Vorgänge unterscheiden sich deutlich voneinander.' });
  }

  if (answers.humanDecision === 'exceptions') {
    reasons.push({ tone: 'caution', text: 'Unsichere Fälle sollten gezielt bei Menschen bleiben.' });
  } else if (answers.humanDecision === 'central') {
    reasons.push({ tone: 'caution', text: 'Fachliche Entscheidungen sind ein zentraler Teil des Prozesses.' });
  }

  if (answers.consequence === 'financial_legal' || answers.consequence === 'people') {
    reasons.push({ tone: 'caution', text: 'Die möglichen Fehlerfolgen erfordern zusätzliche Kontrollen.' });
  }

  if (reasons.length < 3 && answers.problems.length >= 2) {
    reasons.push({ tone: 'positive', text: 'Mehrere wiederkehrende Arbeitsschritte lassen sich gemeinsam betrachten.' });
  }

  return reasons.slice(0, 5);
}

function sourceLabel(answers: CheckAnswers) {
  if (!answers.inputs.length) return 'Eingang';
  const first = optionLabel(INPUT_OPTIONS, answers.inputs[0]) ?? 'Eingang';
  return answers.inputs.length > 1 ? `${first} + ${answers.inputs.length - 1}` : first;
}

function activityLabel(answers: CheckAnswers) {
  if (!answers.area || !answers.problems.length) return 'Manuelle Bearbeitung';
  return optionLabel(PROBLEM_OPTIONS[answers.area], answers.problems[0]) ?? 'Manuelle Bearbeitung';
}

function currentInputNodes(answers: CheckAnswers): WorkflowNode[] {
  if (!answers.inputs.length) return [{ id: 'current-input', label: 'Eingang', kind: 'input' }];

  const visibleInputs = answers.inputs.slice(0, 2).map((input, index) => ({
    id: `current-input-${input}-${index}`,
    label: optionLabel(INPUT_OPTIONS, input) ?? 'Eingang',
    kind: 'input' as const
  }));

  if (answers.inputs.length > 2) {
    visibleInputs.push({
      id: 'current-input-more',
      label: `${answers.inputs.length - 2} weitere ${answers.inputs.length - 2 === 1 ? 'Quelle' : 'Quellen'}`,
      kind: 'input'
    });
  }

  return visibleInputs;
}

export function buildCurrentWorkflow(answers: CheckAnswers): WorkflowNode[] {
  const area = getAreaConfig(answers.area);
  const nodes: WorkflowNode[] = [
    ...currentInputNodes(answers),
    { id: 'current-manual', label: activityLabel(answers), kind: 'manual' }
  ];

  if (answers.humanDecision === 'exceptions' || answers.humanDecision === 'central') {
    nodes.push({ id: 'current-decision', label: 'Mensch entscheidet', kind: 'human' });
  }

  if (answers.systemName.trim()) {
    nodes.push({ id: 'current-system', label: answers.systemName.trim(), kind: 'system' });
  }

  nodes.push({ id: 'current-output', label: area.output, kind: 'output' });
  return nodes;
}

export function buildPossibleWorkflow(answers: CheckAnswers): WorkflowNode[] {
  const area = getAreaConfig(answers.area);
  const unstructuredInput = answers.inputs.some((input) => input === 'email' || input === 'pdf' || input === 'paper');
  const nodes: WorkflowNode[] = [
    { id: 'possible-input', label: sourceLabel(answers), kind: 'input' },
    { id: 'possible-capture', label: area.automationAction, kind: 'automation' },
    {
      id: 'possible-rules',
      label: unstructuredInput ? 'Inhalte strukturieren' : 'Regeln anwenden',
      kind: 'automation'
    }
  ];

  if (
    answers.humanDecision !== 'low' ||
    answers.consequence === 'people' ||
    answers.consequence === 'financial_legal' ||
    answers.standardization !== 'structured'
  ) {
    nodes.push({ id: 'possible-human', label: 'Mensch prüft Unsicherheit', kind: 'human' });
  }

  nodes.push({
    id: 'possible-output',
    label: answers.systemName.trim() || area.output,
    kind: 'system'
  });
  return nodes;
}

export function assessAutomationPotential(answers: CheckAnswers): AutomationAssessment {
  const factors = calculateFactors(answers);
  const score = factors.reduce((sum, factor) => sum + factor.points, 0);
  const category = selectCategory(answers, score);

  return {
    category,
    ...categoryCopy[category],
    reasons: buildReasons(answers),
    factors,
    currentWorkflow: buildCurrentWorkflow(answers),
    possibleWorkflow: buildPossibleWorkflow(answers)
  };
}

export function answerSummary(answers: CheckAnswers) {
  const area = getAreaConfig(answers.area);
  return {
    area: area.label,
    problems: answers.area
      ? answers.problems.map((id) => optionLabel(PROBLEM_OPTIONS[answers.area as keyof typeof PROBLEM_OPTIONS], id) ?? id)
      : [],
    inputs: answers.inputs.map((id) => optionLabel(INPUT_OPTIONS, id) ?? id),
    frequency: optionLabel(FREQUENCY_OPTIONS, answers.frequency),
    effort: optionLabel(EFFORT_OPTIONS, answers.effort)
  };
}
