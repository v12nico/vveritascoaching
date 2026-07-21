import { getCoachingDb } from '@/lib/db';

export async function POST(req) {
  try {
    const sql = getCoachingDb();
    const { slug, exercises, notes } = await req.json();

    const [client] = await sql`SELECT id FROM clients WHERE slug = ${slug} LIMIT 1`;
    if (!client) return Response.json({ error: 'not found' }, { status: 404 });

    const [row] = await sql`
      INSERT INTO workouts (client_id, exercises, notes)
      VALUES (${client.id}, ${JSON.stringify(exercises)}, ${notes || null})
      RETURNING id, logged_at
    `;
    return Response.json({ ok: true, id: row.id, logged_at: row.logged_at });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'server error' }, { status: 500 });
  }
}
