type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  aside?: string;
  compact?: boolean;
  flush?: boolean;
  stacked?: boolean;
};

export function PageIntro({
  eyebrow,
  title,
  lead,
  aside,
  compact = false,
  flush = false,
  stacked = false
}: PageIntroProps) {
  return (
    <section className={[
      'page-intro',
      compact ? 'page-intro--compact' : '',
      flush ? 'page-intro--flush' : '',
      stacked ? 'page-intro--stacked' : ''
    ].filter(Boolean).join(' ')}>
      <div className="container page-intro-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {stacked && lead ? <p className="page-intro-lead">{lead}</p> : null}
        </div>
        {!stacked ? (
          <div className="page-intro-copy">
            {lead ? <p>{lead}</p> : null}
            {aside ? <p className="page-intro-aside">{aside}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PageIntro;
