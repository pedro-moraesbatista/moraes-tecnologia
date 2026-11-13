import { site } from '../../config/site'

// Sitemap gerado em build-time a partir de config/site.ts.
// url null = sem domínio de produção confirmado → urlset vazio.
export default defineEventHandler((event) => {
  const lastmod = new Date().toISOString()
  const entry = site.url
    ? `
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    : ''

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entry}
</urlset>`

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
