export async function POST() {
  const res = Response.json({ ok: true })
  res.headers.append('Set-Cookie', 'vv_coach=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0')
  return res
}
