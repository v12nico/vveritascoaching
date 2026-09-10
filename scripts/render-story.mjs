#!/usr/bin/env node
/**
 * A 1080x1920 instagram story built from a client's ACTUAL logged sets.
 *
 *   node scripts/render-story.mjs olaf
 *   node scripts/render-story.mjs olaf --name        # show their name
 *   node scripts/render-story.mjs olaf --weeks 6     # window the data
 *
 * The whole point is that nothing here is written by hand. Every number comes
 * out of client_lifts, so the card cannot claim something that did not happen.
 * If a lift is not in the database it does not appear on the story.
 *
 * Anonymous by default. This is somebody's health data — showing a name is an
 * explicit flag, and you should have asked them first.
 *
 * Output: docs/story/<token>-<date>.png
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, resolve } from 'node:path'
import { neon } from '@neondatabase/serverless'
import { ALL } from '../lib/clients/index.js'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const ROOT = resolve(process.cwd())
const OUT = join(ROOT, 'docs/story')
const TMP = join(ROOT, 'docs/.render-story')

// A lift whose weight jumped more than this in one block is almost always a
// machine swap or a corrected log, not progress. Publishing it is the same
// dishonesty as inventing it, so it is dropped — and printed, so the decision
// is visible rather than silent.
const IMPLAUSIBLE_GAIN = 0.40

// ── env ──────────────────────────────────────────────────────────────────────
for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

// ── args ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2)
const key = argv.find(a => !a.startsWith('-'))
const showName = argv.includes('--name')
const weeksArg = Number(argv[argv.indexOf('--weeks') + 1]) || null

if (!key) {
  console.error('usage: node scripts/render-story.mjs <client-key-or-token> [--name] [--weeks N]')
  process.exit(1)
}

const client = ALL.find(c => c.token === key || c.name?.toLowerCase() === key.toLowerCase())
if (!client) {
  console.error(`no client matching "${key}". known: ${ALL.map(c => c.name).join(', ')}`)
  process.exit(1)
}

// ── data ─────────────────────────────────────────────────────────────────────
const sql = neon(process.env.COACHING_DATABASE_URL)
const rows = await sql`
  SELECT exercise, local_date, weight::float AS weight, reps
  FROM client_lifts WHERE client_token = ${client.token}
  ORDER BY local_date, set_index`

if (!rows.length) {
  console.error(`${client.name} has no logged sets. nothing to render.`)
  process.exit(1)
}

const ymd = d => new Date(d).toISOString().slice(0, 10)
const dates = [...new Set(rows.map(r => ymd(r.local_date)))].sort()
const cutoff = weeksArg
  ? ymd(new Date(Date.now() - weeksArg * 7 * 86400000))
  : dates[0]
const inWindow = rows.filter(r => ymd(r.local_date) >= cutoff)

const sessions = new Set(inWindow.map(r => ymd(r.local_date))).size
const spanDays = Math.round(
  (new Date(dates.at(-1)) - new Date(cutoff)) / 86400000)
const weeks = Math.max(1, Math.round(spanDays / 7))

const [{ n: checkins }] = await sql`
  SELECT count(*)::int AS n FROM client_checkins WHERE client_token = ${client.token}`

// ── first vs best, per exercise ──────────────────────────────────────────────
const byEx = {}
for (const r of inWindow) (byEx[r.exercise] ??= []).push(r)

const dropped = []
const gains = []

for (const [exercise, sets] of Object.entries(byEx)) {
  const first = sets[0]
  // "Best" is the heaviest set that did AT LEAST the reps of the opener. That
  // is what makes the headline claim defensible: more weight for no fewer
  // reps. A heavier set at fewer reps is progress too, but it is arguable,
  // and an arguable stat on a story is worse than no stat.
  const cleaner = sets.filter(s => s.reps >= first.reps && s.weight > first.weight)
  const heavier = cleaner.length
    ? cleaner.reduce((a, b) => (b.weight > a.weight ? b : a))
    : null
  // Same weight, more reps — the other unambiguous win.
  const longer = sets.filter(s => s.weight === first.weight && s.reps > first.reps)
  const deeper = longer.length ? longer.reduce((a, b) => (b.reps > a.reps ? b : a)) : null

  if (heavier) {
    const pct = (heavier.weight - first.weight) / first.weight
    if (pct > IMPLAUSIBLE_GAIN) {
      dropped.push({ exercise, first, best: heavier, pct })
      continue
    }
    gains.push({
      exercise, first, best: heavier,
      delta: `+${Math.round(heavier.weight - first.weight)} lb`,
      sort: heavier.weight - first.weight,
      kind: 'weight',
    })
  } else if (deeper) {
    gains.push({
      exercise, first, best: deeper,
      delta: `+${deeper.reps - first.reps} rep${deeper.reps - first.reps > 1 ? 's' : ''}`,
      sort: (deeper.reps - first.reps) * 2,
      kind: 'reps',
    })
  }
}

gains.sort((a, b) => b.sort - a.sort)
const top = gains.slice(0, 5)

if (!top.length) {
  console.error('no unambiguous gains yet — nothing worth posting.')
  process.exit(1)
}

// ── markup ───────────────────────────────────────────────────────────────────
const kit = readFileSync(join(ROOT, 'docs/print-kit.html'), 'utf8')
const fonts = (kit.match(/@font-face\{[^}]*\}/g) || []).join('\n')

const who = showName ? client.name.toLowerCase() : 'a client'
const lift = ({ exercise, first, best, delta }) => `
  <tr>
    <td class="ex">${exercise}</td>
    <td class="was">${first.weight % 1 ? first.weight : first.weight | 0}×${first.reps}</td>
    <td class="arrow">→</td>
    <td class="now">${best.weight % 1 ? best.weight : best.weight | 0}×${best.reps}</td>
    <td class="d">${delta}</td>
  </tr>`

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
:root{ --black:#000; --text:#EDEDE8; --dim:#5A5A5A; --ghost:#3A3A3A; --oxblood:#8c3a3a; }
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;background:var(--black);overflow:hidden;
  -webkit-print-color-adjust:exact;print-color-adjust:exact}
/* Instagram paints its own chrome over the story: the profile row eats the top
   ~200px and the reply bar the bottom ~250px. Padding keeps every readable
   thing — especially the URL — inside the safe area. */
