'use client';

import { useState, type KeyboardEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { motionTokens } from '@/lib/motion';
import { useCases } from '@/lib/site-content';

export function UseCaseExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const reducedMotion = useReducedMotion();
  const activeUseCase = useCases[activeIndex];

  function selectTab(index: number) {
    setHasInteracted(true);
    setActiveIndex(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % useCases.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + useCases.length) % useCases.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = useCases.length - 1;
    if (nextIndex === index) return;

    event.preventDefault();
    selectTab(nextIndex);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  }

  return (
    <div className="use-case-explorer">
      <div className="use-case-tabs" role="tablist" aria-label="Anwendungsfälle">
        {useCases.map((useCase, index) => (
          <button
            key={useCase.category}
            id={`use-case-tab-${index}`}
            className={`use-case-tab${activeIndex === index ? ' is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="use-case-panel"
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => selectTab(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <strong>{useCase.category}</strong>
            <small>{useCase.summary}</small>
            <span className="use-case-tab-indicator" aria-hidden="true" />
          </button>
        ))}
      </div>

      <m.div
        key={activeIndex}
        id="use-case-panel"
        className="use-case-panel"
        role="tabpanel"
        aria-labelledby={`use-case-tab-${activeIndex}`}
        tabIndex={0}
        initial={hasInteracted ? { opacity: 0, y: reducedMotion ? 0 : motionTokens.distance.small } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.standard }}
      >
        <dl>
          {activeUseCase.details.map(([title, description]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </m.div>

      <noscript>
        <div className="use-case-noscript">
          {useCases.slice(1).map((useCase) => (
            <article key={useCase.category}>
              <h3>{useCase.category}</h3>
              <p>{useCase.summary}</p>
              <dl>
                {useCase.details.map(([title, description]) => (
                  <div key={title}><dt>{title}</dt><dd>{description}</dd></div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </noscript>
    </div>
  );
}

export default UseCaseExplorer;
