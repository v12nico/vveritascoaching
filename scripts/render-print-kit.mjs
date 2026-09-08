#!/usr/bin/env node
/**
 * Render each piece of the print kit to its own exact-size PDF.
 *
 * Safari's print path could not do this job: it forces every page to the
 * selected paper size (so 8.75x11.25 bleed art gets scaled onto Letter), and it
 * silently dropped the CSS-filtered <img>, leaving a flyer with no photograph.
 * Chrome headless renders to the page box the CSS asks for and keeps the image.
 *
 * Output: docs/print/*.pdf — one file per piece, at bleed size, fonts embedded.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const ROOT = resolve(process.cwd())
const OUT = join(ROOT, 'docs/print')
const TMP = join(ROOT, 'docs/.render')

const kit = readFileSync(join(ROOT, 'docs/print-kit.html'), 'utf8')
const style = kit.match(/<style>([\s\S]*?)<\/style>/)[1]

/** Pull one piece out of the kit by its class, with balanced div matching. */
function piece(cls) {
  const open = `<div class="piece ${cls}"`
  const i = kit.indexOf(open)
  if (i < 0) throw new Error(`piece not found: ${cls}`)
  let depth = 0, j = i
  while (j < kit.length) {
    if (kit.startsWith('<div', j)) depth++
    else if (kit.startsWith('</div>', j)) { depth--; if (!depth) return kit.slice(i, j + 6) }
    j++
  }
  throw new Error(`unbalanced: ${cls}`)
}

// Bleed sizes: trim + 0.125in on every side.
const PIECES = [
  { cls: 'flyer',      file: 'flyer-oxblood',   w: 8.75, h: 11.25 },
  { cls: 'flyer hot',  file: 'flyer-red',       w: 8.75, h: 11.25 },
  { cls: 'card front', file: 'card-front',      w: 3.75, h: 2.25 },
  { cls: 'card back',  file: 'card-back',       w: 3.75, h: 2.25 },
  { cls: 'flyer hc',   file: 'flyer-healthcare',   w: 8.75, h: 11.25 },
  { cls: 'four6 hc',   file: 'counter-healthcare', w: 4.25, h: 6.25 },
]

rmSync(TMP, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })
mkdirSync(OUT, { recursive: true })

for (const p of PIECES) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${style}
  /* The page box IS the artwork. No margin, no scaling, no paper size to fight. */
  @page { size: ${p.w}in ${p.h}in; margin: 0 }
  html, body { margin:0; padding:0; background:#000; width:${p.w}in; height:${p.h}in }
  body { -webkit-print-color-adjust:exact; print-color-adjust:exact }
  .piece { margin:0 !important; box-shadow:none !important }
  /* Chrome keeps filtered images, but there is no reason to risk it in print —
     the same look is baked into the JPEG already. */
  .shot img, .panel img { filter:none !important }
  .piece::before { display:none !important }
  /* text-shadow makes Chrome fall back to Type3 glyph procs, which preflight
     tools report as un-embedded. Drop the shadows for print and darken the
     scrim instead — same legibility, real embedded fonts. */
  *, *::before, *::after { text-shadow:none !important }
  /* Two scrims, not one. A uniform wash either buries him or lets the headline
     wash out on the bright wall — the copy is left-aligned and he stands centre
     right, so the darkening should be directional. Left protects the type,
     bottom protects the prices, and his torso on the right stays lit. */
  .shot::after { background:
      linear-gradient(100deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.80) 30%,
        rgba(0,0,0,.38) 52%, rgba(0,0,0,.06) 72%, rgba(0,0,0,0) 88%),
      linear-gradient(to bottom, rgba(0,0,0,.30) 0%, rgba(0,0,0,.04) 30%,
        rgba(0,0,0,.30) 52%, rgba(0,0,0,.84) 70%, #000 84%) !important }
</style></head><body class="bleed">${piece(p.cls)}</body></html>`

  const src = join(TMP, `${p.file}.html`)
  const pdf = join(OUT, `${p.file}.pdf`)
  writeFileSync(src, html)

  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--virtual-time-budget=8000',          // let the data-URI fonts and photo settle
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdf}`,
    `file://${src}`,
  ], { stdio: 'pipe' })

  console.log(`  ${p.file}.pdf   ${p.w} x ${p.h} in`)
}

rmSync(TMP, { recursive: true, force: true })
console.log(`\n  → ${OUT}`)
