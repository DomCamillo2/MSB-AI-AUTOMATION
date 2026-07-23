'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  GA_MEASUREMENT_ID,
  type ConsentChoice,
  readConsent,
  removeAnalyticsCookies,
  storeConsent,
  trackPageView
} from '@/lib/analytics';
import styles from './consent-manager.module.css';

const deniedConsent = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
} as const;

function loadGoogleAnalytics(pathname: string) {
  if (document.getElementById('msb-google-analytics')) {
    trackPageView(pathname);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('consent', 'default', deniedConsent);
  window.gtag('consent', 'update', {
    ...deniedConsent,
    analytics_storage: 'granted'
  });
  window.gtag('set', 'ads_data_redaction', true);

  const script = document.createElement('script');
  script.id = 'msb-google-analytics';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.addEventListener('load', () => {
    window.gtag?.('js', new Date());
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_flags: 'SameSite=Lax;Secure'
    });
    trackPageView(pathname);
  }, { once: true });
  document.head.appendChild(script);
}

function disableGoogleAnalytics() {
  document.getElementById('msb-google-analytics')?.remove();
  removeAnalyticsCookies();
  window.gtag = undefined;
  window.dataLayer = undefined;
  window.msbLastTrackedPath = undefined;
}

type ConsentManagerProps = {
  analyticsEnabled: boolean;
};

export function ConsentManager({ analyticsEnabled }: ConsentManagerProps) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    setDraftAnalytics(stored?.analytics ?? false);
    setReady(true);
  }, []);

  useEffect(() => {
    if (choice?.analytics && analyticsEnabled) loadGoogleAnalytics(pathname);
  }, [analyticsEnabled, choice, pathname]);

  const openSettings = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDraftAnalytics(choice?.analytics ?? false);
    setSettingsOpen(true);
  }, [choice]);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  useEffect(() => {
    function handleOpenSettings() {
      openSettings();
    }

    window.addEventListener('msb:open-consent', handleOpenSettings);
    return () => window.removeEventListener('msb:open-consent', handleOpenSettings);
  }, [openSettings]);

  useEffect(() => {
    if (!settingsOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.querySelector<HTMLElement>('button, input, a[href]')?.focus();

    const backgroundElements = [
      ...document.querySelectorAll('body > header, body > main, body > footer, body > div > header, body > div > main, body > div > footer')
    ];
    const previousOverflow = document.body.style.overflow;
    backgroundElements.forEach((element) => element.setAttribute('inert', ''));
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSettings();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>('button, input, a[href]')]
        .filter((element) => !element.hasAttribute('disabled'));
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
      document.removeEventListener('keydown', handleKeyDown);
      backgroundElements.forEach((element) => element.removeAttribute('inert'));
      document.body.style.overflow = previousOverflow;
    };
  }, [closeSettings, settingsOpen]);

  function saveChoice(analytics: boolean) {
    const hadAnalytics = choice?.analytics === true;
    const nextChoice = storeConsent(analytics);
    setChoice(nextChoice);
    setDraftAnalytics(analytics);
    setSettingsOpen(false);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());

    if (hadAnalytics && !analytics) {
      disableGoogleAnalytics();
      window.location.reload();
    }
  }

  if (!ready) return null;

  return (
    <>
      {!choice && !settingsOpen ? (
        <section className={styles.banner} aria-labelledby="consent-title" data-nosnippet>
          <div className={styles.bannerCopy}>
            <p className={styles.eyebrow}>Datenschutzeinstellungen</p>
            <h2 id="consent-title">Statistik nur mit Ihrer Zustimmung.</h2>
            <p>Notwendige Funktionen laufen immer. Google Analytics wird erst geladen, wenn Sie Statistik ausdrücklich erlauben. <a href="/datenschutz#google-analytics">Details im Datenschutz</a></p>
          </div>
          <div className={styles.bannerActions}>
            <button className={styles.acceptButton} type="button" onClick={() => saveChoice(true)}>Alle akzeptieren</button>
            <button className={styles.necessaryButton} type="button" onClick={() => saveChoice(false)}>Nur notwendige</button>
            <button className={styles.settingsButton} type="button" onClick={openSettings}>Einstellungen</button>
          </div>
        </section>
      ) : null}

      {settingsOpen ? (
        <div className={styles.backdrop} data-nosnippet>
          <div ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="consent-settings-title">
            <div className={styles.dialogHead}>
              <div>
                <p className={styles.eyebrow}>Datenschutzeinstellungen</p>
                <h2 id="consent-settings-title">Einwilligung verwalten</h2>
              </div>
              <button className={styles.closeButton} type="button" aria-label="Einstellungen schließen" onClick={closeSettings}>×</button>
            </div>
            <p className={styles.dialogIntro}>Sie können Statistik erlauben oder ablehnen. Die Website bleibt in beiden Fällen vollständig nutzbar.</p>

            <div className={styles.category}>
              <div><strong>Notwendig</strong><span>Immer aktiv</span></div>
              <p>Speichert ausschließlich Ihre versionierte Einwilligungsentscheidung im Browser.</p>
            </div>

            <label className={styles.category}>
              <div>
                <strong>Statistik</strong>
                <input aria-label="Statistik erlauben" type="checkbox" checked={draftAnalytics} onChange={(event) => setDraftAnalytics(event.target.checked)} />
              </div>
              <p>Google Analytics 4 mit der Mess-ID {GA_MEASUREMENT_ID}. Hilft uns, Seitenaufrufe und ausgewählte, nicht personenbezogene Interaktionen auszuwerten.</p>
            </label>

            <p className={styles.privacyNote}>Keine Werbekategorie, keine vorausgewählte Statistik und keine Übermittlung von Formularinhalten. <a href="/datenschutz#google-analytics">Datenschutzerklärung lesen</a></p>
            <div className={styles.dialogActions}>
              <button className={styles.acceptButton} type="button" onClick={() => saveChoice(draftAnalytics)}>Auswahl speichern</button>
              <button className={styles.necessaryButton} type="button" onClick={() => saveChoice(true)}>Alle akzeptieren</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ConsentManager;
