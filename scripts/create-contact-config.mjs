import { writeFileSync } from 'node:fs';

const required = [
  'IONOS_SMTP_HOST',
  'IONOS_SMTP_PORT',
  'IONOS_SMTP_USER',
  'IONOS_SMTP_PASSWORD',
  'CONTACT_RECIPIENT'
];

for (const key of required) {
  if (!process.env[key] || process.env[key] === 'NOT_CONFIGURED') {
    throw new Error(`Missing required contact configuration: ${key}`);
  }
}

const config = {
  smtp_host: process.env.IONOS_SMTP_HOST,
  smtp_port: Number(process.env.IONOS_SMTP_PORT),
  smtp_user: process.env.IONOS_SMTP_USER,
  smtp_password: process.env.IONOS_SMTP_PASSWORD,
  recipient: process.env.CONTACT_RECIPIENT
};

if (!Number.isInteger(config.smtp_port) || config.smtp_port < 1 || config.smtp_port > 65535) {
  throw new Error('IONOS_SMTP_PORT must be a valid port number.');
}

writeFileSync('out/.contact-config.json', JSON.stringify(config), {
  encoding: 'utf8',
  mode: 0o600
});
