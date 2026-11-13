// Zero-dependency static file server for the built artifact (.output/public).
// Lets Playwright E2E tests assert against the MESMOS arquivos estáticos
// que a Vercel serve, sem depender do dev server do Nuxt.
// Usage: node scripts/serve-static.mjs <port> <rootDir>
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { stat, readFile } from 'node:fs/promises'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const port = Number(process.argv[2] ?? 4173)
const rootArg = process.argv[3] ?? '.output/public'
const root = path.resolve(repoRoot, rootArg)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

async function trySend(req, res, file, status = 200) {
  const body = await readFile(file)
  res.writeHead(status, {
    'content-type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  })
  req.method === 'HEAD' ? res.end() : res.end(body)
  return true
}

try {
  await stat(path.join(root, 'index.html'))
} catch {
  console.error(`[serve-static] no build artifact: ${path.join(root, 'index.html')} not found.`)
  console.error('[serve-static] run the static build first: npm run generate')
  process.exit(1)
}

const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://local').pathname)
    // Resolve inside root (no path traversal / sibling-dir prefix confusion).
    const resolved = path.resolve(root, '.' + pathname)
    if (resolved !== root && !resolved.startsWith(root + path.sep)) {
      return res.writeHead(403).end()
    }
    const candidates = [
      path.join(root, pathname, 'index.html'), // directory route (foo/ -> foo/index.html)
      path.join(root, pathname),               // exact file
    ]
    // .html alias for extensionless paths (e.g. /404 -> 404.html)
    if (!path.extname(pathname)) candidates.push(path.join(root, pathname + '.html'))
    for (const file of candidates) {
      try {
        if (await stat(file).then((s) => s.isFile())) {
          return void (await trySend(req, res, file, 200))
        }
      } catch {
        /* try next */
      }
    }
    // Unknown path -> SPA fallback + 404 status (mirrors Vercel static hosting)
    await trySend(req, res, path.join(root, '404.html'), 404).catch(() => res.writeHead(404).end('Not found'))
  } catch (err) {
    console.error('[serve-static]', err?.message)
    res.writeHead(500).end()
  }
})

server.listen(port, '127.0.0.1', () => console.log(`[serve-static] ${root} on http://127.0.0.1:${port}`))
