# Produktionsaudit: SEO, Analytics, Datenschutz

Stand: 22. Juli 2026

Dieser Bericht beschreibt die technisch umgesetzte Konfiguration. Er ist keine Rechtsberatung und keine Zusage vollständiger Rechtskonformität. Datenschutz und Impressum müssen durch eine fachkundige Person sowie anhand der tatsächlichen Google-, IONOS- und Vercel-Kontoeinstellungen abschließend geprüft werden.

## A — Google-Auffindbarkeit

- Kanonischer Ursprung: `https://www.msb-ai.de`. Der vom Auftrag bevorzugte Apex-Host `https://msb-ai.de` leitet in der bestehenden Vercel-Konfiguration bereits dauerhaft auf `www` weiter. Deshalb bleibt `www` der einheitliche Canonical, um keine Redirect-/Canonical-Kette in Gegenrichtung zu erzeugen.
- HTTP sowie alternative öffentliche Hostvarianten leiten auf HTTPS und den Canonical-Host weiter.
- `msb-ai-automation.vercel.app` und `msb-ai-consulting.vercel.app` leiten dauerhaft auf den Canonical-Host weiter; Vercel-Preview-Hosts bleiben davon unberührt.
- Produktionsseiten sind indexierbar. Preview-Builds erhalten zusätzlich `X-Robots-Tag: noindex, nofollow`, ein `noindex`-Meta-Tag, eine komplett sperrende `robots.txt` und eine leere Sitemap.
- Canonicals werden nie aus der jeweiligen Preview-URL gebildet.
- Die Produktions-Sitemap enthält ausschließlich die 20 indexierbaren Seiten und liegt unter `https://www.msb-ai.de/sitemap.xml`.
- Unbekannte URLs liefern einen echten HTTP-404-Status; es gibt keinen pauschalen Homepage-Redirect.

### Search-Console-Aktionen

1. In der Google Search Console die Domain Property `msb-ai.de` anlegen.
2. Den von Google vorgegebenen DNS-TXT-Eintrag bei IONOS ergänzen. Bestehende MX-, SPF-, DKIM- und DMARC-Einträge weder verändern noch löschen.
3. `https://www.msb-ai.de/sitemap.xml` einreichen. Die Apex-URL leitet auf diese kanonische URL weiter.
4. Per URL-Prüfung die zentralen Einstiege `/`, `/leistungen`, `/anwendungsfaelle`, `/vorgehen`, `/ueber-uns`, `/automation-check`, `/kontakt` und `/ki-prozessautomatisierung-tuebingen-stuttgart` sowie repräsentative Leistungs- und Anwendungsfallseiten auf dem `www`-Host prüfen und Indexierung anstoßen.
5. Nach dem Deployment Abdeckung, Canonical-Auswahl und Core Web Vitals beobachten.

## B — SEO und Suchintention

| URL | Primäre Suchintention | Title | Meta Description | H1 | Canonical |
| --- | --- | --- | --- | --- | --- |
| `/` | Prozessautomatisierung und KI-Automatisierung für KMU | KI- & Prozessautomatisierung für KMU | MSB automatisiert wiederkehrende Abläufe in Verwaltung, HR und Reporting – pragmatisch, kontrolliert und passend zur bestehenden IT. | Automation mit Menschenverstand. | `https://www.msb-ai.de/` |
| `/leistungen` | Leistung und Umsetzung von Prozessautomatisierung | Prozessautomatisierung für KMU | MSB automatisiert wiederkehrende Prozesse in HR, Verwaltung, Reporting und Datenflüssen – mit bestehenden Systemen, klaren Regeln und menschlicher Kontrolle. | Wiederkehrende Prozesse automatisieren. Bestehende Systeme weiter nutzen. | `https://www.msb-ai.de/leistungen` |
| `/anwendungsfaelle` | HR-, CRM-, Reporting- und Wissens-Workflows | Automatisierung für HR, CRM & Reporting | Konkrete Automatisierungsbeispiele für HR, Verwaltung, CRM, Reporting und internes Wissen – mit klaren menschlichen Prüfungen. | Konkrete Abläufe statt abstrakter KI-Projekte. | `https://www.msb-ai.de/anwendungsfaelle` |
| `/vorgehen` | Projektablauf, Pilot und Einführung | Automation Check, Pilot & Einführung | So führt MSB Automatisierung ein: Prozess prüfen, begrenzten Pilot testen, Systeme kontrolliert anbinden und das Team befähigen. | Klein starten. Wirkung prüfen. Sauber übergeben. | `https://www.msb-ai.de/vorgehen` |
| `/ueber-uns` | Anbieter-/Teamvertrauen in Tübingen | Team für Automatisierung aus Tübingen | Das MSB-Team aus Tübingen verbindet Prozessverständnis, technische Automatisierung, Datenanalyse und nutzerorientierte Einführung. | Drei Perspektiven. Ein gemeinsamer Prozess. | `https://www.msb-ai.de/ueber-uns` |
| `/automation-check` | Kostenlose Ersteinschätzung | Kostenloser Automation Check für KMU | Lohnt sich Ihr Prozess für Automatisierung? Im kostenlosen Check erhalten Sie eine erste Einschätzung zu Ablauf, Nutzen, Risiken und nächstem Schritt. | Welcher Prozess kostet Ihr Team regelmäßig Zeit? | `https://www.msb-ai.de/automation-check` |
| `/kontakt` | Kontakt und Erstgespräch | Kontakt & Erstgespräch | Kontaktieren Sie MSB AI & Automation aus Tübingen oder beschreiben Sie einen wiederkehrenden Prozess für den kostenlosen Automation Check. | Sprechen wir über einen echten Prozess. | `https://www.msb-ai.de/kontakt` |
| `/ki-prozessautomatisierung-tuebingen-stuttgart` | Regionale Prozessautomatisierung | Prozessautomatisierung in Tübingen & Stuttgart | MSB begleitet KMU in Tübingen, Reutlingen und Stuttgart bei Prozessanalyse, Automatisierungspiloten und kontrollierter Einführung. | Prozessautomatisierung für KMU in der Region. | `https://www.msb-ai.de/ki-prozessautomatisierung-tuebingen-stuttgart` |

