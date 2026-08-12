'use client';

import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import styles from './consent-toggle.module.css';

type ConsentToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

const spring = {
  type: 'spring' as const,
  stiffness: 560,
  damping: 26,
  mass: 0.55
};

export function ConsentToggle({ checked, onChange, label }: ConsentToggleProps) {
  const reducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={styles.switch}
      data-checked={checked ? 'true' : 'false'}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.track}>
        <m.span
          className={styles.glow}
          aria-hidden="true"
          initial={false}
          animate={
            reducedMotion
              ? { opacity: checked ? 1 : 0, scale: 1 }
              : {
                  opacity: checked ? [0, 0.85, 0.35] : 0,
                  scale: checked ? [0.6, 1.35, 1] : 0.6
                }
          }
          transition={{ duration: reducedMotion ? 0.12 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <m.span
          className={styles.knob}
          aria-hidden="true"
          initial={false}
          animate={{
            x: checked ? 21 : 0,
            scale: reducedMotion ? 1 : checked ? [1, 1.14, 1] : [1, 0.92, 1]
          }}
          transition={reducedMotion ? { duration: 0.12 } : spring}
        >
          <m.svg
            className={styles.check}
            viewBox="0 0 12 12"
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: checked ? 1 : 0,
              scale: checked ? 1 : 0.4,
              rotate: checked ? 0 : -28
            }}
            transition={reducedMotion ? { duration: 0.1 } : { ...spring, delay: checked ? 0.04 : 0 }}
          >
            <path d="M2.5 6.2 5 8.7 9.5 3.8" />
          </m.svg>
        </m.span>
      </span>
    </button>
  );
}

export default ConsentToggle;
