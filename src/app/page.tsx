import Accordion from '@/components/accordion';
import AnimatedHero from '@/components/animated-hero';
import ContactPanel from '@/components/contact-panel';
import ExperienceSnapshots from '@/components/experience-snapshots';
import ExperienceStrip from '@/components/experience-strip';
import SiteHeader from '@/components/site-header';
import UseCaseExplorer from '@/components/use-case-explorer';
import { Reveal, RevealGroup } from '@/components/reveal';

const problems = [
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
];

const engagementSteps = [
  {
    title: 'Prozess prüfen',
    text: 'Im kostenlosen Automation Check betrachten wir einen wiederkehrenden Ablauf, die beteiligten Systeme und mögliche Risiken.',
    deliverable: 'Erste Einschätzung und klarer nächster Schritt',
    details: [
      'Aktuellen Ablauf und beteiligte Systeme skizzieren',
      'Datenlage, Zuständigkeiten und Risiken einordnen'
    ]
  },
  {
    title: 'Pilot umsetzen',
    text: 'Wir entwickeln einen abgegrenzten Workflow und testen ihn gemeinsam mit den späteren Nutzenden.',
    deliverable: 'Funktionsfähiger Pilot mit klaren Erfolgskriterien',
    details: [
      'Pilotumfang und Erfolgskriterien abstimmen',
      'Ausnahmen und Rückmeldungen nachvollziehbar erfassen'
    ]
  },
  {
    title: 'In den Alltag integrieren',
    text: 'Nach einem erfolgreichen Test dokumentieren wir den Ablauf, schulen das Team und übergeben die Lösung.',
    deliverable: 'Dokumentation, Schulung und geregelte Übergabe',
    details: [
      'Datenflüsse, Rollen und Freigaben dokumentieren',
      'Übergabe und weitere Verbesserungen gemeinsam festlegen'
    ]
  }
];

const principles = [
  ['Transparenz', 'Sie wissen, welche Systeme und externen Dienste eingesetzt werden.'],
  ['Datenminimierung', 'Der Workflow verarbeitet nur die erforderlichen Informationen.'],
  ['Menschliche Freigabe', 'Sensible Kommunikation und Entscheidungen bleiben kontrollierbar.'],
  ['Dokumentation', 'Abläufe, Rollen und Abhängigkeiten werden nachvollziehbar festgehalten.']
];

const faqs = [
  {
    question: 'Welche Daten benötigt eine Automatisierung?',
    answer: 'Das hängt vom konkreten Ablauf ab; in der Projektklärung bestimmen wir, welche Informationen für den Zweck erforderlich sind und welche entfallen können.'
  },
  {
    question: 'Wo werden Daten verarbeitet?',
    answer: 'Speicherorte, Systeme und externe Dienste werden passend zur vorhandenen IT in der Projektklärung transparent festgelegt.'
  },
  {
    question: 'Können bestehende Systeme angebunden werden?',
    answer: 'Ob und wie eine Anbindung möglich ist, prüfen wir in der Projektklärung anhand vorhandener Schnittstellen, Zugänge und technischer Vorgaben.'
  },
  {
    question: 'Welche Schritte bleiben unter menschlicher Kontrolle?',
    answer: 'Die erforderlichen Prüf- und Freigabepunkte werden in der Projektklärung nach Prozess, Daten und Verantwortung festgelegt.'
  },
  {
    question: 'Was passiert nach dem Pilotprojekt?',
    answer: 'Nach dem Test bewerten wir die vereinbarten Kriterien und legen gemeinsam fest, ob der Ablauf angepasst, integriert oder beendet wird.'
  }
];

