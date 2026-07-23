import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';
import { MotionAnchor, Reveal } from '@/components/motion-primitives';

const navItems = [
  ['Leistungen', '#leistungen'],
  ['Use Cases', '#use-cases'],
  ['Methode', '#methode'],
  ['Verantwortung', '#verantwortung'],
  ['Team', '#team'],
  ['Kontakt', '#kontakt']
];

const heroSignals = [
  'Prozessanalyse',
  'KI-Assistenz',
  'Workflow-Automation',
  'AI Literacy',
  'Region Neckar-Alb'
];

const heroMetrics = [
  ['30-45 Min.', 'kostenloser Quick-Check'],
  ['2-3', 'konkrete Quick Wins'],
  ['0', 'sensible HR-Daten im Erstkontakt']
];

const processStages = [
  ['01', 'Prozess verstehen', 'Rollen, Medienbrüche, Systeme und manuelle Schritte sichtbar machen.'],
  ['02', 'Potenzial bewerten', 'Nutzen, Aufwand, Risiko, Datenlage und Akzeptanz nüchtern einordnen.'],
  ['03', 'Pilot umsetzen', 'Einen klar begrenzten Workflow bauen, testen und messbar entlasten.'],
  ['04', 'Team befähigen', 'Nutzung erklären, Regeln dokumentieren und Feedback in den Alltag bringen.']
];

const trustBlocks = [
  ['Klarer Einstieg', 'Ein konkreter Prozess reicht, um erste Hebel, Risiken und nächste Schritte zu erkennen.'],
  ['Pragmatische Umsetzung', 'Wir automatisieren wiederholbare Arbeitsschritte, nicht ganze Organisationen auf Verdacht.'],
  ['Menschliche Akzeptanz', 'Schulung, Verantwortung und verständliche Regeln gehören von Anfang an zum Projekt.']
];

const problemPoints = [
  'Bewerberkommunikation läuft über manuelle E-Mails, Rückfragen und Statusupdates.',
  'HR-Dokumente liegen verteilt in E-Mail, Excel, SharePoint, Personio, SAP oder lokalen Ordnern.',
  'Onboarding-Aufgaben werden manuell nachgehalten und gehen leicht unter.',
  'KI wird ausprobiert, aber ohne klare Regeln, Schulung oder Prozessintegration.',
  'Automatisierung scheitert, wenn Mitarbeitende sie nicht verstehen oder akzeptieren.'
];

const serviceCards = [
  {
    title: 'Automation Quick-Check',
    text: 'Kostenloser Einstieg für einen HR-, Verwaltungs- oder Operationsprozess.',
    items: ['Ist der Prozess automatisierbar?', 'Welche Daten und Systeme sind beteiligt?', 'Welche Quick Wins sind realistisch?']
  },
  {
    title: 'Prozessanalyse & Roadmap',
    text: 'Strukturierte Aufnahme von Abläufen, Systemen, Rollen und Risiken.',
    items: ['Priorisierte Automationsfelder', 'Aufwand-Nutzen-Einschätzung', 'Umsetzungsplan für Pilotprojekte']
  },
  {
    title: 'Pilot & AI Literacy',
    text: 'Umsetzung eines begrenzten Workflows plus Schulung für sichere Nutzung.',
    items: ['Workflow oder KI-Assistenz', 'Dokumentierte Nutzungsregeln', 'Training für Mitarbeitende']
  }
];

const useCases = [
  ['Bewerberkommunikation strukturieren', 'Schnellere Rückmeldungen, weniger manuelle E-Mails', 'Niedriges Risiko'],
  ['Interviewtermine koordinieren', 'Weniger Abstimmungsaufwand', 'Niedriges Risiko'],
  ['Onboarding-Checklisten automatisieren', 'Weniger vergessene Aufgaben', 'Niedriges Risiko'],
  ['HR-Wissensdatenbank aufbauen', 'Weniger Standardfragen an HR', 'Mittleres Risiko wegen Datenzugriff'],
  ['Dokumentenanforderungen nachverfolgen', 'Mehr Übersicht, weniger manuelle Kontrolle', 'Niedriges Risiko'],
  ['Stellenanzeigen-Entwürfe unterstützen', 'Schnellere Textvarianten, konsistentere Sprache', 'Niedrig bis mittel']
];

