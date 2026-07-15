import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Datenschutz',
  description: 'Informationen zur Verarbeitung personenbezogener Daten beim Besuch der Website und bei Kontaktanfragen an MSB AI Consulting.',
  path: '/datenschutz'
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
            MSB AI Consulting<br />
            Haußerstraße 150<br />
            72076 Tübingen<br />
            Deutschland<br />
            E-Mail: <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
          </address>
        </section>

        <section aria-labelledby="hosting-heading">
          <h2 id="hosting-heading">2. Hosting und Server-Protokolle</h2>
          <p>
            Diese Website wird bei der IONOS SE, Elgendorfer Straße 57, 56410 Montabaur, Deutschland, gehostet. Beim Aufruf der Website verarbeitet IONOS technisch erforderliche Zugriffsdaten. Dazu können die zuvor besuchte Seite, die angeforderte Seite oder Datei, Browsertyp und Browserversion, Betriebssystem, Gerätetyp, Zeitpunkt des Zugriffs sowie eine anonymisierte IP-Adresse gehören.
          </p>
          <p>
            Die Verarbeitung dient der sicheren, stabilen und fehlerfreien Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb unseres Internetauftritts. IONOS gibt für Webhosting-Produkte eine Speicherdauer der Besuchsdaten von acht Wochen an. Nach Angaben von IONOS werden diese Daten nicht an Dritte weitergegeben und nicht in Staaten außerhalb der Europäischen Union übermittelt.
          </p>
          <p>
            Weitere Informationen: <a href="https://www.ionos.de/hilfe/datenschutz/datenverarbeitung-durch-ihr-ionos-produktes/datenverarbeitung-durch-webhosting-produkte/" rel="noreferrer">Datenverarbeitung durch IONOS Webhosting</a>.
          </p>
        </section>

        <section aria-labelledby="analytics-heading">
          <h2 id="analytics-heading">3. IONOS WebAnalytics</h2>
          <p>
            IONOS WebAnalytics wertet Aufrufe dieser Website statistisch aus und unterstützt die technische Optimierung. Die Ermittlung erfolgt nach Angaben von IONOS über Logdateien oder einen Zählpixel. Dabei werden keine Cookies eingesetzt. Die beim Seitenabruf übermittelte IP-Adresse wird unmittelbar anonymisiert und anschließend ohne Personenbezug verarbeitet. Es werden keine individuellen Nutzungsprofile für Werbung erstellt.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der statistischen Auswertung und technischen Verbesserung der Website. Weitere Informationen: <a href="https://www.ionos.de/hilfe/datenschutz/datenverarbeitung-durch-ihr-ionos-produktes/webanalytics/" rel="noreferrer">Datenverarbeitung durch IONOS WebAnalytics</a>.
          </p>
        </section>

        <section aria-labelledby="contact-data-heading">
          <h2 id="contact-data-heading">4. Kontakt per E-Mail und Automation Check</h2>
          <p>
            Das Formular für den Automation Check übermittelt keine Angaben an diese Website und speichert sie nicht auf dem Webserver. Beim Betätigen der Schaltfläche wird lediglich ein vorausgefüllter E-Mail-Entwurf im auf Ihrem Gerät eingerichteten E-Mail-Programm geöffnet. Daten werden erst versendet, wenn Sie die E-Mail dort selbst absenden.
          </p>
          <p>
            Bei einer Kontaktaufnahme verarbeiten wir insbesondere Name, Unternehmen, E-Mail-Adresse, Inhalt der Nachricht und weitere freiwillige Angaben, um Ihre Anfrage zu beantworten und die weitere Kommunikation zu koordinieren. Bezieht sich die Anfrage auf die Anbahnung oder Durchführung eines Vertrags, ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage. Bei allgemeinen geschäftlichen Anfragen erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der Bearbeitung und Dokumentation geschäftlicher Kommunikation. Gesetzliche Aufbewahrungspflichten beruhen auf Art. 6 Abs. 1 lit. c DSGVO.
          </p>
          <p>
            Die Bereitstellung Ihrer Angaben ist freiwillig. Ohne die für eine Antwort erforderlichen Kontakt- und Prozessinformationen können wir die Anfrage nicht bearbeiten. Bitte senden Sie keine besonderen Kategorien personenbezogener Daten, Bewerbungsunterlagen oder vertraulichen Kunden- und Mitarbeiterdaten.
          </p>
        </section>

        <section aria-labelledby="external-links-heading">
          <h2 id="external-links-heading">5. Externe Links</h2>
          <p>
            Die Teamprofile enthalten reine Links zu LinkedIn. Es werden keine Inhalte von LinkedIn in diese Website eingebettet und beim bloßen Seitenaufruf keine Verbindung zu LinkedIn hergestellt. Erst wenn Sie einen Link auswählen, rufen Sie die externe Website auf. Für die dortige Verarbeitung ist der jeweilige Anbieter verantwortlich. Weitere Informationen finden Sie in der <a href="https://www.linkedin.com/legal/privacy-policy" rel="noreferrer">Datenschutzerklärung von LinkedIn</a>.
          </p>
        </section>

        <section aria-labelledby="fonts-heading">
          <h2 id="fonts-heading">6. Schriftarten</h2>
          <p>
            Die auf dieser Website verwendeten Schriftarten werden lokal von unserem Hosting-System ausgeliefert. Beim Seitenaufruf wird deshalb keine Verbindung zu Google Fonts hergestellt.
          </p>
        </section>

        <section aria-labelledby="cookies-heading">
          <h2 id="cookies-heading">7. Cookies und lokale Speicherung</h2>
          <p>
            Diese Website setzt selbst keine Analyse- oder Marketing-Cookies ein und speichert keine Kennungen im lokalen Speicher Ihres Browsers. IONOS WebAnalytics verwendet nach Angaben des Anbieters ebenfalls keine Cookies. Eine Cookie-Einwilligung wird daher derzeit nicht abgefragt.
          </p>
        </section>

        <section aria-labelledby="retention-heading">
          <h2 id="retention-heading">8. Speicherdauer</h2>
          <p>
            Kontaktanfragen werden gelöscht, sobald ihre Bearbeitung abgeschlossen ist und keine vertraglichen oder gesetzlichen Gründe für eine weitere Aufbewahrung bestehen. Entsteht aus der Anfrage eine Geschäftsbeziehung, können geschäftliche Unterlagen entsprechend den handels- und steuerrechtlichen Aufbewahrungsfristen gespeichert werden. Für die von IONOS verarbeiteten Webhosting-Besuchsdaten gilt die oben genannte Dauer von acht Wochen.
          </p>
        </section>

        <section aria-labelledby="rights-heading">
          <h2 id="rights-heading">9. Ihre Rechte</h2>
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
          <h2 id="complaint-heading">10. Beschwerderecht</h2>
          <p>
            Sie können sich nach Art. 77 DSGVO bei einer Datenschutz-Aufsichtsbehörde beschweren. Für Baden-Württemberg ist der <a href="https://www.baden-wuerttemberg.datenschutz.de/beschwerde/" rel="noreferrer">Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg</a> zuständig.
          </p>
        </section>

        <p className="legal-meta">Stand: Juli 2026</p>
      </article>
    </main>
  );
}
