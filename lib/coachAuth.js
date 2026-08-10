// ─── COACH AUTH (shared) ─────────────────────────────────────────────────────
// Lives apart from the proxy so the login route can import it without pulling
// edge-runtime middleware into a Node handler. Web Crypto only — this has to
// run in both places.

export const COACH_COOKIE = 'vv_coach'

const enc = new TextEncoder()

/** HMAC of a fixed string under the password. Holding the cookie never reveals
 *  the password, and the cookie can't be forged without it. */
export async function sessionToken(password) {
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('vveritas-coach-v1'))
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')
}

/** Length-invariant compare, so a wrong cookie can't be narrowed by timing. */
export function safeEqual(a = '', b = '') {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}
