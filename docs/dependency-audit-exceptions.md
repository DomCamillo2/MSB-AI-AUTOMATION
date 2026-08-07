# Dependency audit exceptions

Some high-severity npm audit findings come from **transitive dependencies of Next.js 15**
(`postcss`, `sharp`). They require a **Next.js 16** upgrade to resolve cleanly.

| Package   | Status              | Owner   | Review by   |
|-----------|---------------------|---------|-------------|
| postcss   | accepted, tracked   | MSB     | 2026-12-01  |
| sharp     | accepted, tracked   | MSB     | 2026-12-01  |

Until then:

- `npm audit --omit=dev --audit-level=high` runs in CI and deploy with `continue-on-error: true`
- Deploy is **not** blocked solely by these known transitive issues
- Re-evaluate when upgrading to Next.js 16

Report new or unrelated vulnerabilities via `SECURITY.md`.
