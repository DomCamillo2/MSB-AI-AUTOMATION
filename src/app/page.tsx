import { ContactForm } from '@/components/contact-form';
import AnimatedHero from '@/components/animated-hero';
import FeatureCard from '@/components/feature-card';
import ProcessStep from '@/components/process-step';
import ContactPanel from '@/components/contact-panel';
import ExperienceStrip from '@/components/experience-strip';
import ExperienceSnapshots from '@/components/experience-snapshots';
import TestimonialList from '@/components/testimonial';

const problemCards = [
  {
    title: 'Bewerberkommunikation kostet Zeit',
    text: 'Rückfragen, Statusupdates und Terminabstimmungen laufen oft manuell und unstrukturiert.'
  },
  {
    title: 'Dokumente liegen in zu vielen Systemen',
    text: 'E-Mails, PDFs, Excel, SharePoint, Personio oder lokale Ordner erschweren schnelle Abläufe.'
  },
  {
    title: 'KI wird ausprobiert, aber nicht eingeführt',
    text: 'Einzelne Mitarbeitende testen Tools, aber es fehlen klare Prozesse, Schulung und sichere Regeln.'
  },
  {
    title: 'Automatisierung scheitert an Akzeptanz',
    text: 'Eine Lösung bringt nur dann Nutzen, wenn das Team sie versteht und im Alltag nutzt.'
  }
];

const offerCards = [
  {
    title: 'Kostenloser Automation Check',
    points: ['45-minütiges Prozessgespräch', 'Identifikation von bis zu drei Automatisierungspotenzialen', 'erste Einordnung von Nutzen, Aufwand und Risiken', 'kurze schriftliche Zusammenfassung'],
    cta: 'Kostenlosen Automation Check anfragen'
  },
  {
    title: 'HR-Prozessanalyse & KI-Roadmap',
    points: ['Interviews mit HR, Geschäftsführung oder Fachabteilung', 'Analyse von 2–3 Prozessen', 'Priorisierung nach Nutzen, Aufwand, Risiko und Datenlage', 'konkrete Roadmap für Pilotprojekt und Schulung']
  },
  {
    title: 'Automation Pilot',
    points: ['Umsetzung eines klar abgegrenzten Prozesses', 'z. B. Onboarding-Checklisten, Bewerberkommunikation, HR-Wissensdatenbank, Dokumentenanforderungen', 'Dokumentation und Übergabe an das Team']
  },
  {
    title: 'AI Literacy Workshop',
    points: ['sichere KI-Nutzung im Arbeitsalltag', 'Grenzen, Risiken und Qualitätsprüfung von KI-Ergebnissen', 'praxisnahe Übungen mit echten Unternehmensprozessen', 'geeignet für HR, Führungskräfte und Fachabteilungen']
  }
];

const useCases = [
  ['Bewerberkommunikation strukturieren', 'Schnellere Rückmeldungen, weniger manuelle E-Mails', 'Niedrig'],
  ['Interviewtermine koordinieren', 'Weniger Abstimmungsaufwand', 'Niedrig'],
  ['Onboarding-Checklisten automatisieren', 'Weniger vergessene Aufgaben', 'Niedrig'],
  ['HR-Wissensdatenbank aufbauen', 'Weniger Standardfragen an HR', 'Mittel'],
  ['Dokumentenanforderungen und Fristen nachverfolgen', 'Mehr Übersicht und weniger manuelle Kontrolle', 'Niedrig'],
  ['Stellenanzeigen-Entwürfe unterstützen', 'Schnellere Textvarianten und konsistentere Sprache', 'Niedrig bis mittel']
];

const processSteps = [
  ['Verstehen', 'Wir betrachten den bestehenden Ablauf, die beteiligten Personen, Systeme und wiederkehrenden Probleme.'],
  ['Priorisieren', 'Wir bewerten mögliche Automatisierungen nach Nutzen, technischer Machbarkeit, Risiko und Akzeptanz.'],
  ['Pilotieren', 'Wir setzen zunächst einen klar abgegrenzten Anwendungsfall um und testen ihn im realen Arbeitskontext.'],
  ['Übergeben und verbessern', 'Wir dokumentieren den Workflow, schulen die beteiligten Personen und entwickeln die Lösung auf Basis des tatsächlichen Einsatzes weiter.']
];

