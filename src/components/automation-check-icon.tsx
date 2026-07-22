import type { ReactNode } from 'react';

export type AutomationCheckIconName =
  | 'people'
  | 'mail'
  | 'chart'
  | 'database'
  | 'file'
  | 'book'
  | 'other'
  | 'input'
  | 'manual'
  | 'automation'
  | 'system'
  | 'human'
  | 'output';

type Props = {
  name: AutomationCheckIconName;
  className?: string;
};

export function AutomationCheckIcon({ name, className }: Props) {
  const paths: Record<AutomationCheckIconName, ReactNode> = {
    people: <><circle cx="9" cy="8" r="3" /><path d="M3.8 19c.4-4 2.1-6 5.2-6s4.8 2 5.2 6M16 7.5a2.5 2.5 0 0 1 0 5M16.5 13c2.3.4 3.5 2.1 3.8 5" /></>,
    mail: <><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="m3 7 9 7 9-7" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /><path d="m4 7 5-4 6 6 6-5" /></>,
    database: <><ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" /></>,
    file: <><path d="M6 2.5h8l4 4V22H6zM14 2.5v5h4M9 12h6M9 16h6" /></>,
    book: <><path d="M3.5 4.5h6A2.5 2.5 0 0 1 12 7v13a2.5 2.5 0 0 0-2.5-2.5h-6zM20.5 4.5h-6A2.5 2.5 0 0 0 12 7v13a2.5 2.5 0 0 1 2.5-2.5h6z" /></>,
    other: <><path d="M4 7h10M4 12h16M4 17h8" /><circle cx="18" cy="7" r="2" /><circle cx="15" cy="17" r="2" /></>,
    input: <><path d="M3 12h15M14 7l5 5-5 5" /><path d="M4 5v14" /></>,
    manual: <><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V10M10 10V5.5a1.5 1.5 0 0 1 3 0V10M13 10V7a1.5 1.5 0 0 1 3 0v4M16 11V9a1.5 1.5 0 0 1 3 0v5c0 5-3 7-7 7s-7-2.5-7-7v-2a1.5 1.5 0 0 1 2-1z" /></>,
    automation: <><path d="m12 2 1.5 4.1L18 5l-1.1 4.5L21 12l-4.1 2.5L18 19l-4.5-1.1L12 22l-1.5-4.1L6 19l1.1-4.5L3 12l4.1-2.5L6 5l4.5 1.1z" /><circle cx="12" cy="12" r="3" /></>,
    system: <><rect x="3" y="4" width="18" height="13" rx="1.5" /><path d="M8 21h8M12 17v4M6 8h7M6 12h11" /></>,
    human: <><circle cx="12" cy="7" r="3.5" /><path d="M5 21c.5-5 2.8-7.5 7-7.5s6.5 2.5 7 7.5" /></>,
    output: <><path d="M6 4h14v16H6M3 12h12M11 8l4 4-4 4" /></>
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default AutomationCheckIcon;
