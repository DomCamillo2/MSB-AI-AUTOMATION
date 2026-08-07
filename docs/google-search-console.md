# Google Search Console – Einrichtung für msb-ai.de

Stand: August 2026

Technisch bereitgestellt:

- Sitemap: `https://www.msb-ai.de/sitemap.xml` (20 indexierbare Seiten)
- robots.txt: `https://www.msb-ai.de/robots.txt` (verweist auf die Sitemap)
- Canonical-Host: `https://www.msb-ai.de`
- Apex `https://msb-ai.de` leitet per IONOS auf `www` weiter

Impressum und Datenschutz sind bewusst **nicht** in der Sitemap (dort `noindex`).

---

## 1. Property anlegen

1. Öffnen: [Google Search Console](https://search.google.com/search-console)
2. **Property hinzufügen** → **Domain** (empfohlen): `msb-ai.de`
   - Damit sind `www`, Apex und Unterpfade abgedeckt.
3. Google zeigt einen **DNS-TXT-Eintrag** (z. B. `google-site-verification=...`).

### DNS bei IONOS setzen

1. IONOS → Domain `msb-ai.de` → DNS-Einstellungen
2. Neuen **TXT-Eintrag** für `@` oder die Domain-Root ergänzen
3. **Nicht ändern:** MX, SPF, DKIM, DMARC (E-Mail!)
4. Speichern, 5–30 Minuten warten, in der Search Console **Bestätigen**

Alternative (falls Domain-Verifikation nicht geht): URL-Prefix-Property `https://www.msb-ai.de/` – dann nur dieser Host.

---

## 2. Sitemap einreichen

1. Search Console → **Sitemaps** (linke Navigation)
2. Neue Sitemap: `sitemap.xml` eintragen (nur der Pfad, nicht die volle URL)
3. **Senden**

Erwartung: **20 URLs** entdeckt, Status „Erfolgreich“.

Prüf-URL: [https://www.msb-ai.de/sitemap.xml](https://www.msb-ai.de/sitemap.xml)

---

## 3. Wichtige Seiten zur Indexierung anstoßen

Unter **URL-Prüfung** nacheinander prüfen und **Indexierung beantragen**:

| Seite | URL |
| --- | --- |
| Start | `https://www.msb-ai.de/` |
| Leistungen | `https://www.msb-ai.de/leistungen/` |
| Anwendungsfälle | `https://www.msb-ai.de/anwendungsfaelle/` |
| Vorgehen | `https://www.msb-ai.de/vorgehen/` |
| Über uns | `https://www.msb-ai.de/ueber-uns/` |
| Automation Check | `https://www.msb-ai.de/automation-check/` |
| Kontakt | `https://www.msb-ai.de/kontakt/` |
| Region | `https://www.msb-ai.de/ki-prozessautomatisierung-tuebingen-stuttgart/` |

Optional je eine Leistungs- und Anwendungsfall-Detailseite.

**Hinweis:** Indexierung dauert Tage bis Wochen; „Beantragt“ ist normal.

---

## 4. Search Console mit Google Analytics verknüpfen

Falls GA4 (`G-P2P7JJ6QV2`) genutzt wird:

1. Search Console → **Einstellungen** → **Assoziationen**
2. GA4-Property verknüpfen
3. In GA4 unter **Admin → Produktlinks → Search Console** bestätigen

So siehst du Suchanfragen neben Website-Nutzung.

---

## 5. Regelmäßig prüfen (nach 1–2 Wochen)

| Bereich | Was prüfen |
| --- | --- |
| **Seiten** | Indexierte URLs ≈ 20, keine unerwarteten Ausschlüsse |
| **Sitemaps** | Weiterhin „Erfolgreich“, 20 URLs |
| **Erlebnis → Core Web Vitals** | Mobile/Desktop ohne kritische Fehler |
| **HTTPS** | Keine gemischten Inhalte |
| **Manuelle Maßnahmen** | Sollte leer sein |

---

## 6. Optional: Bing Webmaster Tools

1. [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Site `https://www.msb-ai.de/` hinzufügen
3. Sitemap: `https://www.msb-ai.de/sitemap.xml`
4. Oft Import aus Google Search Console möglich

---

## 7. Was automatisch passiert

- Bei jedem Push auf `main` baut GitHub Actions die Seite neu und lädt sie per SFTP zu IONOS hoch.
- `sitemap.xml` und `robots.txt` werden dabei neu erzeugt.
- In der Search Console **keine** erneute Sitemap nötig – Google holt sie periodisch ab.

---

## Checkliste (Kurz)

- [ ] Domain-Property `msb-ai.de` in Search Console
- [ ] DNS-TXT bei IONOS (E-Mail-DNS unangetastet)
- [ ] Sitemap `sitemap.xml` eingereicht
- [ ] 8 Hauptseiten per URL-Prüfung indexieren lassen
- [ ] GA4-Verknüpfung (optional)
- [ ] Nach 7–14 Tagen: Indexierung & Core Web Vitals prüfen
