'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { motionTokens } from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
};

type RevealGroupProps = RevealProps & {
  stagger?: 'tight' | 'normal';
};

function useRevealState() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const [armed, setArmed] = useState(false);

  useEffect(() => setArmed(true), []);

  return { ref, visible: !armed || inView };
}

export function Reveal({ children, className }: RevealProps) {
  const { ref, visible } = useRevealState();
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={reducedMotion || visible ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: reducedMotion ? 0 : motionTokens.distance.section },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: motionTokens.duration.section,
            ease: motionTokens.ease.standard
          }
        }
      }}
    >
      {children}
    </m.div>
  );
}

export function RevealGroup({ children, className, stagger = 'tight' }: RevealGroupProps) {
  const { ref, visible } = useRevealState();
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={reducedMotion || visible ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: motionTokens.stagger[stagger],
            delayChildren: motionTokens.stagger.tight
          }
        }
      }}
    >
      {Children.map(children, (child) => (
        <m.div
          className="reveal-item"
          variants={{
            hidden: { opacity: 0, y: reducedMotion ? 0 : motionTokens.distance.small },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: motionTokens.duration.normal,
                ease: motionTokens.ease.standard
              }
            }
          }}
        >
          {child}
        </m.div>
      ))}
    </m.div>
  );
}

export default Reveal;
