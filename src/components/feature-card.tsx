import React from 'react';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export function FeatureCard({ title, children }: Props) {
  return (
    <article className="section-card card-pad">
      <div className="section-rule" aria-hidden="true" />
      <h3 style={{ marginTop: '1rem' }}>{title}</h3>
      <div style={{ marginTop: '0.7rem' }}>{children}</div>
    </article>
  );
}

export default FeatureCard;
