import type { APIRoute } from 'astro';

// `@astrojs/sitemap` emits `sitemap-index.xml` + `sitemap-0.xml`. This endpoint
// exposes the conventional `/sitemap.xml` as a sitemap index pointing at the
// generated sitemap, so crawlers and tools that request `/sitemap.xml` work.
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const sitemapUrl = new URL(
    `${base}sitemap-0.xml`,
    site ?? 'https://slintcn.neutriny.dev/',
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${sitemapUrl.href}</loc>
  </sitemap>
</sitemapindex>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
