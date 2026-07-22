import { navigation } from '@/lib/site-content';
import ConsentSettingsButton from '@/components/consent-settings-button';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <div className="footer-intro">
          <strong className="footer-brand">MSB AI &amp; Automation</strong>
          <p>Pragmatische Prozessautomatisierung für KMU – verständlich, kontrollierbar und passend zu Ihrer bestehenden IT.</p>
          <a className="footer-region" href="/ki-prozessautomatisierung-tuebingen-stuttgart">
            Tübingen · Reutlingen · Stuttgart
          </a>
        </div>

        <nav className="footer-navigation" aria-label="Seitennavigation im Footer">
          <span className="footer-label">Navigation</span>
          {navigation.map(({ label, href }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="footer-contact">
          <span className="footer-label">Erster Schritt</span>
          <strong>Welcher Prozess kostet Sie regelmäßig Zeit?</strong>
          <a className="footer-email" href="mailto:kontakt@msb-ai.de">
            kontakt@msb-ai.de
          </a>
          <a className="button footer-cta" href="/automation-check">
            Prozess kostenlos prüfen lassen <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="container footer-meta">
        <p>MSB AI &amp; Automation</p>
        <nav className="footer-links" aria-label="Rechtliches">
          <a href="/kontakt">Kontakt</a>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
          <ConsentSettingsButton />
        </nav>
      </div>
    </footer>
  );
}

export default SiteFooter;
