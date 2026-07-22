export type ServiceIconName = 'people' | 'database' | 'chart' | 'file' | 'mail' | 'book';

export type ServiceCategory = {
  slug: string;
  number: string;
  icon: ServiceIconName;
  name: string;
  cardTeaser: string;
  cardTags: string[];
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  pains: Array<{ title: string; text: string }>;
  useCases: Array<{ title: string; text: string; href?: string }>;
  workflow: Array<{ label: string; human?: boolean }>;
  framework: {
    today: string;
    automated: string;
    human: string;
  };
  integrationIntro: string;
  integrations: string[];
  ctaLabel: string;
};

export type UseCaseDetail = {
  slug: string;
  categorySlug: string;
  categoryName: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  problemTitle: string;
  problem: string[];
  workflow: Array<{ label: string; human?: boolean }>;
  automatable: Array<{ title: string; text: string }>;
  human: Array<{ title: string; text: string }>;
  integrationIntro: string;
  integrations: string[];
  outcomeTitle: string;
  outcome: string;
  related: Array<{ label: string; href: string }>;
  ctaLabel: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'hr-recruiting',
    number: '01',
    icon: 'people',
    name: 'HR & Recruiting',
    cardTeaser: 'Wiederkehrende Aufgaben rund um Bewerbungen und Kandidaten strukturiert automatisieren.',
    cardTags: ['Bewerbervorauswahl', 'Matching', 'Bewerbungsmanagement'],
    metaTitle: 'HR- & Recruiting-Prozesse automatisieren',
    metaDescription: 'Bewerbungen erfassen, Unterlagen strukturieren und Recruiting-Abläufe vorbereiten – mit nachvollziehbaren Regeln und verantwortlicher HR-Prüfung.',
    heroTitle: 'Weniger Administration im Recruiting. Mehr Zeit für die richtigen Gespräche.',
    heroLead: 'MSB strukturiert wiederkehrende Schritte zwischen Bewerbungseingang, Unterlagen, Kalender und HR-System. Bewertung, Auswahl und Personalentscheidungen bleiben beim HR-Team.',
    pains: [
      { title: 'Verteilte Eingänge', text: 'Bewerbungen kommen über Postfächer, Portale und Empfehlungen an und müssen zusammengeführt werden.' },
      { title: 'Doppelte Datenpflege', text: 'Kontakt-, Lebenslauf- und Statusdaten werden mehrfach in Tabellen und Recruiting-Systeme übertragen.' },
      { title: 'Einzelne Unterlagenprüfungen', text: 'Vollständigkeit und klar definierte Pflichtangaben werden für jede Bewerbung erneut kontrolliert.' },
      { title: 'Viele Koordinationsschritte', text: 'Termine, Rückfragen und Statusnachrichten erzeugen wiederkehrende administrative Arbeit.' }
    ],
    useCases: [
      { title: 'Bewerbervorauswahl', text: 'Unterlagen strukturieren, objektive Kriterien prüfen und die verantwortliche Sichtung vorbereiten.', href: '/anwendungsfaelle/bewerbervorauswahl' },
      { title: 'Bewerber-Matching', text: 'Anforderungsprofile und strukturierte Kandidateninformationen nachvollziehbar gegenüberstellen.', href: '/anwendungsfaelle/bewerber-matching' },
      { title: 'Bewerbungsmanagement', text: 'Status, Aufgaben und Übergaben zwischen Eingang, Fachbereich und HR koordinieren.' },
      { title: 'Lebenslaufdaten erfassen', text: 'Freigegebene Angaben aus Dokumenten in ein einheitliches Datenmodell übertragen.' },
      { title: 'Interviewkoordination', text: 'Verfügbarkeiten, Erinnerungen und vorbereitete Terminabläufe zusammenführen.' },
      { title: 'Kommunikation vorbereiten', text: 'Kontextbezogene Entwürfe erstellen, die vor dem Versand geprüft werden.' }
    ],
    workflow: [
      { label: 'Bewerbung empfangen' },
      { label: 'Unterlagen erkennen' },
      { label: 'Daten strukturieren' },
      { label: 'Kriterien prüfen' },
      { label: 'HR prüft', human: true },
      { label: 'ATS aktualisieren' }
    ],
    framework: {
      today: 'Bewerbungen werden einzeln geöffnet, Angaben übertragen und Status über mehrere Werkzeuge hinweg gepflegt.',
      automated: 'Der Workflow strukturiert Unterlagen, prüft definierte Pflichtangaben und bereitet Status, Aufgaben oder Matching-Hinweise vor.',
      human: 'HR bewertet Kontext und Eignung, führt Gespräche, behandelt Ausnahmen und trifft jede verantwortliche Personalentscheidung.'
    },
    integrationIntro: 'Je nach vorhandenem Ablauf können freigegebene Postfächer, Kalender und Recruiting-Systeme über vorhandene Schnittstellen verbunden werden. Die konkrete Anbindung wird im Pilot geprüft.',
    integrations: ['E-Mail', 'ATS', 'HR-Software', 'Kalender', 'Excel', 'APIs'],
    ctaLabel: 'Recruiting-Prozess prüfen lassen'
  },
  {
    slug: 'verwaltung-crm',
    number: '02',
    icon: 'database',
    name: 'Verwaltung & CRM',
    cardTeaser: 'Anfragen, Kundendaten und Verwaltungsaufgaben verlässlich zwischen bestehenden Systemen weitergeben.',
    cardTags: ['E-Mail → CRM', 'Stammdaten', 'Follow-ups'],
    metaTitle: 'Verwaltungs- & CRM-Prozesse automatisieren',
    metaDescription: 'Anfragen erfassen, CRM-Daten vorbereiten und wiederkehrende Verwaltungsaufgaben zwischen bestehenden Systemen koordinieren.',
    heroTitle: 'Anfragen einmal erfassen. Informationen kontrolliert weitergeben.',
    heroLead: 'MSB verbindet definierte Eingänge mit CRM, Aufgaben und Verwaltungsabläufen. Der Normalfall läuft nach klaren Regeln; unvollständige oder sensible Fälle werden gezielt vorgelegt.',
    pains: [
      { title: 'Medienbrüche', text: 'Informationen wechseln per Copy-and-paste zwischen E-Mail, Formular, Tabelle und CRM.' },
      { title: 'Unklare Zuständigkeit', text: 'Neue Anfragen müssen gelesen, zugeordnet und an die richtige Person weitergeleitet werden.' },
      { title: 'Unvollständige Datensätze', text: 'Pflichtangaben fehlen oder werden in unterschiedlichen Formaten gepflegt.' },
      { title: 'Vergessene Wiedervorlagen', text: 'Aufgaben und Follow-ups hängen von manuellen Erinnerungen einzelner Personen ab.' }
    ],
    useCases: [
      { title: 'E-Mail zu CRM', text: 'Anliegen und Kontaktdaten erfassen, abgleichen und als Vorgang vorbereiten.', href: '/anwendungsfaelle/email-zu-crm' },
      { title: 'Kundenanfragen erfassen', text: 'Eingänge aus definierten Kanälen in eine nachvollziehbare Bearbeitung überführen.' },
      { title: 'CRM-Datensätze anlegen', text: 'Pflichtangaben prüfen und neue Datensätze oder Aufgaben kontrolliert vorbereiten.' },
      { title: 'Stammdaten synchronisieren', text: 'Freigegebene Änderungen zwischen ausgewählten Systemen abgleichen.' },
      { title: 'Dubletten prüfen', text: 'Mögliche Mehrfacheinträge markieren, bevor Daten zusammengeführt werden.' },
      { title: 'Follow-ups auslösen', text: 'Fristen und Status verwenden, um Aufgaben oder Erinnerungen anzulegen.' }
    ],
    workflow: [
      { label: 'Anfrage empfangen' },
      { label: 'Anliegen erkennen' },
      { label: 'CRM abgleichen' },
      { label: 'Pflichtangaben prüfen' },
      { label: 'Ausnahme klären', human: true },
      { label: 'Vorgang anlegen' }
    ],
    framework: {
      today: 'Anfragen werden gelesen, Kundendaten gesucht und dieselben Informationen manuell in CRM, Aufgabenlisten oder Fachsysteme übertragen.',
      automated: 'Der Workflow erkennt definierte Anliegen, gleicht Datensätze ab und bereitet Vorgänge, Aufgaben und Wiedervorlagen vor.',
      human: 'Verantwortliche klären unsichere Zuordnungen, bestätigen sensible Änderungen und übernehmen Sonderfälle.'
    },
    integrationIntro: 'Vorhandene CRM- und Verwaltungssysteme bleiben Ausgangspunkt. Ob Datensätze direkt geschrieben oder zunächst zur Freigabe vorbereitet werden, richtet sich nach Schnittstelle und Risiko.',
    integrations: ['E-Mail', 'CRM', 'ERP', 'Formulare', 'Microsoft 365', 'APIs'],
    ctaLabel: 'Verwaltungsprozess prüfen lassen'
  },
  {
    slug: 'reporting-daten',
    number: '03',
    icon: 'chart',
    name: 'Reporting & Daten',
    cardTeaser: 'Daten automatisch zusammenführen, prüfen und für wiederkehrende Entscheidungen aufbereiten.',
    cardTags: ['Reporting', 'KPI-Automation', 'Datenabgleich'],
    metaTitle: 'Reporting- & Datenprozesse automatisieren',
    metaDescription: 'Datenquellen verbinden, wiederkehrende Reports vorbereiten und Auffälligkeiten nachvollziehbar zur fachlichen Prüfung markieren.',
    heroTitle: 'Weniger Zeit für Exporte. Mehr Zeit für die Einordnung.',
    heroLead: 'MSB automatisiert wiederkehrende Schritte vom Datenabruf bis zum prüfbaren Berichtsentwurf. Quellen, Regeln und Freigaben bleiben dokumentiert.',
    pains: [
      { title: 'Wiederholte Exporte', text: 'Dieselben Dateien werden regelmäßig aus ERP, CRM oder Fachsystemen heruntergeladen.' },
      { title: 'Manuelle Zusammenführung', text: 'Spalten, Formate und Zeiträume werden in Tabellen immer wieder angepasst.' },
      { title: 'Verdeckte Datenfehler', text: 'Fehlende Werte und Abweichungen fallen oft erst spät in der Berichtserstellung auf.' },
      { title: 'Kaum Zeit für Analyse', text: 'Fachliche Kapazität fließt in Vorbereitung und Formatierung statt in die Bewertung.' }
    ],
    useCases: [
      { title: 'Reporting automatisieren', text: 'Daten abrufen, validieren und als wiederkehrenden Berichtsentwurf bereitstellen.', href: '/anwendungsfaelle/reporting-automatisieren' },
      { title: 'Excel-Reporting vorbereiten', text: 'Definierte Dateien einlesen, vereinheitlichen und kontrolliert aktualisieren.' },
      { title: 'Datenquellen verbinden', text: 'Freigegebene Daten aus ERP, CRM, Datenbank oder API zusammenführen.' },
      { title: 'Kennzahlen berechnen', text: 'Dokumentierte Formeln und Regeln konsistent auf aktuelle Daten anwenden.' },
      { title: 'Plausibilität prüfen', text: 'Fehlende Werte, ungewöhnliche Veränderungen und Regelverletzungen markieren.' },
      { title: 'Monatsberichte verteilen', text: 'Nach der fachlichen Freigabe definierte Berichte sicher bereitstellen.' }
    ],
    workflow: [
      { label: 'Quellen abrufen' },
      { label: 'Formate vereinheitlichen' },
      { label: 'Daten validieren' },
      { label: 'Kennzahlen berechnen' },
      { label: 'Fachlich prüfen', human: true },
      { label: 'Bericht bereitstellen' }
    ],
    framework: {
      today: 'Exporte, Formeln, Prüfungen und Formatierungen werden für jeden Berichtszeitraum erneut manuell ausgeführt.',
      automated: 'Der Workflow liest definierte Quellen ein, validiert Daten, berechnet Kennzahlen und erstellt einen konsistenten Berichtsentwurf.',
      human: 'Fachverantwortliche beurteilen Auffälligkeiten, ergänzen Kontext und geben das Ergebnis frei.'
    },
    integrationIntro: 'Die Lösung orientiert sich an den tatsächlich verfügbaren Exporten und Schnittstellen. Kritische Berechnungen werden dokumentiert und mit Referenzfällen geprüft.',
    integrations: ['Excel', 'ERP', 'CRM', 'Datenbanken', 'BI-Werkzeuge', 'APIs'],
    ctaLabel: 'Reporting-Prozess prüfen lassen'
  },
  {
    slug: 'dokumente',
    number: '04',
    icon: 'file',
    name: 'Dokumente',
    cardTeaser: 'Dokumente erkennen, relevante Angaben strukturieren und in den passenden Prozess überführen.',
    cardTags: ['Datenextraktion', 'Prüfung', 'Freigaben'],
    metaTitle: 'Dokumentenprozesse automatisieren',
    metaDescription: 'Dokumente klassifizieren, Angaben extrahieren und Prüf- oder Freigabeprozesse mit klaren Ausnahmen automatisieren.',
    heroTitle: 'Dokumente nicht nur ablegen. Informationen nutzbar machen.',
    heroLead: 'MSB überführt wiederkehrende Dokumenteneingänge in nachvollziehbare Daten- und Freigabeabläufe. Unleserliche, unvollständige oder kritische Fälle bleiben sichtbar.',
    pains: [
      { title: 'Manuelles Öffnen', text: 'PDFs, Scans und Anhänge werden einzeln geöffnet, gelesen und eingeordnet.' },
      { title: 'Übertragungsfehler', text: 'Relevante Angaben werden per Hand in Tabellen oder Fachsysteme übernommen.' },
      { title: 'Unklare Vollständigkeit', text: 'Fehlende Seiten, Pflichtfelder oder Belege werden nicht einheitlich erkannt.' },
      { title: 'Stockende Freigaben', text: 'Dokumente warten in Postfächern oder Ordnern auf die richtige zuständige Person.' }
    ],
    useCases: [
      { title: 'Dokumentenverarbeitung', text: 'Dokumenttypen erkennen, Daten extrahieren und den passenden Folgeprozess starten.', href: '/anwendungsfaelle/dokumentenverarbeitung' },
      { title: 'Rechnungen vorbereiten', text: 'Kopf- und Positionsdaten erfassen und definierte Prüfregeln anwenden.' },
      { title: 'Verträge strukturieren', text: 'Freigegebene Kerndaten und Fristen für die verantwortliche Prüfung aufbereiten.' },
      { title: 'Formulare prüfen', text: 'Pflichtfelder, Anhänge und formale Bedingungen nachvollziehbar kontrollieren.' },
      { title: 'Bestellungen zuordnen', text: 'Dokumente anhand vorhandener Referenzen mit Vorgängen abgleichen.' },
      { title: 'Freigaben koordinieren', text: 'Dokumenttyp, Betrag oder Ausnahme verwenden, um Zuständigkeiten auszulösen.' }
    ],
    workflow: [
      { label: 'Dokument empfangen' },
      { label: 'Typ erkennen' },
      { label: 'Angaben extrahieren' },
      { label: 'Regeln prüfen' },
      { label: 'Ausnahme freigeben', human: true },
      { label: 'System aktualisieren' }
    ],
    framework: {
      today: 'Dokumente werden geöffnet, Informationen abgetippt und manuell an Ordner, Systeme oder Freigaben weitergeleitet.',
      automated: 'Der Workflow klassifiziert definierte Dokumenttypen, extrahiert relevante Angaben und startet Prüf- oder Übergabeschritte.',
      human: 'Unklare Inhalte, sensible Bewertungen und verbindliche Freigaben bleiben bei benannten Verantwortlichen.'
    },
    integrationIntro: 'Dokumentenqualität, Formate und vorhandene Schnittstellen werden vorab mit realistischen Beispielen geprüft. Nicht jeder Scan eignet sich für denselben Automatisierungsgrad.',
    integrations: ['E-Mail', 'PDF', 'SharePoint', 'DMS', 'ERP', 'APIs'],
    ctaLabel: 'Dokumentenprozess prüfen lassen'
  },
  {
    slug: 'email-kommunikation',
    number: '05',
    icon: 'mail',
    name: 'E-Mail & Kommunikation',
    cardTeaser: 'Eingehende Nachrichten zuordnen und automatisch den passenden Arbeitsprozess anstoßen.',
    cardTags: ['E-Mail-Triage', 'Antwortentwürfe', 'Routing'],
    metaTitle: 'E-Mail- & Kommunikationsprozesse automatisieren',
    metaDescription: 'Eingehende E-Mails klassifizieren, Informationen extrahieren und nachvollziehbar an CRM, Aufgaben oder zuständige Teams übergeben.',
    heroTitle: 'Posteingänge entlasten. Relevante Fälle schneller bearbeiten.',
    heroLead: 'MSB verbindet definierte Postfächer mit strukturierten Folgeprozessen. Automatisierung übernimmt Sortierung und Vorbereitung; sensible Kommunikation bleibt kontrolliert.',
    pains: [
      { title: 'Hohe Eingangslast', text: 'Viele unterschiedliche Anliegen treffen in gemeinsamen oder persönlichen Postfächern ein.' },
      { title: 'Manuelle Zuordnung', text: 'Nachrichten werden gelesen, weitergeleitet und immer wieder mit Zuständigkeiten abgeglichen.' },
      { title: 'Verlorener Kontext', text: 'Wichtige Angaben bleiben im Nachrichtentext, statt im zugehörigen Vorgang verfügbar zu sein.' },
      { title: 'Uneinheitliche Antworten', text: 'Wiederkehrende Rückfragen werden mit unterschiedlichem Stand und Aufwand beantwortet.' }
    ],
    useCases: [
      { title: 'E-Mail zu CRM', text: 'Kontaktdaten und Anliegen erfassen und einen CRM-Vorgang vorbereiten.', href: '/anwendungsfaelle/email-zu-crm' },
      { title: 'E-Mail-Triage', text: 'Definierte Nachrichtentypen erkennen und an passende Bearbeitungswege übergeben.' },
      { title: 'Anliegen klassifizieren', text: 'Textsignale verwenden, um Kategorien oder Prioritäten als Vorschlag zu setzen.' },
      { title: 'Informationen extrahieren', text: 'Auftragsnummern, Termine oder andere definierte Angaben strukturiert erfassen.' },
      { title: 'Antworten vorbereiten', text: 'Freigegebene Informationen in einen prüfbaren Entwurf überführen.' },
      { title: 'Aufgaben anlegen', text: 'Aus Nachricht, Zuständigkeit und Frist einen nachvollziehbaren Arbeitsschritt erzeugen.' }
    ],
    workflow: [
      { label: 'E-Mail empfangen' },
      { label: 'Anliegen erkennen' },
      { label: 'Angaben extrahieren' },
      { label: 'Zuständigkeit bestimmen' },
      { label: 'Entwurf prüfen', human: true },
      { label: 'Prozess starten' }
    ],
    framework: {
      today: 'Nachrichten werden einzeln gelesen, weitergeleitet und relevante Informationen in andere Systeme kopiert.',
      automated: 'Der Workflow klassifiziert definierte Anliegen, extrahiert benötigte Angaben und bereitet Routing, Aufgaben oder Antworten vor.',
      human: 'Unklare Fälle, sensible Formulierungen und verbindliche externe Kommunikation werden geprüft.'
    },
    integrationIntro: 'Automatisiert werden nur klar abgegrenzte Postfächer und Nachrichtentypen. Absender, Anhänge, Berechtigungen und Fehlerwege werden im Pilot ausdrücklich getestet.',
    integrations: ['Microsoft 365', 'Google Workspace', 'CRM', 'Ticketsysteme', 'Kalender', 'APIs'],
    ctaLabel: 'E-Mail-Prozess prüfen lassen'
  },
  {
    slug: 'internes-wissen',
    number: '06',
    icon: 'book',
    name: 'Internes Wissen',
    cardTeaser: 'Verteiltes Unternehmenswissen schneller auffindbar und im Arbeitsalltag nutzbar machen.',
    cardTags: ['Wissensassistent', 'Dokumentensuche', 'Onboarding'],
    metaTitle: 'Interne Wissensprozesse automatisieren',
    metaDescription: 'Freigegebene Dokumente, Richtlinien und Prozesswissen auffindbar machen und nachvollziehbare Antwortentwürfe vorbereiten.',
    heroTitle: 'Wissen finden, ohne Ordner und Chats zu durchsuchen.',
    heroLead: 'MSB macht freigegebene interne Quellen gezielt zugänglich. Antworten bleiben auf nachvollziehbare Dokumente begrenzt und kritische Inhalte werden fachlich geprüft.',
    pains: [
      { title: 'Verteilte Quellen', text: 'Richtlinien, Anleitungen und Antworten liegen in verschiedenen Ordnern, Tools und Köpfen.' },
      { title: 'Wiederkehrende Fragen', text: 'Erfahrene Personen beantworten dieselben internen Fragen immer wieder.' },
      { title: 'Unklarer Stand', text: 'Mitarbeitende erkennen nicht sofort, welche Fassung eines Dokuments maßgeblich ist.' },
      { title: 'Langsames Onboarding', text: 'Neue Kolleginnen und Kollegen müssen Prozesswissen über viele Einzelkontakte zusammensuchen.' }
    ],
    useCases: [
      { title: 'Wissensassistent', text: 'Fragen anhand freigegebener Quellen beantworten und Fundstellen sichtbar machen.', href: '/anwendungsfaelle/wissensassistent' },
      { title: 'Dokumentensuche', text: 'Inhalte nach Thema, Prozess oder Zuständigkeit auffindbar machen.' },
      { title: 'Richtlinienzugriff', text: 'Aktuelle freigegebene Vorgaben für konkrete Arbeitssituationen bereitstellen.' },
      { title: 'Onboarding unterstützen', text: 'Rollenbezogene Einstiegsinformationen und häufige Fragen bündeln.' },
      { title: 'Prozesswissen sichern', text: 'Dokumentierte Abläufe und Ausnahmen strukturiert zugänglich machen.' },
      { title: 'Interne FAQ vorbereiten', text: 'Wiederkehrende Fragen mit geprüften Antworten und Quellenhinweisen verbinden.' }
    ],
    workflow: [
      { label: 'Frage stellen' },
      { label: 'Berechtigung prüfen' },
      { label: 'Quellen durchsuchen' },
      { label: 'Antwort vorbereiten' },
      { label: 'Kritisches prüfen', human: true },
      { label: 'Quelle anzeigen' }
    ],
    framework: {
      today: 'Informationen werden in Ordnern und Chats gesucht oder bei erfahrenen Kolleginnen und Kollegen erfragt.',
      automated: 'Der Workflow durchsucht freigegebene Quellen und bereitet eine Antwort mit nachvollziehbaren Fundstellen vor.',
      human: 'Fachverantwortliche bestimmen gültige Quellen, pflegen Inhalte und prüfen kritische oder weitreichende Antworten.'
    },
    integrationIntro: 'Zugriffe richten sich nach den vorhandenen Berechtigungen und der Qualität der freigegebenen Quellen. Ein Assistent ersetzt keine fehlende Dokumentation oder fachliche Verantwortung.',
    integrations: ['SharePoint', 'Google Drive', 'DMS', 'Wiki', 'Datenbanken', 'APIs'],
    ctaLabel: 'Wissensprozess prüfen lassen'
  }
];

