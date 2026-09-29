import { site } from '../config/site';
export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site.url}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
