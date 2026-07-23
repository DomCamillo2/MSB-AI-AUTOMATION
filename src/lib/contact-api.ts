export type ContactSource = 'website_contact' | 'automation_check_result';

type ContactRequest = {
  source: ContactSource;
  name: string;
  company: string;
  email: string;
  message: string;
  privacy: true;
  website: string;
  startedAt: number;
};

type ContactResponse = {
  ok?: boolean;
  message?: string;
  requestId?: string;
};

export async function sendContactRequest(payload: ContactRequest) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('/contact.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      signal: controller.signal
    });
    const result = await response.json().catch(() => ({})) as ContactResponse;

    if (!response.ok || result.ok !== true) {
      throw new Error(
        result.message
          || 'Die Nachricht konnte gerade nicht versendet werden. Bitte schreiben Sie direkt an kontakt@msb-ai.de.'
      );
    }

    return result;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Der Versand dauert ungewöhnlich lange. Bitte versuchen Sie es erneut oder schreiben Sie direkt an kontakt@msb-ai.de.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
