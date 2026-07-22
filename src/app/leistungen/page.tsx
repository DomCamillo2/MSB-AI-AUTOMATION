import type { ReactNode } from 'react';
import { Reveal } from '@/components/reveal';
import ServicesHeroVisual from '@/components/services-hero-visual';
import StructuredData from '@/components/structured-data';
import { createPageMetadata, siteUrl } from '@/lib/seo';
import styles from '@/components/service-visuals.module.css';

export const metadata = createPageMetadata({
  title: 'Prozessautomatisierung für KMU',
  description: 'MSB automatisiert wiederkehrende Prozesse in HR, Verwaltung, Reporting und Datenflüssen – mit bestehenden Systemen, klaren Regeln und menschlicher Kontrolle.',
  path: '/leistungen'
});

const serviceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}/leistungen#service`,
  name: 'Prozessautomatisierung für KMU',
  description: 'Analyse, Pilotierung, Integration und Übergabe wiederkehrender Geschäftsprozesse mit Regeln, Schnittstellen, KI und menschlichen Freigaben.',
  serviceType: 'Geschäftsprozess- und Workflow-Automatisierung',
  url: `${siteUrl}/leistungen`,
  provider: { '@id': `${siteUrl}/#organization` },
  areaServed: ['Tübingen', 'Reutlingen', 'Stuttgart', 'Baden-Württemberg', 'Deutschland'],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Kleine und mittlere Unternehmen'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Leistungsbausteine für Prozessautomatisierung',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automation Check' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatisierungspilot' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integration in bestehende Systeme' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Schulung, Dokumentation und Übergabe' } }
    ]
  }
};

type IconName = 'people' | 'database' | 'chart' | 'file' | 'mail' | 'book';

function ServiceIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    people: <><circle cx="9" cy="8" r="3" /><path d="M3.8 19c.4-4 2.1-6 5.2-6s4.8 2 5.2 6M16 7.5a2.5 2.5 0 0 1 0 5M16.5 13c2.3.4 3.5 2.1 3.8 5" /></>,
    database: <><ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /><path d="m4 7 5-4 6 6 6-5" /></>,
    file: <><path d="M6 2.5h8l4 4V22H6zM14 2.5v5h4M9 12h6M9 16h6" /></>,
    mail: <><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="m3 7 9 7 9-7" /></>,
    book: <><path d="M3.5 4.5h6A2.5 2.5 0 0 1 12 7v13a2.5 2.5 0 0 0-2.5-2.5h-6zM20.5 4.5h-6A2.5 2.5 0 0 0 12 7v13a2.5 2.5 0 0 1 2.5-2.5h6z" /></>
  };

  return <svg className={styles.serviceIcon} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

const serviceAreas = [
  {
    icon: 'people',
    title: 'HR & Recruiting',
    problem: 'Bewerbungen und Unterlagen werden aus Postfächern in Listen oder Systeme übertragen.',
    automation: 'Daten erfassen, Unterlagen prüfen, Status und Aufgaben vorbereiten.',
    control: 'Auswahl, Kommunikation und sensible Entscheidungen bleiben beim HR-Team.'
  },
  {
    icon: 'database',
    title: 'Verwaltung & CRM',
    problem: 'Anfragen, Stammdaten und Wiedervorlagen werden mehrfach von Hand gepflegt.',
    automation: 'Anfragen zuordnen, Datensätze aktualisieren, Aufgaben und Follow-ups auslösen.',
    control: 'Unsichere Zuordnungen und sensible Änderungen werden vorgelegt.'
  },
  {
    icon: 'chart',
    title: 'Reporting & Daten',
    problem: 'Dieselben Exporte werden regelmäßig zusammengeführt, geprüft und formatiert.',
    automation: 'Quellen verbinden, Kennzahlen berechnen, Auffälligkeiten markieren, Berichte vorbereiten.',
    control: 'Fachverantwortliche prüfen Plausibilität und geben Ergebnisse frei.'
  },
  {
    icon: 'file',
    title: 'Dokumente',
    problem: 'Dokumente werden geöffnet, gelesen, einsortiert und weitergeleitet.',
    automation: 'Dokumente klassifizieren, Angaben extrahieren, prüfen und Freigaben starten.',
    control: 'Unklare oder risikoreiche Fälle landen bei der zuständigen Person.'
  },
  {
    icon: 'mail',
    title: 'E-Mail & Kommunikation',
    problem: 'Eingehende Nachrichten lösen wiederkehrende Such-, Zuordnungs- und Antwortarbeit aus.',
    automation: 'Anliegen erkennen, Daten auslesen, Prozesse starten und Entwürfe vorbereiten.',
    control: 'Antworten werden dort geprüft, wo Ton, Inhalt oder Verantwortung es verlangen.'
  },
  {
    icon: 'book',
    title: 'Internes Wissen',
    problem: 'Antworten und Arbeitswissen liegen verteilt in Dokumenten, Ordnern und Köpfen.',
    automation: 'Freigegebene Quellen strukturieren und passende Informationen auffindbar machen.',
    control: 'Quellenumfang und kritische Antworten bleiben fachlich verantwortet.'
  }
] as const;