const reasons = [
  ['HR-Prozessverständnis', 'Erfahrung mit Recruiting, HR-Admin und People-Prozessen.'],
  ['Mensch-KI-Perspektive', 'Cognitive Science und Fokus auf Akzeptanz, Nutzung und Schulung.'],
  ['Pragmatische Automatisierung', 'Wir automatisieren nur, was strukturiert, wiederholbar und messbar ist.'],
  ['Lokal in Neckar-Alb', 'Persönlicher Ansprechpartner für KMU in Tübingen, Reutlingen und Umgebung.']
];

const LINKEDIN_PLACEHOLDER = 'LINKEDIN_URL_PLACEHOLDER';

const team = [
  ['DS', 'Dominik Soballa', 'AI Adoption & Workflow Automation', 'Verbindet Wirtschaftspsychologie, Kognitionswissenschaft und praktische Erfahrung in CRM-Implementierung, Workflow-Automatisierung, HR-Prozessen und der Einführung von KI im Arbeitsalltag.', 'Erfahrung unter anderem bei prognum Automotive, Callidus Energie und Academic Consulting Aschaffenburg', LINKEDIN_PLACEHOLDER],
  ['LB', 'Luca Bouché', 'Data & Process Automation', 'Verbindet psychologische Methodenkompetenz mit Python, R, quantitativer Analyse und praktischer Erfahrung in datenbasierter Prozessoptimierung.', 'Erfahrung unter anderem bei Siemens und der BMW Group', LINKEDIN_PLACEHOLDER],
  ['EM', 'Erik Müller', 'Project Management & Customer Experience', 'Verbindet Projektmanagement, Customer Experience, Datenanalyse und visuelle Kommunikation mit einem nutzerzentrierten Blick auf digitale Prozesse.', 'Erfahrung unter anderem bei KPMG sowie in Digital-, Marketing- und Designprojekten.', LINKEDIN_PLACEHOLDER]
];

const faq = [
  ['Für welche Unternehmen ist der Quick-Check geeignet?', 'Für kleine und mittlere Unternehmen, insbesondere für HR, Verwaltung, Operations und Führungskräfte, die wiederkehrende Prozesse klarer und effizienter gestalten möchten.'],
  ['Müssen wir schon KI-Tools nutzen?', 'Nein. Wir starten mit Ihrem Prozess und prüfen gemeinsam, wo Nutzen entsteht, welche Daten relevant sind und ob KI oder klassische Automatisierung überhaupt sinnvoll ist.'],
  ['Arbeiten Sie mit bestehenden Systemen?', 'Ja. Ziel ist nicht ein Toolwechsel, sondern die pragmatische Arbeit mit vorhandenen Systemen, Datenflüssen und realen Abläufen.'],
  ['Ist das DSGVO-konform?', 'Wir arbeiten datenschutzbewusst und klären Datenflüsse, Zwecke, Zugriffe und Risiken früh im Prozess. Eine rechtliche Prüfung durch Ihre Datenschutzverantwortlichen oder externe Beratung kann dadurch nicht ersetzt werden.'],
  ['Automatisieren Sie Bewerberauswahl?', 'Nein. Wir fokussieren uns auf administrative Entlastung, Kommunikation, Dokumentation, Onboarding und Schulung. Automatisierte Bewerberentscheidungen, Rankings oder Persönlichkeitsbewertungen bieten wir nicht an.'],
  ['Welche Daten sollen wir im Erstkontakt senden?', 'Bitte senden Sie im Erstkontakt keine sensiblen personenbezogenen Daten, Bewerbungsunterlagen oder Mitarbeiterdaten. Für den Quick-Check reicht eine allgemeine Beschreibung des Prozesses.']
];

const contactLinks = [
  ['Impressum', '/impressum'],
  ['Datenschutz', '/datenschutz'],
  ['Kontakt', '#kontakt'],
  ['LinkedIn', 'https://www.linkedin.com']
];

