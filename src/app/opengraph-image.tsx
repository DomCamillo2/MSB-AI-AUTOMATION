import { ImageResponse } from 'next/og';

export const alt = 'MSB AI & Automation – Automatisierung mit Menschenverstand';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 82px',
          color: '#071b3a',
          background: '#f4f3ee',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '22px' }}>
            <span style={{ fontSize: 72, fontWeight: 800, letterSpacing: '-5px' }}>MSB</span>
            <span style={{ fontSize: 25, fontWeight: 700 }}>AI &amp; Automation</span>
          </div>
          <span style={{ color: '#08777b', fontSize: 22, fontWeight: 700 }}>Tübingen · Stuttgart</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ width: 132, height: 8, borderRadius: 8, background: '#08777b' }} />
          <h1 style={{ maxWidth: 940, margin: 0, fontSize: 72, lineHeight: 1.05, letterSpacing: '-3px' }}>
            Automatisierung mit Menschenverstand.
          </h1>
          <p style={{ margin: 0, color: '#46535a', fontSize: 30 }}>
            Kontrollierte KI- und Prozessautomatisierung für KMU
          </p>
        </div>
      </div>
    ),
    size
  );
}
