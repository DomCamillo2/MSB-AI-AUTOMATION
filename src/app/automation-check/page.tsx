import AutomationCheckExperience from '@/components/automation-check-experience';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Interaktiver Automation Check für KMU',
  description: 'Ordnen Sie einen wiederkehrenden Prozess in rund 90 Sekunden ein – mit nachvollziehbarer Auswertung, Prozessbild und einem sinnvollen nächsten Schritt.',
  path: '/automation-check'
});

export default function AutomationCheckPage() {
  return <AutomationCheckExperience />;
}
