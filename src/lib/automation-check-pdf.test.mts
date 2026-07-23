import assert from 'node:assert/strict';
import test from 'node:test';
import { createAutomationCheckPdf } from './automation-check-pdf.ts';
import { assessAutomationPotential } from './automation-check-scoring.ts';
import type { CheckAnswers } from './automation-check-types.ts';

const answers: CheckAnswers = {
  area: 'administration',
  problems: ['capture_requests', 'transfer_data', 'assign_tasks'],
  inputs: ['email', 'crm', 'pdf'],
  systemName: 'CRM und Fachsystem',
  frequency: 'daily',
  volume: '50_200',
  effort: '15_30',
  standardization: 'partial',
  humanDecision: 'exceptions',
  consequence: 'extra_work',
  note: 'Freigaben bleiben bei den zuständigen Mitarbeitenden.'
};

test('creates a valid three-page Automation Check PDF', () => {
  const assessment = assessAutomationPotential(answers);
  const pdf = createAutomationCheckPdf(answers, assessment, {
    createdAt: new Date('2026-07-23T10:00:00.000Z')
  });
  const content = Buffer.from(pdf).toString('latin1');

  assert.equal(content.slice(0, 8), '%PDF-1.4');
  assert.match(content, /\/Type \/Pages/);
  assert.match(content, /\/Count 3/);
  assert.match(content, /MSB Automation Check - Auswertung/);
  assert.ok(pdf.byteLength > 20_000, 'the document should contain the complete designed report');

  const startXref = content.match(/startxref\n(\d+)\n%%EOF/);
  assert.ok(startXref, 'the PDF should contain a cross-reference pointer');
  const xrefOffset = Number(startXref[1]);
  assert.equal(content.slice(xrefOffset, xrefOffset + 4), 'xref');
});
