'use client';

import Image from 'next/image';
import { useState } from 'react';

const navigation = [
  ['Leistungen', '#leistungen'],
  ['Anwendungsfälle', '#anwendungsfaelle'],
  ['Vorgehen', '#vorgehen'],
  ['Über uns', '#ueber-uns']
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="MSB AI & Automation Startseite" onClick={closeMenu}>
          <Image
            className="brand-logo"
            src="/msb-logo.webp"
            alt=""
            width={512}
            height={512}
            priority
            sizes="56px"
            aria-hidden="true"
          />
          <span className="brand-copy">
            <strong>MSB</strong>
            <small>AI &amp; Automation</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Navigation schließen' : 'Navigation öffnen'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Hauptnavigation"
        >
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a className="button button-primary mobile-nav-cta" href="#kontakt" onClick={closeMenu}>
            Automation Check anfragen
          </a>
        </nav>

        <a className="button button-primary header-cta" href="#kontakt">
          Automation Check anfragen
        </a>
      </div>
    </header>
  );
}

export default SiteHeader;
