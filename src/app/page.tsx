import AnimatedHero from '@/components/animated-hero';
import ContactPanel from '@/components/contact-panel';
import ExperienceSnapshots from '@/components/experience-snapshots';
import ExperienceStrip from '@/components/experience-strip';
import SiteHeader from '@/components/site-header';

const problems = [
  {
    title: 'Informationen werden zwischen Systemen übertragen',
    text: 'Daten aus E-Mails, Formularen oder Excel-Listen werden manuell in CRM, ERP oder Fachanwendungen eingetragen.'
  },
  {
    title: 'Wiederkehrende Reports entstehen per Hand',
    text: 'Zahlen werden regelmäßig zusammengesucht, geprüft, formatiert und an dieselben Empfänger verteilt.'
  },
  {
    title: 'Wissen hängt an einzelnen Mitarbeitenden',
    text: 'Abläufe, Sonderfälle und Antworten sind kaum dokumentiert und bei Abwesenheiten schwer zugänglich.'
  },
  {
    title: 'Neue Tools werden eingeführt, aber nicht angenommen',
    text: 'Technisch funktioniert die Lösung, doch Rollen, Freigaben, Schulung und Alltagstauglichkeit bleiben unklar.'
  }
];

const useCases = [
  {
    category: 'HR und Recruiting',
    problem: 'Bewerberinformationen, Termine und Statusmeldungen werden in E-Mail, Kalender und Recruiting-System parallel gepflegt.',
    workflow: 'Eingehende Informationen werden strukturiert, dem Vorgang zugeordnet und als nächster Schritt im bestehenden System vorbereitet.',
    control: 'HR prüft ausgehende Kommunikation und trifft alle personenbezogenen Entscheidungen selbst.',
    benefit: 'Verlässlichere administrative Abläufe und weniger doppelte Datenpflege.'
  },
  {
    category: 'Verwaltung und CRM',
    problem: 'Anfragen und Stammdaten werden aus Formularen oder Postfächern manuell in CRM und Aufgabenlisten übertragen.',
    workflow: 'Ein definierter Eingang legt Datensätze und Aufgaben an, prüft Pflichtangaben und informiert die zuständige Person.',
    control: 'Verantwortliche bearbeiten Ausnahmen, korrigieren Daten und bestätigen sensible Änderungen.',
    benefit: 'Weniger Medienbrüche und ein nachvollziehbarer Bearbeitungsstand.'
  },
  {
    category: 'Reporting und Daten',
    problem: 'Regelmäßige Berichte erfordern dieselben Exporte, Bereinigungen und Formatierungsschritte.',
    workflow: 'Freigegebene Datenquellen werden zusammengeführt, nach festen Regeln geprüft und als Berichtsentwurf aufbereitet.',
    control: 'Fachverantwortliche prüfen Quelle, Plausibilität und finale Freigabe.',
    benefit: 'Konsistentere Reports und mehr Zeit für Einordnung statt Zusammenkopieren.'
  },
  {
    category: 'Internes Wissen',
    problem: 'Wiederkehrende Fragen werden jedes Mal neu beantwortet, weil Wissen in Köpfen, Ordnern und Chats verteilt ist.',
    workflow: 'Freigegebene Dokumente werden strukturiert auffindbar gemacht und für nachvollziehbare Antwortentwürfe genutzt.',
    control: 'Fachverantwortliche bestimmen die Quellen und prüfen kritische Antworten vor der Nutzung.',
    benefit: 'Schnellerer Wissenszugang und ein verlässlicheres Onboarding.'
  }
];

