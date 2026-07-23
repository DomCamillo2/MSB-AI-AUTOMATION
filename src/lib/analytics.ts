export const GA_MEASUREMENT_ID = 'G-P2P7JJ6QV2';
export const CONSENT_STORAGE_KEY = 'msb_consent_v1';
export const CONSENT_VERSION = 1;

export type ConsentChoice = {
  version: typeof CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  decidedAt: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    msbLastTrackedPath?: string;
  }
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<ConsentChoice>;

    if (
      parsed.version !== CONSENT_VERSION ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.decidedAt !== 'string'
    ) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return parsed as ConsentChoice;
  } catch {
    return null;
  }
}

export function storeConsent(analytics: boolean): ConsentChoice {
  const choice: ConsentChoice = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString()
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // The choice remains valid for the current page if browser storage is unavailable.
  }
  return choice;
}

export function analyticsAllowed() {
  return readConsent()?.analytics === true;
}

export function trackAnalyticsEvent(
  eventName:
    | 'cta_click'
    | 'automation_check_start'
    | 'automation_check_step'
    | 'automation_check_complete'
    | 'automation_check_contact_start'
    | 'contact_submit'
    | 'email_click'
    | 'phone_click',
  parameters: Record<string, string>
) {
  if (!analyticsAllowed() || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, parameters);
}

export function trackPageView(pathname: string) {
  if (!analyticsAllowed() || typeof window.gtag !== 'function' || window.msbLastTrackedPath === pathname) return;

  window.msbLastTrackedPath = pathname;
  window.gtag('event', 'page_view', {
    page_location: `${window.location.origin}${pathname}`,
    page_path: pathname,
    page_title: document.title
  });
}

export function removeAnalyticsCookies() {
  if (typeof document === 'undefined') return;

  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  const hostname = window.location.hostname;
  const domains = ['', hostname, `.${hostname}`, 'msb-ai.de', '.msb-ai.de', 'www.msb-ai.de', '.www.msb-ai.de'];

  cookieNames.forEach((name) => {
    domains.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax; Secure`;
    });
  });
}
