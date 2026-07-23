'use client';

import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { motionTokens } from '@/lib/motion';

type AccordionProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

export function Accordion({ children, className = '', label }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const buttonId = `accordion-button-${id}`;
  const panelId = `accordion-panel-${id}`;

  return (
    <div className={`accordion${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`}>
      <button
        id={buttonId}
        className="accordion-trigger"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{label}</span>
        <span className="accordion-indicator" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id={panelId}
            className="accordion-panel"
            role="region"
            aria-labelledby={buttonId}
            initial={{ opacity: 0, y: reducedMotion ? 0 : -motionTokens.distance.micro }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -motionTokens.distance.micro }}
            transition={{
              duration: reducedMotion ? 0 : motionTokens.duration.fast,
              ease: motionTokens.ease.standard
            }}
          >
            <div className="accordion-panel-inner">{children}</div>
          </m.div>
        ) : null}
      </AnimatePresence>
      <noscript><div className="accordion-noscript">{children}</div></noscript>
    </div>
  );
}

export default Accordion;
