import type { Metadata } from 'next';
import AnimatedHero from '@/components/animated-hero';
import ExperienceStrip from '@/components/experience-strip';
import PageCta from '@/components/page-cta';
import ProcessFlow from '@/components/process-flow';
import TeamGrid from '@/components/team-grid';
import { Reveal } from '@/components/reveal';
import { engagementSteps, problems, services, useCases } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Prozessautomatisierung für KMU',
  description: 'MSB analysiert wiederkehrende Abläufe, entwickelt pragmatische Automatisierungen und begleitet Teams bei der Einführung.'
};

export default function HomePage() {
  return (
    <main id="main-content">
      <AnimatedHero />
      <ExperienceStrip />

      <section className="section problem-section" aria-labelledby="problems-heading">
        <div className="container problem-layout">
          <div className="section-heading sticky-heading">
            <p className="eyebrow">Ausgangspunkt</p>
            <h2 id="problems-heading">Wo im Alltag Zeit verloren geht</h2>
            <p>Wir beginnen nicht mit einem Tool, sondern mit einem konkreten wiederkehrenden Ablauf.</p>
          </div>
          <Reveal className="problem-list-reveal">
            <ul className="problem-list">
              {problems.map((problem) => (
                <li key={problem.title}>
                  <span className="problem-marker" aria-hidden="true" />
                  <div>
                    <h3>{problem.title}</h3>
                    <p>{problem.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section services-preview-section" aria-labelledby="services-preview-heading">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <p className="eyebrow">Leistungen</p>
              <h2 id="services-preview-heading">Von der Prozessklärung bis zur Übergabe</h2>
            </div>
            <div className="section-heading-action">
              <p>Pragmatische Unterstützung für klar abgegrenzte Abläufe in Ihrer bestehenden Umgebung.</p>
              <a className="text-link" href="/leistungen">Leistungen im Detail <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="service-preview-list">
            {services.map((service, index) => (
              <article key={service.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section use-case-section" aria-labelledby="use-cases-heading">
        <div className="container use-case-preview-layout">
          <div className="section-heading">
            <p className="eyebrow">Anwendungsfälle</p>
            <h2 id="use-cases-heading">Typische Prozesse, mit denen wir starten</h2>
            <p>Keine Standardsoftware, sondern klar abgegrenzte Abläufe mit menschlicher Kontrolle.</p>
            <a className="text-link" href="/anwendungsfaelle">Alle Anwendungsfälle ansehen <span aria-hidden="true">→</span></a>
          </div>
          <div className="use-case-preview-list">
            {useCases.map((useCase) => (
              <a key={useCase.category} href="/anwendungsfaelle">
                <strong>{useCase.category}</strong>
                <span>{useCase.summary}</span>
                <span className="preview-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section engagement-section" aria-labelledby="engagement-heading">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <p className="eyebrow">Vorgehen</p>
              <h2 id="engagement-heading">Klein starten. Wirkung prüfen. Sauber übergeben.</h2>
            </div>
            <div className="section-heading-action">
              <p>Sie müssen nicht sofort ein großes Transformationsprojekt beauftragen.</p>
              <a className="text-link" href="/vorgehen">Vorgehen kennenlernen <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <ProcessFlow
            className="engagement-process engagement-process-preview"
            ariaLabel="Drei Schritte von der Prozessprüfung bis zur Übergabe"
            layout="horizontal"
            steps={engagementSteps.map((step) => ({
              title: step.title,
              description: step.text,
              outcome: step.deliverable
            }))}
          />
        </div>
      </section>

      <section className="section team-section" aria-labelledby="team-heading">
        <div className="container">
          <div className="section-heading heading-split">
            <div>
              <p className="eyebrow">Über uns</p>
              <h2 id="team-heading">Drei Perspektiven. Ein gemeinsamer Prozess.</h2>
            </div>
            <div className="section-heading-action">
              <p>Wir verbinden Prozessverständnis, technische Umsetzung und Nutzerakzeptanz.</p>
              <a className="text-link" href="/ueber-uns">Team und Erfahrung <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <TeamGrid compact />
        </div>
      </section>

      <PageCta />
    </main>
  );
}
