export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <div>
          <strong className="footer-brand">MSB AI &amp; Automation</strong>
          <p>Pragmatische Prozessautomatisierung für KMU in der Region Tübingen–Stuttgart.</p>
        </div>
        <nav className="footer-links" aria-label="Rechtliches und Kontakt">
          <a href="mailto:kontakt@msb-ai.de">kontakt@msb-ai.de</a>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}

export default SiteFooter;
