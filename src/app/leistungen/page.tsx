import type { Metadata } from 'next';
import ExperienceSnapshots from '@/components/experience-snapshots';
import PageCta from '@/components/page-cta';
import PageIntro from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { principles, services } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Leistungen',
  description: 'Prozessanalyse, Workflow-Automatisierung sowie Einführung und Befähigung für klar abgegrenzte Abläufe.'
};

export default function LeistungenPage() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="Leistungen"
        title="Automatisierung, die zu Ihren Abläufen passt."
        lead="Wir verbinden Prozessanalyse, technische Umsetzung und Einführung. Ausgangspunkt ist ein konkreter Ablauf – nicht ein möglichst großes Technologieprojekt."
        aside="Die Umsetzung orientiert sich an Ihrer vorhandenen IT, den beteiligten Rollen und den erforderlichen Kontrollpunkten."
      />

      <section className="section" aria-labelledby="service-detail-heading">
        <div className="container">
          <div className="section-heading heading-split">
            <div><h2 id="service-detail-heading">Drei Bausteine für eine tragfähige Lösung</h2></div>
            <p>Die Gewichtung richtet sich nach Prozess, Systemlandschaft und Reifegrad.</p>
          </div>
          <Reveal>
            <div className="service-detail-list">
              {services.map((service, index) => (
                <article key={service.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{service.title}</h3><p>{service.text}</p></div>
                  <p>{service.detail}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ExperienceSnapshots />

      <section className="section responsible-section" aria-labelledby="service-fit-heading">
        <div className="container responsible-intro">
          <p className="eyebrow eyebrow-light">Technische Leitplanken</p>
          <h2 id="service-fit-heading">Kontrollierbar statt unnötig komplex</h2>
          <p>Eine gute Automatisierung bleibt für Fachverantwortliche verständlich und passt zur vorhandenen Arbeitsweise.</p>
          <dl className="principle-list">
            {principles.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
          </dl>
        </div>
      </section>

      <PageCta />
    </main>
  );
}
