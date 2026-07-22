import { Reveal } from '@/components/reveal';
import { EnablementVisual, IntegrationVisual, ProcessVisual } from '@/components/service-detail-visuals';
import ServicesHeroVisual from '@/components/services-hero-visual';
import StructuredData from '@/components/structured-data';
import { createPageMetadata, siteUrl } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'KI- & Prozessautomatisierung für KMU',
  description: 'Prozessanalyse, Automatisierungspilot und kontrollierte Einführung: MSB entwickelt verlässliche Workflows für bestehende Systeme.',
  path: '/leistungen'
});

const serviceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}/leistungen#service`,
  name: 'KI- und Prozessautomatisierung für KMU',
  serviceType: 'Analyse, Entwicklung und Einführung von Geschäftsprozessautomatisierung',
  url: `${siteUrl}/leistungen`,
  provider: { '@id': `${siteUrl}/#organization` },
  areaServed: ['Tübingen', 'Reutlingen', 'Stuttgart', 'Baden-Württemberg'],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Kleine und mittlere Unternehmen'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Leistungsbausteine',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Prozessanalyse' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatisierungspilot' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integration und Übergabe' } }
    ]
  }
};

const serviceBlocks = [
  {
    number: '01',
    title: 'Prozess klären',
    lead: 'Am Anfang steht kein Tool, sondern ein Ablauf, der Zeit kostet.',
    description: 'In einem Arbeitsgespräch zeichnen wir den heutigen Ablauf nach: Was löst ihn aus? Wer bearbeitet welchen Schritt? Welche Systeme und Daten sind beteiligt? Wo entstehen Rückfragen, Wartezeiten oder Ausnahmen?',
    outputs: [
      'Ist-Ablauf mit Rollen, Systemen und Freigaben',
      'Liste der Normal- und Ausnahmefälle',
      'Entscheidung: vereinfachen, automatisieren oder belassen'
    ],
    link: '/automation-check',
    linkLabel: 'Eigenen Ablauf prüfen',
    visual: 'process'
  },
  {
    number: '02',
    title: 'Pilot bauen',
    lead: 'Wir automatisieren zuerst einen kleinen, klar abgegrenzten Teil.',
    description: 'Gemeinsam legen wir Eingang, Regeln, Daten, Freigabe und Zielsystem fest. Danach testen wir den Workflow mit typischen Fällen und bewusst gewählten Ausnahmen – bevor er in den Arbeitsalltag kommt.',
    outputs: [
      'laufender Pilot in einer abgestimmten Testumgebung',
      'Testfälle für Normalfall, Ausnahme und Fehler',
      'Messwerte zu Zeitaufwand, Fehlern und manuellen Eingriffen'
    ],
    link: '/anwendungsfaelle',
    linkLabel: 'Beispiele für mögliche Piloten',
    visual: 'integration'
  },
  {
    number: '03',
    title: 'In Betrieb übergeben',
    lead: 'Vor dem Start muss klar sein, wer prüft, eingreift und Änderungen freigibt.',
    description: 'Wir dokumentieren den Workflow, üben reale Fälle mit den beteiligten Personen und legen fest, wie Fehler, Änderungen und neue Ausnahmen behandelt werden. Erst dann erfolgt die Übergabe.',
    outputs: [
      'Betriebsdokumentation mit Prüf- und Eingriffspunkten',
      'Schulung anhand realer Fälle',
      'benannte Verantwortung für Betrieb und Änderungen'
    ],
    link: '/vorgehen',
    linkLabel: 'Projektablauf im Detail',
    visual: 'enablement'
  }
] as const;

const boundaries = [
  ['Nicht jeder Ablauf wird automatisiert', 'Wenn Vereinfachen oder Weglassen reicht, empfehlen wir keinen technischen Aufbau.'],
  ['Keine Zahl ohne Datengrundlage', 'Zeitgewinn und Aufwand lassen sich erst am konkreten Ablauf sinnvoll einschätzen.'],
  ['Bestehende Systeme zuerst', 'Wir prüfen vorhandene Schnittstellen und Werkzeuge, bevor ein Systemwechsel zur Diskussion steht.'],
  ['Betrieb gehört zum Projekt', 'Prüfung, Dokumentation und Verantwortung enden nicht mit dem technischen Pilot.']
] as const;