Die sechs Leistungsbereiche und sechs detaillierten Anwendungsfälle besitzen jeweils eigene Titles, Beschreibungen, Canonicals und H1. Alle Titles erhalten über die Metadata API den Markenzusatz `| MSB AI & Automation`. Jede indexierbare Seite besitzt eigene Open-Graph-Daten. Das generierte Standardbild ist 1200 × 630 Pixel. Zusätzliche dünne Keyword-, Städte- oder n8n-Seiten wurden bewusst nicht erzeugt. Neue Seiten sollten erst entstehen, wenn dafür eigenständige fachliche Substanz, Suchintention und Conversion-Nutzen vorliegen.

## C — Strukturierte Daten

| Schema | Seite | Wesentliche Felder | Technische Prüfung |
| --- | --- | --- | --- |
| `WebSite` | `/` | URL, Name, Sprache, Publisher | JSON parsebar, Build erfolgreich |
| `Organization` + `ProfessionalService` | `/` | Name, Betreiber, URL, Logo, E-Mail, Beschreibung, Slogan, Anschrift, bediente Region | JSON parsebar, sichtbare Angaben abgeglichen |
| `Service` | `/leistungen` | Leistung, Anbieter, Zielgruppe, Region, Angebotsbausteine | JSON parsebar, Build erfolgreich |
| `Service` + `BreadcrumbList` | sechs Seiten unter `/leistungen/*` | Leistungsbereich, Anbieter, URL, Breadcrumbs | JSON parsebar, Build erfolgreich |
| `Service` + `BreadcrumbList` | sechs Seiten unter `/anwendungsfaelle/*` | konkreter Anwendungsfall, Anbieter, URL, Breadcrumbs | JSON parsebar, Build erfolgreich |
| `FAQPage` | `/vorgehen` | sichtbare Fragen und Antworten | JSON parsebar, Build erfolgreich |
| `FAQPage` | `/automation-check` | sichtbare Fragen und Antworten | JSON parsebar, Build erfolgreich |

Es wurden keine Bewertungen, Öffnungszeiten, Kundenreferenzen, Preise oder nicht bestätigten Profile erfunden. KPMG, Siemens, BMW Group, prognum Automotive und Callidus Energie bleiben ausschließlich als berufliche Kontexte einzelner Teammitglieder gekennzeichnet und werden nicht als MSB-Kunden strukturiert.

Nach dem Deployment sollten die relevanten URLs zusätzlich mit dem Google Rich Results Test und dem Schema.org Validator geprüft werden.

## D — Google Analytics 4

