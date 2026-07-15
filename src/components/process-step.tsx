import React from 'react';

type Props = {
  index?: number;
  title: string;
  text: string;
};

export function ProcessStep({ index, title, text }: Props) {
  return (
    <article className="section-card card-pad">
      {typeof index === 'number' ? <p className="kicker" style={{ marginBottom: '0.45rem' }}>0{index + 1}</p> : null}
      <h3>{title}</h3>
      <p style={{ marginTop: '0.65rem' }}>{text}</p>
    </article>
  );
}

export default ProcessStep;
