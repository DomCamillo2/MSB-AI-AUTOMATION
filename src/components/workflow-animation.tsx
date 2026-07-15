'use client';

import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { motionTokens } from '@/lib/motion';

const workflowSteps = [
  ['Eingang', 'E-Mail, Formular oder Datei'],
  ['Strukturieren', 'Daten erkennen und zuordnen'],
  ['System aktualisieren', 'CRM, ERP oder bestehendes Tool'],
  ['Freigeben', 'Mensch prüft sensible Schritte'],
  ['Erledigen', 'Aufgabe, Dokument oder Nachricht']
];

const sequenceStart = 0.18;
const stepInterval = 0.34;

export function WorkflowAnimation() {
  const reducedMotion = useReducedMotion();

  return (
    <aside className="workflow-visual" aria-labelledby="workflow-title">
      <h2 id="workflow-title" className="visually-hidden">Beispielhafter Automationsablauf</h2>
      <div className="workflow-track">
        <div className="workflow-line workflow-line-horizontal" aria-hidden="true">
          <m.span
            className="workflow-line-fill"
            initial={reducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.7, delay: sequenceStart, ease: motionTokens.ease.standard }}
          />
        </div>
        <div className="workflow-line workflow-line-vertical" aria-hidden="true">
          <m.span
            className="workflow-line-fill"
            initial={reducedMotion ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.7, delay: sequenceStart, ease: motionTokens.ease.standard }}
          />
        </div>

        <ol className="workflow-list">
          {workflowSteps.map(([title, description], index) => {
            const delay = sequenceStart + index * stepInterval;

            return (
              <m.li
                key={title}
                className="workflow-step"
                initial={reducedMotion ? false : { opacity: 0.78 }}
                animate={{ opacity: 1 }}
                transition={{ duration: motionTokens.duration.normal, delay, ease: motionTokens.ease.standard }}
              >
                <m.span
                  className="workflow-status"
                  aria-hidden="true"
                  initial={reducedMotion ? false : {
                    backgroundColor: '#071b3a',
                    borderColor: 'rgba(105, 208, 207, 0.42)',
                    scale: 1
                  }}
                  animate={{
                    backgroundColor: ['#071b3a', '#154967', '#08777b'],
                    borderColor: ['rgba(105, 208, 207, 0.42)', '#69d0cf', '#69d0cf'],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: motionTokens.duration.section, delay, ease: motionTokens.ease.standard }}
                >
                  <m.span
                    className="workflow-status-number"
                    initial={reducedMotion ? false : { opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: motionTokens.duration.micro, delay: delay + 0.24 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </m.span>
                  <m.span
                    className="workflow-check"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: motionTokens.duration.fast, delay: delay + 0.24 }}
                  >
                    ✓
                  </m.span>
                </m.span>
                <span className="workflow-detail">
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </m.li>
            );
          })}
        </ol>
      </div>
      <p className="workflow-note">Routine läuft automatisch. Entscheidungen bleiben bei Ihrem Team.</p>
    </aside>
  );
}

export default WorkflowAnimation;
