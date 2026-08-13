import AnimatedHero from '@/components/animated-hero';
import ExperienceStrip from '@/components/experience-strip';
import PageCta from '@/components/page-cta';
import ProcessFlow from '@/components/process-flow';
import SiteStructuredData from '@/components/site-structured-data';
import TeamGrid from '@/components/team-grid';
import { Reveal, RevealGroup } from '@/components/reveal';
import { createPageMetadata } from '@/lib/seo';
import { serviceCategories } from '@/lib/service-detail-content';
import { problems, useCases } from '@/lib/site-content';

export const metadata = createPageMetadata({
  title: 'KI- & Prozessautomatisierung für KMU',
  description: 'MSB automatisiert wiederkehrende Abläufe in Verwaltung, HR und Reporting – pragmatisch, kontrolliert und passend zur bestehenden IT.',
  path: '/'
});

const homeThemes = serviceCategories.map((category) => ({
  name: category.name,
  teaser: category.cardTeaser,
  href: `/leistungen/${category.slug}/`
}));

const homeWorkplan = [
  {
    title: 'Prozess prüfen',
    description: 'Wir betrachten einen realen Ablauf mit den beteiligten Systemen, Daten und Ausnahmen.',
    outcome: 'Entscheidung, ob sich ein Pilot lohnt'
  },
  {
    title: 'Pilot testen',
    description: 'Ein klar abgegrenzter Teil des Ablaufs läuft mit typischen Fällen und echten Ausnahmen.',
    outcome: 'Messbare Ergebnisse und bekannte Grenzen'
  },
  {
    title: 'Systeme anbinden',
    description: 'Nur bestätigte Schritte werden mit den vorhandenen Systemen und Freigaben verbunden.',
    outcome: 'Dokumentierte Schnittstellen und Prüfstellen'
  },
  {
    title: 'Betrieb übergeben',
    description: 'Wir bereiten das Team, die Kontrollen und die Verantwortlichen auf den laufenden Betrieb vor.',
    outcome: 'Geschulter Betrieb mit klarer Zuständigkeit'
  }
] as const;

export default function HomePage() {
  return (
    <main id="main-content">
      <SiteStructuredData />
      <AnimatedHero />
      <ExperienceStrip />

      <section className="section problem-section" aria-labelledby="problems-heading">
        <div className="container problem-layout">
          <Reveal className="section-heading sticky-heading">
            <p className="eyebrow">Ausgangspunkt</p>
            <h2 id="problems-heading">Wo im Alltag Zeit verloren geht</h2>
            <p>Wir beginnen nicht mit einem Tool, sondern mit einem konkreten wiederkehrenden Ablauf.</p>
          </Reveal>
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

      <section className="section services-preview-section" aria-labelledby="themes-preview-heading">
        <div className="container">
          <Reveal className="section-heading heading-split">
            <div>
              <p className="eyebrow">Themen</p>
              <h2 id="themes-preview-heading">Bereiche, in denen wir Prozesse automatisieren</h2>
            </div>
            <div className="section-heading-action">
              <p>Von Recruiting bis Reporting: klar abgegrenzte Abläufe in Ihrer bestehenden IT.</p>
              <a className="text-link" href="/leistungen/">Alle Themen ansehen <span aria-hidden="true">→</span></a>
            </div>
          </Reveal>
          <RevealGroup className="theme-preview-list" stagger="normal">
            {homeThemes.map((theme) => (
              <a key={theme.href} href={theme.href}>
                <strong>{theme.name}</strong>
                <span>{theme.teaser}</span>
                <span className="preview-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section use-case-section" aria-labelledby="examples-heading">
        <div className="container use-case-preview-layout">
          <Reveal className="section-heading">
            <p className="eyebrow">Beispiele</p>
            <h2 id="examples-heading">Typische Prozesse, mit denen wir starten</h2>
            <p>Keine Standardsoftware, sondern klar abgegrenzte Abläufe mit menschlicher Kontrolle.</p>
            <a className="text-link" href="/anwendungsfaelle/">Alle Beispiele ansehen <span aria-hidden="true">→</span></a>
          </Reveal>
          <RevealGroup className="use-case-preview-list" stagger="normal">
            {useCases.map((useCase) => (
              <a key={useCase.category} href={useCase.href}>
                <strong>{useCase.category}</strong>
                <span>{useCase.summary}</span>
                <span className="preview-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section engagement-section" aria-labelledby="engagement-heading">
        <div className="container">
          <Reveal className="section-heading heading-split">
            <div>
              <p className="eyebrow">Vorgehen</p>
              <h2 id="engagement-heading">Von der ersten Prüfung bis zur geregelten Übergabe.</h2>
            </div>
            <div className="section-heading-action">
              <p>Wir beginnen mit einem konkreten Ablauf. Erst wenn der Pilot im Alltag funktioniert, binden wir Systeme an und bereiten die Übergabe vor.</p>
              <a className="text-link" href="/vorgehen/">Vorgehen im Detail <span aria-hidden="true">→</span></a>
            </div>
          </Reveal>
          <ProcessFlow
            className="engagement-process engagement-process-preview"
            ariaLabel="Arbeitsplan mit vier Phasen von der Prozessprüfung bis zur Übergabe"
            layout="horizontal"
            steps={homeWorkplan}
          />
        </div>
      </section>

      <section className="section team-section" aria-labelledby="team-heading">
        <div className="container">
          <Reveal className="section-heading heading-split">
            <div>
              <p className="eyebrow">Über uns</p>
              <h2 id="team-heading">Wer hinter MSB steckt</h2>
            </div>
            <div className="section-heading-action">
              <p>Drei Schwerpunkte: Prozesse verstehen, Workflows bauen, Nutzung im Team absichern.</p>
              <a className="text-link" href="/ueber-uns/">Team und Erfahrung <span aria-hidden="true">→</span></a>
            </div>
          </Reveal>
          <TeamGrid compact />
        </div>
      </section>

      <PageCta />
    </main>
  );
}