const team = [
  {
    initials: 'DS',
    name: 'Dominik Soballa',
    role: 'AI Adoption & Workflow Automation',
    text: 'Verbindet Wirtschaftspsychologie und Kognitionswissenschaft mit Erfahrung in CRM-Implementierung, Automatisierung und HR-Prozessen.',
    context: 'prognum Automotive · Callidus Energie · Academic Consulting',
    linkedin: 'https://www.linkedin.com/in/dominik-v-soballa-87873125b'
  },
  {
    initials: 'LB',
    name: 'Luca Bouché',
    role: 'Data & Process Automation',
    text: 'Verbindet psychologische Methoden mit Python, R, Datenanalyse und praktischer Prozessoptimierung.',
    context: 'Siemens · BMW Group',
    linkedin: 'https://www.linkedin.com/in/luca-bouche-215a1225a/'
  },
  {
    initials: 'EM',
    name: 'Erik Müller',
    role: 'Project Management & Customer Experience',
    text: 'Verbindet Projektmanagement, Datenanalyse und Customer Experience mit nutzerorientierter digitaler Gestaltung.',
    context: 'KPMG · Digital- und Designprojekte',
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
              <h2 id="problems-heading" tabIndex={-1}>Wo im Alltag Zeit verloren geht</h2>
              <p>Wir beginnen nicht mit einem Tool, sondern mit einem konkreten wiederkehrenden Ablauf.</p>
            </div>
            <Reveal className="problem-list-reveal">
              <ul className="problem-list">
              {problems.map((problem) => (
                <li key={problem.title}>
                  <span className="problem-marker" aria-hidden="true" />
                  <div>
                    <h3>{problem.title}</h3>
                    <p>{problem.text}</p>
                  </div>
                </li>
              ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section use-case-section" id="anwendungsfaelle" aria-labelledby="use-cases-heading">
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <h2 id="use-cases-heading" tabIndex={-1}>Typische Prozesse, mit denen wir starten</h2>
              </div>
              <p>Keine Standardsoftware, sondern klar abgegrenzte Abläufe in Ihrer bestehenden Umgebung.</p>
            </div>
            <UseCaseExplorer />
          </div>
        </section>

        <ExperienceSnapshots />

        <section className="section engagement-section" id="vorgehen" aria-labelledby="engagement-heading">
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <h2 id="engagement-heading" tabIndex={-1}>Klein starten. Wirkung prüfen. Sauber übergeben.</h2>
              </div>
              <p>Sie müssen nicht sofort ein großes Transformationsprojekt beauftragen.</p>
            </div>

            <Reveal>
              <ol className="engagement-grid">
              {engagementSteps.map((step, index) => (
                <li key={step.title} className="engagement-step">
                  <div className="engagement-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                  <h3>{index + 1}. {step.title}</h3>
                  <p>{step.text}</p>
                  <p className="step-deliverable">
                    <span>Ergebnis</span>
                    <strong>{step.deliverable}</strong>
                  </p>
                  <Accordion className="compact-accordion" label="Details anzeigen">
                    <ul className="plain-list">
                      {step.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  </Accordion>
                </li>
              ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section className="section responsible-section" id="verantwortung" aria-labelledby="responsible-heading">
          <div className="container">
            <div className="responsible-intro">
              <h2 id="responsible-heading" tabIndex={-1}>Automatisierung mit Kontrolle</h2>
              <p>Wir automatisieren Routine – nicht Verantwortung.</p>
            </div>

            <Reveal>
              <dl className="principle-list">
              {principles.map(([title, description]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
              </dl>
            </Reveal>

            <p className="technical-fit">Die Umsetzung orientiert sich an Ihrer bestehenden IT und vermeidet unnötige Systemwechsel.</p>
            <p className="responsible-disclaimer">
              Datenschutz und rechtliche Anforderungen werden projektspezifisch mit den zuständigen Stellen des Unternehmens geprüft. MSB ersetzt keine Rechts- oder Datenschutzberatung.
            </p>

            <div className="faq-block">
              <div className="faq-heading">
                <h3>Fragen</h3>
              </div>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <Accordion key={faq.question} className="faq-item" label={faq.question}>
                    <p>{faq.answer}</p>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section team-section" id="ueber-uns" aria-labelledby="team-heading">
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <h2 id="team-heading" tabIndex={-1}>Drei Perspektiven. Ein gemeinsamer Prozess.</h2>
              </div>
              <p>Wir verbinden Prozessverständnis, technische Umsetzung und Nutzerakzeptanz.</p>
            </div>

            <RevealGroup className="team-grid">
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
            </RevealGroup>
          </div>
        </section>

        <section className="contact-section" id="kontakt" aria-labelledby="contact-panel-heading">
          <div className="container">
            <Reveal><ContactPanel /></Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-layout">
          <div>
            <strong className="footer-brand">MSB AI &amp; Automation</strong>
            <p>Pragmatische Prozessautomatisierung für KMU in der Region Tübingen–Stuttgart.</p>
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
