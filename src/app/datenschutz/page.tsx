import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Datenschutz',
  description: 'Informationen zur Verarbeitung personenbezogener Daten auf der Website von MSB AI & Automation.',
  path: '/datenschutz',
  index: false
});

export default function DatenschutzPage() {
  return (
    <main id="main-content" className="page-shell">
      <article className="container prose-panel legal-document">
        <header className="legal-header">
          <p className="eyebrow">Rechtliches</p>
          <h1>Datenschutz</h1>
          <p className="legal-intro">Informationen nach Art. 13 Datenschutz-Grundverordnung (DSGVO)</p>
        </header>

        <section aria-labelledby="controller-heading">
          <h2 id="controller-heading">1. Verantwortlicher</h2>
          <address>
            Dominik Soballa<br />
            handelnd unter MSB AI &amp; Automation<br />
            Haußerstraße 150<br />
            72076 Tübingen<br />
            Deutschland<br />
            E-Mail: <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
          </address>
        </section>

        <section aria-labelledby="hosting-heading">
          <h2 id="hosting-heading">2. Hosting und Server-Protokolle</h2>
          <p>
            Diese Website wird über Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, bereitgestellt. Beim Aufruf verarbeitet Vercel technisch erforderliche Verbindungs- und Protokolldaten. Dazu können insbesondere IP-Adresse, Zeitpunkt und Dauer der Anfrage, aufgerufene Adresse, Referrer, Browser- und Geräteinformationen sowie Status- und Fehlerdaten gehören.
          </p>
          <p>
            Die Verarbeitung dient der Auslieferung der Website, der Erkennung von Angriffen und Missbrauch sowie dem sicheren technischen Betrieb. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren, schnellen und zuverlässigen Bereitstellung der Website. Vercel kann Daten in den USA und weiteren Ländern verarbeiten und nennt dafür unter anderem das EU-U.S. Data Privacy Framework und Standardvertragsklauseln als Transfermechanismen.
          </p>
          <p>
            Weitere Informationen: <a href="https://vercel.com/legal/privacy-notice" rel="noreferrer">Datenschutzhinweise von Vercel</a> und <a href="https://vercel.com/legal/dpa" rel="noreferrer">Data Processing Addendum von Vercel</a>.
          </p>
        </section>

        <section aria-labelledby="ionos-heading">
          <h2 id="ionos-heading">3. Domain und E-Mail</h2>
          <p>
            Die Domain und die E-Mail-Infrastruktur für <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a> werden durch IONOS SE, Elgendorfer Straße 57, 56410 Montabaur, bereitgestellt. Bei der Zustellung und Speicherung von E-Mails verarbeitet IONOS insbesondere Absender- und Empfängeradresse, technische Zustelldaten sowie den Nachrichteninhalt. Die Website selbst wird nicht bei IONOS gehostet.
          </p>
          <p>
            Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage nach Art. 6 Abs. 1 lit. b DSGVO, soweit sie der Vertragsanbahnung oder Vertragsdurchführung dient, andernfalls auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in einer verlässlichen geschäftlichen Kommunikation. Weitere Informationen finden Sie in den <a href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/" rel="noreferrer">Datenschutzhinweisen von IONOS</a>.
          </p>
        </section>

        <section aria-labelledby="contact-data-heading">
          <h2 id="contact-data-heading">4. Kontakt und Automation Check</h2>
          <p>
            Die Antworten im interaktiven Automation Check werden ausschließlich in Ihrem Browser ausgewertet. Während des Checks werden der aktuelle Schritt und Ihre Antworten im Sitzungsspeicher des Browsers unter dem Schlüssel <code>msb_automation_check_v1</code> zwischengespeichert, damit ein Neuladen oder Zurücknavigieren nicht zum Verlust des Fortschritts führt. Diese Daten werden nicht an unseren Webserver übertragen. Sie werden beim Start eines neuen Checks gelöscht und vom Browser üblicherweise spätestens beim Ende der Browsersitzung entfernt.
          </p>
          <p>
            Erst nach der angezeigten Einschätzung können Sie freiwillig einen vorausgefüllten E-Mail-Entwurf öffnen. Der Entwurf enthält die strukturierten Antworten, einen optionalen Hinweis sowie die von Ihnen dafür angegebenen Kontaktdaten. Es findet keine automatische Übermittlung statt. Die Daten erreichen uns erst, wenn Sie den Entwurf in Ihrem E-Mail-Programm prüfen und selbst absenden.
          </p>
          <p>
            Bei einer Kontaktaufnahme verarbeiten wir insbesondere Name, Unternehmen, E-Mail-Adresse, Inhalt der Nachricht und weitere freiwillige Angaben, um Ihre Anfrage zu beantworten. Bezieht sich die Anfrage auf die Anbahnung oder Durchführung eines Vertrags, ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage. Bei allgemeinen geschäftlichen Anfragen erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Gesetzliche Aufbewahrungspflichten beruhen auf Art. 6 Abs. 1 lit. c DSGVO.
          </p>
          <p>
            Die Bereitstellung Ihrer Angaben ist freiwillig. Ohne die für eine Antwort erforderlichen Informationen können wir die Anfrage nicht bearbeiten. Bitte senden Sie keine besonderen Kategorien personenbezogener Daten, Bewerbungsunterlagen oder vertraulichen Kunden- und Mitarbeiterdaten.
          </p>
        </section>

        <section aria-labelledby="consent-heading">
          <h2 id="consent-heading">5. Einwilligung und lokale Speicherung</h2>
          <p>
            Beim ersten Besuch können Sie Statistik zulassen, ablehnen oder Ihre Auswahl im Detail festlegen. Ohne Ihre ausdrückliche Einwilligung wird Google Analytics weder geladen noch kontaktiert. Ihre Entscheidung wird unter dem Schlüssel <code>msb_consent_v1</code> im lokalen Speicher Ihres Browsers abgelegt. Gespeichert werden die Version der Abfrage, Ihre Auswahl und der Zeitpunkt der Entscheidung. Dies ist erforderlich, damit die Website Ihre Auswahl berücksichtigt und nicht bei jedem Aufruf erneut fragt.
          </p>
          <p>
            Rechtsgrundlage für diese notwendige Speicherung ist § 25 Abs. 2 Nr. 2 TDDDG. Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern. Bei einem Widerruf werden von dieser Website auffindbare Google-Analytics-Cookies gelöscht und Analytics beim erneuten Laden nicht mehr eingebunden.
          </p>
          <p>
            Der Sitzungsspeicher des Automation Checks ist für die von Ihnen angeforderte interaktive Funktion erforderlich. Rechtsgrundlage für diesen technischen Zugriff ist ebenfalls § 25 Abs. 2 Nr. 2 TDDDG. Die darin enthaltenen Antworten werden nicht für Werbung oder Profilbildung genutzt.
          </p>
        </section>

        <section id="google-analytics" aria-labelledby="analytics-heading">
          <h2 id="analytics-heading">6. Google Analytics 4</h2>
          <p>
            Wenn Sie Statistik ausdrücklich erlauben, verwenden wir Google Analytics 4 mit der Mess-ID <code>G-P2P7JJ6QV2</code>. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics hilft uns zu verstehen, welche Seiten genutzt und welche ausgewählten Handlungen ausgeführt werden. Erfasst werden Seitenpfad ohne URL-Suchparameter, Seitentitel, technische Geräte- und Browserinformationen sowie die Ereignisse „CTA-Klick“, „Automation Check begonnen“, „Schritt aufgerufen“, „Check abgeschlossen“, „Kontaktbereich geöffnet“ und „E-Mail-Klick“. Bei Check-Ereignissen werden ausschließlich technische Bezeichner des Schritts beziehungsweise der Ergebniskategorie übertragen. Antworten, Auswahltexte, Notizen, E-Mail-Adressen und andere personenbezogene Angaben werden nicht an Google Analytics übermittelt.
          </p>
          <p>
            Google Analytics wird im Basic Consent Mode eingesetzt: Vor Ihrer Einwilligung wird das Google-Skript nicht geladen und es werden keine Analyseanfragen gesendet. Werbe-Speicherung, Werbedaten und personalisierte Werbung bleiben deaktiviert. Google Signals und Funktionen für personalisierte Werbung sind ebenfalls abgeschaltet.
          </p>
          <p>
            Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Sie können sie jederzeit mit Wirkung für die Zukunft über „Cookie-Einstellungen“ im Footer widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt. Google kann Daten auch an Google LLC in den USA und andere Empfänger übermitteln. Google nennt dafür unter anderem das EU-U.S. Data Privacy Framework und Standardvertragsklauseln als Transfermechanismen.
          </p>
          <p>
            Weitere Informationen: <a href="https://policies.google.com/privacy" rel="noreferrer">Datenschutzerklärung von Google</a>, <a href="https://support.google.com/analytics/answer/6004245" rel="noreferrer">Datenschutz bei Google Analytics</a> und <a href="https://tools.google.com/dlpage/gaoptout" rel="noreferrer">Browser-Add-on zur Deaktivierung von Google Analytics</a>.
          </p>
        </section>

        <section aria-labelledby="external-links-heading">
          <h2 id="external-links-heading">7. Externe Links</h2>
          <p>
            Die Teamprofile enthalten reine Links zu LinkedIn. Es werden keine Inhalte von LinkedIn eingebettet und beim bloßen Seitenaufruf keine Daten an LinkedIn übertragen. Erst wenn Sie einen Link auswählen, rufen Sie die externe Website auf. Für die dortige Verarbeitung ist der jeweilige Anbieter verantwortlich. Weitere Informationen finden Sie in der <a href="https://www.linkedin.com/legal/privacy-policy" rel="noreferrer">Datenschutzerklärung von LinkedIn</a>.
          </p>
        </section>

        <section aria-labelledby="fonts-heading">
          <h2 id="fonts-heading">8. Schriftarten</h2>
          <p>
            Die auf dieser Website verwendeten Schriftarten werden lokal von unserem Hosting-System ausgeliefert. Beim Seitenaufruf wird deshalb keine Verbindung zu Google Fonts hergestellt.
          </p>
        </section>

        <section aria-labelledby="retention-heading">
          <h2 id="retention-heading">9. Speicherdauer</h2>
          <p>
            Kontaktanfragen werden gelöscht, sobald ihre Bearbeitung abgeschlossen ist und keine vertraglichen oder gesetzlichen Gründe für eine weitere Aufbewahrung bestehen. Entsteht eine Geschäftsbeziehung, können geschäftliche Unterlagen entsprechend den handels- und steuerrechtlichen Aufbewahrungsfristen gespeichert werden. Technische Protokolldaten werden durch Vercel entsprechend den jeweiligen Vertrags-, Sicherheits- und Aufbewahrungsvorgaben verarbeitet. Die Speicherdauer von Google-Analytics-Nutzerdaten wird in der Analytics-Property festgelegt; ereignisbezogene Daten werden dort spätestens nach der konfigurierten Aufbewahrungsfrist gelöscht. Aggregierte Berichte können länger erhalten bleiben.
          </p>
        </section>

        <section aria-labelledby="rights-heading">
          <h2 id="rights-heading">10. Ihre Rechte</h2>
          <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen insbesondere folgende Rechte:</p>
          <ul>
            <li>Auskunft über Ihre verarbeiteten personenbezogenen Daten nach Art. 15 DSGVO,</li>
            <li>Berichtigung unrichtiger Daten nach Art. 16 DSGVO,</li>
            <li>Löschung nach Art. 17 DSGVO,</li>
            <li>Einschränkung der Verarbeitung nach Art. 18 DSGVO,</li>
            <li>Datenübertragbarkeit nach Art. 20 DSGVO sowie</li>
            <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO nach Art. 21 DSGVO.</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte genügt eine E-Mail an <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>. Es findet keine ausschließlich automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO statt.
          </p>
        </section>

        <section aria-labelledby="complaint-heading">
          <h2 id="complaint-heading">11. Beschwerderecht</h2>
          <p>
            Sie können sich nach Art. 77 DSGVO bei einer Datenschutz-Aufsichtsbehörde beschweren. Für Baden-Württemberg ist der <a href="https://www.baden-wuerttemberg.datenschutz.de/beschwerde/" rel="noreferrer">Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg</a> zuständig.
          </p>
        </section>

        <p className="legal-meta">Stand: Juli 2026</p>
      </article>
    </main>
  );
}
