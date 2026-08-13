import { Reveal } from '@/components/reveal';
import { primaryCtaFullLabel } from '@/lib/site-content';

type PageCtaProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
  compact?: boolean;
};

export function PageCta({
  title = 'Welcher Prozess kostet Ihr Team regelmäßig Zeit?',
  text = 'Im kostenlosen Check betrachten wir einen konkreten Ablauf und ordnen Nutzen, Aufwand und Risiken ein.',
  buttonLabel = primaryCtaFullLabel,
  compact = false
}: PageCtaProps) {
  return (
    <section className={`page-cta-band${compact ? ' page-cta-band--compact' : ''}`} aria-labelledby="page-cta-heading">
      <Reveal className="container page-cta-layout">
        <div>
          <p className="eyebrow eyebrow-light">Nächster Schritt</p>
          <h2 id="page-cta-heading">{title}</h2>
          <p>{text}</p>
        </div>
        <a className="button button-light" href="/automation-check/">
          {buttonLabel} <span className="button-arrow" aria-hidden="true">→</span>
        </a>
      </Reveal>
    </section>
  );
}

export default PageCta;
