'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { defaultMotionTransition } from '@/lib/motion';

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user" transition={defaultMotionTransition}>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

export default MotionProvider;
