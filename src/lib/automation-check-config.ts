import type {
  CheckPhaseId,
  CheckQuestionId,
  ChoiceOption,
  ConsequenceId,
  EffortId,
  FrequencyId,
  HumanDecisionId,
  ProcessAreaId,
  StandardizationId,
  VolumeId
} from './automation-check-types';

export type AreaConfig = ChoiceOption<ProcessAreaId> & {
  icon: 'people' | 'mail' | 'chart' | 'database' | 'file' | 'book' | 'other';
  output: string;
  automationAction: string;
};

export const PROCESS_AREAS: AreaConfig[] = [
  { id: 'hr', label: 'HR & Recruiting', description: 'Bewerbungen, Kandidaten und wiederkehrende HR-Abläufe.', icon: 'people', output: 'HR-System / ATS', automationAction: 'Unterlagen strukturieren' },
  { id: 'email', label: 'E-Mail & Kommunikation', description: 'Posteingänge, Zuordnung und vorbereitete Antworten.', icon: 'mail', output: 'Aufgabe / Vorgang', automationAction: 'Anliegen erkennen' },
  { id: 'reporting', label: 'Reporting & Daten', description: 'Datenquellen, Kennzahlen und wiederkehrende Berichte.', icon: 'chart', output: 'Bericht', automationAction: 'Daten aufbereiten' },
  { id: 'administration', label: 'Verwaltung & CRM', description: 'Anfragen, Stammdaten und Übergaben zwischen Systemen.', icon: 'database', output: 'CRM / Fachsystem', automationAction: 'Daten abgleichen' },
  { id: 'documents', label: 'Dokumente', description: 'Prüfung, Datenerfassung, Freigabe und Ablage.', icon: 'file', output: 'DMS / Fachsystem', automationAction: 'Dokumente verarbeiten' },
  { id: 'knowledge', label: 'Internes Wissen', description: 'Suche, Richtlinien, Onboarding und interne Fragen.', icon: 'book', output: 'Antwort mit Quelle', automationAction: 'Quellen durchsuchen' },
  { id: 'other', label: 'Anderer Prozess', description: 'Ein wiederkehrender Ablauf aus einem anderen Bereich.', icon: 'other', output: 'Arbeitsergebnis', automationAction: 'Routine vorbereiten' }
];

export const PROBLEM_OPTIONS: Record<ProcessAreaId, ChoiceOption[]> = {
  hr: [
    { id: 'capture_applications', label: 'Bewerbungen erfassen' },
    { id: 'structure_candidate_data', label: 'Bewerberdaten strukturieren' },
    { id: 'check_completeness', label: 'Unterlagen auf Vollständigkeit prüfen' },
    { id: 'support_preselection', label: 'Vorauswahl anhand definierter Kriterien unterstützen' },
    { id: 'match_requirements', label: 'Kandidaten mit Anforderungen abgleichen' },
    { id: 'coordinate_interviews', label: 'Termine und Kommunikation koordinieren' },
    { id: 'other_problem', label: 'Etwas anderes' }
  ],
  reporting: [
    { id: 'combine_sources', label: 'Daten aus mehreren Quellen zusammenführen' },
    { id: 'create_excel_reports', label: 'Excel-Reports regelmäßig erstellen' },
    { id: 'calculate_kpis', label: 'Kennzahlen berechnen' },
    { id: 'validate_data', label: 'Daten prüfen' },
    { id: 'detect_anomalies', label: 'Auffälligkeiten erkennen' },
    { id: 'distribute_reports', label: 'Berichte verteilen' },
    { id: 'other_problem', label: 'Etwas anderes' }
  ],
  administration: [
    { id: 'capture_requests', label: 'Kundenanfragen erfassen' },
    { id: 'transfer_data', label: 'Daten zwischen Systemen übertragen' },
    { id: 'maintain_crm', label: 'CRM-Daten pflegen' },
    { id: 'assign_tasks', label: 'Aufgaben zuweisen' },
    { id: 'trigger_followups', label: 'Follow-ups auslösen' },
    { id: 'sync_master_data', label: 'Stammdaten synchronisieren' },
    { id: 'other_problem', label: 'Etwas anderes' }
  ],
  email: [
    { id: 'classify_messages', label: 'Nachrichten klassifizieren' },
    { id: 'identify_customer', label: 'Kunden oder Vorgänge erkennen' },
    { id: 'extract_information', label: 'Informationen auslesen' },
    { id: 'determine_owner', label: 'Zuständige Personen bestimmen' },
    { id: 'prepare_reply', label: 'Antwortentwürfe vorbereiten' },
    { id: 'start_followup', label: 'Folgeprozesse starten' },
    { id: 'other_problem', label: 'Etwas anderes' }
  ],
  documents: [
    { id: 'classify_documents', label: 'Dokumente klassifizieren' },
    { id: 'extract_document_data', label: 'Informationen extrahieren' },
    { id: 'check_documents', label: 'Dokumente prüfen' },
    { id: 'coordinate_approvals', label: 'Freigaben koordinieren' },
    { id: 'transfer_document_data', label: 'Daten übertragen' },
    { id: 'archive_route', label: 'Ablage oder Weiterleitung steuern' },
    { id: 'other_problem', label: 'Etwas anderes' }
  ],
  knowledge: [
    { id: 'find_information', label: 'Informationen schneller finden' },
    { id: 'answer_internal_questions', label: 'Wiederkehrende interne Fragen beantworten' },
    { id: 'support_onboarding', label: 'Onboarding unterstützen' },
    { id: 'search_policies', label: 'Richtlinien durchsuchen' },
    { id: 'bundle_document_knowledge', label: 'Dokumentenwissen bündeln' },
    { id: 'other_problem', label: 'Etwas anderes' }
  ],
  other: [
    { id: 'capture_information', label: 'Informationen erfassen' },
    { id: 'check_information', label: 'Angaben prüfen' },
    { id: 'transfer_information', label: 'Daten übertragen' },
    { id: 'coordinate_tasks', label: 'Aufgaben koordinieren' },
    { id: 'prepare_result', label: 'Ergebnisse aufbereiten' },
    { id: 'other_problem', label: 'Etwas anderes' }
  ]
};