export const useCaseDetails: UseCaseDetail[] = [
  {
    slug: 'bewerbervorauswahl',
    categorySlug: 'hr-recruiting',
    categoryName: 'HR & Recruiting',
    metaTitle: 'Bewerbervorauswahl automatisieren',
    metaDescription: 'Bewerbungsunterlagen strukturieren, Vollständigkeit und objektive Kriterien prüfen und die verantwortliche HR-Sichtung nachvollziehbar vorbereiten.',
    eyebrow: 'Anwendungsfall · Recruiting',
    title: 'Bewerbervorauswahl strukturieren statt Lebensläufe manuell durchsuchen.',
    lead: 'Automatisierung kann Unterlagen erfassen, definierte Kriterien prüfen und eine einheitliche Übersicht vorbereiten. Sie trifft keine Einstellungsentscheidung.',
    problemTitle: 'Viele Unterlagen, aber kein einheitlicher erster Überblick',
    problem: [
      'Bewerbungen kommen in unterschiedlichen Formaten und über mehrere Kanäle an. HR öffnet Dokumente einzeln, sucht relevante Angaben und überträgt sie in Tabellen oder ein ATS.',
      'Ein sinnvoller Workflow standardisiert diese Vorbereitung. Er verwendet ausschließlich vorher festgelegte Informationen und macht fehlende oder unsichere Angaben sichtbar, statt sie still zu interpretieren.'
    ],
    workflow: [
      { label: 'Bewerbung kommt an' },
      { label: 'Unterlagen erkennen' },
      { label: 'Daten extrahieren' },
      { label: 'Kriterien prüfen' },
      { label: 'Übersicht vorbereiten' },
      { label: 'HR bewertet', human: true },
      { label: 'Status aktualisieren' }
    ],
    automatable: [
      { title: 'Datenextraktion', text: 'Definierte Kontakt-, Qualifikations- und Lebenslaufangaben strukturiert erfassen.' },
      { title: 'Vollständigkeitsprüfung', text: 'Fehlende Dokumente oder Pflichtangaben nach nachvollziehbaren Regeln markieren.' },
      { title: 'Objektive Regelprüfung', text: 'Explizit festgelegte, sachliche Kriterien prüfen und das Ergebnis begründen.' },
      { title: 'Einheitliche Übersicht', text: 'Informationen in einem konsistenten Format für die verantwortliche Sichtung bereitstellen.' }
    ],
    human: [
      { title: 'Qualitative Bewertung', text: 'Erfahrung, Kontext und individuelle Eignung werden von HR eingeordnet.' },
      { title: 'Sensible Interpretation', text: 'Mehrdeutige oder besonders schützenswerte Angaben werden nicht automatisch bewertet.' },
      { title: 'Personalentscheidung', text: 'Auswahl, Gesprächseinladung und Einstellung bleiben vollständig menschlich verantwortet.' },
      { title: 'Ausnahmen', text: 'Unvollständige oder ungewöhnliche Fälle werden bewusst vorgelegt.' }
    ],
    integrationIntro: 'Der Workflow kann – nach technischer Prüfung – definierte Postfächer, Formulare oder ATS-Schnittstellen nutzen. Im Pilot werden Datenmodell, Zugriffsrechte, Referenzfälle und Fehlerwege gemeinsam festgelegt.',
    integrations: ['E-Mail', 'ATS', 'HR-System', 'Excel', 'Datenbank', 'API'],
    outcomeTitle: 'Eine nachvollziehbare Grundlage für die HR-Sichtung',
    outcome: 'Das Ergebnis ist keine automatische Rangliste, sondern eine strukturierte, prüfbare Übersicht. HR sieht relevante Angaben, fehlende Informationen und den Ursprung jeder verwendeten Regel.',
    related: [
      { label: 'HR- & Recruiting-Automatisierung', href: '/leistungen/hr-recruiting' },
      { label: 'Bewerber-Matching verstehen', href: '/anwendungsfaelle/bewerber-matching' }
    ],
    ctaLabel: 'Bewerberprozess prüfen lassen'
  },
  {
    slug: 'bewerber-matching',
    categorySlug: 'hr-recruiting',
    categoryName: 'HR & Recruiting',
    metaTitle: 'Bewerber-Matching automatisieren',
    metaDescription: 'Strukturierte Bewerberinformationen mit definierten Rollenanforderungen vergleichen und nachvollziehbare Matching-Hinweise für HR vorbereiten.',
    eyebrow: 'Anwendungsfall · Recruiting',
    title: 'Anforderungen und Bewerberprofile nachvollziehbar gegenüberstellen.',
    lead: 'Ein Matching-Workflow kann Überschneidungen und offene Informationen sichtbar machen. Die Ausgabe ist Entscheidungshilfe – kein objektives Urteil über Menschen.',
    problemTitle: 'Anforderungen und Profile werden uneinheitlich verglichen',
    problem: [
      'Rollenprofile, Lebensläufe und Gesprächsnotizen verwenden oft unterschiedliche Begriffe. Der manuelle Vergleich kostet Zeit und hängt stark davon ab, welche Information gerade sichtbar ist.',
      'Ein kontrolliertes Matching übersetzt vorab definierte Anforderungen und freigegebene Bewerberangaben in eine gemeinsame Struktur. Gewichtung, Unsicherheit und fehlende Daten müssen dabei offen erkennbar bleiben.'
    ],
    workflow: [
      { label: 'Rollenprofil festlegen' },
      { label: 'Bewerberdaten strukturieren' },
      { label: 'Anforderungen abgleichen' },
      { label: 'Lücken markieren' },
      { label: 'Hinweis vorbereiten' },
      { label: 'HR interpretiert', human: true },
      { label: 'Weiteres Vorgehen wählen' }
    ],
    automatable: [
      { title: 'Begriffe strukturieren', text: 'Freigegebene Kenntnisse und Anforderungen in ein gemeinsames Schema überführen.' },
      { title: 'Überschneidungen zeigen', text: 'Explizite Übereinstimmungen nachvollziehbar hervorheben.' },
      { title: 'Informationslücken markieren', text: 'Fehlende oder nicht eindeutig erkennbare Angaben sichtbar lassen.' },
      { title: 'Vergleich vorbereiten', text: 'Eine begründete Übersicht statt einer undurchsichtigen Gesamtpunktzahl erstellen.' }
    ],
    human: [
      { title: 'Anforderungen verantworten', text: 'HR und Fachbereich bestimmen, welche Kriterien für die Rolle sachlich relevant sind.' },
      { title: 'Kontext interpretieren', text: 'Übertragbare Erfahrung und individuelle Entwicklung lassen sich nicht auf Schlagworte reduzieren.' },
      { title: 'Bias prüfen', text: 'Kriterien, Daten und Ergebnisse müssen regelmäßig auf unerwünschte Verzerrungen kontrolliert werden.' },
      { title: 'Entscheiden', text: 'Gespräch, Auswahl und Einstellung bleiben bei den zuständigen Menschen.' }
    ],
    integrationIntro: 'Matching setzt ein abgestimmtes Rollenprofil und strukturierte, zulässige Informationen voraus. MSB prüft zunächst, ob vorhandene ATS- oder HR-Daten dafür ausreichend und technisch zugänglich sind.',
    integrations: ['ATS', 'HR-System', 'Rollenprofile', 'Excel', 'Datenbank', 'API'],
    outcomeTitle: 'Transparente Hinweise statt Blackbox-Ranking',
    outcome: 'HR erhält einen strukturierten Vergleich mit sichtbaren Kriterien und Informationslücken. Jede Ausgabe bleibt überprüfbar und kann verworfen oder korrigiert werden.',
    related: [
      { label: 'HR- & Recruiting-Automatisierung', href: '/leistungen/hr-recruiting' },
      { label: 'Bewerbervorauswahl strukturieren', href: '/anwendungsfaelle/bewerbervorauswahl' }
    ],
    ctaLabel: 'Matching-Prozess prüfen lassen'
  },
  {
    slug: 'email-zu-crm',
    categorySlug: 'verwaltung-crm',
    categoryName: 'Verwaltung & CRM',
    metaTitle: 'E-Mail automatisch ins CRM übertragen',
    metaDescription: 'Kundenanfragen aus E-Mails strukturiert erfassen, mit CRM-Daten abgleichen und als prüfbaren Vorgang oder Aufgabe vorbereiten.',
    eyebrow: 'Anwendungsfall · Verwaltung & CRM',
    title: 'Aus einer Kunden-E-Mail wird ein nachvollziehbarer CRM-Vorgang.',
    lead: 'Ein kontrollierter Workflow erkennt definierte Anliegen, erfasst benötigte Angaben und bereitet Datensatz, Aufgabe oder Wiedervorlage im bestehenden CRM vor.',
    problemTitle: 'Wichtige Kundeninformationen bleiben im Postfach',
    problem: [
      'Mitarbeitende lesen eingehende Anfragen, suchen den Kontakt im CRM und übertragen Inhalt, Zuständigkeit und nächste Schritte manuell. Unter Zeitdruck entstehen unvollständige Datensätze oder fehlende Wiedervorlagen.',
      'Der automatisierte Ablauf beginnt deshalb nicht mit einer pauschalen Postfachanalyse, sondern mit klar abgegrenzten Nachrichtentypen, Pflichtangaben und Regeln für unsichere Zuordnungen.'
    ],
    workflow: [
      { label: 'E-Mail empfangen' },
      { label: 'Anliegen klassifizieren' },
      { label: 'Kontaktdaten erfassen' },
      { label: 'CRM abgleichen' },
      { label: 'Unsicherheit prüfen', human: true },
      { label: 'Vorgang vorbereiten' },
      { label: 'Aufgabe auslösen' }
    ],
    automatable: [
      { title: 'Anliegen zuordnen', text: 'Definierte Anfragearten erkennen und passende Prozesswege vorschlagen.' },
      { title: 'Angaben extrahieren', text: 'Kontakt-, Referenz- und Termininformationen strukturiert erfassen.' },
      { title: 'Datensatz abgleichen', text: 'Vorhandene CRM-Einträge suchen und mögliche Dubletten markieren.' },
      { title: 'Folgeschritt vorbereiten', text: 'Vorgang, Aufgabe oder Wiedervorlage mit nachvollziehbarem Ursprung anlegen.' }
    ],
    human: [
      { title: 'Unklare Zuordnung', text: 'Mehrdeutige Kontakte oder Anliegen werden vor einer Änderung vorgelegt.' },
      { title: 'Sensible Änderungen', text: 'Kritische Stammdaten werden nur nach definierter Freigabe aktualisiert.' },
      { title: 'Kundenkommunikation', text: 'Verbindliche oder sensible Antworten bleiben prüfbar.' },
      { title: 'Sonderfälle', text: 'Nicht abgedeckte Nachrichtentypen bleiben im bestehenden Bearbeitungsweg.' }
    ],
    integrationIntro: 'Voraussetzung ist eine geeignete CRM-Schnittstelle oder ein sicherer alternativer Übergabepunkt. Berechtigungen werden auf die benötigten Felder und Aktionen begrenzt.',
    integrations: ['E-Mail', 'CRM', 'Ticketsystem', 'Formular', 'Microsoft 365', 'API'],
    outcomeTitle: 'Weniger Copy-and-paste, klarere Zuständigkeiten',
    outcome: 'Relevante Anfragen erscheinen strukturiert am richtigen Arbeitsort. Mitarbeitende sehen Quelle, vorgeschlagene Zuordnung und offene Prüfungen, bevor sensible Änderungen wirksam werden.',
    related: [
      { label: 'Verwaltung & CRM automatisieren', href: '/leistungen/verwaltung-crm' },
      { label: 'E-Mail & Kommunikation automatisieren', href: '/leistungen/email-kommunikation' }
    ],
    ctaLabel: 'E-Mail-zu-CRM-Prozess prüfen lassen'
  },
  {
    slug: 'reporting-automatisieren',
    categorySlug: 'reporting-daten',
    categoryName: 'Reporting & Daten',
    metaTitle: 'Reporting automatisieren für KMU',
    metaDescription: 'Wiederkehrende Datenquellen abrufen, prüfen und als konsistenten Berichtsentwurf für die fachliche Freigabe vorbereiten.',
    eyebrow: 'Anwendungsfall · Reporting',
    title: 'Wiederkehrende Reports vorbereiten, ohne jeden Monat neu anzufangen.',
    lead: 'Automatisierung übernimmt definierte Datenwege, Prüfregeln und Berechnungen. Fachverantwortliche behalten Plausibilität, Interpretation und Freigabe.',
    problemTitle: 'Der Berichtsprozess beginnt immer wieder bei denselben Exporten',
    problem: [
      'Regelmäßige Reports bestehen häufig aus festen Schritten: Dateien laden, Spalten anpassen, Daten verbinden, Formeln anwenden, Abweichungen suchen und das Ergebnis formatieren.',
      'Ein belastbarer Workflow dokumentiert diese Schritte als wiederholbaren Prozess. Er stoppt bei fehlenden Quellen oder verletzten Prüfregeln, statt still einen scheinbar vollständigen Bericht zu erzeugen.'
    ],
    workflow: [
      { label: 'Quellen abrufen' },
      { label: 'Daten vereinheitlichen' },
      { label: 'Qualität prüfen' },
      { label: 'Kennzahlen berechnen' },
      { label: 'Abweichungen markieren' },
      { label: 'Fachlich freigeben', human: true },
      { label: 'Report bereitstellen' }
    ],
    automatable: [
      { title: 'Datenabruf', text: 'Definierte Exporte, Dateien, Datenbankabfragen oder APIs regelmäßig einlesen.' },
      { title: 'Validierung', text: 'Format, Vollständigkeit und abgestimmte Plausibilitätsregeln prüfen.' },
      { title: 'Berechnung', text: 'Dokumentierte Kennzahlen und Transformationen konsistent ausführen.' },
      { title: 'Berichtsentwurf', text: 'Ergebnis in einem wiederholbaren Format mit sichtbaren Ausnahmen bereitstellen.' }
    ],
    human: [
      { title: 'Quellen verantworten', text: 'Fachbereiche bestätigen Herkunft, Bedeutung und zulässige Nutzung der Daten.' },
      { title: 'Abweichungen erklären', text: 'Auffällige Veränderungen benötigen Kontext und fachliche Einordnung.' },
      { title: 'Ergebnis freigeben', text: 'Verbindliche Reports werden vor Verteilung geprüft.' },
      { title: 'Regeln ändern', text: 'Neue Kennzahlen oder Geschäftslogik werden bewusst versioniert.' }
    ],
    integrationIntro: 'MSB startet mit einem realen Bericht, seinen Quellen und bekannten Kontrollsummen. Erst wenn Referenzperioden reproduzierbar stimmen, wird der Ablauf erweitert.',
    integrations: ['Excel', 'ERP', 'CRM', 'Datenbank', 'BI-Werkzeug', 'API'],
    outcomeTitle: 'Ein reproduzierbarer Bericht mit sichtbaren Prüfungen',
    outcome: 'Das Team erhält einen konsistent vorbereiteten Report und eine klare Liste möglicher Datenprobleme. Die gewonnene Zeit fließt in Analyse und Entscheidung, nicht in wiederkehrende Formatierung.',
    related: [
      { label: 'Reporting & Daten automatisieren', href: '/leistungen/reporting-daten' },
      { label: 'Weitere Anwendungsfälle', href: '/anwendungsfaelle' }
    ],
    ctaLabel: 'Reporting-Prozess prüfen lassen'
  },
  {
    slug: 'dokumentenverarbeitung',
    categorySlug: 'dokumente',
    categoryName: 'Dokumente',
    metaTitle: 'Dokumentenverarbeitung automatisieren',
    metaDescription: 'Dokumenttypen erkennen, relevante Angaben extrahieren und mit definierten Prüfungen an bestehende Systeme oder Freigaben übergeben.',
    eyebrow: 'Anwendungsfall · Dokumente',
    title: 'Aus eingehenden Dokumenten wird ein kontrollierter Datenprozess.',
    lead: 'Automatisierung kann Dokumente klassifizieren, definierte Angaben erfassen und Folgeprozesse vorbereiten. Unsichere Inhalte und verbindliche Freigaben bleiben sichtbar.',
    problemTitle: 'Lesen, übertragen, prüfen und weiterleiten wiederholt sich',
    problem: [
      'Rechnungen, Formulare, Bestellungen oder andere Dokumente treffen als PDF, Scan oder Anhang ein. Mitarbeitende suchen die benötigten Angaben und übertragen sie in das zuständige System.',
      'Die technische Eignung hängt stark von Dokumenttyp und Qualität ab. Deshalb wird der Workflow mit repräsentativen Normalfällen, schlechten Scans und echten Ausnahmen getestet.'
    ],
    workflow: [
      { label: 'Dokument empfangen' },
      { label: 'Dokumenttyp erkennen' },
      { label: 'Angaben extrahieren' },
      { label: 'Pflichtfelder prüfen' },
      { label: 'Referenz abgleichen' },
      { label: 'Ausnahme freigeben', human: true },
      { label: 'System übergeben' }
    ],
    automatable: [
      { title: 'Klassifikation', text: 'Abgestimmte Dokumenttypen erkennen und dem passenden Ablauf zuordnen.' },
      { title: 'Extraktion', text: 'Benötigte Kopf-, Positions- oder Referenzdaten strukturiert erfassen.' },
      { title: 'Formale Prüfung', text: 'Pflichtfelder, Formate und definierte Abgleiche ausführen.' },
      { title: 'Routing', text: 'Dokumente und Daten anhand nachvollziehbarer Regeln an Freigabe oder System übergeben.' }
    ],
    human: [
      { title: 'Unleserliche Inhalte', text: 'Niedrige Erkennungssicherheit führt zur manuellen Kontrolle.' },
      { title: 'Fachliche Bewertung', text: 'Bedeutung, Angemessenheit und rechtliche Wirkung werden nicht automatisch beurteilt.' },
      { title: 'Freigabe', text: 'Verbindliche Buchungen oder Entscheidungen folgen den abgestimmten Verantwortlichkeiten.' },
      { title: 'Neue Dokumenttypen', text: 'Unbekannte Varianten werden nicht ungeprüft in bestehende Regeln gedrückt.' }
    ],
    integrationIntro: 'Mögliche Übergaben reichen von einer prüfbaren Tabelle bis zur direkten API-Anbindung. Der Automatisierungsgrad richtet sich nach Dokumentqualität, Volumen, Risiko und Systemzugang.',
    integrations: ['E-Mail', 'PDF/Scan', 'DMS', 'SharePoint', 'ERP', 'API'],
    outcomeTitle: 'Strukturierte Daten mit einem klaren Ausnahmeweg',
    outcome: 'Normalfälle werden schneller vorbereitet, während unsichere Dokumente gezielt bei der zuständigen Person landen. Jede Übergabe behält einen nachvollziehbaren Bezug zur Quelle.',
    related: [
      { label: 'Dokumentenprozesse automatisieren', href: '/leistungen/dokumente' },
      { label: 'Weitere Anwendungsfälle', href: '/anwendungsfaelle' }
    ],
    ctaLabel: 'Dokumentenprozess prüfen lassen'
  },
  {
    slug: 'wissensassistent',
    categorySlug: 'internes-wissen',
    categoryName: 'Internes Wissen',
    metaTitle: 'Internen Wissensassistenten entwickeln',
    metaDescription: 'Freigegebene Unternehmensdokumente gezielt durchsuchen und nachvollziehbare Antworten mit Quellen für Mitarbeitende vorbereiten.',
    eyebrow: 'Anwendungsfall · Internes Wissen',
    title: 'Interne Fragen anhand freigegebener Quellen beantworten.',
    lead: 'Ein Wissensassistent macht dokumentiertes Wissen schneller zugänglich. Er zeigt seine Quellen, respektiert Berechtigungen und ersetzt keine fachliche Freigabe.',
    problemTitle: 'Die richtige Antwort existiert – ist aber schwer auffindbar',
    problem: [
      'Prozessbeschreibungen, Richtlinien und Arbeitswissen verteilen sich über Laufwerke, SharePoint, Wikis und persönliche Rückfragen. Suche liefert viele Treffer, aber selten eine direkt nutzbare Einordnung.',
      'Ein sinnvoller Assistent beginnt mit einem klar begrenzten Quellenraum. Er darf nur Inhalte verwenden, die für die anfragende Person freigegeben und fachlich aktuell sind.'
    ],
    workflow: [
      { label: 'Frage stellen' },
      { label: 'Zugriff prüfen' },
      { label: 'Quellen durchsuchen' },
      { label: 'Fundstellen bewerten' },
      { label: 'Antwort vorbereiten' },
      { label: 'Kritisches prüfen', human: true },
      { label: 'Quellen anzeigen' }
    ],
    automatable: [
      { title: 'Semantische Suche', text: 'Passende Abschnitte auch bei unterschiedlichen Formulierungen auffinden.' },
      { title: 'Antwortentwurf', text: 'Gefundene Informationen kompakt und entlang der sichtbaren Quellen zusammenführen.' },
      { title: 'Quellenhinweise', text: 'Dokument, Abschnitt und gegebenenfalls Aktualitätsstand ausgeben.' },
      { title: 'Feedback-Routing', text: 'Unbeantwortete Fragen und Hinweise auf veraltete Inhalte an Verantwortliche leiten.' }
    ],
    human: [
      { title: 'Quellenauswahl', text: 'Fachverantwortliche bestimmen, welche Inhalte gültig und freigegeben sind.' },
      { title: 'Berechtigungen', text: 'Zugriffe müssen dem bestehenden Rollen- und Rechtesystem folgen.' },
      { title: 'Kritische Antwort', text: 'Rechtliche, personelle oder weitreichende Aussagen benötigen fachliche Prüfung.' },
      { title: 'Wissenspflege', text: 'Veraltete Dokumente müssen an der Quelle korrigiert oder entfernt werden.' }
    ],
    integrationIntro: 'Der Pilot startet mit einem begrenzten, gut gepflegten Quellenbestand und typischen Fragen. Trefferqualität, Quellenbezug, Berechtigungen und Nichtwissen werden ausdrücklich getestet.',
    integrations: ['SharePoint', 'Google Drive', 'DMS', 'Wiki', 'Datenbank', 'API'],
    outcomeTitle: 'Schnellere Orientierung mit sichtbarer Herkunft',
    outcome: 'Mitarbeitende erhalten einen nachvollziehbaren Einstieg in dokumentiertes Wissen. Wenn Quellen fehlen oder widersprüchlich sind, weist das System darauf hin, statt eine sichere Antwort vorzutäuschen.',
    related: [
      { label: 'Interne Wissensprozesse automatisieren', href: '/leistungen/internes-wissen' },
      { label: 'Weitere Anwendungsfälle', href: '/anwendungsfaelle' }
    ],
    ctaLabel: 'Wissensprozess prüfen lassen'
  }
];

export function getServiceCategory(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getUseCaseDetail(slug: string) {
  return useCaseDetails.find((useCase) => useCase.slug === slug);
}
