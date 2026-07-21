'use client';

import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import WorkflowAnimation from '@/components/workflow-animation';
import { motionTokens } from '@/lib/motion';

const heroSequence = {
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.06
    }
  }
};

const heroItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.section,
      ease: motionTokens.ease.standard
    }
  }
};

const mobileProcessSteps = ['Eingang', 'Automation', 'Mensch prüft'] as const;

export function AnimatedHero() {
  const reducedMotion = useReducedMotion();
  const initial = reducedMotion ? false : 'hidden';

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-slogan" id="hero-heading" tabIndex={-1}>
            <span>Automation mit</span>{' '}
            <span className="hero-slogan__human">Menschenverstand.</span>
          </h1>

          <m.div className="hero-supporting" initial={initial} animate="visible" variants={heroSequence}>
            <m.p className="hero-promise" variants={heroItem}>
              <span>Weniger manuelle Arbeit.</span>{' '}
              <span>Mehr Zeit fürs Kerngeschäft.</span>
            </m.p>
            <m.p className="hero-lead" variants={heroItem}>
              Wir automatisieren wiederkehrende Abläufe in Verwaltung, HR und Reporting – passend zu Ihren Systemen und mit klarer menschlicher Kontrolle.
            </m.p>
            <m.div className="hero-actions" variants={heroItem}>
              <a className="button button-primary" href="/automation-check">
                Prozess kostenlos prüfen lassen <span className="button-arrow" aria-hidden="true">→</span>
              </a>
              <a className="button button-secondary" href="/anwendungsfaelle">
                Anwendungsfälle ansehen <span className="button-arrow" aria-hidden="true">→</span>
              </a>
            </m.div>
            <m.div className="hero-meta" variants={heroItem}>
              <p className="trust-line">KI- &amp; Prozessautomatisierung für KMU</p>
              <p className="regional-line">Region Tübingen–Stuttgart</p>
            </m.div>

            <m.ol className="hero-mobile-process" aria-label="Ein typischer kontrollierter Ablauf" variants={heroItem}>
              {mobileProcessSteps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </m.ol>
          </m.div>
        </div>

        <m.div
          className="hero-workflow-shell"
          initial={reducedMotion ? false : { opacity: 0, x: motionTokens.distance.section }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: reducedMotion ? 0 : 0.16,
            duration: reducedMotion ? 0 : motionTokens.duration.section,
            ease: motionTokens.ease.standard
          }}
        >
          <WorkflowAnimation />
        </m.div>
      </div>
    </section>
  );
}

export default AnimatedHero;
