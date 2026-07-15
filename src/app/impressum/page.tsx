export const metadata = {
  title: 'Impressum | MSB AI Consulting'
};

export default function ImpressumPage() {
  return (
    <main className="page-shell">
      <div className="container prose-panel">
        <p className="callout">Hinweis: Diese Seite ist ein Platzhalter und muss vor Veröffentlichung rechtlich geprüft werden.</p>
        <section>
          <h1>Impressum</h1>
          <p>
            MSB AI Consulting<br />
            Inhaber: Dominik Soballa<br />
            Haußerstraße 150<br />
            72076 Tübingen<br />
            Deutschland<br />
            E-Mail: <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
          </p>
        </section>
      </div>
    </main>
  );
}