function ServiceVisual({ type }: { type: (typeof serviceBlocks)[number]['visual'] }) {
  if (type === 'process') return <ProcessVisual />;
  if (type === 'integration') return <IntegrationVisual />;
  return <EnablementVisual />;
}

export default function LeistungenPage() {
  return (
    <main id="main-content">
      <StructuredData data={serviceStructuredData} />
      <section className="services-hero">
        <div className="container services-hero-grid">
          <div className="services-hero-copy">
            <p className="eyebrow">Leistungen</p>
            <h1><span>Prozessautomatisierung,</span>{' '}<span>die im Alltag funktioniert.</span></h1>
            <p>Wir klären den Ist-Prozess, wählen bewusst zwischen Regeln und KI, bauen einen begrenzten Piloten und übergeben ihn mit dokumentierten Prüf- und Eingriffspunkten an Ihr Team.</p>
          </div>
          <ServicesHeroVisual />
        </div>
      </section>

      <section className="services-editorial-section" aria-labelledby="service-detail-heading">
        <div className="container">
          <div className="services-section-intro">
            <div>
              <p className="eyebrow">Leistungsumfang</p>
              <h2 id="service-detail-heading">Drei Arbeitspakete – einzeln oder zusammen.</h2>
            </div>
            <p>Ihr Prozess ist schon beschrieben? Dann können wir beim Pilot starten. Noch unklar? Dann beginnen wir mit dem heutigen Ablauf.</p>
          </div>

          <div className="services-rows">
            {serviceBlocks.map((service, index) => (
              <Reveal key={service.title} className="service-row-reveal">
                <article className={`service-editorial-row${index % 2 ? ' service-row-reverse' : ''}`}>
                  <div className="service-content">
                    <div className="service-title-line"><span>{service.number}</span><h3>{service.title}</h3></div>
                    <p className="service-lead">{service.lead}</p>
                    <p className="service-description">{service.description}</p>
                    <div className="service-outputs">
                      <h4>Ergebnis dieses Arbeitspakets</h4>
                      <ul>{service.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
                    </div>
                    <a className="text-link" href={service.link}>{service.linkLabel} <span aria-hidden="true">→</span></a>
                  </div>
                  <ServiceVisual type={service.visual} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-boundaries" aria-labelledby="boundaries-heading">
        <div className="container">
          <div className="services-boundaries-head">
            <p className="eyebrow">Vor Projektstart</p>
            <h2 id="boundaries-heading">Was wir nicht schönrechnen</h2>
          </div>
          <div className="services-boundaries-grid">
            {boundaries.map(([title, text]) => (
              <article key={title}><span aria-hidden="true">✓</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final-cta" aria-labelledby="services-cta-heading">
        <div className="container services-final-cta-grid">
          <div>
            <p className="eyebrow eyebrow-light">Nächster Schritt</p>
            <h2 id="services-cta-heading">Welcher Ablauf kostet jede Woche Zeit?</h2>
            <p>Bringen Sie ein konkretes Beispiel mit. In 30–45 Minuten skizzieren wir Eingang, Bearbeitung, Ausnahme und Ergebnis. Danach wissen Sie, ob ein nächster Schritt sinnvoll ist.</p>
          </div>
          <div className="services-final-actions">
            <a className="button button-light" href="/automation-check">Ablauf gemeinsam prüfen <span className="button-arrow" aria-hidden="true">→</span></a>
            <a className="text-link text-link-light" href="/vorgehen">Ablauf des Gesprächs ansehen <span aria-hidden="true">→</span></a>
            <p>Kostenlos · 30–45 Minuten · ohne Projektbindung</p>
          </div>
        </div>
      </section>
    </main>
  );
}