const methodSteps = [
  ['Verstehen', 'Prozess, Rollen, Systeme und Engpässe aufnehmen.'],
  ['Bewerten', 'Nutzen, Aufwand, Risiko, Datenlage und Akzeptanz einschätzen.'],
  ['Priorisieren', 'Quick Wins und sinnvolle Pilotprozesse auswählen.'],
  ['Umsetzen', 'Workflow, KI-Unterstützung oder Tool-Integration pragmatisch bauen.'],
  ['Befähigen', 'Team schulen, Nutzung dokumentieren und Feedback integrieren.']
];

const responsibilityPoints = [
  'Menschliche Kontrolle bleibt erhalten',
  'Keine automatisierten Bewerberentscheidungen',
  'Transparente Prozesse und klare Datenflüsse',
  'Keine sensiblen HR-Daten über die Website'
];

const credibilityPoints = [
  ['HR-Prozessverständnis', 'Erfahrung mit Recruiting, HR-Administration und People-Prozessen.'],
  ['Mensch-KI-Perspektive', 'Cognitive Science und Fokus auf Akzeptanz, Nutzung und Schulung.'],
  ['Pragmatische Automatisierung', 'Automatisiert wird nur, was strukturiert, wiederholbar und messbar ist.'],
  ['Regional erreichbar', 'Persönlicher Ansprechpartner für KMU in Tübingen, Reutlingen und Umgebung.']
];

const team = [
  ['EM', 'Erik Müller', 'Automation & Operations', 'Technische Umsetzung, Workflows und operative Prozessverbesserung.'],
  ['DS', 'Dominik Soballa', 'HR, AI Adoption & Prozessanalyse', 'HR-Prozesse, Wirtschaftspsychologie und Mensch-KI-Interaktion.'],
  ['LB', 'Louca Bouche', 'Strategy & Client Projects', 'Projektstruktur, Kundenverständnis und Umsetzung von Automatisierungsvorhaben.']
];

const faq = [
  [
    'Für welche Unternehmen ist der Quick-Check geeignet?',
    'Für kleine und mittelständische Unternehmen, die in HR, Verwaltung oder Operations wiederkehrende manuelle Abläufe reduzieren möchten.'
  ],
  [
    'Müssen wir schon KI-Tools nutzen?',
    'Nein. Der Quick-Check beginnt beim Prozess. Ob KI, klassische Automatisierung oder eine bessere Struktur sinnvoll ist, wird erst danach bewertet.'
  ],
  [
    'Arbeiten Sie mit bestehenden Systemen?',
    'Ja. Wir betrachten bestehende Tools und Datenflüsse zuerst, bevor neue Lösungen vorgeschlagen werden.'
  ],
  [
    'Ist das DSGVO-konform?',
    'Wir arbeiten datenschutzbewusst und klären Datenflüsse, Zwecke, Zugriffe und Risiken früh im Prozess. Eine rechtliche Prüfung durch Ihre Datenschutzverantwortlichen kann dadurch nicht ersetzt werden.'
  ],
  [
    'Automatisieren Sie Bewerberauswahl?',
    'Nein. Wir fokussieren administrative Entlastung, Kommunikation, Dokumentation, Onboarding und Schulung, nicht automatisierte Bewerberentscheidungen.'
  ]
];

const contactLinks = [
  ['Impressum', '/impressum'],
  ['Datenschutz', '/datenschutz'],
  ['LinkedIn', 'https://www.linkedin.com'],
  ['Kontakt', '#kontakt']
];

