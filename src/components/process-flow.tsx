'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
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

const stepInterval = 240;
const settleDelay = 260;

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
  const flowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(flowRef, { amount: 0.18, once: true });
  const [activeStep, setActiveStep] = useState(-1);
  const [compactViewport, setCompactViewport] = useState(false);
  const stepCount = steps.length;

  useEffect(() => {
    const query = window.matchMedia('(max-width: 699px)');
    const update = () => setCompactViewport(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion || compactViewport) {
      setActiveStep(stepCount);
      return;
    }

    if (!inView) return;

    setActiveStep(0);
    const timers = Array.from({ length: Math.max(stepCount - 1, 0) }, (_, index) =>
      window.setTimeout(() => setActiveStep(index + 1), (index + 1) * stepInterval)
    );
    timers.push(window.setTimeout(() => setActiveStep(stepCount), stepCount * stepInterval + settleDelay));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [compactViewport, inView, reducedMotion, stepCount]);

  const staticFlow = reducedMotion || compactViewport;
  const progressDuration = staticFlow ? 0 : Math.min(1.4, 0.55 + stepCount * 0.16);
  const classes = [
    'process-flow',
    `process-flow--${layout}`,
    `process-flow--${size}`,
    `process-flow--${tone}`,
    className
  ].filter(Boolean).join(' ');
  const style = { '--process-count': stepCount } as CSSProperties;

  return (
    <div ref={flowRef} className={classes} style={style}>
      <span className="process-flow__rail process-flow__rail--vertical" aria-hidden="true">
        <m.span
          className="process-flow__progress"
          initial={false}
          animate={{ scaleY: staticFlow || inView ? 1 : 0 }}
          transition={{ duration: progressDuration, ease: motionTokens.ease.standard }}
        />
      </span>
      {layout === 'horizontal' ? (
        <span className="process-flow__rail process-flow__rail--horizontal" aria-hidden="true">
          <m.span
            className="process-flow__progress"
            initial={false}
            animate={{ scaleX: staticFlow || inView ? 1 : 0 }}
            transition={{ duration: progressDuration, ease: motionTokens.ease.standard }}
          />
        </span>
      ) : null}

      <ol className="process-flow__list" aria-label={ariaLabel}>
        {steps.map((step, index) => {
          const state = index < activeStep || staticFlow ? 'complete' : index === activeStep ? 'active' : 'pending';

          return (
            <m.li
              key={`${index}-${step.title}`}
              className={`process-flow__step is-${state}`}
              data-state={state}
              initial={false}
              animate={
                staticFlow || inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: motionTokens.distance.small }
              }
              transition={{
                duration: motionTokens.duration.normal,
                delay: staticFlow ? 0 : index * (stepInterval / 1000),
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
