export const motionTokens = {
  duration: {
    micro: 0.16,
    fast: 0.22,
    normal: 0.34,
    section: 0.44
  },
  distance: {
    micro: 4,
    small: 8,
    section: 18
  },
  stagger: {
    tight: 0.04,
    normal: 0.07
  },
  ease: {
    standard: [0.22, 1, 0.36, 1] as const,
    exit: [0.4, 0, 1, 1] as const
  }
} as const;

export const defaultMotionTransition = {
  duration: motionTokens.duration.normal,
  ease: motionTokens.ease.standard
};
