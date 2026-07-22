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
            Diese Website wird über Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, bereitgestellt. Die bei IONOS registrierte Domain wird mit dem Vercel-Projekt verbunden; IONOS hostet die Website nicht.
          </p>
          <p>
            Beim Aufruf der Website verarbeitet Vercel technisch erforderliche Verbindungs- und Protokolldaten. Dazu können insbesondere IP-Adresse, Zeitpunkt und Dauer der Anfrage, aufgerufene Adresse, Referrer, Browser- und Geräteinformationen sowie Status- und Fehlerdaten gehören. Die Verarbeitung ist erforderlich, um die Website auszuliefern, Angriffe und Missbrauch zu erkennen und den technischen Betrieb sicherzustellen.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren, schnellen und zuverlässigen Bereitstellung der Website. Vercel kann Daten in den USA und in weiteren Ländern verarbeiten. Vercel beschreibt hierfür unter anderem das EU-U.S. Data Privacy Framework und Standardvertragsklauseln als Transfermechanismen.
          </p>
          <p>
            Weitere Informationen: <a href="https://vercel.com/legal/privacy-notice" rel="noreferrer">Datenschutzhinweise von Vercel</a> und <a href="https://vercel.com/legal/dpa" rel="noreferrer">Data Processing Addendum von Vercel</a>.
          </p>
        </section>

        <section aria-labelledby="contact-data-heading">
          <h2 id="contact-data-heading">3. Kontaktformular, Automation Check und E-Mail</h2>
          <p>
            Wenn Sie das Formular für den Automation Check absenden, werden Ihre Angaben verschlüsselt an eine serverseitige Funktion dieser Website übertragen. Verarbeitet werden Name, Unternehmen, E-Mail-Adresse, Prozessbeschreibung, der Zeitpunkt der Übermittlung sowie technisch erforderliche Verbindungsdaten. Die IP-Adresse wird vorübergehend zur Begrenzung automatisierter oder missbräuchlicher Anfragen verwendet. Das Formular enthält außerdem ein unsichtbares Prüfungsfeld; ein externer CAPTCHA-Dienst wird nicht eingesetzt.
          </p>
          <p>
            Für die technische E-Mail-Zustellung nutzen wir Resend, einen Dienst der Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Resend verarbeitet dabei insbesondere Absender- und Empfängeradresse, Nachrichteninhalt sowie Zustellungsmetadaten, um die Anfrage an <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a> zu übermitteln. Antworten erfolgen an die von Ihnen angegebene E-Mail-Adresse.
          </p>
          <p>
            Resend verarbeitet Daten nach eigenen Angaben hauptsächlich in den USA. Als Garantien für Übermittlungen nennt Resend das EU-U.S. Data Privacy Framework und die EU-Standardvertragsklauseln. Weitere Informationen: <a href="https://resend.com/legal/privacy-policy" rel="noreferrer">Datenschutzerklärung von Resend</a> und <a href="https://resend.com/legal/dpa" rel="noreferrer">Data Processing Addendum von Resend</a>.
          </p>
          <p>
            Wir verarbeiten die Angaben, um Ihre Anfrage zu prüfen, zu beantworten und die weitere Kommunikation zu koordinieren. Bezieht sich die Anfrage auf die Anbahnung oder Durchführung eines Vertrags, ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage. Bei allgemeinen geschäftlichen Anfragen erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der Bearbeitung und Dokumentation geschäftlicher Kommunikation. Gesetzliche Aufbewahrungspflichten beruhen auf Art. 6 Abs. 1 lit. c DSGVO.
          </p>
          <p>
            Die Bereitstellung Ihrer Angaben ist freiwillig. Ohne die für eine Antwort erforderlichen Kontakt- und Prozessinformationen können wir die Anfrage nicht bearbeiten. Bitte senden Sie keine besonderen Kategorien personenbezogener Daten, Bewerbungsunterlagen oder vertraulichen Kunden- und Mitarbeiterdaten. Alternativ können Sie uns direkt per E-Mail kontaktieren.
          </p>
        </section>

        <section aria-labelledby="external-links-heading">
          <h2 id="external-links-heading">4. Externe Links</h2>
          <p>
            Die Teamprofile enthalten reine Links zu LinkedIn. Es werden keine Inhalte von LinkedIn in diese Website eingebettet und beim bloßen Seitenaufruf keine Verbindung zu LinkedIn hergestellt. Erst wenn Sie einen Link auswählen, rufen Sie die externe Website auf. Für die dortige Verarbeitung ist der jeweilige Anbieter verantwortlich. Weitere Informationen finden Sie in der <a href="https://www.linkedin.com/legal/privacy-policy" rel="noreferrer">Datenschutzerklärung von LinkedIn</a>.
          </p>
        </section>

        <section aria-labelledby="fonts-heading">
          <h2 id="fonts-heading">5. Schriftarten</h2>
          <p>
            Die auf dieser Website verwendeten Schriftarten werden lokal ausgeliefert. Beim Seitenaufruf wird deshalb keine Verbindung zu Google Fonts hergestellt.
          </p>
        </section>

        <section aria-labelledby="cookies-heading">
          <h2 id="cookies-heading">6. Cookies, Analyse und lokale Speicherung</h2>
          <p>
            Diese Website setzt selbst keine Analyse- oder Marketing-Cookies ein und verwendet keine externen Analyse- oder Werbedienste. Es werden keine Kennungen zu Analyse- oder Marketingzwecken im lokalen Speicher Ihres Browsers abgelegt. Eine Einwilligung für solche Technologien wird daher derzeit nicht abgefragt. Die technisch erforderliche Verarbeitung von Verbindungsdaten durch Vercel ist im Abschnitt „Hosting und Server-Protokolle“ beschrieben.
          </p>
        </section>

        <section aria-labelledby="retention-heading">
          <h2 id="retention-heading">7. Speicherdauer</h2>
          <p>
            Kontaktanfragen und die daraus entstehende Kommunikation werden gelöscht, sobald ihre Bearbeitung abgeschlossen ist und keine vertraglichen oder gesetzlichen Gründe für eine weitere Aufbewahrung bestehen. Entsteht aus der Anfrage eine Geschäftsbeziehung, können geschäftliche Unterlagen entsprechend den handels- und steuerrechtlichen Aufbewahrungsfristen gespeichert werden.
          </p>
          <p>
            Technische Protokoll- und Zustellungsdaten werden durch Vercel und Resend entsprechend den jeweiligen Vertrags-, Sicherheits- und Aufbewahrungsvorgaben verarbeitet. Resend beschreibt in seinem Data Processing Addendum die Löschung von Kunden- und Nutzerdaten innerhalb von 90 Tagen nach Beendigung der Nutzung des Dienstes, soweit keine weitere gesetzliche Speicherung erforderlich ist.
          </p>
        </section>

        <section aria-labelledby="rights-heading">
          <h2 id="rights-heading">8. Ihre Rechte</h2>
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
          <h2 id="complaint-heading">9. Beschwerderecht</h2>
          <p>
            Sie können sich nach Art. 77 DSGVO bei einer Datenschutz-Aufsichtsbehörde beschweren. Für Baden-Württemberg ist der <a href="https://www.baden-wuerttemberg.datenschutz.de/beschwerde/" rel="noreferrer">Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg</a> zuständig.
          </p>
        </section>

        <p className="legal-meta">Stand: Juli 2026</p>
      </article>
    </main>
  );
}
