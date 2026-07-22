'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackAnalyticsEvent, trackPageView } from '@/lib/analytics';

function pageType(pathname: string) {
  if (pathname === '/') return 'home';
  return pathname.slice(1).replaceAll('/', '_') || 'unknown';
}

function clickLocation(element: Element) {
  if (element.closest('header')) return 'header';
  if (element.closest('footer')) return 'footer';
  return element.closest('[data-analytics-location]')?.getAttribute('data-analytics-location') || 'content';
}

export function AnalyticsInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    window.requestAnimationFrame(() => trackPageView(pathname));
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!target) return;

      const location = clickLocation(target);
      const currentPage = pageType(pathname);
      const href = target.getAttribute('href') || '';

      if (href === '/automation-check' || href.startsWith('/automation-check#')) {
        trackAnalyticsEvent('cta_click', {
          cta_name: 'automation_check',
          cta_location: location,
          page_type: currentPage
        });
      } else if (href.startsWith('mailto:')) {
        trackAnalyticsEvent('email_click', {
          cta_location: location,
          page_type: currentPage
        });
      } else if (href.startsWith('tel:')) {
        trackAnalyticsEvent('phone_click', {
          cta_location: location,
          page_type: currentPage
        });
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
}

export default AnalyticsInteractions;
