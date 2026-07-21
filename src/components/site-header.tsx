'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/lib/site-content';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1279px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 16);

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    const navigationElement = navigationRef.current;
    if (!navigationElement) return;

    navigationElement.inert = isMobile && !menuOpen;
    if (!isMobile || !menuOpen) return;

    const pageRegions = [...document.querySelectorAll<HTMLElement>('main, footer')];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pageRegions.forEach((region) => {
      region.inert = true;
    });
    navigationElement.querySelector<HTMLAnchorElement>('a')?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !headerRef.current) return;
      const focusable = [...headerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
        .filter((element) => element.getClientRects().length > 0 && element.tabIndex !== -1);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      pageRegions.forEach((region) => {
        region.inert = false;
      });
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, menuOpen]);

  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile, menuOpen]);

  function handleNavigation() {
    setMenuOpen(false);
  }

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="MSB AI & Automation Startseite" onClick={handleNavigation}>
          <Image
            className="brand-logo"
            src="/msb-wordmark.png"
            alt=""
            width={1813}
            height={545}
            loading="eager"
            sizes="(max-width: 480px) 96px, (max-width: 1279px) 104px, 118px"
            aria-hidden="true"
          />
        </a>

        <button
          ref={menuButtonRef}
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
          ref={navigationRef}
          id="primary-navigation"
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Hauptnavigation"
          aria-hidden={isMobile && !menuOpen ? true : undefined}
        >
          {navigation.map(({ label, href }) => (
            <a
              key={href}
              className={pathname === href ? 'is-active' : undefined}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              tabIndex={isMobile && !menuOpen ? -1 : undefined}
              onClick={handleNavigation}
            >
              {label}
            </a>
          ))}
          <a
            className="mobile-nav-contact"
            href="mailto:kontakt@msb-ai.de"
            tabIndex={isMobile && !menuOpen ? -1 : undefined}
            onClick={handleNavigation}
          >
            Kontakt
          </a>
          <a
            className="button button-primary mobile-nav-cta"
            href="/automation-check"
            tabIndex={isMobile && !menuOpen ? -1 : undefined}
            onClick={handleNavigation}
          >
            Prozess kostenlos prüfen lassen
          </a>
        </nav>

        <a
          className={`button button-primary header-cta${pathname === '/automation-check' ? ' is-active' : ''}`}
          href="/automation-check"
          aria-current={pathname === '/automation-check' ? 'page' : undefined}
        >
          Prozess kostenlos prüfen lassen
        </a>
      </div>
    </header>
  );
}

export default SiteHeader;
