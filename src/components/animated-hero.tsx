"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AnimatedHero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 80 } }
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.36 } }
  };

  const animProps = reduce
    ? { initial: false, animate: 'show' }
    : { initial: 'hidden', animate: 'show', variants: container };

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <motion.div {...animProps} className="" aria-hidden={false}>
          <motion.p variants={item} className="kicker">MSB AI & Automation · Tübingen · Stuttgart · Neckar-Alb</motion.p>
          <motion.h1 variants={item}>Wir automatisieren Prozesse, die Ihr Team jeden Tag Zeit kosten.</motion.h1>
          <motion.p variants={item} className="lead" style={{ marginTop: '1.2rem' }}>
            MSB AI & Automation analysiert wiederkehrende Abläufe, entwickelt pragmatische KI- und Automatisierungslösungen und begleitet Ihre Mitarbeitenden bei der erfolgreichen Einführung.
          </motion.p>
          <motion.p variants={item} className="trust-line" aria-label="Vertrauensmerkmale">
            Prozessanalyse · Umsetzung · Schulung · Region Tübingen und Stuttgart
          </motion.p>
          <motion.div variants={item} className="actions">
            <a className="cta" href="#angebote">Kostenlosen Automation Check anfragen</a>
            <a className="cta-secondary" href="#warum-msb">Unsere Erfahrung ansehen</a>
          </motion.div>
          <motion.div variants={item} className="hero-badge-row" aria-label="Leistungsversprechen">
            <span>1 Prozess</span>
            <span>2–3 Ideen</span>
            <span>ehrliche Einschätzung</span>
          </motion.div>
        </motion.div>

        <motion.aside {...(reduce ? { initial: false, animate: 'show' } : { initial: 'hidden', animate: 'show', variants: container })} className="hero-panel hero-panel-large" aria-label="Vorher-Nachher Übersicht">
          <motion.div variants={item} className="hero-panel-header">
            <p className="kicker">Typische Ausgangslage</p>
            <h2>Vorher / Nachher in einem Blick</h2>
          </motion.div>
          <motion.div variants={item} className="hero-comparison">
            <div className="comparison-card comparison-before">
              <h3>Vorher</h3>
              <ul>
                <li>E-Mails und Rückfragen laufen parallel.</li>
                <li>Dokumente liegen verteilt in Ordnern und Systemen.</li>
                <li>Onboarding und Bewerberkommunikation hängen an Einzelpersonen.</li>
                <li>Wissen bleibt in Köpfen statt in einer Struktur.</li>
              </ul>
            </div>
            <div className="comparison-card comparison-after">
              <h3>Nachher</h3>
              <ul>
                <li>Anfragen werden strukturiert aufgenommen und beantwortet.</li>
                <li>Wiederkehrende Schritte werden sauber vorbereitet oder ausgelöst.</li>
                <li>Wissensbausteine und Checklisten unterstützen das Team im Alltag.</li>
                <li>Menschen prüfen, steuern und entscheiden weiterhin selbst.</li>
              </ul>
            </div>
          </motion.div>
        </motion.aside>
      </div>
    </section>
  );
}

export default AnimatedHero;
