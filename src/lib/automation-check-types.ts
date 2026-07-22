export type ProcessAreaId =
  | 'hr'
  | 'email'
  | 'reporting'
  | 'administration'
  | 'documents'
  | 'knowledge'
  | 'other';

export type CheckPhaseId = 'process' | 'potential' | 'assessment';
export type CheckQuestionId =
  | 'area'
  | 'problems'
  | 'inputs'
  | 'frequency'
  | 'effort'
  | 'standardization'
  | 'humanDecision'
  | 'consequence'
  | 'note';

export type FrequencyId = 'multiple_daily' | 'daily' | 'weekly' | 'monthly' | 'rare';
export type VolumeId = 'under_10' | '10_50' | '50_200' | 'over_200' | 'unknown';
export type EffortId = 'few_minutes' | '5_15' | '15_30' | '30_60' | 'over_60' | 'unknown';
export type StandardizationId = 'structured' | 'partial' | 'individual';
export type HumanDecisionId = 'low' | 'exceptions' | 'central';
export type ConsequenceId = 'easy' | 'extra_work' | 'people' | 'financial_legal' | 'unknown';
export type AssessmentCategory = 'good' | 'partial' | 'review' | 'limited';

export type CheckAnswers = {
  area?: ProcessAreaId;
  problems: string[];
  inputs: string[];
  systemName: string;
  frequency?: FrequencyId;
  volume?: VolumeId;
  effort?: EffortId;
  standardization?: StandardizationId;
  humanDecision?: HumanDecisionId;
  consequence?: ConsequenceId;
  note: string;
};

export type ChoiceOption<T extends string = string> = {
  id: T;
  label: string;
  description?: string;
};

export type WorkflowNodeKind = 'input' | 'manual' | 'automation' | 'system' | 'human' | 'output';

export type WorkflowNode = {
  id: string;
  label: string;
  kind: WorkflowNodeKind;
};

export type AssessmentReason = {
  tone: 'positive' | 'caution';
  text: string;
};

export type ScoreFactor = {
  id: string;
  points: number;
  explanation: string;
};

export type AutomationAssessment = {
  category: AssessmentCategory;
  title: string;
  summary: string;
  recommendation: string;
  reasons: AssessmentReason[];
  factors: ScoreFactor[];
  currentWorkflow: WorkflowNode[];
  possibleWorkflow: WorkflowNode[];
};

export function createEmptyCheckAnswers(): CheckAnswers {
  return {
    problems: [],
    inputs: [],
    systemName: '',
    note: ''
  };
}