export default function HomePage() {
  return (
    <main>
      <header className="topbar">
        <div className="container nav" aria-label="Hauptnavigation">
          <a className="brand" href="#top" aria-label="MSB AI Consulting Startseite">
            <img className="brand-logo" src="/msb-logo.svg" alt="" aria-hidden="true" />
            <span>MSB AI Consulting</span>
          </a>
          <nav className="nav-links" aria-label="Sektionen">
            <a href="#leistungen">Leistungen</a>
            <a href="#use-cases">Use Cases</a>
            <a href="#methode">Methode</a>
            <a href="#verantwortung">Verantwortungsvolle KI</a>
            <a href="#team">Team</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
          <a className="cta" href="#kontakt">
            Quick-Check buchen
          </a>
        </div>
      </header>

      <AnimatedHero />
      <ExperienceStrip />
      <ExperienceSnapshots />

      <section className="section" id="leistungen">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Leistungen</p>
            <h2>Wo HR- und Verwaltungsteams heute Zeit verlieren</h2>
          </div>
          <div className="grid-4">
            {problemCards.map((card) => (
              <FeatureCard key={card.title} title={card.title}>
                <p>{card.text}</p>
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container two-col">
          <div className="section-card card-pad">
            <p className="kicker">Ansatz</p>
            <h2>Wir verbinden Prozessanalyse, Automatisierung und AI Literacy</h2>
            <p style={{ marginTop: '1rem' }}>
              Wir starten nicht mit einem Tool, sondern mit Ihrem Prozess. Erst wenn klar ist, wo Zeit verloren geht, welche Daten genutzt werden dürfen und wie Ihr Team arbeitet, entwickeln wir pragmatische Automatisierungen und schulen die Menschen, die damit arbeiten.
            </p>
          </div>
          <div className="section-card card-pad">
            <div className="process-columns">
              {[
                ['Analyse', 'Prozesse, Rollen, Systeme, Datenflüsse und manuelle Arbeitsschritte verstehen.'],
                ['Automatisierung', 'Wiederkehrende Abläufe mit passenden Workflows, KI-Unterstützung oder Tool-Integrationen entlasten.'],
                ['Befähigung', 'Teams und Führungskräfte im sicheren, sinnvollen und verantwortungsvollen KI-Einsatz schulen.']
              ].map(([title, text]) => (
                <div key={title} className="process-step">
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="angebote">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Einstieg</p>
            <h2>Unser Einstieg: klar, klein, messbar</h2>
          </div>
          <div className="grid-2">
            {offerCards.map((offer) => (
              <article key={offer.title} className="offer-card card-pad">
                <h3>{offer.title}</h3>
                <ul className="offer-list">
                  {offer.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {offer.cta ? (
                  <div className="metric">
                    <a className="cta-ghost" href="#kontakt">
                      {offer.cta}
                    </a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="use-cases">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Use Cases</p>
            <h2>Use Cases, die schnell Nutzen schaffen</h2>
          </div>
          <div className="table-wrap">
            <table>
              <caption>Fokussiert auf unterstützende und administrative Prozesse</caption>
              <thead>
                <tr>
                  <th>Use Case</th>
                  <th>Nutzen</th>
                  <th>Risiko-Level</th>
                </tr>
              </thead>
              <tbody>
                {useCases.map(([useCase, benefit, risk]) => (
                  <tr key={useCase}>
                    <td data-label="Use Case">{useCase}</td>
                    <td data-label="Nutzen">{benefit}</td>
                    <td data-label="Risiko-Level"><span className="risk">{risk}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="note-panel card-pad" style={{ marginTop: '1rem' }}>
            <p>Wir starten bewusst mit unterstützenden und administrativen Prozessen — nicht mit automatisierten Personalentscheidungen.</p>
          </div>
        </div>
      </section>

      <section className="section" id="verantwortung">
        <div className="container two-col">
          <div className="section-card card-pad">
            <p className="kicker">Verantwortungsvolle KI</p>
            <h2>Verantwortungsvolle KI statt Blackbox-Recruiting</h2>
            <p style={{ marginTop: '1rem' }}>
              Gerade im HR-Kontext muss KI nachvollziehbar, kontrollierbar und verantwortungsvoll eingesetzt werden. MSB AI Consulting entwickelt keine Systeme, die Bewerber vollautomatisch auswählen, Persönlichkeitsprofile erstellen oder Menschen ohne menschliche Prüfung bewerten. Unser Fokus liegt auf administrativer Entlastung, Prozessklarheit, Dokumentation und menschlicher Kontrolle.
            </p>
          </div>
          <div className="section-card card-pad">
            <ul className="principles">
              <li>Menschliche Kontrolle bleibt erhalten</li>
              <li>Keine automatisierte Bewerberentscheidung</li>
              <li>Transparente Prozesse und klare Datenflüsse</li>
            </ul>
            <div className="note-panel" style={{ marginTop: '1rem' }}>
              <div className="card-pad">
                <p className="small">Unser Fokus liegt auf unterstützenden und administrativen Prozessen: Kommunikation, Dokumentation, Onboarding, Wissensmanagement, Terminierung und Schulung. Menschliche Kontrolle bleibt dabei ein Grundprinzip.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="datenschutzbewusst">
        <div className="container two-col">
          <div className="section-card card-pad">
            <p className="kicker">Datenschutz</p>
            <h2>Datenschutzbewusst von Anfang an</h2>
            <p style={{ marginTop: '1rem' }}>
              Wir betrachten Datenschutz nicht als nachträgliche Formalität, sondern als Teil der Prozessanalyse. Bevor Automatisierungen umgesetzt werden, klären wir gemeinsam, welche Daten verarbeitet werden, welche Systeme beteiligt sind, welche Zugriffe nötig sind und wo menschliche Kontrolle erforderlich bleibt.
            </p>
          </div>
          <div className="section-card card-pad">
            <ul className="check-list">
              <li>Datenminimierung: Nur Daten nutzen, die für den Prozess wirklich erforderlich sind.</li>
              <li>Zweckbindung: Automatisierungen werden für klar definierte Aufgaben konzipiert.</li>
              <li>Transparenz: Datenflüsse und Verantwortlichkeiten werden nachvollziehbar dokumentiert.</li>
              <li>Keine sensiblen HR-Daten über die Website: Erstgespräche starten ohne Uploads oder Bewerbungsunterlagen.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="methode">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Methode</p>
            <h2>Unsere 5-Schritte-Methode</h2>
          </div>
          <div className="step-grid">
            {processSteps.map(([title, text], index) => (
              <ProcessStep key={title} index={index} title={title} text={text} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="warum-msb">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Warum MSB</p>
            <h2>Warum MSB AI Consulting?</h2>
          </div>
          <div className="grid-4">
            {reasons.map(([title, text]) => (
              <article key={title} className="section-card card-pad">
                <h3>{title}</h3>
                <p style={{ marginTop: '0.7rem' }}>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="team">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">Team</p>
            <h2>Drei Perspektiven. Ein Ziel: Prozesse, die wirklich entlasten.</h2>
          </div>
          <div className="grid-3">
            {team.map(([initials, name, role, text, context, linkedin]) => (
              <article key={name} className="team-card card-pad">
                <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                  <div className="avatar" aria-hidden="true">{initials}</div>
                  <div style={{ flex: 1 }}>
                    <h3>{name}</h3>
                    <p className="muted" style={{ marginTop: '0.25rem', fontWeight: 700 }}>{role}</p>
                    <p style={{ marginTop: '0.6rem' }}>{text}</p>
                    <p className="small muted" style={{ marginTop: '0.6rem' }}>{context}</p>
                    <p style={{ marginTop: '0.6rem' }}>
                      <a href={linkedin} className="cta-ghost" {...(linkedin === 'LINKEDIN_URL_PLACEHOLDER' ? { 'aria-label': 'LinkedIn Profil fehlt (Platzhalter)' } : { target: '_blank', rel: 'noreferrer' })}>
                        LinkedIn
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-intro">
            <p className="kicker">FAQ</p>
            <h2>Häufige Fragen</h2>
          </div>
          <div className="grid-2">
            {faq.map(([question, answer]) => (
              <details key={question} className="faq-item">
                <summary>{question}</summary>
                <div>{answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="kontakt">
        <div className="container">
          <ContactPanel />
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-panel">
          <div className="footer-top">
            <div>
              <strong>MSB AI & Automation</strong>
              <p className="small muted" style={{ marginTop: '0.45rem', maxWidth: '52rem' }}>
                Inhaber: Dominik Soballa · Haußerstraße 150 · 72076 Tübingen · Deutschland · <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
              </p>
              <p className="small muted" style={{ marginTop: '0.4rem' }}>
                Direktlinks: <a href="LINKEDIN_URL_PLACEHOLDER">Unternehmensseite (LinkedIn)</a> · <a href="#team">Gründerprofile</a>
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
          <p className="small muted">Privacy-first Website, ohne Tracking und ohne nicht notwendige Cookies.</p>
        </div>
      </footer>
    </main>
  );
}
