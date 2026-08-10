'use client'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function CoachLogin() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const params = useSearchParams()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(params.get('e') === 'unset'
    ? 'COACH_PASSWORD is not set on this deploy. add it in vercel and redeploy.'
    : '')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      const res = await fetch('/api/coach/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, next: params.get('next') }),
      })
      const body = await res.json()
      if (!res.ok) { setError(body.error || 'that did not work.'); return }
      // A full navigation, not a client push — the middleware has to see the
      // new cookie, and a soft route change won't re-run it.
      window.location.href = body.next || '/coach'
    } catch {
      setError('could not reach the server.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="gate">
      <form className="gate-box" onSubmit={submit}>
        <div className="gate-eyebrow">vveritas* coaching</div>
        <h1 className="gate-title">coach access</h1>
        <p className="gate-sub">client data lives behind here.</p>

        <input
          className="gate-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
          autoFocus
          autoComplete="current-password"
        />

        {error && <p className="gate-error">{error}</p>}

        <button className="gate-btn" type="submit" disabled={busy || !password}>
          {busy ? 'checking…' : 'enter'}
        </button>
      </form>
    </div>
  )
}
