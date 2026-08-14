type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  aside?: string;
  compact?: boolean;
  flush?: boolean;
};

export function PageIntro({ eyebrow, title, lead, aside, compact = false, flush = false }: PageIntroProps) {
  return (
    <section className={[
      'page-intro',
      compact ? 'page-intro--compact' : '',
      flush ? 'page-intro--flush' : ''
    ].filter(Boolean).join(' ')}>
      <div className="container page-intro-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-intro-copy">
          <p>{lead}</p>
          {aside ? <p className="page-intro-aside">{aside}</p> : null}
        </div>
      </div>
    </section>
  );
}

export default PageIntro;
