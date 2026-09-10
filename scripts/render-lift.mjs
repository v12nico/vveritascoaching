#!/usr/bin/env node
/**
 * One lift. One night. One card.
 *
 *   node scripts/render-lift.mjs                      # next unposted lift
 *   node scripts/render-lift.mjs --lift "hack squat"  # pick one
 *   node scripts/render-lift.mjs --list               # what is available
 *   node scripts/render-lift.mjs --reset              # start the rotation over
 *
 * The point of this script is that "a different card every night" does not
 * require inventing anybody. A single client tracking a dozen exercises is a
 * dozen nights of content, because each lift has its own story and each one is
 * verifiable.
 *
 * Rotation state lives in docs/story/.posted.json so the same lift does not
 * come up twice before the rest have had a turn.
 *
 * Output: docs/story/lift-<slug>-<date>.png
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { neon } from '@neondatabase/serverless'
import { ALL } from '../lib/clients/index.js'
import { BASE, fontFaces, shot, loadEnv, ymd } from './lib/card.mjs'

const ROOT = resolve(process.cwd())
loadEnv(ROOT)

const args = process.argv.slice(2)
const has = f => args.includes(f)
const val = f => { const i = args.indexOf(f); return i < 0 ? null : args[i + 1] }

const CTA = val('--url') || 'vveritascoaching.com/dmv'
const STATE = join(ROOT, 'docs/story/.posted.json')
const IMPLAUSIBLE_GAIN = 0.40

// Invented lifts, reachable only behind --preview, for seeing how the format
// carries numbers bigger than today's. Every render it feeds is stamped.
const MOCK = [
  { exercise: 'barbell hip thrust', first: { weight: 185, reps: 8 }, best: { weight: 275, reps: 8 },
    kind: 'weight', sessions: 14, spanWeeks: 8, delta: '+90 lb', gain: 90 },
  { exercise: 'barbell back squat', first: { weight: 135, reps: 5 }, best: { weight: 205, reps: 5 },
    kind: 'weight', sessions: 16, spanWeeks: 12, delta: '+70 lb', gain: 70 },
  { exercise: 'incline dumbbell press', first: { weight: 50, reps: 8 }, best: { weight: 75, reps: 8 },
    kind: 'weight', sessions: 11, spanWeeks: 8, delta: '+25 lb', gain: 25 },
  { exercise: 'weighted pull-up', first: { weight: 25, reps: 5 }, best: { weight: 25, reps: 10 },
    kind: 'reps', sessions: 12, spanWeeks: 9, delta: '+5 reps', gain: 15 },
].map(m => ({ ...m, token: 'preview' }))

// ── every clean gain, across every real client ───────────────────────────────
const isPreview = has('--preview')
const real = ALL.filter(c => c.email && !c.token.startsWith('sample-'))
const sql = isPreview ? null : neon(process.env.COACHING_DATABASE_URL)
const rows = isPreview ? [] : await sql`
  SELECT client_token, exercise, local_date, weight::float AS weight, reps
  FROM client_lifts WHERE client_token = ANY(${real.map(c => c.token)})
  ORDER BY local_date, set_index`

const groups = {}
for (const r of rows) (groups[`${r.client_token}|${r.exercise}`] ??= []).push(r)

const candidates = []
for (const [key, sets] of Object.entries(groups)) {
  const [token, exercise] = key.split('|')
  const first = sets[0]

  // Only the two unarguable shapes of progress: more weight for no fewer reps,
  // or more reps at the same weight. Anything else invites an argument in the
  // replies, and an argument under a results post costs more than the post won.
  const heavier = sets.filter(s => s.reps >= first.reps && s.weight > first.weight)
  const longer  = sets.filter(s => s.weight === first.weight && s.reps > first.reps)

  let best = null, kind = null
  if (heavier.length) {
    const h = heavier.reduce((a, b) => (b.weight > a.weight ? b : a))
    if ((h.weight - first.weight) / first.weight <= IMPLAUSIBLE_GAIN) { best = h; kind = 'weight' }
  }
  if (!best && longer.length) { best = longer.reduce((a, b) => (b.reps > a.reps ? b : a)); kind = 'reps' }
  if (!best) continue

  const days = [...new Set(sets.map(s => ymd(s.local_date)))].sort()
  candidates.push({
    token, exercise, first, best, kind,
    sessions: days.length,
    spanWeeks: Math.max(1, Math.round(
      (new Date(days.at(-1)) - new Date(days[0])) / 86400000 / 7)),
    delta: kind === 'weight'
      ? `+${Math.round(best.weight - first.weight)} lb`
      : `+${best.reps - first.reps} rep${best.reps - first.reps > 1 ? 's' : ''}`,
    gain: kind === 'weight' ? best.weight - first.weight : (best.reps - first.reps) * 3,
  })
}

if (isPreview) candidates.push(...MOCK)
candidates.sort((a, b) => b.gain - a.gain)

if (!candidates.length) {
  console.error('\n  no unarguable gains logged yet. nothing to post.\n')
  process.exit(1)
}

if (has('--list')) {
  const posted = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {}
  console.log(`\n  ${candidates.length} lifts available:\n`)
  for (const c of candidates) {
    const seen = posted[`${c.token}|${c.exercise}`]
    console.log(`   ${seen ? ' ' : '•'} ${c.exercise.padEnd(36)} ` +
      `${c.first.weight}×${c.first.reps} → ${c.best.weight}×${c.best.reps}  ` +
      `${c.delta.padEnd(9)} ${seen ? `posted ${seen}` : ''}`)
  }
  console.log('\n  • = not posted yet\n')
  process.exit(0)
}

if (has('--reset')) { writeFileSync(STATE, '{}'); console.log('\n  rotation reset.\n') }

// ── pick ─────────────────────────────────────────────────────────────────────
const posted = existsSync(STATE) && !has('--reset') && !isPreview
  ? JSON.parse(readFileSync(STATE, 'utf8')) : {}

const wanted = val('--lift')
let pick
if (wanted) {
  pick = candidates.find(c => c.exercise.toLowerCase().includes(wanted.toLowerCase()))
  if (!pick) {
    console.error(`\n  no lift matching "${wanted}". try --list\n`)
    process.exit(1)
  }
} else {
  // Biggest gain first among the unposted — lead with the strongest card and
  // work down, rather than saving the good one for a night nobody is watching.
  pick = candidates.find(c => !posted[`${c.token}|${c.exercise}`])
  if (!pick) {
    console.error('\n  every lift has been posted. --reset to start the rotation over,')
    console.error('  or wait for new sessions to log.\n')
    process.exit(1)
  }
}

// ── markup ───────────────────────────────────────────────────────────────────
// Deliberately explicit. The first version of this card was legible only to
// somebody who already knew what vveritas is: it said "the log" and "not a
// pdf" and never once said client, coaching, or what to do next. A stranger
// scrolling has about two seconds to work out what they are looking at, so the
// card now names the product, explains the mechanism, and gives one action.
//
// No pronouns anywhere — the same template renders for every client.
const n = w => (w % 1 ? w : w | 0)
const PRICE = val('--price') || '$125 / week'
const UNTIL = val('--until')

const how = pick.kind === 'weight'
  ? `the weight only moves after the top of the rep range gets hit on every
     working set. not because a new week started.`
  : `same weight, more reps — the rep range filling up. that is what has to
     happen before the weight is allowed to move.`

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaces(ROOT)}
${BASE}
.kicker{font-size:31px;color:var(--dim);margin-top:50px;letter-spacing:-.02em}
h1{font-weight:200;font-size:92px;letter-spacing:-.045em;line-height:.98;margin-top:20px;
   text-wrap:balance}

.numbers{display:flex;align-items:center;gap:34px;margin-top:66px;flex-wrap:wrap}
.was,.now{font-family:'JetBrains Mono Embed',ui-monospace,monospace;letter-spacing:-.01em}
.was{font-size:68px;color:#3d3d3d}
.arrow{font-size:46px;color:#2c2c2c}
.now{font-size:68px;color:var(--text)}
.delta{padding:14px 26px;border:1px solid var(--oxblood);
  font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:31px;color:var(--oxblood);
  letter-spacing:.04em}
.same{font-size:31px;color:var(--ghost);margin-top:28px;letter-spacing:-.01em}

.block{margin-top:60px;padding-top:40px;border-top:1px solid #131313}
.lbl{font-family:'JetBrains Mono Embed',ui-monospace,monospace;font-size:20px;letter-spacing:.24em;
  text-transform:uppercase;color:var(--ghost);margin-bottom:22px}
.body{font-size:32px;color:var(--text);line-height:1.5;letter-spacing:-.02em}
.body em{font-style:normal;color:var(--dim)}

/* auto pins the offer to the foot of the safe area, so the card fills the
   frame instead of stacking from the top and leaving dead space under it */
