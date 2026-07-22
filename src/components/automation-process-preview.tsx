import AutomationCheckIcon from '@/components/automation-check-icon';
import { buildCurrentWorkflow } from '@/lib/automation-check-scoring';
import type { CheckAnswers, WorkflowNode } from '@/lib/automation-check-types';
import styles from './automation-check.module.css';

type DiagramProps = {
  nodes: WorkflowNode[];
  label: string;
  compact?: boolean;
};

export function AutomationProcessDiagram({ nodes, label, compact = false }: DiagramProps) {
  return (
    <ol className={`${styles.processDiagram} ${compact ? styles.processDiagramCompact : ''}`} aria-label={label}>
      {nodes.map((node, index) => (
        <li className={styles.processNode} data-kind={node.kind} key={`${node.id}-${node.label}`}>
          <span className={styles.processIcon}>
            <AutomationCheckIcon name={node.kind} />
          </span>
          <div>
            <small>{String(index + 1).padStart(2, '0')}</small>
            <strong>{node.label}</strong>
          </div>
        </li>
      ))}
    </ol>
  );
}

type PreviewProps = {
  answers: CheckAnswers;
};

export function AutomationProcessPreview({ answers }: PreviewProps) {
  const nodes = buildCurrentWorkflow(answers);

  return (
    <aside className={styles.livePreview} aria-labelledby="live-process-heading">
      <header>
        <div>
          <p className={styles.previewEyebrow}>Live-Prozessbild</p>
          <h2 id="live-process-heading">Ihr Ablauf nimmt Form an.</h2>
        </div>
        <span aria-hidden="true">LIVE</span>
      </header>
      <AutomationProcessDiagram nodes={nodes} label="Aktuelles, während des Checks entstehendes Prozessbild" compact />
      <p className={styles.previewNote}>Vereinfachte Darstellung zur ersten Orientierung – kein technisches Lösungsdesign.</p>
    </aside>
  );
}

export default AutomationProcessPreview;
