import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const recipient = process.env.CONTACT_TO_EMAIL || 'kontakt@msb-ai.de';
const sender = process.env.CONTACT_FROM_EMAIL || 'MSB Website <formular@msb-ai.de>';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxRequests = 5;

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  process?: unknown;
  privacy?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function textValue(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return entities[character];
  });
}

function clientAddress(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function exceedsRateLimit(identifier: string) {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore) {
    if (entry.expiresAt <= now) rateLimitStore.delete(key);
  }

  const current = rateLimitStore.get(identifier);
  if (!current || current.expiresAt <= now) {
    rateLimitStore.set(identifier, { count: 1, expiresAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > rateLimitMaxRequests;
}

function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ message: 'Ungültige Anfrage.' }, { status: 403 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 16_000) {
    return NextResponse.json({ message: 'Die Anfrage ist zu groß.' }, { status: 413 });
  }

  if (exceedsRateLimit(clientAddress(request))) {
    return NextResponse.json(
      { message: 'Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.' },
      { status: 429 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ message: 'Die Formulardaten konnten nicht gelesen werden.' }, { status: 400 });
  }

  const honeypot = textValue(payload.website, 200);
  const startedAt = typeof payload.startedAt === 'number' ? payload.startedAt : 0;
  const completionTime = Date.now() - startedAt;

  // A filled honeypot is ignored without revealing the spam check.
  if (honeypot) {
    return NextResponse.json({ message: 'Vielen Dank. Ihre Anfrage wurde übermittelt.' });
  }

  if (!startedAt || completionTime < 1_200) {
    return NextResponse.json(
      { message: 'Bitte warten Sie einen Moment und senden Sie das Formular erneut.' },
      { status: 400 }
    );
  }

  const name = textValue(payload.name, 120);
  const company = textValue(payload.company, 160);
  const email = textValue(payload.email, 254).toLowerCase();
  const processDescription = textValue(payload.process, 3_000);
  const privacyAcknowledged = payload.privacy === true;

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Bitte geben Sie Ihren Namen ein.';
  if (!company) errors.company = 'Bitte geben Sie Ihr Unternehmen ein.';
  if (!emailPattern.test(email)) errors.email = 'Bitte prüfen Sie die E-Mail-Adresse.';
  if (processDescription.length < 20) errors.process = 'Bitte beschreiben Sie den Prozess mit mindestens 20 Zeichen.';
  if (!privacyAcknowledged) errors.privacy = 'Bitte bestätigen Sie die Datenschutzerklärung.';

  if (Object.keys(errors).length) {
    return NextResponse.json(
      { message: 'Bitte prüfen Sie Ihre Angaben.', errors },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form is missing RESEND_API_KEY.');
    return NextResponse.json(
      { message: 'Der Versand ist momentan nicht verfügbar. Bitte schreiben Sie an kontakt@msb-ai.de.' },
      { status: 503 }
    );
  }

  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company);
  const safeEmail = escapeHtml(email);
  const safeProcess = escapeHtml(processDescription).replace(/\n/g, '<br />');

  const text = [
    'Neue Anfrage über den MSB Automation Check',
    '',
    `Name: ${name}`,
    `Unternehmen: ${company}`,
    `E-Mail: ${email}`,
    '',
    'Beschriebener Prozess:',
    processDescription
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `msb-contact-${crypto.randomUUID()}`,
      'User-Agent': 'MSB-Website/1.0'
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      subject: `Neue Website-Anfrage · ${company.replace(/[\r\n]/g, ' ')}`,
      text,
      html: `
        <div style="font-family:Arial,sans-serif;color:#071b3a;line-height:1.6">
          <h1 style="font-size:22px">Neue Anfrage über den Automation Check</h1>
          <table style="border-collapse:collapse;width:100%;max-width:680px">
            <tr><td style="padding:8px 12px;border:1px solid #d8dfdc"><strong>Name</strong></td><td style="padding:8px 12px;border:1px solid #d8dfdc">${safeName}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #d8dfdc"><strong>Unternehmen</strong></td><td style="padding:8px 12px;border:1px solid #d8dfdc">${safeCompany}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #d8dfdc"><strong>E-Mail</strong></td><td style="padding:8px 12px;border:1px solid #d8dfdc"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          </table>
          <h2 style="font-size:17px;margin-top:24px">Beschriebener Prozess</h2>
          <p style="padding:16px;background:#f8f7f2;border-left:3px solid #08777b">${safeProcess}</p>
          <p style="font-size:12px;color:#5f6c72">Übermittelt über msb-ai.de. Antworten gehen direkt an die angegebene E-Mail-Adresse.</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    let providerMessage = 'unknown';
    try {
      const providerError = await response.json() as { message?: string };
      providerMessage = providerError.message || providerMessage;
    } catch {
      providerMessage = `HTTP ${response.status}`;
    }

    console.error('Contact email could not be sent.', {
      status: response.status,
      providerMessage
    });

    return NextResponse.json(
      { message: 'Die Nachricht konnte nicht versendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an kontakt@msb-ai.de.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: 'Vielen Dank. Ihre Anfrage wurde direkt an unser Team gesendet.' });
}
