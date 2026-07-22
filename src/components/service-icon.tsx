import type { ReactNode } from 'react';
import type { ServiceIconName } from '@/lib/service-detail-content';

type ServiceIconProps = {
  name: ServiceIconName;
  className?: string;
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const paths: Record<ServiceIconName, ReactNode> = {
    people: <><circle cx="9" cy="8" r="3" /><path d="M3.8 19c.4-4 2.1-6 5.2-6s4.8 2 5.2 6M16 7.5a2.5 2.5 0 0 1 0 5M16.5 13c2.3.4 3.5 2.1 3.8 5" /></>,
    database: <><ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /><path d="m4 7 5-4 6 6 6-5" /></>,
    file: <><path d="M6 2.5h8l4 4V22H6zM14 2.5v5h4M9 12h6M9 16h6" /></>,
    mail: <><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="m3 7 9 7 9-7" /></>,
    book: <><path d="M3.5 4.5h6A2.5 2.5 0 0 1 12 7v13a2.5 2.5 0 0 0-2.5-2.5h-6zM20.5 4.5h-6A2.5 2.5 0 0 0 12 7v13a2.5 2.5 0 0 1 2.5-2.5h6z" /></>
  };

  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[name]}</svg>;
}

export default ServiceIcon;
