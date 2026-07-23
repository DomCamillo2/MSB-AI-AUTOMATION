export const navigation = [
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Anwendungsfälle', href: '/anwendungsfaelle' },
  { label: 'Vorgehen', href: '/vorgehen' },
  { label: 'Über uns', href: '/ueber-uns' }
] as const;

export const problems = [
  {
    title: 'Daten werden mehrfach übertragen',
    text: 'Informationen aus E-Mails, Formularen und Excel-Listen werden manuell in andere Systeme eingetragen.'
  },
  {
    title: 'Reports entstehen immer wieder per Hand',
    text: 'Dieselben Daten werden regelmäßig exportiert, geprüft, formatiert und verteilt.'
  },
  {
    title: 'Wissen ist schwer zugänglich',
    text: 'Wichtige Abläufe und Antworten liegen verteilt in Köpfen, Ordnern und Chats.'
  }
] as const;

export const services = [
  {
    title: 'Prozessanalyse',
    text: 'Wiederkehrende Abläufe, beteiligte Systeme, Daten und Freigaben strukturiert erfassen.',
    detail: 'Das Ergebnis ist ein klares Prozessbild mit sinnvollen Ansatzpunkten, Abhängigkeiten und offenen Risiken.'
  },
  {
    title: 'Workflow-Automatisierung',
    text: 'Abgegrenzte Automatisierungen entwickeln, die zur vorhandenen IT und den Arbeitsabläufen passen.',
    detail: 'Schnittstellen, Regeln und Ausnahmen werden nachvollziehbar umgesetzt und in einem Pilot geprüft.'
  },
  {
    title: 'Einführung und Befähigung',
    text: 'Mitarbeitende einbeziehen, Abläufe dokumentieren und Lösungen kontrolliert in den Alltag übergeben.',
    detail: 'Schulung, Feedback und klare Verantwortlichkeiten schaffen die Grundlage für eine verlässliche Nutzung.'
  }
] as const;

export const useCases = [
  {
    category: 'HR und Recruiting',
    summary: 'Informationen strukturieren, CRM-Daten vorbereiten und administrative Schritte koordinieren.',
    details: [
      ['Ausgangslage', 'Bewerberinformationen liegen in E-Mail, Kalender und Recruiting-System.'],
      ['Möglicher Workflow', 'Eingänge werden im System strukturiert und zugeordnet.'],
      ['Menschliche Kontrolle', 'HR prüft Kommunikation und Entscheidungen.'],
      ['Betrieblicher Nutzen', 'Weniger doppelte Datenpflege, verlässlichere Abläufe.']
    ]
  },
  {
    category: 'Verwaltung und CRM',
    summary: 'Anfragen erfassen, Datensätze aktualisieren und Aufgaben automatisch zuordnen.',
    details: [
      ['Ausgangslage', 'Anfragen und Stammdaten werden manuell aus Postfächern oder Formularen übertragen.'],
      ['Möglicher Workflow', 'Ein definierter Eingang legt Datensätze und Aufgaben an und prüft Pflichtangaben.'],
      ['Menschliche Kontrolle', 'Verantwortliche bearbeiten Ausnahmen und bestätigen sensible Änderungen.'],
      ['Betrieblicher Nutzen', 'Medienbrüche sinken und der Bearbeitungsstand bleibt nachvollziehbar.']
    ]
  },
  {
    category: 'Reporting und Daten',
    summary: 'Daten zusammenführen, prüfen und wiederkehrende Berichtsentwürfe erstellen.',
    details: [
      ['Ausgangslage', 'Regelmäßige Berichte erfordern dieselben Exporte, Prüfungen und Formatierungen.'],
      ['Möglicher Workflow', 'Freigegebene Daten werden nach festen Regeln geprüft und als Berichtsentwurf aufbereitet.'],
      ['Menschliche Kontrolle', 'Fachverantwortliche prüfen Quellen, Plausibilität und finale Freigabe.'],
      ['Betrieblicher Nutzen', 'Berichte werden konsistenter und mehr Zeit bleibt für die Einordnung.']
    ]
  },
  {
    category: 'Internes Wissen',
    summary: 'Freigegebene Informationen schneller finden und nachvollziehbare Antwortentwürfe vorbereiten.',
    details: [
      ['Ausgangslage', 'Wissen liegt verteilt in Köpfen, Ordnern und Chats.'],
      ['Möglicher Workflow', 'Freigegebene Dokumente werden auffindbar gemacht und für Antwortentwürfe genutzt.'],
      ['Menschliche Kontrolle', 'Fachverantwortliche bestimmen Quellen und prüfen kritische Antworten.'],
      ['Betrieblicher Nutzen', 'Wissen ist schneller zugänglich und das Onboarding wird verlässlicher.']
    ]
  }
] as const;

