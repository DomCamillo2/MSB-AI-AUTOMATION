import PageIntro from '@/components/page-intro';
import { Reveal, RevealGroup } from '@/components/reveal';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Kontakt & Erstgespräch',
  description: 'Kontaktieren Sie MSB AI & Automation aus Tübingen oder beschreiben Sie einen wiederkehrenden Prozess für den kostenlosen Automation Check.',
  path: '/kontakt'
});

const contactOptions = [
  {
    label: 'Konkreten Prozess prüfen',
    title: 'Kostenloser Automation Check',
    text: 'Beschreiben Sie einen wiederkehrenden Ablauf. Wir ordnen Nutzen, Machbarkeit und Risiken in einem ersten Gespräch ein.',
    href: '/automation-check',
    action: 'Automation Check starten'
  },
  {
    label: 'Allgemeine Anfrage',
    title: 'Direkt per E-Mail',
    text: 'Für Kooperationen, Rückfragen oder eine kurze Einordnung erreichen Sie uns direkt. Bitte senden Sie keine sensiblen Kunden- oder Personaldaten.',
    href: 'mailto:kontakt@msb-ai.de',
    action: 'kontakt@msb-ai.de'
  }
] as const;

export default function KontaktPage() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="Kontakt"
        title="Sprechen wir über einen echten Prozess."
        lead="Am hilfreichsten ist ein wiederkehrender Ablauf, bei dem heute Informationen gesucht, übertragen, geprüft oder aufbereitet werden."
        aside="MSB sitzt in Tübingen und begleitet Unternehmen in der Region Tübingen–Reutlingen–Stuttgart sowie remote."
      />

      <section className="section contact-route-section" aria-labelledby="contact-options-heading">
        <div className="container">
          <Reveal className="section-heading heading-split">
            <div>
              <p className="eyebrow">Der passende Weg</p>
              <h2 id="contact-options-heading">Worum geht es bei Ihrer Anfrage?</h2>
            </div>
            <p>Für eine erste Prozesseinschätzung ist der Automation Check am schnellsten. Für alles andere genügt eine E-Mail.</p>
          </Reveal>
          <RevealGroup className="contact-options-grid" stagger="normal">
            {contactOptions.map((option, index) => (
              <article key={option.title}>
                <div className="contact-option-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                <p className="eyebrow">{option.label}</p>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
                <a className="text-link" href={option.href}>{option.action} <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="contact-region-band" aria-labelledby="contact-region-heading">
        <Reveal className="container contact-region-layout">
          <div>
            <p className="eyebrow eyebrow-light">Region</p>
            <h2 id="contact-region-heading">Aus Tübingen. Für gewachsene Prozesse im Mittelstand.</h2>
          </div>
          <div>
            <p>Wie regionale Zusammenarbeit und kontrollierte Automatisierung bei MSB zusammenpassen, erläutern wir auf einer einzigen, gebündelten Regionalseite.</p>
            <a className="text-link text-link-light" href="/ki-prozessautomatisierung-tuebingen-stuttgart">
              Regionale Zusammenarbeit ansehen <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