const engagementSteps = [
  {
    title: 'Automation Check',
    text: 'Wir wählen einen wiederkehrenden Prozess und prüfen gemeinsam, ob und wie sich eine Automatisierung lohnt.',
    deliverables: [
      'Skizze des aktuellen Ablaufs und der beteiligten Systeme',
      'Einordnung von Nutzen, Datenlage, Aufwand und Risiken',
      'Empfehlung für einen klar abgegrenzten nächsten Schritt'
    ]
  },
  {
    title: 'Pilotprojekt',
    text: 'Wir setzen den kleinsten sinnvollen Workflow in einem kontrollierten Rahmen um und testen ihn mit den späteren Nutzenden.',
    deliverables: [
      'Abgestimmter Pilotumfang mit klaren Erfolgskriterien',
      'Funktionsfähiger Workflow in einer Test- oder Pilotumgebung',
      'Auswertung von Rückmeldungen, Ausnahmen und technischem Fit'
    ]
  },
  {
    title: 'Umsetzung und Befähigung',
    text: 'Nach einem erfolgreichen Pilot integrieren wir den Ablauf sauber und machen Ihr Team handlungsfähig.',
    deliverables: [
      'Anbindung an die vereinbarte IT-Umgebung',
      'Dokumentation von Workflow, Datenflüssen und Freigaben',
      'Schulung, Übergabe und ein klarer Verbesserungsprozess'
    ]
  }
];

const principles = [
  ['Transparenz', 'Beteiligte Systeme und externe Services werden vor der Umsetzung offengelegt und gemeinsam bewertet.'],
  ['Datenminimierung', 'Der Workflow verarbeitet nur Daten, die für den definierten Zweck tatsächlich erforderlich sind.'],
  ['Menschliche Freigabe', 'Sensible Kommunikation und Entscheidungen bleiben bei den verantwortlichen Mitarbeitenden.'],
  ['Dokumentation', 'Ablauf, Datenquellen, Rollen, Ausnahmen und Freigabepunkte werden nachvollziehbar festgehalten.'],
  ['Technischer Fit', 'Die Lösung orientiert sich an der vorhandenen IT-Umgebung und vermeidet unnötige Systemwechsel.']
];

