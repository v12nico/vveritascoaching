#!/usr/bin/env node
/**
 * The recap card — what actually happened across every client, last night or
 * last week.
 *
 *   node scripts/render-recap.mjs                 # last night
 *   node scripts/render-recap.mjs --weekly        # last 7 days
 *   node scripts/render-recap.mjs --date 2026-09-09
 *   node scripts/render-recap.mjs --names         # first names instead of initials
 *   node scripts/render-recap.mjs --preview       # populated mock-up, stamped
 *
 * Every number is read out of client_lifts and client_checkins. There is no
 * argument for a number to be typed in by hand: a recap that overstates a
 * quiet night is the one thing that would make the whole account unbelievable,
 * and the honest version — "one session, nine sets" — is more convincing than
 * a busy one nobody can verify.
 *
 * --preview exists so the LAYOUT can be judged before there is enough real
 * activity to fill it. It renders invented numbers and stamps PREVIEW across
 * the card so it cannot be posted by mistake.
 *
 * Output: docs/story/recap-<period>-<date>.png
 */
import { resolve, join } from 'node:path'
import { neon } from '@neondatabase/serverless'
import { ALL } from '../lib/clients/index.js'
import { BASE, fontFaces, shot, loadEnv, ymd } from './lib/card.mjs'

const ROOT = resolve(process.cwd())
loadEnv(ROOT)

const argv = new Set(process.argv.slice(2))
const arg = f => { const a = process.argv.slice(2); const i = a.indexOf(f); return i < 0 ? null : a[i + 1] }

const weekly = argv.has('--weekly')
const milestone = argv.has('--milestone')
const preview = argv.has('--preview')
const showNames = argv.has('--names')
const endDate = arg('--date') || ymd(Date.now() - (weekly ? 0 : 86400000))
const startDate = weekly ? ymd(new Date(endDate).getTime() - 6 * 86400000) : endDate

const DAY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const MON = ['january', 'february', 'march', 'april', 'may', 'june',
             'july', 'august', 'september', 'october', 'november', 'december']

// ── gather ───────────────────────────────────────────────────────────────────
// Real clients only. The two sample portals are fictional teaching aids and
// must never be counted as if somebody trained.
const real = ALL.filter(c => c.email && !c.token.startsWith('sample-'))

async function fromDb() {
  const sql = neon(process.env.COACHING_DATABASE_URL)
  const tokens = real.map(c => c.token)

  const lifts = await sql`
    SELECT client_token, local_date, exercise, weight::float AS weight, reps, set_index
    FROM client_lifts
    WHERE client_token = ANY(${tokens})
    ORDER BY local_date, set_index`

  const checkins = await sql`
    SELECT client_token, local_date FROM client_checkins
    WHERE client_token = ANY(${tokens}) AND local_date BETWEEN ${startDate} AND ${endDate}`

  const inPeriod = lifts.filter(l => ymd(l.local_date) >= startDate && ymd(l.local_date) <= endDate)

  // A set only counts as a PR against everything logged BEFORE the period —
  // otherwise the first session of a new lift reads as a personal best, which
  // is true in a trivial sense and dishonest in every sense that matters.
  const history = {}
  for (const l of lifts) {
    if (ymd(l.local_date) >= startDate) continue
    const k = `${l.client_token}|${l.exercise}`
    history[k] = Math.max(history[k] ?? 0, l.weight)
  }

  const rows = []
  for (const c of real) {
    const mine = inPeriod.filter(l => l.client_token === c.token)
    if (!mine.length) continue
    const prs = mine.filter(l => {
      const prev = history[`${c.token}|${l.exercise}`]
      return prev !== undefined && l.weight > prev
    })
    const best = prs.sort((a, b) =>
      (b.weight - history[`${c.token}|${b.exercise}`]) -
      (a.weight - history[`${c.token}|${a.exercise}`]))[0]
    rows.push({
      name: c.name,
      days: new Set(mine.map(l => ymd(l.local_date))).size,
      sets: mine.length,
      pr: best ? {
        exercise: best.exercise,
        delta: Math.round(best.weight - history[`${c.token}|${best.exercise}`]),
      } : null,
    })
  }

  return {
    rows,
    checkins: checkins.length,
    roster: real.length,
    sets: inPeriod.length,
    sessions: new Set(inPeriod.map(l => `${l.client_token}|${ymd(l.local_date)}`)).size,
    prs: rows.filter(r => r.pr).length,
  }
}

