import { Reveal } from '@/components/reveal';
import styles from './regional-use-cases-panel.module.css';

const regionalUseCases = [
  'Anfragen aus E-Mail oder Formular strukturiert in CRM und Aufgaben überführen',
  'wiederkehrende Reports aus abgestimmten Datenquellen vorbereiten',
  'Dokumente und Pflichtangaben prüfen, ohne Ausnahmen zu verstecken',
  'administrative Schritte in HR und Verwaltung klar koordinieren'
] as const;

export function RegionalUseCasesPanel() {
  return (
    <Reveal className={styles.panel} aria-label="Typische Ausgangspunkte">
      <ul className={styles.list}>
        {regionalUseCases.map((useCase, index) => (
          <li key={useCase}>
            <span className={styles.marker} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span>{useCase}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default RegionalUseCasesPanel;
