import type { Metadata } from 'next';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <main id="main-content" className="page-shell">
      <section className="not-found-section">
        <Reveal className="container not-found-panel">
          <p className="eyebrow">Fehler 404</p>
          <h1>Diese Seite gibt es nicht.</h1>
          <p>Vielleicht wurde die Adresse geändert. Über die Startseite finden Sie Leistungen, Anwendungsfälle und den Automation Check.</p>
          <div className="not-found-actions">
            <a className="button button-primary" href="/">Zur Startseite <span className="button-arrow" aria-hidden="true">→</span></a>
            <a className="text-link" href="/automation-check">Prozess prüfen lassen <span aria-hidden="true">→</span></a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
