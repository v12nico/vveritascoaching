import { COACH_COOKIE, sessionToken } from '@/lib/coachAuth'

// Rate-limited in memory. Not a real store — it resets on redeploy and is per
// instance — but it turns an instant online brute force into a slow one, which
// is the difference that matters for a single shared password.
const attempts = new Map()
const WINDOW = 60_000
const MAX = 8

function tooMany(ip) {
  const now = Date.now()
  const rec = attempts.get(ip)?.filter(t => now - t < WINDOW) ?? []
  attempts.set(ip, rec)
  return rec.length >= MAX
}
function record(ip) {
  const rec = attempts.get(ip) ?? []
  rec.push(Date.now())
  attempts.set(ip, rec)
}

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (tooMany(ip)) {
    return Response.json({ error: 'too many attempts. wait a minute.' }, { status: 429 })
  }

  const { password, next } = await req.json().catch(() => ({}))
  const expected = process.env.COACH_PASSWORD

  if (!expected) {
    return Response.json({ error: 'COACH_PASSWORD is not set on this deploy.' }, { status: 500 })
  }

  record(ip)

  if (typeof password !== 'string' || password !== expected) {
    // Deliberately vague: naming which part was wrong helps nobody but an attacker.
    return Response.json({ error: 'wrong password.' }, { status: 401 })
  }

  const res = Response.json({ ok: true, next: next || '/coach' })
  res.headers.append('Set-Cookie', [
    `${COACH_COOKIE}=${await sessionToken(expected)}`,
    'Path=/',
    'HttpOnly',                       // JS can never read it, so an XSS can't lift it
    'SameSite=Lax',
    'Max-Age=2592000',                // 30 days — you use this daily
    process.env.NODE_ENV === 'production' ? 'Secure' : '',
  ].filter(Boolean).join('; '))
  return res
}
