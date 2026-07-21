import { getCoachingDb } from '@/lib/db';

export async function POST(req) {
  try {
    const sql = getCoachingDb();
    const body = await req.json();
    const {
      slug, age, height, weight_lbs, goal, experience,
      days_per_week, current_program, starting_lifts, injuries, notes,
    } = body;

    const [client] = await sql`SELECT id FROM clients WHERE slug = ${slug} LIMIT 1`;
    if (!client) return Response.json({ error: 'client not found' }, { status: 404 });

    await sql`
      INSERT INTO intake (
        client_id, age, height, weight_lbs, goal, experience,
        days_per_week, current_program, starting_lifts, injuries, notes
      ) VALUES (
        ${client.id}, ${age || null}, ${height || null}, ${weight_lbs || null},
        ${goal || null}, ${experience || null}, ${days_per_week || null},
        ${current_program || null}, ${JSON.stringify(starting_lifts || {})},
        ${injuries || null}, ${notes || null}
      )
    `;

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'server error' }, { status: 500 });
  }
}
