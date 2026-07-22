# MSB AI Consulting Website

One-page, privacy-conscious B2B consulting website for MSB AI Consulting.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Deployment

The project is configured as a standard Next.js app and can be deployed directly to Vercel. No analytics, external fonts, maps, videos, or third-party embeds are included by default.

## Contact form delivery

The Automation Check form posts to `/api/contact` and sends a transactional email to `kontakt@msb-ai.de` through Resend. The API key stays on the server.

1. Create a Resend account and add `msb-ai.de` under **Domains**.
2. Add the SPF and DKIM records displayed by Resend to the DNS zone at IONOS. This does not replace the existing IONOS mailbox or its MX records.
3. Wait until Resend marks the sending domain as verified.
4. Create a sending-only API key.
5. Add these variables under **Vercel → Project Settings → Environment Variables** for Production and Preview:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=kontakt@msb-ai.de
CONTACT_FROM_EMAIL=MSB Website <formular@msb-ai.de>
```

6. Keep Resend open/click tracking disabled for this transactional contact email.
7. Redeploy after adding or changing environment variables.

Use `.env.example` for local setup. Never commit the real API key.

The route validates all fields on the server, escapes email HTML, checks same-origin requests, limits request size and frequency, and uses a honeypot plus minimum completion time against basic form spam.

## Brand

The site uses the MSB AI Consulting color system:

- Primary navy: `#071B3A`
- Secondary navy: `#0E2A4D`
- Teal accent: `#008E92`
- Muted teal: `#5B8C8E`
- Graphite: `#2F3437`
- Background: `#F8FAF9`
- Border: `#E5E7EB`
