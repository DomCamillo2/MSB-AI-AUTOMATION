# Leistungsarchitektur: Umsetzungsbericht

Stand: 22. Juli 2026

## 1. Übersichtskarten vereinfacht

Die sechs Karten auf `/leistungen` zeigen nur noch Icon, Bereich, einen Nutzensatz, drei konkrete Stichworte und einen eindeutigen Link. Die erklärungsintensiven Blöcke „Heute / Automatisiert / Mensch bleibt“ wurden in die passenden Kategorieseiten verschoben. Die komplette Karte ist ein semantischer Link.

## 2. Angelegte Routen

Leistungsbereiche:

- `/leistungen/hr-recruiting`
- `/leistungen/verwaltung-crm`
- `/leistungen/reporting-daten`
- `/leistungen/dokumente`
- `/leistungen/email-kommunikation`
- `/leistungen/internes-wissen`

Detaillierte Anwendungsfälle:

- `/anwendungsfaelle/bewerbervorauswahl`
- `/anwendungsfaelle/bewerber-matching`
- `/anwendungsfaelle/email-zu-crm`
- `/anwendungsfaelle/reporting-automatisieren`
- `/anwendungsfaelle/dokumentenverarbeitung`
- `/anwendungsfaelle/wissensassistent`

## 3. Kategorieseiten

Jede Kategorieseite enthält einen eigenen Hero, typische Reibungspunkte, sechs konkrete Beispiele, einen größeren Prozessfluss, die Aufgabenteilung „Heute / Automatisiert / Mensch bleibt“, mögliche Integrationen und einen kontextbezogenen Automation-Check.

## 4. Detaillierte Anwendungsfallseiten

Jede Vertiefung beschreibt Ausgangslage, sieben nachvollziehbare Prozessschritte, automatisierbare Tätigkeiten, menschlich verantwortete Tätigkeiten, technische Einbindung, Ergebnis und verwandte Inhalte. Im Recruiting werden weder automatische Einstellungsentscheidungen noch undurchsichtige Rankings dargestellt.

## 5. Bewusst nicht angelegte Seiten

Für ergänzende Karten wie Interviewkoordination, Dublettenprüfung, Rechnungsverarbeitung oder E-Mail-Triage wurden bewusst keine dünnen Einzelseiten erzeugt. Sie bleiben konkrete Beispiele innerhalb ihrer Kategorie, bis genügend eigenständige fachliche Substanz und Suchintention vorliegen.

## 6. Interne Verlinkung

`/leistungen` verlinkt alle sechs Kategorien. Kategorien verlinken nur vorhandene Vertiefungen. `/anwendungsfaelle` enthält ein neues Verzeichnis der sechs Detailfälle. Jede Detailseite führt zurück zur Kategorie, zu einem passenden verwandten Inhalt und zum Automation Check.

## 7. SEO

Alle zwölf Seiten besitzen individuellen Title, Meta Description, Canonical, H1 und Open-Graph-Daten. Sie sind in der Sitemap enthalten und verwenden sichtbare Breadcrumbs sowie passende `Service`- und `BreadcrumbList`-Strukturdaten.

## 8. Wiederverwendete Komponenten

Weiterverwendet wurden das vorhandene Container- und Button-System, `Reveal`, `PageCta`, `StructuredData`, die Farbvariablen, Typografie, Radien und Motion-Tokens. Dadurch bleibt die Erweiterung visuell Teil der bestehenden MSB-Website.

## 9. Neue Komponenten

- `ServiceIcon`: einheitliches, leichtgewichtiges SVG-Icon-System
- `ServiceCategoryPage`: gemeinsame Struktur der sechs Leistungsbereiche
- `UseCaseDetailPage`: gemeinsame Struktur der sechs Prozessvertiefungen
- `service-detail-content`: typisiertes Inhaltsmodell als zentrale Quelle
- `service-detail-pages.module.css`: gemeinsame responsive Darstellung

## 10. Responsive Änderungen

Die Leistungsübersicht wechselt von 3 × 2 Karten auf Desktop über zwei Spalten auf Tablet zu einer Spalte auf Mobile. Die neuen Seiten wechseln größere Zwei-Spalten-Layouts bei 780 Pixel in eine Spalte. Prozessflüsse verwenden bei mittleren Breiten drei Spalten und mobil eine vertikale, nicht abgeschnittene Sequenz. CTA-Gruppen werden auf kleinen Geräten vollbreit.

## 11. Barrierefreiheit

Alle klickbaren Karten sind echte Links, besitzen sichtbare Fokuszustände und verständliche Linktexte. Prozessschritte verwenden geordnete Listen, Breadcrumbs echte Navigation und aktive Seiten `aria-current`. Icons sind dekorativ ausgeblendet; menschliche Prüfpunkte werden nicht nur durch Farbe, sondern auch textlich erklärt. Reduzierte Bewegung wird respektiert.

## 12. Motion

Die vorhandenen Reveal-Bewegungen bleiben erhalten. Karten heben sich auf geeigneten Zeigegeräten nur um zwei Pixel an, Pfeile reagieren dezent und mobile Karten geben beim Tippen eine kleine Scale-Rückmeldung. Alle Übergänge nutzen die bestehenden Motion-Tokens und werden bei `prefers-reduced-motion` deaktiviert.

## Finale Hierarchie

```text
Leistungen
├── HR & Recruiting
│   ├── Bewerbervorauswahl
│   └── Bewerber-Matching
├── Verwaltung & CRM
│   └── E-Mail zu CRM
├── Reporting & Daten
│   └── Reporting automatisieren
├── Dokumente
│   └── Dokumentenverarbeitung
├── E-Mail & Kommunikation
│   └── E-Mail zu CRM
└── Internes Wissen
    └── Wissensassistent

Anwendungsfälle
├── Bewerbervorauswahl
├── Bewerber-Matching
├── E-Mail zu CRM
├── Reporting automatisieren
├── Dokumentenverarbeitung
└── Wissensassistent

Jede Vertiefung
└── Prozessbild → menschliche Kontrolle → Systeme/Integration → Automation Check
```
