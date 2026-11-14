import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const root = process.argv[2] || 'dist'
const port = Number(process.argv[3] || 5200)
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' }
createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (p.endsWith('/')) p += 'index.html'
    const data = await readFile(join(root, p))
    res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404); res.end('nf')
  }
}).listen(port, () => console.log(`serving ${root} on ${port}`))
