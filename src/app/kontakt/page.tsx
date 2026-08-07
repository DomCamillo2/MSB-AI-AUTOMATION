import PageIntro from '@/components/page-intro';
import ContactOptionsGrid from '@/components/contact-options-grid';
import ContactPanel from '@/components/contact-panel';
import { Reveal } from '@/components/reveal';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Kontakt & Erstgespräch',
  description: 'Kontaktieren Sie MSB AI & Automation aus Tübingen oder beschreiben Sie einen wiederkehrenden Prozess für den kostenlosen Automation Check.',
  path: '/kontakt'
});

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
            <p>Für eine erste Prozesseinschätzung ist das sichere Formular am schnellsten. Für alles andere können Sie uns weiterhin direkt schreiben.</p>
          </Reveal>
          <ContactOptionsGrid />
        </div>
      </section>

      <section className="section contact-section contact-page-section" aria-labelledby="contact-panel-heading">
        <div className="container">
          <ContactPanel />
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