- Mess-ID: `G-P2P7JJ6QV2`.
- GA4 wird nicht im globalen HTML-Head geladen. Das Google-Skript wird ausschließlich im Vercel-Production-Deployment und erst nach einer gespeicherten ausdrücklichen Statistik-Einwilligung dynamisch ergänzt.
- Basic Consent Mode v2: `analytics_storage` wird erst nach Einwilligung gewährt. `ad_storage`, `ad_user_data` und `ad_personalization` bleiben verweigert.
- Google Signals und personalisierte Werbefunktionen werden im Code deaktiviert.
- `send_page_view` ist deaktiviert. Die Anwendung sendet genau einen expliziten `page_view` pro Next.js-Pfad und schließt Suchparameter aus `page_location` aus.
- Ereignisse: `cta_click`, `automation_check_start`, `email_click`; `phone_click` ist technisch vorbereitet und wird nur bei einem tatsächlich vorhandenen Telefonlink ausgelöst.
- Übermittelte Parameter sind fest definierte Seiten-/Positionswerte. Formularfelder, Namen, E-Mail-Adressen, Unternehmen, Freitext und URL-Suchparameter werden nicht an GA4 übergeben.
- `generate_lead` und `automation_check_success` werden nicht ausgelöst, weil das aktuelle Formular keinen serverseitig bestätigten Lead erzeugt, sondern einen E-Mail-Entwurf öffnet.

### GA4-Kontocheck

1. Enhanced Measurement prüfen und automatische Seitenaufrufe/History Changes deaktivieren, damit die expliziten Next.js-Pageviews nicht doppelt gezählt werden. Nicht benötigte automatische Formular-, Site-Search-, Video- und Download-Messung deaktivieren.
2. Google Signals und Werbepersonalisierung deaktiviert lassen.
3. Datenfreigabeeinstellungen und Produktverknüpfungen minimieren; nicht benötigte Google-Ads-Verknüpfungen entfernen.
4. Datenaufbewahrung auf den kürzesten praktisch ausreichenden Zeitraum setzen; empfohlen sind 2 Monate, sofern kein dokumentierter Geschäftsgrund für 14 Monate besteht. Die tatsächlich gewählte Dauer anschließend in der Datenschutzerklärung konkret ergänzen.
5. Datenfilter für internen und Entwickler-Traffic einrichten und vor Aktivierung testen.
6. Keine benutzerdefinierten Dimensionen aus Formular- oder Freitextwerten anlegen.
7. Erst nach einem künftig real bestätigten Formularerfolg `generate_lead` implementieren und als Key Event markieren. Seitenaufrufe, Scrolls und allgemeine CTA-Klicks nicht als primäre Conversion markieren.

## E — Consent

- Kategorien: „Notwendig“ (immer aktiv) und „Statistik“ (nicht vorausgewählt).
- Erste Ebene: gleich erreichbare Aktionen „Alle akzeptieren“, „Nur notwendige“ und „Einstellungen“.
- Versionierter lokaler Datensatz `msb_consent_v1` enthält nur Version, notwendigen Status, Statistik-Auswahl und Entscheidungszeitpunkt.
- Ablehnung: kein Google-Skript, keine GA-Anfrage, kein GA-Cookie und kein cookieloser GA-Ping.
- Annahme: GA4 wird erst danach geladen und sendet nur die beschriebenen Ereignisse.
- Widerruf: über den permanenten Footer-Button; das Skript wird entfernt, auffindbare `_ga`-/`_ga_*`-Cookies werden für relevante Hostvarianten gelöscht und die Seite wird ohne GA neu geladen.
- Das Einstellungsdialogfenster besitzt Fokusführung, Escape-Schließen, Fokus-Rückgabe, Hintergrundsperre, verständliche Labels und mobile Touch-Ziele.

## F — Datenschutz

Dokumentierte reale Dienste und Datenflüsse:

- Website-Hosting und Serverprotokolle: Vercel Inc.
- Domain/DNS und E-Mail: IONOS SE.
- Direkte E-Mail-Kommunikation und mailto-basierter Automation Check.
- Versionierte lokale Consent-Speicherung.
- Google Analytics 4 nur nach Statistik-Einwilligung.
- Reine externe LinkedIn-Links; keine Social-Media-Einbettung.
- Lokal über Next.js ausgelieferte Schriften; kein Browserabruf bei Google Fonts.
- Keine Karten, Videos, Chat-Widgets, externen Formulare oder weiteren Tracking-Dienste im geprüften Stand.

Menschlich zu bestätigen: tatsächliche GA4-Aufbewahrungsdauer, Google-Kontofreigaben/Verknüpfungen, gültige Auftragsverarbeitungsverträge mit Vercel und IONOS sowie alle individuellen Löschfristen. Anschließend juristische Schlussprüfung der veröffentlichten Erklärung.

## G — Impressum