const decisionModes = [
  {
    number: '01',
    label: 'Klare Regeln',
    title: 'Klassisch automatisieren',
    text: 'Wenn Auslöser, Prüfung und Aktion eindeutig sind, sind feste Regeln meist schneller, günstiger und leichter zu kontrollieren.',
    examples: 'Datenübertragung · Validierung · Fristen · Systemaktionen'
  },
  {
    number: '02',
    label: 'Unstrukturierte Inhalte',
    title: 'KI gezielt einsetzen',
    text: 'KI unterstützt, wenn E-Mails, Texte oder Dokumente verstanden, klassifiziert oder zusammengefasst werden müssen.',
    examples: 'Klassifikation · Extraktion · Zusammenfassung · Textentwurf'
  },
  {
    number: '03',
    label: 'Risiko oder Unklarheit',
    title: 'Menschen entscheiden lassen',
    text: 'Bei Verantwortung, Zweifeln oder Ausnahmen pausiert der Workflow und legt den Fall einer benannten Person vor.',
    examples: 'Freigabe · Ausnahme · sensible Kommunikation · Korrektur'
  }
] as const;

const exampleFlows = [
  {
    label: 'E-Mail → CRM',
    context: 'Kundenanfrage',
    steps: ['E-Mail erfassen', 'Anliegen zuordnen', 'CRM abgleichen', 'Unsicherheit prüfen', 'Vorgang anlegen'],
    note: 'Das Team übernimmt nur, wenn Angaben fehlen oder eine Zuordnung nicht eindeutig ist.'
  },
  {
    label: 'Daten → Reporting',
    context: 'Monatsbericht',
    steps: ['Quellen einlesen', 'Daten validieren', 'Kennzahlen berechnen', 'Abweichung markieren', 'Bericht bereitstellen'],
    note: 'Der Workflow bereitet vor. Die fachliche Einordnung und Freigabe bleiben verantwortlich.'
  },
  {
    label: 'Bewerbung → ATS',
    context: 'Recruiting',
    steps: ['Unterlagen erfassen', 'Daten strukturieren', 'Pflichtangaben prüfen', 'HR freigeben lassen', 'ATS aktualisieren'],
    note: 'Die Automatisierung organisiert Daten und Übergaben – sie trifft keine Personalentscheidung.'
  }
] as const;

const projectSteps = [
  {
    number: '01',
    title: 'Automation Check',
    text: 'Wir betrachten einen konkreten, wiederkehrenden Ablauf und prüfen Aufwand, Systeme, Daten, Ausnahmen und Risiken.',
    result: 'Eignungseinschätzung und realistischer nächster Schritt'
  },
  {
    number: '02',
    title: 'Pilot',
    text: 'Wir grenzen einen Workflow ab, bauen ihn funktionsfähig und testen Normalfälle, Ausnahmen und Fehler mit realen Szenarien.',
    result: 'Geprüfter Pilot mit messbaren Erfolgskriterien'
  },
  {
    number: '03',
    title: 'Integration',
    text: 'Wir verbinden freigegebene Systeme, richten Berechtigungen, Protokollierung und definierte Eingriffspunkte ein.',
    result: 'Kontrollierte Integration mit dokumentierten Datenflüssen'
  },
  {
    number: '04',
    title: 'Übergabe & Betrieb',
    text: 'Wir schulen Beteiligte, dokumentieren den Ablauf und regeln Verantwortung für Prüfung, Fehler und spätere Änderungen.',
    result: 'Nachvollziehbare Übergabe; Betreuung nach Vereinbarung'
  }
] as const;