export const INPUT_OPTIONS: ChoiceOption[] = [
  { id: 'email', label: 'E-Mail' },
  { id: 'excel', label: 'Excel' },
  { id: 'pdf', label: 'PDF / Dokumente' },
  { id: 'webform', label: 'Webformular' },
  { id: 'crm', label: 'CRM' },
  { id: 'erp', label: 'ERP' },
  { id: 'ats', label: 'HR-System / ATS' },
  { id: 'database', label: 'Datenbank' },
  { id: 'software', label: 'Andere Software' },
  { id: 'paper', label: 'Papier / manuell' },
  { id: 'other', label: 'Sonstiges' }
];

export const FREQUENCY_OPTIONS: ChoiceOption<FrequencyId>[] = [
  { id: 'multiple_daily', label: 'Mehrmals täglich' },
  { id: 'daily', label: 'Täglich' },
  { id: 'weekly', label: 'Mehrmals pro Woche' },
  { id: 'monthly', label: 'Einige Male pro Monat' },
  { id: 'rare', label: 'Seltener' }
];

export const VOLUME_OPTIONS: ChoiceOption<VolumeId>[] = [
  { id: 'under_10', label: 'Unter 10' },
  { id: '10_50', label: '10–50' },
  { id: '50_200', label: '50–200' },
  { id: 'over_200', label: 'Mehr als 200' },
  { id: 'unknown', label: 'Schwer einzuschätzen' }
];

export const EFFORT_OPTIONS: ChoiceOption<EffortId>[] = [
  { id: 'few_minutes', label: 'Wenige Minuten' },
  { id: '5_15', label: '5–15 Minuten' },
  { id: '15_30', label: '15–30 Minuten' },
  { id: '30_60', label: '30–60 Minuten' },
  { id: 'over_60', label: 'Mehr als eine Stunde' },
  { id: 'unknown', label: 'Schwer einzuschätzen' }
];

export const STANDARDIZATION_OPTIONS: ChoiceOption<StandardizationId>[] = [
  { id: 'structured', label: 'Sehr strukturiert', description: 'Fast immer dieselben Schritte und Regeln.' },
  { id: 'partial', label: 'Teilweise unterschiedlich', description: 'Der Grundprozess ist gleich, aber es gibt regelmäßig Ausnahmen.' },
  { id: 'individual', label: 'Sehr individuell', description: 'Fast jeder Vorgang läuft anders.' }
];

