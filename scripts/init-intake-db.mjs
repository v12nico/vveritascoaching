import { neon } from '@neondatabase/serverless';

// run: node --env-file=.env.local scripts/init-intake-db.mjs
// idempotent — safe to run again.

const sql = neon(process.env.COACHING_DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS client_intakes (
    id           SERIAL PRIMARY KEY,
    slug         TEXT,
    full_name    TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT,
    package      TEXT,
    start_date   TEXT,
    status       TEXT NOT NULL DEFAULT 'new',
    needs_review BOOLEAN NOT NULL DEFAULT false,
    review_flags TEXT[] DEFAULT '{}',
    answers      JSONB NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

// answers holds the full submission as JSONB so a new question in intakeSpec.js
// never needs a migration. The promoted columns exist only so the coach list can
// sort and filter without opening every blob.
await sql`CREATE INDEX IF NOT EXISTS idx_client_intakes_created ON client_intakes (created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS idx_client_intakes_review  ON client_intakes (needs_review)`;

console.log('client_intakes table ready');
