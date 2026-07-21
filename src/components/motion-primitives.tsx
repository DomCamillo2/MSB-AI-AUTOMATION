'use client';

import type { ReactNode } from 'react';
import type { HTMLMotionProps } from 'motion/react';
import { motion, useReducedMotion } from 'motion/react';

type RevealAs = 'div' | 'article' | 'aside' | 'li' | 'ol';

const motionElements = {
  div: motion.div,
  article: motion.article,
  aside: motion.aside,
  li: motion.li,
  ol: motion.ol
};

type RevealProps = HTMLMotionProps<'div'> & {
  as?: RevealAs;
  children: ReactNode;
  delay?: number;
};

export function Reveal({ as = 'div', children, delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motionElements[as] as typeof motion.div;

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function MotionAnchor({ children, ...props }: HTMLMotionProps<'a'>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