const team = [
  {
    initials: 'DS',
    name: 'Dominik Soballa',
    role: 'AI Adoption & Workflow Automation',
    text: 'Verbindet Wirtschaftspsychologie, Kognitionswissenschaft und praktische Erfahrung in CRM-Implementierung, Workflow-Automatisierung und HR-Prozessen.',
    context: 'Berufliche Kontexte: prognum Automotive, Callidus Energie und Academic Consulting Aschaffenburg',
    linkedin: 'https://www.linkedin.com/in/dominik-v-soballa-87873125b'
  },
  {
    initials: 'LB',
    name: 'Luca Bouché',
    role: 'Data & Process Automation',
    text: 'Verbindet psychologische Methodenkompetenz mit Python, R, quantitativer Analyse und praktischer Erfahrung in datenbasierter Prozessoptimierung.',
    context: 'Berufliche Kontexte: Siemens und BMW Group',
    linkedin: 'https://www.linkedin.com/in/luca-bouche-215a1225a/'
  },
  {
    initials: 'EM',
    name: 'Erik Müller',
    role: 'Project Management & Customer Experience',
    text: 'Verbindet Projektmanagement, Customer Experience, Datenanalyse und visuelle Kommunikation mit einem nutzerzentrierten Blick auf digitale Abläufe.',
    context: 'Berufliche Kontexte: KPMG sowie Digital-, Marketing- und Designprojekte',
    linkedin: 'https://www.linkedin.com/in/erik-m%C3%BCller-11b186208/'
  }
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <SiteHeader />
      <main id="main-content">
        <AnimatedHero />
        <ExperienceStrip />

        <section className="section problem-section" id="leistungen" aria-labelledby="problems-heading">
          <div className="container problem-layout">
            <div className="section-heading sticky-heading">
              <p className="eyebrow">Ausgangslage</p>
              <h2 id="problems-heading">Kommt Ihnen das bekannt vor?</h2>
              <p>
                Gute Automatisierung beginnt nicht mit einem Tool, sondern mit einem wiederkehrenden Problem, klaren Zuständigkeiten und einem realistischen Blick auf die vorhandenen Systeme.
              </p>
            </div>
            <ol className="problem-list">
              {problems.map((problem, index) => (
                <li key={problem.title}>
                  <span className="list-number">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{problem.title}</h3>
                    <p>{problem.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section use-case-section" id="anwendungsfaelle" aria-labelledby="use-cases-heading">
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <p className="eyebrow">Anwendungsfälle</p>
                <h2 id="use-cases-heading">Konkrete Abläufe statt abstrakter KI-Versprechen</h2>
              </div>
              <p>
                Jeder Workflow wird an Systeme, Daten und Verantwortlichkeiten im Unternehmen angepasst. Die Beispiele zeigen mögliche Startpunkte, keine fertigen Standardprodukte.
              </p>
            </div>

            <div className="use-case-list">
              {useCases.map((useCase, index) => (
                <article key={useCase.category} className="use-case-row">
                  <div className="use-case-title">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{useCase.category}</h3>
                  </div>
                  <dl>
                    <div>
                      <dt>Aktuelles Problem</dt>
                      <dd>{useCase.problem}</dd>
                    </div>
                    <div>
                      <dt>Möglicher Workflow</dt>
                      <dd>{useCase.workflow}</dd>
                    </div>
                    <div>
                      <dt>Menschliche Kontrolle</dt>
                      <dd>{useCase.control}</dd>
                    </div>
                    <div>
                      <dt>Betrieblicher Nutzen</dt>
                      <dd>{useCase.benefit}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ExperienceSnapshots />

        <section className="section engagement-section" id="vorgehen" aria-labelledby="engagement-heading">
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <p className="eyebrow">Vorgehen</p>
                <h2 id="engagement-heading">Klein starten. Im Alltag prüfen. Sauber übergeben.</h2>
              </div>
              <div className="approach-note">
                <strong>Ein überschaubarer Prozess zuerst.</strong>
                <p>MSB beginnt nicht mit einem großen Transformationsprojekt, sondern mit einem klaren Ablauf, dessen Nutzen und Grenzen sich gemeinsam prüfen lassen.</p>
              </div>
            </div>

            <ol className="engagement-grid">
              {engagementSteps.map((step, index) => (
                <li key={step.title} className="engagement-step">
                  <div className="engagement-number">{String(index + 1).padStart(2, '0')}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <div className="deliverables">
                    <strong>Konkrete Ergebnisse</strong>
                    <ul className="plain-list">
                      {step.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section responsible-section" id="verantwortung" aria-labelledby="responsible-heading">
          <div className="container responsible-layout">
            <div className="responsible-copy">
              <p className="eyebrow eyebrow-light">Verantwortungsvolle Umsetzung</p>
              <h2 id="responsible-heading">Automatisierung mit Kontrolle</h2>
              <p>
                Ein guter Workflow ist nicht nur technisch funktionsfähig. Er muss für die beteiligten Menschen nachvollziehbar sein, zur vorhandenen IT passen und mit vertretbarem Datenzugriff auskommen.
              </p>
              <p>
                Wir versprechen keine pauschale Rechtskonformität oder Zertifizierung. Datenschutz, Mitbestimmung und rechtliche Anforderungen werden projektspezifisch mit den zuständigen Stellen Ihres Unternehmens geklärt.
              </p>
            </div>
            <dl className="principle-list">
              {principles.map(([title, text], index) => (
                <div key={title}>
                  <dt><span>{String(index + 1).padStart(2, '0')}</span>{title}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section team-section" id="ueber-uns" aria-labelledby="team-heading">
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <p className="eyebrow">Über uns</p>
                <h2 id="team-heading">Drei Fachperspektiven für einen funktionierenden Gesamtprozess</h2>
              </div>
              <p>
                MSB verbindet Prozessverständnis, technische Umsetzung und Einführungskompetenz. Entscheidend ist nicht nur, ob ein Workflow läuft, sondern ob Ihr Team ihn versteht und sinnvoll nutzen kann.
              </p>
            </div>

            <div className="team-grid">
              {team.map((member) => (
                <article key={member.name} className="team-card">
                  <div className="team-header">
                    <div className="avatar" aria-hidden="true">{member.initials}</div>
                    <div>
                      <h3>{member.name}</h3>
                      <p className="team-role">{member.role}</p>
                    </div>
                  </div>
                  <p>{member.text}</p>
                  <p className="team-context">{member.context}</p>
                  <a className="profile-link" href={member.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn-Profil <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="kontakt" aria-labelledby="contact-panel-heading">
          <div className="container">
            <ContactPanel />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-layout">
          <div>
            <strong className="footer-brand">MSB AI &amp; Automation</strong>
            <p>Pragmatische KI- und Prozessautomatisierung für KMU in der Region Tübingen–Stuttgart.</p>
          </div>
          <nav className="footer-links" aria-label="Rechtliches und Kontakt">
            <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
