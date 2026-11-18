import type { APIRoute } from 'astro'
import { getProjects } from '../lib/sanity'

// Sitemap simple. Necesita el dominio del sitio (ver astro.config.mjs):
// un sitemap solo acepta URLs absolutas, así que sin dominio queda vacío.
export const GET: APIRoute = async ({ site }) => {
  const projects = await getProjects()
  const paths = [
    '/',
    '/workshops/',
    '/about/',
    ...projects
      .map((p: any) => p.slug_en?.current ?? p.slug_es?.current)
      .filter(Boolean)
      .map((slug: string) => `/work/${slug}/`),
  ]
  const urls = site
    ? paths.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join('\n')
    : ''
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
