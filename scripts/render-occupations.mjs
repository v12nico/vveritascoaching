#!/usr/bin/env node
/**
 * One flyer and one 4x6 counter card per occupation, print-ready.
 *
 *   node scripts/render-occupations.mjs
 *
 * Everything comes from lib/occupations.js — adding a sector is an entry there,
 * not a design job. The layout, photo, QR and pricing are shared, so the whole
 * set stays consistent and a price change is one edit rather than fourteen.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve } from 'node:path'
import { OCCUPATIONS } from '../lib/occupations.js'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const GS = '/opt/homebrew/bin/gs'
const ROOT = resolve(process.cwd())
const OUT = join(ROOT, 'docs/print/occupations')
const TMP = join(ROOT, 'docs/.render-occ')

const kit = readFileSync(join(ROOT, 'docs/print-kit.html'), 'utf8')
const style = kit.match(/<style>([\s\S]*?)<\/style>/)[1]
const photo = kit.match(/src="(data:image\/jpeg;base64,[^"]+)"/)[1]
const qr = kit.match(/<svg class="qr"[\s\S]*?<\/svg>/)[0]

/** |word| marks the accent-coloured span — keeps the copy file free of markup. */
const em = (s) =>
  s.replace(/\|([^|]+)\|/g, '<em style="font-style:normal;color:var(--oxblood)">$1</em>')

const list = (lines, n) => lines.slice(0, n)
  .map((t, i) => `<li><i>${String(i + 1).padStart(2, '0')}</i><span>${t}</span></li>`).join('')

function markup(o, kind) {
  const big = kind === 'flyer'
  return `
<div class="piece ${big ? 'flyer' : 'four6'} occ">
  <div class="shot"><img src="${photo}" alt=""></div>
  <div class="inner">
    <div class="kicker">vveritas<i style="color:var(--oxblood);font-style:normal">*</i> · ${o.kicker}</div>
    <h1 class="hook">${o.hook.map(em).join('<br>')}</h1>
    <p class="sub">${o.sub}</p>
    <ul class="list">${list(o.lines, big ? 5 : 3)}</ul>
    <div style="height:${big ? '.26in' : '10px'}"></div>
    <div class="price"><b>online coaching</b><span>$125 / week</span></div>
    <div class="price"><b>in person · baltimore</b><span>from $200 / week</span></div>
    ${big ? `<p class="sub" style="font-size:12.5px;margin:.14in 0 0;color:rgba(237,237,232,.62)">billed weekly · eight week minimum.</p>` : ''}
    <div class="foot">
      <div class="qrbox">${qr}${big ? '<div class="qrcap">book a call</div>' : ''}</div>
      <div style="flex:1">
        ${big ? '<div class="rule" style="margin-bottom:.16in"></div>' : ''}
        <div style="font-size:${big ? '24px' : '15px'};font-weight:200;letter-spacing:-.03em;line-height:1.2">
          ${o.close.map(em).join('<br>')}
        </div>
        <div style="font-family:var(--mono);font-size:${big ? '9px' : '7.5px'};letter-spacing:.15em;color:rgba(237,237,232,.66);margin-top:${big ? '.14in' : '8px'}">
          ${big ? '@_V12NICO · ' : ''}VVERITASCOACHING.COM/DMV
        </div>
      </div>
    </div>
  </div>
</div>`
}

const KINDS = [
  { kind: 'flyer', suffix: 'flyer-8.5x11', w: 8.75, h: 11.25 },
  { kind: 'four6', suffix: 'counter-4x6', w: 4.25, h: 6.25 },
]

rmSync(TMP, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })
mkdirSync(OUT, { recursive: true })

for (const o of OCCUPATIONS) {
  for (const k of KINDS) {
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${style}
  @page { size: ${k.w}in ${k.h}in; margin: 0 }
  html,body{margin:0;padding:0;background:#000;width:${k.w}in;height:${k.h}in;
    -webkit-print-color-adjust:exact;print-color-adjust:exact}
  .piece{margin:0 !important;box-shadow:none !important}
  .shot img{filter:none !important}
  .piece::before{display:none !important}
  *,*::before,*::after{text-shadow:none !important}
  .shot::after{background:
    linear-gradient(100deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.80) 30%,
      rgba(0,0,0,.38) 52%, rgba(0,0,0,.06) 72%, rgba(0,0,0,0) 88%),
    linear-gradient(to bottom, rgba(0,0,0,.30) 0%, rgba(0,0,0,.04) 30%,
      rgba(0,0,0,.30) 52%, rgba(0,0,0,.84) 70%, #000 84%) !important}
</style></head><body class="bleed">${markup(o, k.kind)}</body></html>`

    const src = join(TMP, `${o.key}-${k.suffix}.html`)
    const raw = join(TMP, `${o.key}-${k.suffix}.pdf`)
    const fin = join(OUT, `${o.key}-${k.suffix}.pdf`)
    writeFileSync(src, html)

    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
      '--virtual-time-budget=6000', '--no-pdf-header-footer',
      `--print-to-pdf=${raw}`, `file://${src}`], { stdio: 'pipe' })

    // Vistaprint rejects Type3 glyph procs as "un-embedded". Outlining removes
    // fonts from the file entirely, so there is nothing left to reject.
    execFileSync(GS, ['-q', '-o', fin, '-sDEVICE=pdfwrite', '-dNoOutputFonts',
      '-dPDFSETTINGS=/prepress', '-dColorConversionStrategy=/LeaveColorUnchanged',
      '-dAutoFilterColorImages=false', '-dColorImageFilter=/FlateEncode', raw],
      { stdio: 'pipe' })
  }
  console.log(`  ${o.key.padEnd(12)} flyer + 4x6`)
}

rmSync(TMP, { recursive: true, force: true })
console.log(`\n  ${OCCUPATIONS.length * 2} files → ${OUT}`)