body{font-family:'Inter Embed',Inter,-apple-system,sans-serif;font-weight:300;color:var(--text);
  display:flex;flex-direction:column;padding:255px 90px 300px}
.mono{font-family:'JetBrains Mono Embed',ui-monospace,monospace;letter-spacing:.25em;text-transform:uppercase}

.mark{font-size:26px;color:var(--ghost)}
.mark i{color:var(--oxblood);font-style:normal}

h1{font-weight:200;font-size:126px;letter-spacing:-.045em;line-height:.94;margin-top:52px}
.sub{font-size:38px;color:var(--dim);letter-spacing:-.02em;margin-top:34px;line-height:1.35}

table{width:100%;border-collapse:collapse;margin-top:78px}
td{padding:30px 0;border-bottom:1px solid #131313;vertical-align:baseline}
.ex{font-size:33px;letter-spacing:-.02em;color:var(--text);width:44%;line-height:1.2}
.was{font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:31px;color:#4a4a4a;text-align:right;width:16%}
.arrow{font-size:27px;color:#2c2c2c;text-align:center;width:8%}
.now{font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:31px;color:var(--text);text-align:left;width:16%;padding-left:8px}
.d{font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:26px;color:var(--oxblood);text-align:right;width:16%}

.note{font-size:29px;color:var(--ghost);margin-top:46px;line-height:1.55;letter-spacing:-.01em}

.foot{margin-top:auto;padding-top:56px;border-top:1px solid #131313}
.claim{font-size:52px;font-weight:200;letter-spacing:-.035em;line-height:1.22}
.claim b{font-weight:200;color:var(--oxblood)}
.url{font-size:24px;color:var(--dim);margin-top:40px}
</style></head><body>

  <div class="mark mono">vveritas<i>*</i> · the log</div>

  <h1>${weeks} week${weeks > 1 ? 's' : ''}<br>in.</h1>
  <p class="sub">${sessions} sessions. ${checkins} check-ins.<br>every set logged.</p>

  <table>${top.map(lift).join('')}</table>

  <p class="note">same reps. more weight.<br>${who} — not a before and after photo.</p>

  <div class="foot">
    <div class="claim">not a pdf.<br>a record, and <b>someone reading it</b>.</div>
    <div class="url mono">vveritascoaching.com/dmv</div>
  </div>

</body></html>`

// ── render ───────────────────────────────────────────────────────────────────
if (!existsSync(CHROME)) { console.error(`chrome not found at ${CHROME}`); process.exit(1) }
rmSync(TMP, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })
mkdirSync(OUT, { recursive: true })

const src = join(TMP, 'story.html')
const png = join(OUT, `${client.token}-${ymd(Date.now())}.png`)
writeFileSync(src, html)

execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  '--window-size=1080,1920', '--force-device-scale-factor=1',
  '--virtual-time-budget=8000',
  `--screenshot=${png}`, `file://${src}`,
], { stdio: 'pipe' })

rmSync(TMP, { recursive: true, force: true })

// ── report ───────────────────────────────────────────────────────────────────
console.log(`\n  ${client.name} — ${sessions} sessions over ${spanDays} days, ${checkins} check-ins`)
console.log(`  showing ${top.length} of ${gains.length} clean gains:\n`)
for (const g of top) {
  console.log(`    ${g.exercise.padEnd(34)} ${g.first.weight}×${g.first.reps} → ${g.best.weight}×${g.best.reps}  ${g.delta}`)
}
if (dropped.length) {
  console.log('\n  dropped as implausible (machine swap or corrected log, not progress):')
  for (const d of dropped) {
    console.log(`    ${d.exercise.padEnd(34)} ${d.first.weight}×${d.first.reps} → ${d.best.weight}×${d.best.reps}  +${Math.round(d.pct * 100)}%`)
  }
}
console.log(`\n  → ${png}`)
if (!showName) console.log('  anonymous. pass --name once they have said yes.\n')
else console.log('  NAMED — make sure they actually agreed to this.\n')
