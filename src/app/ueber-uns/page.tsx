import ExperienceStrip from '@/components/experience-strip';
import PageCta from '@/components/page-cta';
import PageIntro from '@/components/page-intro';
import StructuredData from '@/components/structured-data';
import TeamGrid from '@/components/team-grid';
import { createPageMetadata, siteUrl } from '@/lib/seo';
import { team } from '@/lib/site-content';

export const metadata = createPageMetadata({
  title: 'Team für Automatisierung aus Tübingen',
  description: 'Das MSB-Team aus Tübingen verbindet Prozessverständnis, technische Automatisierung, Datenanalyse und nutzerorientierte Einführung.',
  path: '/ueber-uns'
});

const perspectives = [
  ['Prozessverständnis', 'Wir betrachten Aufgaben, Übergaben und Ausnahmen aus Sicht der Menschen, die täglich damit arbeiten.'],
  ['Technische Umsetzung', 'Wir verbinden Daten, Regeln und vorhandene Systeme zu nachvollziehbaren Workflows.'],
  ['Nutzerakzeptanz', 'Wir beziehen Rückmeldungen ein, dokumentieren den Ablauf und unterstützen die kontrollierte Einführung.']
] as const;

const companyFacts = [
  ['Unternehmen', 'MSB AI & Automation GbR mit Sitz in Tübingen.'],
  ['Für wen', 'Kleine und mittlere Unternehmen in Deutschland; regionaler Schwerpunkt Tübingen, Reutlingen und Stuttgart.'],
  ['Leistung', 'Prozesse klären, Automatisierungspiloten umsetzen, bestehende Systeme anbinden und den Betrieb dokumentiert übergeben.'],
  ['Arbeitsfelder', 'HR & Recruiting, Verwaltung & CRM, Reporting & Daten, Dokumente, E-Mail & Kommunikation sowie internes Wissen.'],
  ['Grundsatz', 'Feste Regeln, wo sie ausreichen; KI für unstrukturierte Inhalte; menschliche Prüfung bei Risiko, Unklarheit oder Verantwortung.']
] as const;

const aboutStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${siteUrl}/ueber-uns#webpage`,
      url: `${siteUrl}/ueber-uns`,
      name: 'Über MSB AI & Automation',
      description: 'Unternehmensprofil und Team der MSB AI & Automation GbR aus Tübingen.',
      inLanguage: 'de-DE',
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${siteUrl}/#organization` }
    },
    ...team.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      description: member.text,
      image: member.image ? `${siteUrl}${member.image}` : undefined,
      sameAs: member.linkedin,
      worksFor: { '@id': `${siteUrl}/#organization` }
    }))
  ]
};

export default function UeberUnsPage() {
  return (
    <main id="main-content">
      <StructuredData data={aboutStructuredData} />
      <PageIntro
        eyebrow="Über uns"
        title="Drei Perspektiven. Ein gemeinsamer Prozess."
        lead="MSB verbindet psychologisches Prozessverständnis, technische Umsetzung und nutzerorientierte Einführung."
        aside="Unser gemeinsamer Maßstab: Lösungen müssen fachlich nachvollziehbar, technisch umsetzbar und im Arbeitsalltag nutzbar sein."
      />

      <ExperienceStrip />

      <section className="section collaboration-section" aria-labelledby="company-profile-heading">
        <div className="container editorial-split">
          <div className="section-heading sticky-heading collaboration-heading">
            <p className="eyebrow">MSB im Überblick</p>
            <h2 id="company-profile-heading">Prozessautomatisierung für KMU aus Tübingen.</h2>
            <p>Wir begleiten konkrete Geschäftsprozesse von der ersten Klärung bis zur kontrollierten Übergabe in den Arbeitsalltag.</p>
          </div>
          <dl className="editorial-list">
            {companyFacts.map(([title, text]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

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
