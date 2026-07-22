import assert from 'node:assert/strict';
import test from 'node:test';
import { PROCESS_AREAS, PROBLEM_OPTIONS } from './automation-check-config.ts';
import { assessAutomationPotential } from './automation-check-scoring.ts';
import type { CheckAnswers } from './automation-check-types.ts';

function answers(overrides: Partial<CheckAnswers> = {}): CheckAnswers {
  return {
    area: 'administration',
    problems: ['transfer_data', 'maintain_crm'],
    inputs: ['email', 'crm'],
    systemName: '',
    frequency: 'daily',
    volume: '50_200',
    effort: '30_60',
    standardization: 'structured',
    humanDecision: 'low',
    consequence: 'extra_work',
    note: '',
    ...overrides
  };
}

test('classifies a frequent structured digital process as good potential', () => {
  const result = assessAutomationPotential(answers());
  assert.equal(result.category, 'good');
  assert.ok(result.reasons.some((reason) => reason.text.includes('häufig')));
});

test('classifies a valuable process with human decisions as partial automation', () => {
  const result = assessAutomationPotential(answers({
    humanDecision: 'central',
    consequence: 'people',
    standardization: 'partial'
  }));
  assert.equal(result.category, 'partial');
  assert.ok(result.possibleWorkflow.some((node) => node.kind === 'human'));
});

test('keeps ambiguous mid-range processes in review', () => {
  const result = assessAutomationPotential(answers({
    frequency: 'monthly',
    volume: 'unknown',
    effort: '5_15',
    inputs: ['email'],
    problems: ['capture_requests'],
    standardization: 'structured',
    humanDecision: 'low',
    consequence: 'unknown'
  }));
  assert.equal(result.category, 'review');
});

test('classifies rare individual low-effort processes as limited', () => {
  const result = assessAutomationPotential(answers({
    frequency: 'rare',
    volume: 'under_10',
    effort: 'few_minutes',
    inputs: ['paper'],
    problems: ['other_problem'],
    standardization: 'individual',
    humanDecision: 'central',
    consequence: 'easy'
  }));
  assert.equal(result.category, 'limited');
});

test('never removes human review when consequences are high', () => {
  const result = assessAutomationPotential(answers({
    humanDecision: 'low',
    consequence: 'financial_legal'
  }));
  assert.ok(result.possibleWorkflow.some((node) => node.kind === 'human'));
});

test('does not produce percentages or autonomous HR decision language', () => {
  const result = assessAutomationPotential(answers({
    area: 'hr',
    problems: ['support_preselection'],
    humanDecision: 'exceptions'
  }));
  const copy = JSON.stringify(result);
  assert.doesNotMatch(copy, /\d+%/);
  assert.doesNotMatch(copy, /entscheidet.*Bewerber/i);
});

test('every configured process area has a working branch and result', () => {
  for (const area of PROCESS_AREAS) {
    const branch = PROBLEM_OPTIONS[area.id];
    assert.ok(branch.length >= 6, `${area.id} needs a useful problem branch`);

    const result = assessAutomationPotential(answers({
      area: area.id,
      problems: [branch[0].id]
    }));

    assert.ok(result.reasons.length >= 3);
    assert.ok(result.currentWorkflow.length >= 3);
    assert.ok(result.possibleWorkflow.length >= 4);
  }
});
