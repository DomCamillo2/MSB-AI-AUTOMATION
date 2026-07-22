# Automation Check V1

Stand: Juli 2026

## 1. Neue User Journey

Startseite → Prozessbereich → konkrete Tätigkeiten → Eingänge und Systeme → Häufigkeit und Volumen → manueller Aufwand → Standardisierung → menschliche Entscheidung → Fehlerfolge → optionaler Hinweis → unmittelbare Einschätzung → freiwilliger Kontakt.

Die Einschätzung wird vor jeder Abfrage personenbezogener Daten angezeigt.

## 2. Fragen

1. Prozessbereich
2. Dynamisch verzweigte, zeitaufwendige Tätigkeiten
3. Eingänge und Systeme
4. Häufigkeit und optionales Volumen
5. Manueller Aufwand je Vorgang
6. Standardisierung
7. Menschliche Entscheidungen
8. Fehlerfolgen
9. Optionaler Prozesshinweis

## 3. Verzweigung

Die zweite Frage verwendet je nach Bereich eine eigene Optionsliste für HR, E-Mail, Reporting, Verwaltung/CRM, Dokumente, internes Wissen und sonstige Prozesse. Ein Bereichswechsel setzt nur die davon abhängige Tätigkeitsauswahl zurück.

## 4. Scoring-Modell

Die Auswertung ist deterministisch und liegt getrennt von der UI in `src/lib/automation-check-scoring.ts`. Signale sind Häufigkeit, Volumen, manueller Aufwand, Standardisierung, menschliche Entscheidung, Fehlerfolge, digitale Eingänge und mehrere wiederkehrende Schritte. Die internen Punkte dienen nur der regelbasierten Einordnung und werden nicht als Prozentwert ausgegeben.

Schutzregeln verhindern eine zu optimistische Vollautomatisierung bei individuellen Abläufen, zentralen menschlichen Entscheidungen sowie hohen finanziellen, rechtlichen oder personenbezogenen Folgen.

## 5. Ergebniskategorien

- Gutes Automatisierungspotenzial
- Teilautomatisierung wahrscheinlich sinnvoll
- Genauer prüfen
- Nur begrenzt geeignet

Jedes Ergebnis enthält dynamisch erzeugte Gründe, eine vorsichtige Empfehlung und einen Hinweis, dass es sich nicht um eine vollständige Prozessanalyse handelt.

## 6. Live-Prozessbild

Die Visualisierung entsteht aus denselben strukturierten Antworten wie die Auswertung. Die Mapping-Funktionen erzeugen typisierte Knoten für Eingang, manuelle Arbeit, Automatisierung, System, menschliche Prüfung und Ergebnis. Im Wizard wird das aktuelle Prozessbild als ruhige, sticky Seitenansicht dargestellt; im Ergebnis werden Ist-Ablauf und möglicher Ansatz verglichen.

## 7. Neue Komponenten

- `AutomationCheckExperience`
- `AutomationCheckProgress`
- `AutomationProcessPreview`
- `AutomationProcessDiagram`
- `AutomationCheckResult`
- `AutomationCheckIcon`

## 8. Wiederverwendete Bausteine

Verwendet werden das bestehende MSB-Farb-, Typografie-, Container-, Button-, Header-, Footer-, Consent- und Analytics-System. Es wurde keine fremde Komponentenbibliothek ergänzt.

## 9. Wesentliche Dateien

- `src/app/automation-check/page.tsx`
- `src/components/automation-check-*.tsx`
- `src/components/automation-process-preview.tsx`
- `src/components/automation-check.module.css`
- `src/lib/automation-check-config.ts`
- `src/lib/automation-check-types.ts`
- `src/lib/automation-check-scoring.ts`
- `src/lib/analytics.ts`
- `src/app/datenschutz/page.tsx`
- `src/components/site-header.tsx`

## 10. Dependencies

Keine neue Runtime-Abhängigkeit. Die Umsetzung nutzt React, Next.js und CSS aus dem bestehenden Projekt.

## 11. Analytics

Nur nach erteilter Statistik-Einwilligung:

- `automation_check_start`
- `automation_check_step` mit Phase und technischer Frage-ID
- `automation_check_complete` mit Ergebniskategorie
- `automation_check_contact_start` mit Ergebniskategorie
- `email_click`

Antworten, Freitext und Kontaktdaten werden nicht an Analytics übertragen. `generate_lead` wird nicht ausgelöst, weil ohne serverseitigen Endpunkt kein erfolgreicher Lead-Eingang verifiziert werden kann.

## 12. Datenschutz

Prozessantworten und Fortschritt liegen nur im `sessionStorage` des Browsers (`msb_automation_check_v1`). Kontaktdaten werden nicht persistiert. Der freiwillige Kontakt öffnet einen strukturierten E-Mail-Entwurf; eine Übertragung erfolgt erst, wenn die Person ihn selbst versendet. Es existiert kein versteckter Server-Speicher und kein unsicher eingebautes Provider-Secret.

## 13. Barrierefreiheit

Semantische Buttons und Auswahlgruppen, `aria-checked`, sichtbare Fokuszustände aus dem Designsystem, programmatischer Fokuswechsel zur neuen Frage, beschrifteter Fortschritt, Fehlerzuordnung, Statusmeldung, ausreichende Touch-Ziele und `prefers-reduced-motion` werden unterstützt.

## 14. Mobile

Einspaltige Auswahlkarten, kompakter Drei-Phasen-Fortschritt, vertikale Prozessansicht und eine sticky Navigation am unteren Rand unterstützen 320–430 px ohne horizontales Scrollen.

## 15. Laptop und Desktop

Frage und Live-Prozessbild stehen in einer begrenzten Zwei-Spalten-Fläche. Das Prozessbild bleibt sticky, die Bereichsauswahl nutzt bei ausreichender Breite drei Spalten und fällt kontrolliert auf zwei beziehungsweise eine Spalte zurück.

## 16. Tests

Die automatisierten Scoring-Tests decken vier Ergebniskategorien, hohe Fehlerfolgen, HR-Schutzsprache und alle sieben Prozessbereichsverzweigungen ab. Zusätzlich gehören Typecheck, ESLint und Produktions-Build zum Release-Gate.

## 17. Bewusst nicht implementiert

Keine Accounts, öffentliche Ergebnis-URLs, LLM-Auswertung, fake ROI-Prozente, CRM-Anbindung, PDF-Backend oder unsicherer E-Mail-Endpunkt. Ein echter serverseitiger Versand benötigt zukünftig einen verifizierten Mailprovider, Secret-Management, Missbrauchsschutz, Logging und eine aktualisierte Datenschutzbewertung.

## Architektur

```text
Fragen-Konfiguration ─────┐
                         ├─> Wizard-Zustand ─> sessionStorage
Bereichs-Verzweigungen ──┘          │
                                    ├─> Live-Prozessbild
                                    │
                                    └─> deterministische Regeln
                                               │
                                               ├─> Ergebniskategorie
                                               ├─> Gründe + Empfehlung
                                               └─> Ist/Soll-Prozessbild
                                                          │
                                                          └─> freiwilliger mailto-Entwurf

Consent Manager ─> Analytics-Gate ─> ausschließlich nicht-personenbezogene Check-Ereignisse
```