- Übernommene bestehende Angaben: Betreiber Dominik Soballa, Haußerstraße 150, 72076 Tübingen, Deutschland, `kontakt@msb-ai.de`.
- Öffentliche Marke einheitlich auf „MSB AI & Automation“ korrigiert; „MSB AI Consulting“ entfernt.
- Aktuelle Bezeichnung nach § 5 DDG beibehalten; keine veraltete TMG- oder EU-ODR-Klausel ergänzt.
- Nicht erfunden: Telefonnummer, USt-IdNr./W-IdNr., Register und Kammerangaben.

Vor Veröffentlichung juristisch klären: exakte Rechts-/Geschäftsbezeichnung des Einzelunternehmens, ob eine Telefonnummer oder andere schnelle Kontaktmöglichkeit ergänzt werden muss, ob USt-IdNr./W-IdNr. vergeben wurde, ob Register-/Berufsangaben bestehen und ob VSBG-Informationen im konkreten B2B-/Vertragsmodell erforderlich sind.

## H — Externe menschliche Aktionen

1. Search Console Domain Property `msb-ai.de` anlegen.
2. Google-TXT-Verifikation ausschließlich ergänzend bei IONOS setzen; Mail-DNS unverändert lassen.
3. `https://www.msb-ai.de/sitemap.xml` einreichen.
4. Die 20 Produktions-Canonicals stichprobenweise per URL-Prüfung kontrollieren und die wichtigsten Einstiegs- und Detailseiten zur Indexierung anstoßen.
5. Die unter D genannten GA4-Datenschutz- und Enhanced-Measurement-Einstellungen durchführen und dokumentieren.
6. Aktuell kein Key Event markieren; erst einen echten erfolgreichen Lead-Workflow implementieren, dann `generate_lead` als Key Event einrichten.
7. In GA4 unter Produktverknüpfungen die bestätigte Search-Console-Property mit dem Webdatenstrom verbinden.
8. Google Business Profile nur einrichten, wenn MSB Kunden nachweislich persönlich am zulässigen Standort empfängt oder sie vor Ort besucht. Keine virtuelle/fiktive Adresse verwenden; bei Eignung Tübingen, Reutlingen und Stuttgart nur als tatsächlich bediente Gebiete angeben.
9. Datenschutz, Impressum, AV-Verträge, Löschfristen und fehlende Betreiberangaben fachkundig prüfen lassen.

## I — Testergebnisse

- ESLint: bestanden.
- TypeScript/Next.js-Prüfung: bestanden.
- Production-Build: bestanden; 31 statische Routen erzeugt.
- Preview-Build: Der Preview-Schutz bleibt unverändert; nach der Erweiterung erneut über die Vercel-Preview-Checks zu bestätigen.
- HTML: ein H1 auf der Startseite, Canonical auf dem Production-Host, strukturierte Daten JSON-parsebar.
- Sitemap/robots: Production freigegeben und vollständig; Preview gesperrt und Sitemap leer.
- 404: echter HTTP-Status 404.
- Redirects: Apex/HTTP/beide alten Vercel-Produktionshosts im Live-Audit dauerhaft auf `https://www.msb-ai.de` geführt.
- Security: CSP, Referrer-Policy, `nosniff`, Frame-Schutz und Permissions-Policy per lokalem Production-HTTP-Test bestätigt; Preview zusätzlich mit `X-Robots-Tag`.
- Initiales HTML: kein Google-Tag-Script und keine GA-Mess-ID enthalten.
- Consent-Code: keine GA-Ladung bei fehlender oder negativer Einwilligung; Production-Gate, Widerruf und Cookie-Löschung implementiert.
- Accessibility-Codeprüfung: Skip-Link, semantische Banner-/Dialogtitel, Fokusfalle, Escape, Fokus-Rückgabe, Inert-Hintergrund und mindestens 44-Pixel-Aktionen vorhanden.
- Responsive-Codeprüfung: flüssige Größen, begrenzte Container, `min-width: 0`, mobile Einspaltenlayouts sowie Breakpoints für Header, Leistungen und Consent vorhanden.
- Detailseiten-Crawl: 20 Sitemap-URLs und 36 interne Ziele geprüft; alle Seiten HTTP 200, genau ein H1, genau ein Canonical und keine fehlerhaften internen Links.
- Performance: GA blockiert den Erst-Render nicht; Fonts sind lokal gebündelt; First Load JS laut Build je nach Seite etwa 103–129 kB.

Noch manuell nach Deployment zu prüfen: visuelle Matrix bei 320, 375, 390, 430, 768, 1024 und den genannten Desktopgrößen; Tastatur-/Screenreader-Test im echten Browser; Consent-A/B/C/D und SPA-Einzel-Pageviews in DevTools, Google Tag Assistant und GA4 DebugView; Rich Results Test; Lighthouse/Core Web Vitals auf der Produktionsdomain.
