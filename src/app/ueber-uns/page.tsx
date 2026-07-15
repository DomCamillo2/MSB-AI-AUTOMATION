import type { Metadata } from 'next';
import ExperienceStrip from '@/components/experience-strip';
import PageCta from '@/components/page-cta';
import PageIntro from '@/components/page-intro';
import TeamGrid from '@/components/team-grid';

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Das MSB-Team verbindet Prozessverständnis, Automatisierung, Datenanalyse, Projektmanagement und Nutzerakzeptanz.'
};

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
        aside="Die genannten Unternehmenskontexte sind berufliche Stationen einzelner Teammitglieder und keine Referenzkunden von MSB."
      />

      <ExperienceStrip />

      <section className="section team-section" aria-labelledby="team-detail-heading">
        <div className="container">
          <div className="section-heading heading-split">
            <div><h2 id="team-detail-heading">Das Team hinter MSB</h2></div>
            <p>Unterschiedliche fachliche Schwerpunkte fließen in eine gemeinsame, pragmatische Projektarbeit ein.</p>
          </div>
          <TeamGrid />
        </div>
      </section>

      <section className="section collaboration-section" aria-labelledby="collaboration-heading">
        <div className="container editorial-split">
          <div className="section-heading sticky-heading">
            <p className="eyebrow">Zusammenarbeit</p>
            <h2 id="collaboration-heading">Technik und Arbeitsalltag zusammen denken</h2>
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