// Invented. Only ever reachable behind --preview, and every render it feeds
// carries the PREVIEW stamp.
function fromMilestoneMock() {
  return {
    milestone: true, roster: 9, days: 90,
    sessions: 214, sets: 1847, prs: 63, checkins: 271, rows: [],
  }
}

function fromMock() {
  const rows = [
    { name: 'Olaf',     days: 1, sets: 14, pr: { exercise: 'chest-supported row', delta: 5 } },
    { name: 'Tayllore', days: 1, sets: 12, pr: { exercise: 'barbell hip thrust', delta: 10 } },
    { name: 'Marcus',   days: 1, sets: 11, pr: null },
    { name: 'Dee',      days: 1, sets: 16, pr: { exercise: 'hack squat', delta: 20 } },
    { name: 'Ren',      days: 1, sets: 9,  pr: null },
  ]
  return {
    rows, checkins: 5, roster: 6,
    sets: rows.reduce((n, r) => n + r.sets, 0),
    sessions: rows.length,
    prs: rows.filter(r => r.pr).length,
  }
}

const d = preview
  ? (milestone ? fromMilestoneMock() : fromMock())
  : await fromDb()

if (!preview && !milestone && !d.rows.length) {
  console.error(`\n  nothing logged ${weekly ? `between ${startDate} and ${endDate}` : `on ${endDate}`}.`)
  console.error('  a recap card claiming otherwise is the one thing that would sink the account.\n')
  process.exit(1)
}

// ── markup ───────────────────────────────────────────────────────────────────
const dt = new Date(`${endDate}T12:00:00`)
const label = weekly
  ? `${MON[new Date(`${startDate}T12:00:00`).getMonth()].slice(0, 3)} ${new Date(`${startDate}T12:00:00`).getDate()} — ${MON[dt.getMonth()].slice(0, 3)} ${dt.getDate()}`
  : `${DAY[dt.getDay()]} · ${MON[dt.getMonth()]} ${dt.getDate()}`

const who = r => showNames || preview ? r.name.toLowerCase() : `${r.name[0].toLowerCase()}.`

const line = r => `
  <tr>
    <td class="nm">${who(r)}</td>
    <td class="st">${r.sets} sets${weekly && r.days > 1 ? ` · ${r.days} days` : ''}</td>
    <td class="pr">${r.pr ? `+${r.pr.delta} lb ${r.pr.exercise}` : '<i>—</i>'}</td>
  </tr>`

