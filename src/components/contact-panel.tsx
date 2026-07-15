"use client";

import React from 'react';
import { ContactForm } from '@/components/contact-form';

export function ContactPanel() {
  return (
    <div className="contact-panel">
      <div className="contact-box">
        <div>
          <p className="kicker">Kontakt</p>
          <h2>Kostenlosen HR-Automation-Quick-Check anfragen</h2>
          <p style={{ marginTop: '1rem' }}>30–45 Minuten · ein konkreter Prozess · 2–3 Quick Wins · ehrliche Einschätzung</p>
        </div>
        <div className="actions" style={{ marginTop: '0.5rem' }}>
          <a className="cta" href="mailto:kontakt@msb-ai.de">E-Mail an kontakt@msb-ai.de</a>
          <a className="cta-secondary" href="/impressum">Impressum</a>
        </div>
        <p className="notice">Bitte senden Sie uns über dieses Formular keine sensiblen personenbezogenen Daten, Bewerbungsunterlagen oder Mitarbeiterdaten.</p>
        <div className="contact-grid">
          <div className="section-card card-pad">
            <h3>Direkter Kontakt</h3>
            <p className="small muted" style={{ marginTop: '0.55rem' }}>
              Für einen ersten Quick-Check reicht eine kurze Nachricht mit folgenden Punkten:
            </p>
            <ul className="contact-list">
              <li>Welche Aufgabe kostet aktuell viel Zeit?</li>
              <li>Welche Tools nutzen Sie schon?</li>
              <li>Wie viele Personen arbeiten im Prozess?</li>
              <li>Gibt es sensible Daten, die berücksichtigt werden müssen?</li>
            </ul>
            <p className="small muted" style={{ marginTop: '1rem' }}>
              E-Mail für den Erstkontakt: <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
            </p>
          </div>
          <div className="section-card card-pad">
            <h3>Anfrageformular</h3>
            <p style={{ marginTop: '0.75rem' }} className="small muted">Die Übertragung erfolgt per E-Mail. Es werden keine zusätzlichen Tracking- oder Formulardienste eingebunden.</p>
            <div style={{ marginTop: '1rem' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPanel;