export const HUMAN_DECISION_OPTIONS: ChoiceOption<HumanDecisionId>[] = [
  { id: 'low', label: 'Kaum', description: 'Hauptsächlich Routine und Datentransfer.' },
  { id: 'exceptions', label: 'Bei Ausnahmen', description: 'Menschen übernehmen unsichere oder ungewöhnliche Fälle.' },
  { id: 'central', label: 'Entscheidungen sind zentral', description: 'Fachliche oder verantwortliche Entscheidungen prägen den Ablauf.' }
];

export const CONSEQUENCE_OPTIONS: ChoiceOption<ConsequenceId>[] = [
  { id: 'easy', label: 'Leicht korrigierbar' },
  { id: 'extra_work', label: 'Verursacht zusätzlichen Aufwand' },
  { id: 'people', label: 'Kann Kunden oder Mitarbeitende betreffen' },
  { id: 'financial_legal', label: 'Kann finanzielle oder rechtliche Folgen haben' },
  { id: 'unknown', label: 'Schwer einzuschätzen' }
];

export const CHECK_QUESTIONS: Array<{
  id: CheckQuestionId;
  phase: CheckPhaseId;
  eyebrow: string;
  title: string;
  help: string;
}> = [
  { id: 'area', phase: 'process', eyebrow: 'Ihr Prozess', title: 'Welcher Bereich kostet heute regelmäßig manuelle Zeit?', help: 'Wählen Sie den Bereich, der dem Ablauf am nächsten kommt.' },
  { id: 'problems', phase: 'process', eyebrow: 'Tätigkeiten', title: 'Was kostet heute die meiste Zeit?', help: 'Mehrfachauswahl möglich. Wählen Sie die Schritte, die im Alltag tatsächlich wiederkehren.' },
  { id: 'inputs', phase: 'process', eyebrow: 'Eingänge & Systeme', title: 'Wo kommen die Informationen heute her?', help: 'Produktnamen sind nicht nötig. Uns interessiert zunächst nur die Art der Quelle.' },
  { id: 'frequency', phase: 'process', eyebrow: 'Wiederholung', title: 'Wie häufig läuft dieser Prozess ungefähr?', help: 'Eine grobe Einordnung genügt. Exakte Mengen sind nicht erforderlich.' },
  { id: 'effort', phase: 'potential', eyebrow: 'Manueller Aufwand', title: 'Wie viel manuelle Arbeit steckt typischerweise in einem Vorgang?', help: 'Die Angabe ist nur ein Signal – daraus wird kein pauschales Einsparversprechen berechnet.' },
  { id: 'standardization', phase: 'potential', eyebrow: 'Regelmäßigkeit', title: 'Läuft der Prozess meistens nach denselben Regeln?', help: 'Denken Sie an den Normalfall, nicht an jede seltene Ausnahme.' },
  { id: 'humanDecision', phase: 'potential', eyebrow: 'Verantwortung', title: 'Wo braucht es menschliche Entscheidungen?', help: 'Menschliche Kontrolle schließt Automatisierung nicht aus.' },
  { id: 'consequence', phase: 'potential', eyebrow: 'Sicherheit', title: 'Was passiert, wenn in diesem Prozess ein Fehler entsteht?', help: 'Die Antwort beeinflusst vor allem, wie vorsichtig ein Pilot gestaltet werden sollte.' },
  { id: 'note', phase: 'assessment', eyebrow: 'Letzter Kontext', title: 'Gibt es etwas Besonderes an diesem Prozess?', help: 'Optional. Bitte keine vertraulichen Kunden-, Mitarbeiter- oder Bewerberdaten eintragen.' }
];

export const PHASES: Array<{ id: CheckPhaseId; number: string; label: string }> = [
  { id: 'process', number: '01', label: 'Ihr Prozess' },
  { id: 'potential', number: '02', label: 'Automatisierungspotenzial' },
  { id: 'assessment', number: '03', label: 'Ihre Einschätzung' }
];

export function getAreaConfig(area?: ProcessAreaId) {
  return PROCESS_AREAS.find((item) => item.id === area) ?? PROCESS_AREAS[PROCESS_AREAS.length - 1];
}

export function optionLabel(options: ChoiceOption[], id?: string) {
  return options.find((option) => option.id === id)?.label;
}
