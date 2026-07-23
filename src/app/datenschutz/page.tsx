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
          <p className="legal-intro">Informationen nach Art. 13 Datenschutz-Grundverordnung (DSGVO) für die unter www.msb-ai.de bereitgestellte Website</p>
        </header>

        <section aria-labelledby="controller-heading">
          <h2 id="controller-heading">1. Verantwortlicher</h2>
          <address>
            MSB AI &amp; Automation GbR<br />
            Gesellschafter:<br />
            Dominik Soballa<br />
            Erik Müller<br />
            Luca Bouché<br />
            Haußerstraße 150<br />
            72076 Tübingen<br />
            Deutschland<br />
            E-Mail: <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
          </address>
        </section>

        <section aria-labelledby="hosting-heading">
          <h2 id="hosting-heading">2. Hosting, Domain und Server-Protokolle</h2>
          <p>
            Diese Website einschließlich ihrer statischen Inhalte und des PHP-Endpunkts für das Kontaktformular wird auf Webhosting-Systemen der IONOS SE, Elgendorfer Straße 57, 56410 Montabaur, Deutschland, bereitgestellt. Auch die Domainverwaltung, das Domain Name System (DNS) und der für diese Website eingesetzte E-Mail-Dienst werden über IONOS betrieben. Beim Aufruf verarbeitet IONOS technisch erforderliche Verbindungs- und Protokolldaten. Dazu gehören insbesondere die angeforderte Seite oder Datei, Referrer, Browsertyp und -version, Betriebssystem, Gerätetyp, Zeitpunkt des Zugriffs sowie eine anonymisierte IP-Adresse.
          </p>
          <p>
            Die Verarbeitung dient der Auslieferung der Website, der Erkennung von Angriffen und Missbrauch sowie dem sicheren und stabilen technischen Betrieb. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren, schnellen und zuverlässigen Bereitstellung der Website. IONOS gibt für Webhosting-Besucherdaten eine Speicherdauer von acht Wochen an; nach Angaben von IONOS erfolgt hierfür kein Transfer in Drittstaaten.
          </p>
          <p>
            IONOS ist für die in unserem Auftrag erbrachten Hosting- und Kommunikationsleistungen als Auftragsverarbeiter nach Art. 28 DSGVO eingebunden. Weitere Informationen finden Sie in den <a href="https://www.ionos.de/hilfe/datenschutz/datenverarbeitung-durch-ihr-ionos-produktes/datenverarbeitung-durch-webhosting-produkte/" rel="noreferrer">Informationen zur Datenverarbeitung durch IONOS Webhosting</a>, den <a href="https://www.ionos.de/hilfe/datenschutz/allgemeine-informationen-zur-datenschutz-grundverordnung-dsgvo/vereinbarung-zur-auftragsverarbeitung-avv-mit-ionos-abschliessen/" rel="noreferrer">Informationen zur Auftragsverarbeitung</a> und den <a href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/" rel="noreferrer">Datenschutzhinweisen von IONOS</a>.
          </p>
        </section>

        <section aria-labelledby="ionos-heading">
          <h2 id="ionos-heading">3. Kontaktformular und E-Mail</h2>
          <p>
            Wenn Sie das Kontaktformular absenden, werden die von Ihnen eingetragenen Angaben verschlüsselt an unseren Webspace übertragen und über den authentifizierten SMTP-Dienst von IONOS an <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a> zugestellt. Verarbeitet werden Name, Unternehmen, E-Mail-Adresse, Nachricht beziehungsweise Prozesseinschätzung, Bestätigungsstatus, Zeitpunkt und eine zufällige Anfragekennung. IONOS verarbeitet bei der Zustellung außerdem Absender- und Empfängeradresse, technische Zustelldaten und den Nachrichteninhalt.
          </p>
          <p>
            Die Formulardaten werden von der Website-Anwendung nicht in einer Datenbank oder dauerhaften Datei gespeichert. Nach erfolgreicher Übergabe befinden sie sich in unserem IONOS-E-Mail-Postfach und werden dort wie sonstige geschäftliche Korrespondenz verarbeitet. Schlägt der Versand fehl, zeigt das Formular eine neutrale Fehlermeldung an; Zugangsdaten und technische Fehlerdetails werden nicht an den Browser ausgegeben.
          </p>
          <p>
            Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage nach Art. 6 Abs. 1 lit. b DSGVO, soweit sie der Vertragsanbahnung oder Vertragsdurchführung dient, andernfalls auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in einer verlässlichen geschäftlichen Kommunikation. Weitere Informationen finden Sie in den <a href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/" rel="noreferrer">Datenschutzhinweisen von IONOS</a>.
          </p>
          <p>
            Zum Schutz vor automatisiertem Missbrauch verwendet das Formular ein unsichtbares Prüffeld, eine Mindestbearbeitungszeit und eine technische Begrenzung wiederholter Anfragen. Hierfür wird aus der anfragenden IP-Adresse ein nicht rückrechenbarer Prüfwert gebildet und für höchstens 15 Minuten im temporären Speicher des Webservers vorgehalten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt im Schutz des Formulars und unseres Postfachs vor Spam und Angriffen.
          </p>
        </section>

        <section aria-labelledby="contact-data-heading">
          <h2 id="contact-data-heading">4. Kontakt und Automation Check</h2>
          <p>
            Die Antworten im interaktiven Automation Check werden ausschließlich in Ihrem Browser ausgewertet. Während des Checks werden der aktuelle Schritt und Ihre Antworten im Sitzungsspeicher des Browsers unter dem Schlüssel <code>msb_automation_check_v1</code> zwischengespeichert, damit ein Neuladen oder Zurücknavigieren nicht zum Verlust des Fortschritts führt. Diese Daten werden nicht an unseren Webserver übertragen. Sie werden beim Start eines neuen Checks gelöscht und vom Browser üblicherweise spätestens beim Ende der Browsersitzung entfernt.
          </p>
          <p>
            Erst nach der angezeigten Einschätzung können Sie freiwillig eine Übermittlung an MSB veranlassen. Nach Ihrer ausdrücklichen Bestätigung werden die strukturierten Antworten, ein optionaler Hinweis sowie die von Ihnen angegebenen Kontaktdaten über das Kontaktformular an unser IONOS-Postfach gesendet. Ohne diesen gesonderten Schritt bleiben die Antworten ausschließlich in Ihrem Browser.
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
            Wenn Sie Statistik ausdrücklich erlauben, verwenden wir Google Analytics 4 mit der Mess-ID <code>G-P2P7JJ6QV2</code>. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics hilft uns zu verstehen, welche Seiten genutzt und welche ausgewählten Handlungen ausgeführt werden. Erfasst werden Seitenpfad ohne URL-Suchparameter, Seitentitel, technische Geräte- und Browserinformationen sowie die Ereignisse „CTA-Klick“, „Automation Check begonnen“, „Schritt aufgerufen“, „Check abgeschlossen“, „Kontaktbereich geöffnet“ und „Kontaktanfrage abgesendet“. Bei Check-Ereignissen werden ausschließlich technische Bezeichner des Schritts beziehungsweise der Ergebniskategorie übertragen. Antworten, Auswahltexte, Notizen, E-Mail-Adressen und andere personenbezogene Angaben werden nicht an Google Analytics übermittelt.
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
            Kontaktanfragen werden gelöscht, sobald ihre Bearbeitung abgeschlossen ist und keine vertraglichen oder gesetzlichen Gründe für eine weitere Aufbewahrung bestehen. Entsteht eine Geschäftsbeziehung, können geschäftliche Unterlagen entsprechend den handels- und steuerrechtlichen Aufbewahrungsfristen gespeichert werden. IONOS hält Webhosting-Besucherdaten nach eigener Angabe für acht Wochen vor; temporäre Missbrauchsschutzwerte des Kontaktformulars werden nach spätestens 15 Minuten verworfen. Die Speicherdauer von Google-Analytics-Nutzerdaten wird in der Analytics-Property festgelegt; ereignisbezogene Daten werden dort spätestens nach der konfigurierten Aufbewahrungsfrist gelöscht. Aggregierte Berichte können länger erhalten bleiben.
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

        <p className="legal-meta">Stand: 23. Juli 2026</p>
      </article>
    </main>
  );
}
