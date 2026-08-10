import { NextResponse } from 'next/server'
import { COACH_COOKIE, sessionToken, safeEqual } from '@/lib/coachAuth'

// ─── COACH GATE ──────────────────────────────────────────────────────────────
// Everything under /coach and /admin holds client data: health answers, body
// weight, check-ins, and eventually private notes and progress photos. None of
// it was ever behind anything.
//
// Fails CLOSED. With no COACH_PASSWORD set, this denies rather than allows —
// a misconfigured deploy locking you out is recoverable; one silently serving
// a client's health data to anyone who guesses a URL is not.

const PUBLIC_PATHS = ['/coach/login']

export async function proxy(req) {
  const { pathname, search } = req.nextUrl

  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next()
  }

  const password = process.env.COACH_PASSWORD
  const url = req.nextUrl.clone()

  if (!password) {
    url.pathname = '/coach/login'
    url.search = '?e=unset'
    return NextResponse.redirect(url)
  }

  const cookie = req.cookies.get(COACH_COOKIE)?.value
  if (cookie && safeEqual(cookie, await sessionToken(password))) {
    return NextResponse.next()
  }

  url.pathname = '/coach/login'
  url.search = `?next=${encodeURIComponent(pathname + search)}`
  return NextResponse.redirect(url)
}

// Deliberately does NOT cover /client/[token] — that is Olaf's own program and
// is protected by an unguessable token, not by this password.
export const config = {
  matcher: ['/coach/:path*', '/admin/:path*'],
}