.offer{margin-top:auto;padding-top:44px;border-top:1px solid #131313}
.what{font-size:40px;font-weight:200;letter-spacing:-.03em;line-height:1.3}
.what b{font-weight:200;color:var(--oxblood)}
.scarcity{margin-top:22px;font-family:'JetBrains Mono Embed',ui-monospace,monospace;
  font-size:21px;letter-spacing:.14em;text-transform:uppercase;color:var(--oxblood)}
.cta{display:inline-block;margin-top:32px;padding:20px 38px;border:1px solid var(--text);
  font-size:33px;letter-spacing:-.02em}
</style></head><body>

  <div class="mark mono">vveritas<i>*</i> coaching · ${isPreview ? "what we're building" : 'online 1:1'}</div>

  <p class="kicker">${isPreview ? `${pick.spanWeeks} weeks out.` : `one client. ${pick.spanWeeks} week${pick.spanWeeks > 1 ? 's' : ''} in.`}</p>
  <h1>${pick.exercise}.</h1>

  <div class="numbers">
    <span class="was">${n(pick.first.weight)}×${pick.first.reps}</span>
    <span class="arrow">→</span>
    <span class="now">${n(pick.best.weight)}×${pick.best.reps}</span>
    <span class="delta">${pick.delta}</span>
  </div>
  <p class="same">${pick.kind === 'weight' ? 'same reps. more weight.' : 'same weight. more reps.'}</p>

  <div class="block">
    <div class="lbl">why it moved</div>
    <p class="body">every set gets logged in the dashboard, as it happens.
      i read the log before every call. ${how}
      <em>${pick.sessions} sessions, all of it written down.</em></p>
  </div>

  <div class="offer">
    <div class="what">1:1 online coaching.<br>a weekly call and <b>${PRICE}</b>.</div>
    <div class="scarcity">founding rate${UNTIL ? ` · goes up ${UNTIL}` : ' · going up soon'}</div>
    <div class="cta">book a call →</div>
    <div class="url mono">${CTA}</div>
  </div>

</body></html>`

const slug = pick.exercise.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const out = join(ROOT, 'docs/story', `lift-${isPreview ? 'preview-' : ''}${slug}-${ymd(Date.now())}.png`)
shot(html, out, { tmp: join(ROOT, 'docs/.render-lift') })

if (!wanted && !isPreview) {
  posted[`${pick.token}|${pick.exercise}`] = ymd(Date.now())
  writeFileSync(STATE, JSON.stringify(posted, null, 2))
}

const left = candidates.filter(c => !posted[`${c.token}|${c.exercise}`]).length
console.log(`\n  ${pick.exercise} — ${n(pick.first.weight)}×${pick.first.reps} → ${n(pick.best.weight)}×${pick.best.reps}  ${pick.delta}`)
console.log(`  ${pick.sessions} sessions over ${pick.spanWeeks} week(s)`)
console.log(`\n  → ${out}`)
if (isPreview) console.log('  PREVIEW — invented numbers, stamped. do not post.\n')
else console.log(`  ${left} more night${left === 1 ? '' : 's'} of real cards left in the rotation.\n`)
