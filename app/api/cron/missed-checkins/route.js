import { Resend } from 'resend'
import { getCoachingDb } from '@/lib/db'
import { ALL } from '@/lib/clients'

// ─── MISSED CHECK-IN ALERT ───────────────────────────────────────────────────
// Runs once a morning and reports who did not check in yesterday.
//
// Morning-after rather than late-night on purpose: real check-ins have landed
// as late as 03:47 ET. A 10pm sweep would have called Olaf a no-show on nights
// he checked in five hours later, and an alert that cries wolf gets muted.
//
// Sends NOTHING when everybody checked in. A daily "all good" email trains you
// to stop opening it, and then the one that matters gets skipped too.

export const dynamic = 'force-dynamic'

/** A DATE column comes back as a Date at ET-midnight; UTC is +4/+5 so the
 *  calendar day is unchanged. String(date) gives "Sun Sep 06" and breaks maths. */
const ymd = (d) => new Date(d).toISOString().slice(0, 10)

/** Yesterday's date in ET — the clients are all Toronto/Maryland. */
function yesterdayET() {
  const now = new Date()
  const et = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  et.setDate(et.getDate() - 1)
  return et.toLocaleDateString('en-CA')          // YYYY-MM-DD
}

export async function GET(req) {
  // Vercel signs cron requests when CRON_SECRET exists. Enforce it when it does;
  // don't hard-fail when it doesn't, or a missing env var silently kills the
  // alerts and nobody finds out until a client has ghosted for a week.
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return Response.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  // ?date= and ?dry=1 exist so this can be proved to work without waiting a
  // week for somebody to actually go quiet. dry never sends.
  const url = new URL(req.url)
  const override = url.searchParams.get('date')
  const dry = url.searchParams.get('dry') === '1'
  const date = /^\d{4}-\d{2}-\d{2}$/.test(override || '') ? override : yesterdayET()

  // Only real clients, only ones who want alerts, and only once they've started.
  const watched = ALL.filter(c =>
    c.email &&
    c.alerts?.missedCheckin !== false &&
    (!c.startedOn || c.startedOn <= date),
  )
  if (!watched.length) return Response.json({ ok: true, date, checked: 0, missed: [] })

  let missed = []
  try {
    const sql = getCoachingDb()
    const tokens = watched.map(c => c.token)

    // Their most recent check-in, whatever day it is labelled. Comparing against
    // this rather than "did they file one for yesterday" is what keeps the 3am
    // crowd out of the alert: a check-in submitted after midnight is dated today,
    // and somebody who filed one today is plainly not ghosting.
    const last = await sql`
      SELECT client_token, max(local_date) AS last FROM client_checkins
      WHERE client_token = ANY(${tokens}) GROUP BY client_token`
    const lastBy = Object.fromEntries(last.map(r => [r.client_token, ymd(r.last)]))

    missed = watched
      .map(c => {
        const l = lastBy[c.token] ?? null
        const days = l ? Math.round((new Date(date) - new Date(l)) / 86400000) : null
        return { name: c.name, token: c.token, lastCheckin: l, daysQuiet: days }
      })
      // days <= 0 means they have checked in for yesterday or later — current.
      .filter(m => m.daysQuiet === null || m.daysQuiet > 0)
  } catch (err) {
    console.error('missed-checkin cron db error:', err)
    return Response.json({ error: 'db read failed' }, { status: 500 })
  }

  if (!missed.length) {
    return Response.json({ ok: true, date, checked: watched.length, missed: [] })
  }

  const line = (m) =>
    m.daysQuiet === null
      ? `${m.name} — has never checked in`
      : m.daysQuiet <= 1
        ? `${m.name} — missed last night`
        : `${m.name} — ${m.daysQuiet} days quiet (last: ${m.lastCheckin})`

  // Never-checked-in has no day count, so it must not feed the "N days" maths —
  // a sentinel leaking into a subject line reads as a bug to whoever opens it.
  const counted = missed.map(m => m.daysQuiet).filter(n => typeof n === 'number')
  const worst = counted.length ? Math.max(...counted) : 0
  const names = missed.map(m => m.name).join(', ')
  const neverAny = missed.some(m => m.daysQuiet === null)
  const subject = worst >= 3
    ? `${names} — ${worst} days quiet`
    : neverAny && !counted.length
      ? `${names} — no check-ins yet`
      : `no check-in: ${names}`

  if (dry) return Response.json({ ok: true, dry: true, date, missed, subject, body: missed.map(line) })

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'vveritas* <onboarding@resend.dev>',
      to: ['ncortezwilliams@gmail.com', 'iamnicofresh@gmail.com', 'vveritascoaching@gmail.com'],
      subject,
      text: [
        `for ${date}`,
        '',
        ...missed.map(line),
        '',
        ...missed.map(m => `${m.name}: /coach/log/${m.token}`),
      ].join('\n'),
    })
  } catch (err) {
    // The report is the point; a failed send should still surface in the logs
    // with the actual result rather than pretending nothing happened.
    console.error('missed-checkin email failed:', err)
    return Response.json({ ok: false, date, missed, emailed: false }, { status: 502 })
  }

  return Response.json({ ok: true, date, checked: watched.length, missed, emailed: true })
}