function SectionIntro({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <div className="intro-copy">{children}</div> : null}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function HomePage() {
  return (
    <main id="top">
      <header className="topbar">
        <div className="container nav" aria-label="Hauptnavigation">
          <a className="brand" href="#top" aria-label="MSB AI & Automation Startseite">
            <Image className="brand-logo" src="/msb-logo.svg" alt="" width={44} height={44} priority aria-hidden="true" />
            <span>
              <strong>MSB</strong>
              <small>AI & Automation</small>
            </span>
          </a>
          <nav className="nav-links" aria-label="Sektionen">
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <MotionAnchor className="nav-cta" href="#kontakt">
            Quick-Check
          </MotionAnchor>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow">KI- und Prozessautomatisierung für KMU in Neckar-Alb</p>
            <h1>Prozesse automatisieren, ohne Ihr Team zu verlieren.</h1>
            <p className="lead hero-lead">
              MSB AI & Automation hilft regionalen Unternehmen, wiederkehrende HR-, Verwaltungs- und Operationsprozesse zu analysieren, sinnvoll zu automatisieren und Mitarbeitende im sicheren KI-Einsatz zu befähigen.
            </p>
            <div className="signal-row" aria-label="Leistungsschwerpunkte">
              {heroSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
            <div className="actions">
              <MotionAnchor className="cta" href="mailto:kontakt@msb-ai.de?subject=Anfrage%20Automation-Quick-Check">
                Kostenlosen Quick-Check anfragen
              </MotionAnchor>
              <MotionAnchor className="cta-secondary" href="#use-cases">
                Use Cases ansehen
              </MotionAnchor>
            </div>
          </Reveal>

          <Reveal as="aside" className="process-cockpit" delay={0.08} aria-label="Quick-Check Prozessübersicht">
            <div className="cockpit-head">
              <div>
                <p className="eyebrow">Quick-Check</p>
                <h2>Ein Prozess. Klare Einschätzung.</h2>
              </div>
              <span className="status-pill">Praxisnah</span>
            </div>
            <div className="metric-grid">
              {heroMetrics.map(([value, label]) => (
                <div className="metric" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <ol className="process-flow">
              {processStages.map(([number, title, text]) => (
                <li key={title}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="trust-band" aria-label="Nutzenversprechen">
        <div className="container trust-grid">
          {trustBlocks.map(([title, text], index) => (
            <Reveal as="article" className="trust-card" delay={index * 0.04} key={title}>
              <span aria-hidden="true">0{index + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="leistungen">
        <div className="container editorial-split">
          <Reveal>
            <SectionIntro eyebrow="Leistungen" title="Erst der Prozess. Dann die Automatisierung.">
              <p>
                Viele Unternehmen testen bereits KI-Tools. Der eigentliche Engpass liegt aber oft in unklaren Abläufen, verstreuten Informationen und fehlender Akzeptanz im Team.
              </p>
            </SectionIntro>
          </Reveal>
          <Reveal as="ol" className="problem-list" delay={0.06}>
            {problemPoints.map((point, index) => (
              <li key={point}>
                <span>0{index + 1}</span>
                <p>{point}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section-services">
        <div className="container">
          <Reveal>
            <SectionIntro eyebrow="Angebot" title="Drei Bausteine für messbare Entlastung">
              <p>
                Die Zusammenarbeit bleibt bewusst überschaubar: ein schneller Einstieg, eine saubere Roadmap und ein Pilot, der im Alltag nutzbar ist.
              </p>
            </SectionIntro>
          </Reveal>
          <div className="service-grid">
            {serviceCards.map((service, index) => (
              <Reveal as="article" className="service-card" delay={index * 0.05} key={service.title}>
                <div className="card-rule" aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <CheckList items={service.items} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="use-cases">
        <div className="container">
          <Reveal>
            <SectionIntro eyebrow="Use Cases" title="Use Cases, die schnell Nutzen schaffen">
              <p>
                Wir starten bewusst mit unterstützenden und administrativen Prozessen. Das reduziert Risiko und macht Wirkung schneller sichtbar.
              </p>
            </SectionIntro>
          </Reveal>
          <Reveal className="use-case-table" delay={0.06}>
            <table>
              <caption>Fokus auf administrative Entlastung statt automatisierter Personalentscheidungen</caption>
              <thead>
                <tr>
                  <th>Use Case</th>
                  <th>Typischer Nutzen</th>
                  <th>Einordnung</th>
                </tr>
              </thead>
              <tbody>
                {useCases.map(([useCase, benefit, risk]) => (
                  <tr key={useCase}>
                    <td data-label="Use Case">{useCase}</td>
                    <td data-label="Typischer Nutzen">{benefit}</td>
                    <td data-label="Einordnung">
                      <span className="risk">{risk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section section-method" id="methode">
        <div className="container method-layout">
          <Reveal>
            <SectionIntro eyebrow="Methode" title="Ein Vorgehen, das Entscheidern und Teams Sicherheit gibt">
              <p>
                Jede Automatisierung wird als Veränderung im Arbeitsalltag behandelt: verständlich, begrenzt, testbar und mit klarer Verantwortung.
              </p>
            </SectionIntro>
          </Reveal>
          <ol className="method-list">
            {methodSteps.map(([title, text], index) => (
              <Reveal as="li" delay={index * 0.04} key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-responsibility" id="verantwortung">
        <div className="container responsibility-layout">
          <Reveal>
            <SectionIntro eyebrow="Verantwortungsvolle KI" title="Keine Blackbox für Menschenentscheidungen">
              <p>
                Gerade im HR-Kontext muss KI nachvollziehbar, kontrollierbar und verantwortungsvoll eingesetzt werden. MSB entwickelt keine Systeme, die Bewerber vollautomatisch auswählen, Persönlichkeitsprofile erstellen oder Menschen ohne menschliche Prüfung bewerten.
              </p>
            </SectionIntro>
          </Reveal>
          <Reveal as="aside" className="principles-panel" delay={0.06}>
            <CheckList items={responsibilityPoints} />
            <p className="notice-text">
              Wir klären Datenflüsse, Zwecke, Zugriffe und Risiken früh im Prozess. Eine rechtliche Prüfung durch Ihre Datenschutzverantwortlichen oder externe Beratung ersetzt das nicht.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="team">
        <div className="container credibility-layout">
          <Reveal>
            <SectionIntro eyebrow="Warum MSB" title="Technische Umsetzung mit persönlicher Beratung">
              <p>
                Der Fokus liegt auf pragmatischer Entlastung: nah am Prozess, nah am Team und nah an den Anforderungen regionaler Unternehmen.
              </p>
            </SectionIntro>
          </Reveal>
          <div className="credibility-grid">
            {credibilityPoints.map(([title, text], index) => (
              <Reveal as="article" className="credibility-card" delay={index * 0.04} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <div className="team-list">
            {team.map(([initials, name, role, text], index) => (
              <Reveal as="article" className="team-card" delay={index * 0.04} key={name}>
                <div className="avatar" aria-hidden="true">
                  {initials}
                </div>
                <div>
                  <h3>{name}</h3>
                  <p className="team-role">{role}</p>
                </div>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-faq" id="faq">
        <div className="container faq-layout">
          <Reveal>
            <SectionIntro eyebrow="FAQ" title="Häufige Fragen" />
          </Reveal>
          <div className="faq-list">
            {faq.map(([question, answer], index) => (
              <Reveal as="article" delay={index * 0.035} key={question}>
                <details className="faq-item">
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-contact" id="kontakt">
        <div className="container contact-panel">
          <Reveal className="contact-copy">
            <p className="eyebrow">Kontakt</p>
            <h2>Finden wir heraus, wo Automatisierung wirklich hilft.</h2>
            <p>
              Im kostenlosen Quick-Check betrachten wir einen konkreten Prozess und geben eine ehrliche Einschätzung zu Nutzen, Aufwand und Risiko.
            </p>
            <div className="contact-note">
              <strong>Bitte beachten:</strong>
              <span>Senden Sie im Erstkontakt keine sensiblen personenbezogenen Daten, Bewerbungsunterlagen oder Mitarbeiterdaten.</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-panel">
          <div>
            <strong>MSB AI &amp; Automation GbR</strong>
            <p>
              Gesellschafter: Dominik Soballa · Erik Müller · Luca Bouché<br />
              Haußerstraße 150 · 72076 Tübingen · Deutschland · <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer Links">
            {contactLinks.map(([label, href]) => (
              <a key={label} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
