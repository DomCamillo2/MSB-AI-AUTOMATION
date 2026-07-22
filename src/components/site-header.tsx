'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/lib/site-content';
import styles from './site-header.module.css';

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" aria-hidden="true">
      <path d="M3.5 8.5h9M9 5l3.5 3.5L9 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [usesMenu, setUsesMenu] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1279px)');
    const update = () => setUsesMenu(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 14);

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const nav = navigationRef.current;
    if (!nav) return;

    nav.inert = usesMenu && !menuOpen;
    if (!usesMenu || !menuOpen) return;

    const pageRegions = [...document.querySelectorAll<HTMLElement>('main, footer')];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pageRegions.forEach((region) => {
      region.inert = true;
    });

    nav.querySelector<HTMLAnchorElement>('a')?.focus();

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
  }, [menuOpen, usesMenu]);

  useEffect(() => {
    if (!usesMenu && menuOpen) setMenuOpen(false);
  }, [menuOpen, usesMenu]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className={joinClasses(styles.header, scrolled && styles.scrolled, menuOpen && styles.menuOpen)}
    >
      <div className={styles.rail}>
        <div className={styles.inner}>
          <svg
            className={styles.dock}
            viewBox="0 0 208 30"
            preserveAspectRatio="none"
            shapeRendering="geometricPrecision"
            aria-hidden="true"
          >
            <path d="M0 0H27C40 0 48 4 54 15L58 21C62 27 70 29 82 29H126C138 29 146 27 150 21L154 15C160 4 168 0 181 0H208V0H0Z" />
            <path d="M0 .65H27C40 .65 48 4 54 15L58 21C62 27 70 29 82 29H126C138 29 146 27 150 21L154 15C160 4 168 .65 181 .65H208" />
          </svg>

          <button
            ref={menuButtonRef}
            className={styles.menuToggle}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Navigation schließen' : 'Navigation öffnen'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <a className={styles.brand} href="/" aria-label="MSB AI & Automation Startseite" onClick={closeMenu}>
            <Image
              className={styles.logo}
              src="/msb-wordmark.png"
              alt=""
              width={1813}
              height={545}
              priority
              sizes="(max-width: 767px) 100px, (max-width: 1279px) 106px, 118px"
              aria-hidden="true"
            />
            <span className={styles.brandText} aria-hidden="true">
              <strong>AI &amp; Automation</strong>
              <small>mit Menschenverstand</small>
            </span>
          </a>

          <nav
            ref={navigationRef}
            id="primary-navigation"
            className={joinClasses(styles.nav, menuOpen && styles.navOpen)}
            aria-label="Hauptnavigation"
            aria-hidden={usesMenu && !menuOpen ? true : undefined}
          >
            {navigation.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <a
                  key={href}
                  className={joinClasses(styles.navLink, active && styles.activeLink)}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  tabIndex={usesMenu && !menuOpen ? -1 : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              );
            })}
            <a
              className={styles.menuContact}
              href="mailto:kontakt@msb-ai.de"
              tabIndex={usesMenu && !menuOpen ? -1 : undefined}
              onClick={closeMenu}
            >
              Kontakt
            </a>
            <a
              className={styles.menuCta}
              href="/automation-check"
              tabIndex={usesMenu && !menuOpen ? -1 : undefined}
              onClick={closeMenu}
            >
              Prozess kostenlos prüfen lassen
            </a>
          </nav>

          <div className={styles.actions}>
            <a className={styles.contactLink} href="mailto:kontakt@msb-ai.de">
              Kontakt
            </a>
            <a
              className={styles.cta}
              href="/automation-check"
              aria-current={pathname === '/automation-check' ? 'page' : undefined}
            >
              Automation Check
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
