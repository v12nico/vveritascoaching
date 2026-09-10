/**
 * Shared plumbing for the 1080x1920 social cards.
 *
 * Fonts are lifted out of docs/print-kit.html rather than re-embedded here —
 * that file already carries Inter and JetBrains Mono as data URIs, and having
 * one copy means a font change lands everywhere at once.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'

export const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

/** The @font-face blocks, data URIs and all. */
export function fontFaces(root) {
  const kit = readFileSync(join(root, 'docs/print-kit.html'), 'utf8')
  return (kit.match(/@font-face\{[^}]*\}/g) || []).join('\n')
}

/**
 * Base tokens + the instagram safe area.
 *
 * Instagram paints its own chrome over a story: the profile row covers roughly
 * the top 200px and the reply bar the bottom 250px. Anything that has to be
 * read — above all the URL — lives inside the padding.
 */
export const BASE = `
:root{ --black:#000; --text:#EDEDE8; --dim:#5A5A5A; --ghost:#3A3A3A; --oxblood:#8c3a3a; }
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;background:var(--black);overflow:hidden;
  -webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Inter Embed',Inter,-apple-system,sans-serif;font-weight:300;color:var(--text);
  display:flex;flex-direction:column;padding:255px 90px 300px}
.mono{font-family:'JetBrains Mono Embed',ui-monospace,monospace;letter-spacing:.25em;text-transform:uppercase}
.mark{font-size:26px;color:var(--ghost)}
.mark i{color:var(--oxblood);font-style:normal}
.foot{margin-top:auto;padding-top:56px;border-top:1px solid #131313}
.claim{font-size:52px;font-weight:200;letter-spacing:-.035em;line-height:1.22}
.claim b{font-weight:200;color:var(--oxblood)}
.url{font-size:24px;color:var(--dim);margin-top:40px}
`

/** Render an HTML string to a PNG at exactly 1080x1920. */
export function shot(html, outPath, { tmp, width = 1080, height = 1920 } = {}) {
  if (!existsSync(CHROME)) throw new Error(`chrome not found at ${CHROME}`)
  rmSync(tmp, { recursive: true, force: true })
  mkdirSync(tmp, { recursive: true })
  mkdirSync(dirname(outPath), { recursive: true })

  const src = join(tmp, 'card.html')
  writeFileSync(src, html)
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    `--window-size=${width},${height}`, '--force-device-scale-factor=1',
    '--virtual-time-budget=8000',
    `--screenshot=${outPath}`, `file://${src}`,
  ], { stdio: 'pipe' })

  rmSync(tmp, { recursive: true, force: true })
  return outPath
}

/** Load .env.local without clobbering anything already in the environment. */
export function loadEnv(root) {
  for (const line of readFileSync(join(root, '.env.local'), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

export const ymd = d => new Date(d).toISOString().slice(0, 10)
