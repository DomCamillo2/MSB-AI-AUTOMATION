'use client';

import { usePathname } from 'next/navigation';
import { navigation, footerSecondaryLinks } from '@/lib/site-content';
import ConsentSettingsButton from '@/components/consent-settings-button';

function MailIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M6.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 5 6a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  );
}

export function SiteFooter() {
  const pathname = usePathname();

  const normalizedPathname = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (normalizedPathname === '/automation-check') {
    return (
      <footer className="site-footer automation-check-footer">
        <div className="container footer-meta">
          <p>MSB AI &amp; Automation · Erste Orientierung, keine vollständige Prozessanalyse</p>
          <nav className="footer-links" aria-label="Rechtliches">
            <a href="/impressum/">Impressum</a>
            <a href="/datenschutz/">Datenschutz</a>
            <ConsentSettingsButton />
          </nav>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <div className="footer-intro">
          <strong className="footer-brand">MSB AI &amp; Automation</strong>
          <p>Wiederkehrende Abläufe in Verwaltung, HR und Reporting automatisieren – mit festen Regeln, klaren Freigaben und Ihrer bestehenden IT.</p>
          <a className="footer-region" href="/ki-prozessautomatisierung-tuebingen-stuttgart/">
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
          {footerSecondaryLinks.map(({ label, href }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="footer-contact">
          <span className="footer-label">Kontakt</span>
          <strong>Direkt erreichbar aus Tübingen</strong>
          <p className="footer-contact-note">
            Für Rückfragen oder eine kurze Prozessskizze – per E-Mail, Telefon oder Kontaktformular.
          </p>
          <ul className="footer-contact-links">
            <li>
              <a className="footer-contact-link" href="mailto:kontakt@msb-ai.de">
                <MailIcon />
                <span>kontakt@msb-ai.de</span>
              </a>
            </li>
            <li>
              <a className="footer-contact-link" href="tel:+491606969914">
                <PhoneIcon />
                <span>0160&nbsp;6969914</span>
              </a>
            </li>
          </ul>
          <a className="text-link text-link-light footer-contact-form" href="/kontakt/">
            Zum Kontaktformular <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="container footer-meta">
        <p>MSB AI &amp; Automation</p>
        <nav className="footer-links" aria-label="Rechtliches">
          <a href="/kontakt/">Kontakt</a>
          <a href="/impressum/">Impressum</a>
          <a href="/datenschutz/">Datenschutz</a>
          <a href="/sicherheit/">Sicherheit</a>
          <ConsentSettingsButton />
        </nav>
      </div>
    </footer>
  );
}

export default SiteFooter;
