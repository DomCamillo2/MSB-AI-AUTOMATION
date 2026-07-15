import React from 'react';

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  profileUrl?: string;
  companyLogo?: string;
  approved?: boolean;
};

type Props = {
  data?: Testimonial[];
};

export function TestimonialList({ data }: Props) {
  if (!data || data.length === 0) return null;
  return (
    <section className="section" aria-label="Testimonials">
      <div className="container">
        <div className="section-intro">
          <p className="kicker">Stimmen</p>
          <h2>Ausgewählte Aussagen</h2>
        </div>
        <div className="grid-2">
          {data.map((t, i) => (
            <blockquote key={i} className="prose-panel">
              <p style={{ fontStyle: 'italic' }}>{t.quote}</p>
              <footer style={{ marginTop: '0.75rem' }}>
                <strong>{t.name}</strong>{t.role ? ` — ${t.role}` : ''}{t.company ? `, ${t.company}` : ''}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialList;
