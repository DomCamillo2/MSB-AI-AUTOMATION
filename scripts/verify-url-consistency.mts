import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://www.msb-ai.de';
const outDir = path.resolve('out');
const staticAssetPattern = /\.(?:css|js|mjs|json|xml|txt|png|jpe?g|webp|avif|svg|ico|woff2?|php)$/i;

function splitHref(href: string) {
  const withoutQuery = href.split('?')[0] ?? href;
  const hashIndex = withoutQuery.indexOf('#');
  if (hashIndex === -1) {
    return { pathname: withoutQuery, hash: '' };
  }

  return {
    pathname: withoutQuery.slice(0, hashIndex),
    hash: withoutQuery.slice(hashIndex)
  };
}

function isInternalPageHref(href: string) {
  if (!href.startsWith('/')) return false;
  if (href.startsWith('/_next/')) return false;
  if (href.startsWith('/contact-lib/')) return false;

  const { pathname } = splitHref(href);
  if (!pathname || pathname === '/') return false;
  if (staticAssetPattern.test(pathname)) return false;

  return true;
}

function hasCanonicalTrailingSlash(href: string) {
  const { pathname } = splitHref(href);
  return pathname.endsWith('/');
}

function routePathToOutFile(routePath: string) {
  if (routePath === '/') {
    return path.join(outDir, 'index.html');
  }

  const normalized = routePath.endsWith('/') ? routePath : `${routePath}/`;
  return path.join(outDir, normalized, 'index.html');
}

function sitemapUrlToRoute(url: string) {
  assert.ok(url.startsWith(siteUrl), `Unexpected sitemap host in ${url}`);
  const route = url.slice(siteUrl.length) || '/';
  return route.endsWith('/') ? route : `${route}/`;
}

async function collectHtmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }

  return files;
}

function recordViolation(
  violations: Map<string, Set<string>>,
  kind: string,
  detail: string
) {
  if (!violations.has(kind)) {
    violations.set(kind, new Set());
  }

  violations.get(kind)?.add(detail);
}

async function main() {
  const violations = new Map<string, Set<string>>();

  const sitemap = await readFile(path.join(outDir, 'sitemap.xml'), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  assert.ok(sitemapUrls.length >= 20, `Expected at least 20 sitemap URLs, found ${sitemapUrls.length}`);

  for (const url of sitemapUrls) {
    if (!url.startsWith(`${siteUrl}/`) && url !== `${siteUrl}/`) {
      recordViolation(violations, 'sitemap-host', url);
    }

    if (!url.endsWith('/')) {
      recordViolation(violations, 'sitemap-trailing-slash', url);
    }

    const route = sitemapUrlToRoute(url);
    const outFile = routePathToOutFile(route);

    try {
      await readFile(outFile);
    } catch {
      recordViolation(violations, 'sitemap-missing-export', `${url} -> ${path.relative(process.cwd(), outFile)}`);
    }
  }

  const htmlFiles = await collectHtmlFiles(outDir);

  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, 'utf8');
    const relativeFile = path.relative(outDir, filePath);

    for (const match of html.matchAll(/\shref="([^"]+)"/g)) {
      const href = match[1];
      if (!isInternalPageHref(href)) continue;
      if (!hasCanonicalTrailingSlash(href)) {
        recordViolation(violations, 'href-trailing-slash', `${relativeFile}: ${href}`);
      }
    }

    for (const match of html.matchAll(/<link[^>]+rel="canonical"[^>]+>/g)) {
      const tag = match[0];
      const hrefMatch = tag.match(/href="([^"]+)"/);
      const href = hrefMatch?.[1];
      if (!href) continue;

      const expectedPrefix = `${siteUrl}/`;
      if (!href.startsWith(expectedPrefix) && href !== `${siteUrl}/`) {
        recordViolation(violations, 'canonical-host', `${relativeFile}: ${href}`);
      }

      const route = href === `${siteUrl}/` ? '/' : href.slice(siteUrl.length);
      if (route !== '/' && !route.endsWith('/')) {
        recordViolation(violations, 'canonical-trailing-slash', `${relativeFile}: ${href}`);
      }
    }

    for (const match of html.matchAll(/"item":"(https:\/\/www\.msb-ai\.de[^"]*)"/g)) {
      const itemUrl = match[1];
      const route = itemUrl === `${siteUrl}/` ? '/' : itemUrl.slice(siteUrl.length);
      if (route !== '/' && !route.endsWith('/')) {
        recordViolation(violations, 'breadcrumb-trailing-slash', `${relativeFile}: ${itemUrl}`);
      }
    }
  }

  const htaccess = await readFile(path.join(outDir, '.htaccess'), 'utf8');
  if (!htaccess.includes('https://www.msb-ai.de/ueber-uns/#team-detail-heading')) {
    recordViolation(
      violations,
      'htaccess-redirect',
      'Expected /team redirect target to use canonical /ueber-uns/ trailing slash'
    );
  }

  if (violations.size > 0) {
    console.error('URL consistency check failed:\n');
    for (const [kind, details] of violations) {
      console.error(`[${kind}]`);
      for (const detail of [...details].sort()) {
        console.error(`  - ${detail}`);
      }
      console.error('');
    }

    process.exit(1);
  }

  console.log(`URL consistency check passed (${sitemapUrls.length} sitemap URLs, ${htmlFiles.length} HTML files).`);
}

await main();