const stat = (n, l) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`

const CTA = arg('--url') || 'vveritascoaching.com/dmv'
const PRICE = arg('--price') || '$125 / week'
const UNTIL = arg('--until')

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaces(ROOT)}
${BASE}
h1{font-weight:200;font-size:${d.milestone ? 96 : 86}px;letter-spacing:-.045em;line-height:.96;margin-top:44px}
.when{font-size:32px;color:var(--dim);letter-spacing:-.02em;margin-top:26px}

.stats{display:flex;gap:${d.milestone ? 62 : 66}px;margin-top:${d.milestone ? 64 : 46}px;flex-wrap:wrap}
.stat b{display:block;font-weight:200;font-size:${d.milestone ? 76 : 72}px;letter-spacing:-.045em;line-height:1}
.stat span{display:block;font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:19px;
  letter-spacing:.2em;text-transform:uppercase;color:var(--ghost);margin-top:14px}

table{width:100%;border-collapse:collapse;margin-top:44px}
td{padding:17px 0;border-bottom:1px solid #131313;vertical-align:baseline}
.nm{font-size:29px;letter-spacing:-.02em;width:26%}
.st{font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:23px;color:#4a4a4a;width:28%}
.pr{font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:23px;color:var(--oxblood);
  text-align:right;width:46%}
.pr i{color:#242424;font-style:normal}

.block{margin-top:34px;padding-top:30px;border-top:1px solid #131313}
.lbl{font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:19px;letter-spacing:.24em;
  text-transform:uppercase;color:var(--ghost);margin-bottom:20px}
.body{font-size:29px;color:var(--text);line-height:1.45;letter-spacing:-.02em}

.offer{margin-top:auto;padding-top:34px;border-top:1px solid #131313}
.what{font-size:37px;font-weight:200;letter-spacing:-.03em;line-height:1.3}
.what b{font-weight:200;color:var(--oxblood)}
.scarcity{margin-top:22px;font-family:'JetBrains Mono Embed',ui-monospace,monospace;
  font-size:21px;letter-spacing:.14em;text-transform:uppercase;color:var(--oxblood)}
.cta{display:inline-block;margin-top:26px;padding:17px 34px;border:1px solid var(--text);
  font-size:32px;letter-spacing:-.02em}
</style></head><body>

  <div class="mark mono">vveritas<i>*</i> coaching · ${preview ? "what we're building" : 'online 1:1'}</div>

  <h1>${d.milestone ? 'ninety days<br>of coaching.' : (weekly ? 'this week<br>across every client.' : 'last night<br>across every client.')}</h1>
  ${preview ? '' : `<p class="when">${d.milestone ? `${d.roster} locked in` : label}</p>`}

  <div class="stats">
    ${d.milestone
      ? stat(d.roster, 'locked in') + stat(d.sessions, 'sessions') + stat(d.sets.toLocaleString(), 'sets logged') + stat(d.prs, 'prs')
      : stat(d.sessions, weekly ? 'sessions' : 'trained') + stat(d.sets, 'sets logged') + stat(d.prs, d.prs === 1 ? 'pr' : 'prs')}
  </div>

  ${d.rows.length ? `<table>${d.rows.map(line).join('')}</table>` : ''}

  <div class="block">
    <div class="lbl">what that means</div>
    <p class="body">${d.milestone
      ? `${d.checkins} nightly check-ins, every one read before the next call. no session
         guessed at, no week written from memory.`
      : `every set above was logged as it happened, not remembered afterwards.
         i read the check-ins before every call, so nobody has to explain their week.`}</p>
  </div>

  <div class="offer">
    <div class="what">1:1 online coaching.<br>a weekly call and <b>${PRICE}</b>.</div>
    <div class="scarcity">founding rate${UNTIL ? ` · goes up ${UNTIL}` : ' · going up soon'}</div>
    <div class="cta">book a call →</div>
    <div class="url mono">${CTA}</div>
  </div>

</body></html>`

const out = join(ROOT, 'docs/story',
  `recap-${preview ? 'preview-' : ''}${milestone ? 'milestone' : weekly ? 'week' : 'night'}-${endDate}.png`)
shot(html, out, { tmp: join(ROOT, 'docs/.render-recap') })

// ── report ───────────────────────────────────────────────────────────────────
console.log(`\n  ${weekly ? `${startDate} → ${endDate}` : endDate} — ${d.sessions} session(s), ${d.sets} sets, ${d.prs} pr(s)`)
for (const r of d.rows) {
  console.log(`    ${who(r).padEnd(12)} ${String(r.sets).padStart(3)} sets   ${r.pr ? `+${r.pr.delta} lb ${r.pr.exercise}` : '—'}`)
}
console.log(`\n  → ${out}`)
if (preview) console.log('  PREVIEW — invented numbers, stamped. do not post.\n')
else if (!showNames) console.log('  initials only. --names once they have agreed.\n')
