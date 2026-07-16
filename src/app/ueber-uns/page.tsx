import ExperienceStrip from '@/components/experience-strip';
import PageCta from '@/components/page-cta';
import PageIntro from '@/components/page-intro';
import TeamGrid from '@/components/team-grid';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Über uns',
  description: 'Das MSB-Team verbindet Prozessverständnis, Automatisierung, Datenanalyse, Projektmanagement und Nutzerakzeptanz.',
  path: '/ueber-uns'
});

const perspectives = [
  ['Prozessverständnis', 'Wir betrachten Aufgaben, Übergaben und Ausnahmen aus Sicht der Menschen, die täglich damit arbeiten.'],
  ['Technische Umsetzung', 'Wir verbinden Daten, Regeln und vorhandene Systeme zu nachvollziehbaren Workflows.'],
  ['Nutzerakzeptanz', 'Wir beziehen Rückmeldungen ein, dokumentieren den Ablauf und unterstützen die kontrollierte Einführung.']
] as const;

export default function UeberUnsPage() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="Über uns"
        title="Drei Perspektiven. Ein gemeinsamer Prozess."
        lead="MSB verbindet psychologisches Prozessverständnis, technische Umsetzung und nutzerorientierte Einführung."
        aside="Unser gemeinsamer Maßstab: Lösungen müssen fachlich nachvollziehbar, technisch umsetzbar und im Arbeitsalltag nutzbar sein."
      />

      <ExperienceStrip />

      <section className="section team-section" aria-labelledby="team-detail-heading">
        <div className="container">
          <div className="section-heading heading-split about-team-heading">
            <div>
              <p className="eyebrow">Team</p>
              <h2 id="team-detail-heading">Das Team hinter MSB</h2>
            </div>
            <p>Drei fachliche Schwerpunkte greifen ineinander: Prozessverständnis, technische Umsetzung und nutzerorientierte Einführung.</p>
          </div>
          <TeamGrid />
        </div>
      </section>

      <section className="section collaboration-section" aria-labelledby="collaboration-heading">
        <div className="container editorial-split">
          <div className="section-heading sticky-heading collaboration-heading">
            <p className="eyebrow">Zusammenarbeit</p>
            <h2 id="collaboration-heading">Technik und Arbeitsalltag zusammen denken</h2>
            <p>Wir bringen fachliche, technische und menschliche Anforderungen früh im Projekt zusammen.</p>
          </div>
          <dl className="editorial-list">
            {perspectives.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}
          </dl>
        </div>
      </section>

      <PageCta title="Lassen Sie uns einen konkreten Ablauf betrachten." />
    </main>
  );
}