const expectations = [
  'Ein klares Bild des heutigen Ablaufs',
  'Eine begründete Automatisierungsentscheidung',
  'Nachvollziehbare Architektur statt Blackbox',
  'Definierte Test- und Erfolgskriterien',
  'Dokumentierte Rollen, Datenflüsse und Ausnahmen',
  'Einbindung der Personen, die später damit arbeiten'
] as const;

const boundaries = [
  ['Keine pauschalen Einsparversprechen', 'Nutzen hängt von Volumen, Komplexität und Datenqualität des konkreten Prozesses ab.'],
  ['Keine KI um jeden Preis', 'Wenn feste Regeln verlässlicher sind, setzen wir keine KI ein.'],
  ['Kein unnötiger Systemwechsel', 'Wir prüfen vorhandene Schnittstellen und Werkzeuge, bevor neue Software hinzukommt.'],
  ['Keine Blackbox ohne Verantwortung', 'Kritische Aktionen, Ausnahmen und Zuständigkeiten müssen verständlich und kontrollierbar bleiben.']
] as const;

export default function LeistungenPage() {
  return (
    <main id="main-content">
      <StructuredData data={serviceStructuredData} />

      <section className={styles.pageHero} aria-labelledby="services-page-heading">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">Leistungen · Prozessautomatisierung für KMU</p>
            <h1 id="services-page-heading">Wiederkehrende Prozesse automatisieren. Bestehende Systeme weiter nutzen.</h1>
            <p className={styles.heroLead}>MSB verbindet E-Mail, Excel, CRM, Dokumente und weitere Systeme zu nachvollziehbaren Workflows – mit festen Regeln, KI dort, wo sie hilft, und menschlicher Freigabe dort, wo sie nötig ist.</p>
            <div className={styles.heroActions}>
              <a className="button button-primary" href="/automation-check">Prozess kostenlos prüfen lassen <span className="button-arrow" aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="#automatisierungsfelder">Anwendungsfelder ansehen</a>
            </div>
            <ul className={styles.heroSignals} aria-label="Grundsätze unserer Arbeit">
              <li>Prozess vor Tool</li>
              <li>Pilot vor Rollout</li>
              <li>Kontrolle vor Blackbox</li>
            </ul>
          </div>
          <ServicesHeroVisual />
        </div>
      </section>

      <section className={styles.serviceAreas} id="automatisierungsfelder" aria-labelledby="service-areas-heading">
        <div className="container">
          <Reveal>
            <div className={styles.sectionIntro}>
              <div>
                <p className="eyebrow">Konkrete Arbeitsfelder</p>
                <h2 id="service-areas-heading">Wo Automatisierung im Alltag Zeit spart</h2>
              </div>
              <p>Geeignet sind vor allem häufige, wiederkehrende Abläufe mit klaren Eingängen und Ergebnissen. Je Karte sehen Sie, was heute manuell ist, was der Workflow übernimmt und wo Menschen eingebunden bleiben.</p>
            </div>
          </Reveal>

          <div className={styles.areaGrid}>
            {serviceAreas.map((area, index) => (
              <Reveal key={area.title}>
                <article className={styles.areaCard}>
                  <div className={styles.areaCardHead}>
                    <span className={styles.iconBox}><ServiceIcon name={area.icon} /></span>
                    <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3>{area.title}</h3>
                  <dl className={styles.cardDefinition}>
                    <div><dt>Heute</dt><dd>{area.problem}</dd></div>
                    <div><dt>Automatisiert</dt><dd>{area.automation}</dd></div>
                    <div><dt>Mensch bleibt</dt><dd>{area.control}</dd></div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
          <p className={styles.contextLink}><a className="text-link" href="/anwendungsfaelle">Weitere Anwendungsfälle für HR, Verwaltung und Reporting ansehen <span aria-hidden="true">→</span></a></p>
        </div>
      </section>

      <section className={styles.decisionSection} aria-labelledby="decision-heading">
        <div className="container">
          <Reveal>
            <div className={styles.decisionIntro}>
              <div>
                <p className="eyebrow eyebrow-light">Technische Entscheidung</p>
                <h2 id="decision-heading">Nicht jeder gute Workflow braucht KI.</h2>
              </div>
              <p>Wir wählen pro Schritt die einfachste verlässliche Lösung. So bleibt der Ablauf verständlich, wartbar und passend zum tatsächlichen Risiko.</p>
            </div>
          </Reveal>
          <div className={styles.decisionTrack}>
            {decisionModes.map((mode) => (
              <article key={mode.number} className={styles.decisionCard}>
                <div><span>{mode.number}</span><p>{mode.label}</p></div>
                <h3>{mode.title}</h3>
                <p>{mode.text}</p>
                <small>{mode.examples}</small>
              </article>
            ))}
          </div>
          <div className={styles.controlNote}>
            <span aria-hidden="true">✓</span>
            <p><strong>Menschliche Freigabe ist kein Pflichtschritt in jedem Ablauf.</strong> Sie wird dort eingebaut, wo Risiko, Unklarheit oder Verantwortung es erfordern. Ausnahmen können gezielt eskaliert werden, ohne den Normalfall auszubremsen.</p>
          </div>
        </div>
      </section>

      <section className={styles.examplesSection} aria-labelledby="examples-heading">
        <div className="container">
          <Reveal>
            <div className={styles.sectionIntro}>
              <div>
                <p className="eyebrow">Beispielprozesse</p>
                <h2 id="examples-heading">So kann eine Lösung aufgebaut sein</h2>
              </div>
              <p>Die Beispiele sind Demonstratoren, keine Kundenreferenzen. Im Projekt werden Schritte, Systeme und Freigaben auf Ihren tatsächlichen Ablauf abgestimmt.</p>
            </div>
          </Reveal>
          <div className={styles.exampleList}>
            {exampleFlows.map((flow, flowIndex) => (
              <Reveal key={flow.label}>
                <article className={styles.exampleCard}>
                  <header className={styles.exampleHead}>
                    <div><span>Demonstrator {String(flowIndex + 1).padStart(2, '0')}</span><h3>{flow.label}</h3></div>
                    <p>{flow.context}</p>
                  </header>
                  <ol className={styles.flowSteps}>
                    {flow.steps.map((step, stepIndex) => (
                      <li key={step} className={stepIndex === 3 ? styles.humanStep : undefined}>
                        <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                        <strong>{step}</strong>
                      </li>
                    ))}
                  </ol>
                  <p className={styles.exampleNote}>{flow.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className={styles.inlineCta}>
            <p><strong>Einen ähnlichen Ablauf im Unternehmen?</strong> Ein konkreter Prozess reicht als Ausgangspunkt.</p>
            <a className="text-link" href="/automation-check">Mit einem Prozess starten <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className={styles.deliverySection} aria-labelledby="delivery-heading">
        <div className="container">
          <Reveal>
            <div className={styles.sectionIntro}>
              <div>
                <p className="eyebrow">Zusammenarbeit</p>
                <h2 id="delivery-heading">Vom ersten Prozessbild bis zur geregelten Übergabe</h2>
              </div>
              <p>Der Einstieg ist klein und konkret. Umfang, Technik und weitere Schritte werden erst festgelegt, wenn der Prozess verstanden und der Nutzen eines Piloten plausibel ist.</p>
            </div>
          </Reveal>
          <ol className={styles.deliveryGrid}>
            {projectSteps.map((step) => (
              <li key={step.number}>
                <span className={styles.deliveryNumber}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div><small>Ergebnis</small><strong>{step.result}</strong></div>
              </li>
            ))}
          </ol>
          <p className={styles.deliveryFootnote}>Typischer Umfang und Verantwortlichkeiten werden nach dem Automation Check gemeinsam festgelegt. Betrieb und laufende Optimierung sind optional und werden separat vereinbart.</p>
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="trust-heading">
        <div className="container">
          <Reveal>
            <div className={styles.trustTitle}>
              <p className="eyebrow">Realistische Erwartungen</p>
              <h2 id="trust-heading">Pragmatisch im Aufbau. Transparent in den Grenzen.</h2>
            </div>
          </Reveal>
          <div className={styles.trustGrid}>
            <article className={styles.expectCard}>
              <p className={styles.panelLabel}>Was Sie erwarten können</p>
              <ul>{expectations.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
            </article>
            <article className={styles.boundaryCard}>
              <p className={styles.panelLabel}>Was wir bewusst nicht versprechen</p>
              <div>{boundaries.map(([title, text]) => <section key={title}><h3>{title}</h3><p>{text}</p></section>)}</div>
            </article>
          </div>
          <div className={styles.engineeringBar}>
            <div><span>01</span><p><strong>Prozess vor Technologie</strong> Erst verstehen, dann bauen.</p></div>
            <div><span>02</span><p><strong>Bestehende Systeme zuerst</strong> Integrieren, wo es sinnvoll ist.</p></div>
            <div><span>03</span><p><strong>Pilot vor Skalierung</strong> Nutzen prüfen, bevor der Umfang wächst.</p></div>
            <div><span>04</span><p><strong>Umsetzung statt Folien</strong> Workflow, Test und Übergabe gehören zusammen.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.technologySection} aria-labelledby="technology-heading">
        <div className={`container ${styles.technologyGrid}`}>
          <div>
            <p className="eyebrow">Technik & Verlässlichkeit</p>
            <h2 id="technology-heading">Technologie folgt dem Prozess.</h2>
            <p>Je nach Aufgabe verbinden wir vorhandene SaaS-Systeme, Microsoft 365 oder Google Workspace über APIs, Datenbanken, Low-Code-Workflows, n8n, KI-Modelle oder eine schlanke eigene Oberfläche. Das Werkzeug ist Mittel zum Zweck – nicht das Produkt.</p>
          </div>
          <dl className={styles.principleList}>
            <div><dt>Zugriff</dt><dd>Berechtigungen und Verantwortlichkeiten werden pro Workflow festgelegt.</dd></div>
            <div><dt>Daten</dt><dd>Es werden nur die Informationen verarbeitet, die der Ablauf benötigt.</dd></div>
            <div><dt>Betrieb</dt><dd>Fehlerwege, Protokollierung und Eingriffspunkte werden mitgeplant.</dd></div>
            <div><dt>Dokumentation</dt><dd>Datenflüsse, Systeme und Freigaben bleiben nachvollziehbar.</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="services-cta-heading">
        <div className={`container ${styles.finalCtaGrid}`}>
          <div>
            <p className="eyebrow eyebrow-light">Automation Check</p>
            <h2 id="services-cta-heading">Sie müssen noch nicht wissen, wie die Lösung aussieht.</h2>
            <p>Zeigen Sie uns den Prozess. Wir prüfen, was sich sinnvoll automatisieren lässt, welche Systeme beteiligt sind, wo Risiken liegen und welcher nächste Schritt realistisch ist.</p>
          </div>
          <div className={styles.checkPanel}>
            <p>Was Sie aus dem Gespräch mitnehmen</p>
            <ul>
              <li>Eignung des Ablaufs</li>
              <li>mögliche Automatisierungsschritte</li>
              <li>benötigte Systeme und Daten</li>
              <li>Risiken und nächste Empfehlung</li>
            </ul>
            <a className="button button-light" href="/automation-check">Prozess kostenlos prüfen lassen <span className="button-arrow" aria-hidden="true">→</span></a>
            <small>Unverbindlich · konkret · ohne pauschale Automatisierungsversprechen</small>
          </div>
        </div>
      </section>
    </main>
  );
}