export const engagementSteps = [
  {
    title: 'Prozess prüfen',
    text: 'Im kostenlosen Automation Check betrachten wir einen wiederkehrenden Ablauf, die beteiligten Systeme und mögliche Risiken.',
    deliverable: 'Erste Einschätzung und klarer nächster Schritt',
    details: ['Aktuellen Ablauf und beteiligte Systeme skizzieren', 'Datenlage, Zuständigkeiten und Risiken einordnen']
  },
  {
    title: 'Pilot umsetzen',
    text: 'Wir entwickeln einen abgegrenzten Workflow und testen ihn gemeinsam mit den späteren Nutzenden.',
    deliverable: 'Funktionsfähiger Pilot mit klaren Erfolgskriterien',
    details: ['Pilotumfang und Erfolgskriterien abstimmen', 'Ausnahmen und Rückmeldungen nachvollziehbar erfassen']
  },
  {
    title: 'In Systeme integrieren',
    text: 'Nach einem erfolgreichen Test binden wir den Workflow kontrolliert an die abgestimmten Systeme und Freigaben an.',
    deliverable: 'Abgestimmte Integration mit dokumentierten Datenflüssen',
    details: ['Schnittstellen, Rollen und Freigaben dokumentieren', 'Ausnahmen und Verantwortlichkeiten für den Betrieb festlegen']
  },
  {
    title: 'Schulen und übergeben',
    text: 'Wir erklären den Ablauf, schulen die beteiligten Personen und übergeben die Lösung geregelt in den Arbeitsalltag.',
    deliverable: 'Schulung, Dokumentation und geregelte Übergabe',
    details: ['Beteiligte Personen in der sicheren Nutzung schulen', 'Übergabe und weitere Verbesserungen gemeinsam festlegen']
  }
] as const;

export const principles = [
  ['Transparenz', 'Sie wissen, welche Systeme und externen Dienste eingesetzt werden.'],
  ['Datenminimierung', 'Der Workflow verarbeitet nur die erforderlichen Informationen.'],
  ['Menschliche Freigabe', 'Sensible Kommunikation und Entscheidungen bleiben kontrollierbar.'],
  ['Dokumentation', 'Abläufe, Rollen und Abhängigkeiten werden nachvollziehbar festgehalten.']
] as const;

export const faqs = [
  ['Welche Daten benötigt eine Automatisierung?', 'Das hängt vom konkreten Ablauf ab. In der Projektklärung bestimmen wir, welche Informationen für den Zweck erforderlich sind und welche entfallen können.'],
  ['Wo werden Daten verarbeitet?', 'Speicherorte, Systeme und externe Dienste werden passend zur vorhandenen IT in der Projektklärung transparent festgelegt.'],
  ['Können bestehende Systeme angebunden werden?', 'Ob und wie eine Anbindung möglich ist, prüfen wir anhand vorhandener Schnittstellen, Zugänge und technischer Vorgaben.'],
  ['Welche Schritte bleiben unter menschlicher Kontrolle?', 'Die erforderlichen Prüf- und Freigabepunkte werden nach Prozess, Daten und Verantwortung festgelegt.'],
  ['Was passiert nach dem Pilotprojekt?', 'Nach dem Test bewerten wir die vereinbarten Kriterien und legen gemeinsam fest, ob der Ablauf angepasst, integriert oder beendet wird.']
] as const;

export const team = [
  {
    initials: 'DS',
    name: 'Dominik Soballa',
    role: 'AI Adoption & Workflow Automation',
    text: 'Verbindet Wirtschaftspsychologie und Kognitionswissenschaft mit Erfahrung in CRM-Implementierung, Automatisierung und HR-Prozessen.',
    context: 'prognum Automotive · Callidus Energie · Academic Consulting',
    linkedin: 'https://www.linkedin.com/in/dominik-v-soballa-87873125b',
    image: '/team/dominik-soballa.jpeg',
    imageAlt: 'Porträt von Dominik Soballa'
  },
  {
    initials: 'LB',
    name: 'Luca Busché',
    role: 'Data & Process Automation',
    text: 'Verbindet psychologische Methoden mit Python, R, Datenanalyse und praktischer Prozessoptimierung.',
    context: 'Siemens · BMW Group',
    linkedin: 'https://www.linkedin.com/in/luca-bouche-215a1225a/',
    image: null,
    imageAlt: ''
  },
  {
    initials: 'EM',
    name: 'Erik Müller',
    role: 'Project Management & Customer Experience',
    text: 'Verbindet Projektmanagement, Datenanalyse und Customer Experience mit nutzerorientierter digitaler Gestaltung.',
    context: 'KPMG · Digital- und Designprojekte',
    linkedin: 'https://www.linkedin.com/in/erik-m%C3%BCller-11b186208/',
    image: '/team/erik-mueller.png',
    imageAlt: 'Porträt von Erik Müller'
  }
] as const;
