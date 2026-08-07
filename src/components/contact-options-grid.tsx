import { RevealGroup } from '@/components/reveal';
import styles from './contact-options-grid.module.css';

type ContactOptionIconName = 'check' | 'mail' | 'phone';

const contactOptions = [
  {
    icon: 'check' as const,
    label: 'Konkreten Prozess prüfen',
    title: 'Kostenloser Automation Check',
    text: 'Beschreiben Sie einen wiederkehrenden Ablauf. Wir ordnen Nutzen, Machbarkeit und Risiken in einem ersten Gespräch ein.',
    href: '/automation-check',
    action: 'Automation Check starten'
  },
  {
    icon: 'mail' as const,
    label: 'Allgemeine Anfrage',
    title: 'Direkt per E-Mail',
    text: 'Für Kooperationen, Rückfragen oder eine kurze Einordnung erreichen Sie uns direkt. Bitte senden Sie keine sensiblen Kunden- oder Personaldaten.',
    href: 'mailto:kontakt@msb-ai.de',
    action: 'kontakt@msb-ai.de'
  },
  {
    icon: 'phone' as const,
    label: 'Telefonisch',
    title: 'Kurz anrufen',
    text: 'Für eine schnelle Klärung erreichen Sie uns unter der angegebenen Mobilnummer. Sensible Kundendaten bitte nicht am Telefon durchgeben.',
    href: 'tel:+491606969914',
    action: '0160 6969914'
  }
] as const;

function ContactOptionIcon({ name }: { name: ContactOptionIconName }) {
  if (name === 'check') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 5H7.5A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5V15" />
        <path d="M9 12.5 11 14.5 16 9.5" />
        <path d="M14 5h5v5" />
        <path d="m19 5-6.5 6.5" />
      </svg>
    );
  }

  if (name === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 5 6a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  );
}

export function ContactOptionsGrid() {
  return (
    <RevealGroup className={styles.grid} stagger="normal">
      {contactOptions.map((option, index) => (
        <article className={styles.card} key={option.title} data-icon={option.icon}>
          <div className={styles.cardHead}>
            <span className={styles.iconWrap}>
              <ContactOptionIcon name={option.icon} />
            </span>
            <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <p className="eyebrow">{option.label}</p>
          <h3>{option.title}</h3>
          <p className={styles.text}>{option.text}</p>
          <a className={styles.link} href={option.href}>
            <span>{option.action}</span>
            <span className={styles.linkArrow} aria-hidden="true">→</span>
          </a>
        </article>
      ))}
    </RevealGroup>
  );
}

export default ContactOptionsGrid;
