'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import Accordion from '@/components/accordion';
import { motionTokens } from '@/lib/motion';

export type ProcessFlowStep = {
  title: string;
  description?: string;
  meta?: string;
  outcome?: string;
  details?: readonly string[];
};

type ProcessFlowProps = {
  steps: readonly ProcessFlowStep[];
  ariaLabel: string;
  className?: string;
  detailLabel?: string;
  layout?: 'vertical' | 'horizontal';
  size?: 'default' | 'compact';
  tone?: 'light' | 'dark';
};

const stepInterval = 110;
const settleDelay = 220;

export function ProcessFlow({
  steps,
  ariaLabel,
  className = '',
  detailLabel = 'Details anzeigen',
  layout = 'vertical',
  size = 'default',
  tone = 'light'
}: ProcessFlowProps) {
  const reducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);
  const stepCount = steps.length;

  useEffect(() => {
    if (reducedMotion) {
      setActiveStep(stepCount);
      return;
    }

    setActiveStep(0);
    const timers = Array.from({ length: Math.max(stepCount - 1, 0) }, (_, index) =>
      window.setTimeout(() => setActiveStep(index + 1), (index + 1) * stepInterval)
    );
    timers.push(window.setTimeout(() => setActiveStep(stepCount), stepCount * stepInterval + settleDelay));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reducedMotion, stepCount]);

  const progressDuration = reducedMotion ? 0 : Math.min(0.82, 0.38 + stepCount * 0.08);
  const classes = [
    'process-flow',
    `process-flow--${layout}`,
    `process-flow--${size}`,
    `process-flow--${tone}`,
    className
  ].filter(Boolean).join(' ');
  const style = { '--process-count': stepCount } as CSSProperties;

  return (
    <div className={classes} style={style}>
      <span className="process-flow__rail process-flow__rail--vertical" aria-hidden="true">
        <m.span
          className="process-flow__progress"
          initial={reducedMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: progressDuration, ease: motionTokens.ease.standard }}
        />
      </span>
      {layout === 'horizontal' ? (
        <span className="process-flow__rail process-flow__rail--horizontal" aria-hidden="true">
          <m.span
            className="process-flow__progress"
            initial={reducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: progressDuration, ease: motionTokens.ease.standard }}
          />
        </span>
      ) : null}

      <ol className="process-flow__list" aria-label={ariaLabel}>
        {steps.map((step, index) => {
          const state = index < activeStep || reducedMotion ? 'complete' : index === activeStep ? 'active' : 'pending';

          return (
            <m.li
              key={`${index}-${step.title}`}
              className={`process-flow__step is-${state}`}
              data-state={state}
              initial={reducedMotion ? false : { opacity: 0.72, y: motionTokens.distance.small }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionTokens.duration.normal,
                delay: reducedMotion ? 0 : index * (stepInterval / 1000),
                ease: motionTokens.ease.standard
              }}
            >
              <span className="process-flow__marker" aria-hidden="true">
                <span className="process-flow__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="process-flow__check">✓</span>
              </span>
              <div className="process-flow__content">
                <strong>{step.title}</strong>
                {step.description ? <p>{step.description}</p> : null}
                {step.meta ? <span className="process-flow__meta">{step.meta}</span> : null}
                {step.outcome ? <p className="process-flow__outcome"><span>Ergebnis</span>{step.outcome}</p> : null}
                {step.details?.length ? (
                  <Accordion className="process-flow__details" label={detailLabel}>
                    <ul className="plain-list">{step.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </Accordion>
                ) : null}
              </div>
            </m.li>
          );
        })}
      </ol>
    </div>
  );
}

export default ProcessFlow;
