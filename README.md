# MSB AI & Automation Website

Privacy-conscious B2B website for MSB AI & Automation.

Production hosting, domain, DNS, e-mail and the contact endpoint run on IONOS.
The repository is proprietary; see `LICENSE` and `SECURITY.md`.

## Local development

```bash
npm install
npm run dev
```

## Production build

The site is a static export for IONOS Webhosting:

```bash
npm run build
```

The build output is written to `out/`. In CI, that folder is uploaded over SFTP to IONOS.

## Deployment

GitHub Actions builds the static site and uploads it to IONOS Webhosting. The contact endpoint runs as PHP on the same IONOS webspace and delivers messages through authenticated IONOS SMTP. Google Analytics is loaded only after explicit consent; fonts are bundled locally and there are no map, video, social-media, or third-party form embeds.

## Brand

The site uses the MSB AI & Automation color system:

- Primary navy: `#071B3A`
- Secondary navy: `#0E2A4D`
- Teal accent: `#008E92`
- Muted teal: `#5B8C8E`
- Graphite: `#2F3437`
- Background: `#F8FAF9`
- Border: `#E5E7EB`
