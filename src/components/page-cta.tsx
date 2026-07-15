type PageCtaProps = {
  title?: string;
  text?: string;
};

export function PageCta({
  title = 'Welcher Prozess kostet Ihr Team regelmäßig Zeit?',
  text = 'Im Automation Check betrachten wir einen konkreten Ablauf und ordnen Nutzen, Aufwand und Risiken ein.'
}: PageCtaProps) {
  return (
    <section className="page-cta-band" aria-labelledby="page-cta-heading">
      <div className="container page-cta-layout">
        <div>
          <p className="eyebrow eyebrow-light">Nächster Schritt</p>
          <h2 id="page-cta-heading">{title}</h2>
          <p>{text}</p>
        </div>
        <a className="button button-light" href="/automation-check">
          Automation Check anfragen <span className="button-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default PageCta;
