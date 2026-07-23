import {
  CONSEQUENCE_OPTIONS,
  EFFORT_OPTIONS,
  FREQUENCY_OPTIONS,
  HUMAN_DECISION_OPTIONS,
  INPUT_OPTIONS,
  PROBLEM_OPTIONS,
  STANDARDIZATION_OPTIONS,
  VOLUME_OPTIONS,
  optionLabel
} from './automation-check-config.ts';
import { answerSummary } from './automation-check-scoring.ts';
import type { AutomationAssessment, CheckAnswers, WorkflowNode } from './automation-check-types.ts';

function selectedLabels(options: Array<{ id: string; label: string }>, values: string[]) {
  return values.map((value) => optionLabel(options, value) ?? value).join(', ') || 'Keine Angabe';
}

function workflowSummary(nodes: WorkflowNode[]) {
  return nodes.map((node, index) => `${index + 1}. ${node.label}`).join('\n');
}

export function buildAutomationCheckMessage(
  answers: CheckAnswers,
  assessment: AutomationAssessment,
  additionalMessage: string,
  includeAssessment: boolean
) {
  const cleanMessage = additionalMessage.trim();
  const introduction = [
    'Guten Tag MSB-Team,',
    '',
    includeAssessment
      ? 'ich möchte die beigefügte Automation-Check-Einschätzung mit Ihnen besprechen.'
      : 'ich möchte einen möglichen Automatisierungsprozess mit Ihnen besprechen.',
    cleanMessage ? '' : null,
    cleanMessage ? 'Meine Nachricht:' : null,
    cleanMessage || null
  ].filter((line): line is string => line !== null);

  if (!includeAssessment) {
    return [...introduction, '', 'Bitte melden Sie sich bei mir.'].join('\n');
  }

  const summary = answerSummary(answers);
  const problemOptions = answers.area ? PROBLEM_OPTIONS[answers.area] : [];
  const reasons = assessment.reasons.length
    ? assessment.reasons.map((reason) => `- ${reason.text}`).join('\n')
    : '- Keine zusätzlichen Bewertungssignale';

  return [
    ...introduction,
    '',
    '--- ANGEHÄNGTE AUTOMATION-CHECK-AUSWERTUNG ---',
    '',
    'Ergebnis: ' + assessment.title,
    'Einordnung: ' + assessment.summary,
    'Empfehlung: ' + assessment.recommendation,
    '',
    'ANGABEN ZUM PROZESS',
    'Bereich: ' + summary.area,
    'Tätigkeiten: ' + selectedLabels(problemOptions, answers.problems),
    'Eingänge/Systeme: ' + selectedLabels(INPUT_OPTIONS, answers.inputs),
    'Genanntes System: ' + (answers.systemName.trim() || 'Keine Angabe'),
    'Häufigkeit: ' + (optionLabel(FREQUENCY_OPTIONS, answers.frequency) ?? 'Keine Angabe'),
    'Vorgänge: ' + (optionLabel(VOLUME_OPTIONS, answers.volume) ?? 'Keine Angabe'),
    'Aufwand je Vorgang: ' + (optionLabel(EFFORT_OPTIONS, answers.effort) ?? 'Keine Angabe'),
    'Standardisierung: ' + (optionLabel(STANDARDIZATION_OPTIONS, answers.standardization) ?? 'Keine Angabe'),
    'Menschliche Entscheidungen: ' + (optionLabel(HUMAN_DECISION_OPTIONS, answers.humanDecision) ?? 'Keine Angabe'),
    'Fehlerfolgen: ' + (optionLabel(CONSEQUENCE_OPTIONS, answers.consequence) ?? 'Keine Angabe'),
    'Hinweis aus dem Check: ' + (answers.note.trim() || 'Keine Angabe'),
    '',
    'WICHTIGSTE BEWERTUNGSSIGNALE',
    reasons,
    '',
    'HEUTIGER ABLAUF',
    workflowSummary(assessment.currentWorkflow),
    '',
    'MÖGLICHE RICHTUNG',
    workflowSummary(assessment.possibleWorkflow),
    '',
    '--- ENDE DER AUSWERTUNG ---',
    '',
    'Bitte melden Sie sich bei mir, um den Prozess kurz einzuordnen.'
  ].join('\n');
}
