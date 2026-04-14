import "server-only";

import { Pool, type QueryResultRow } from "pg";

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

function getDatabaseUrl() {
  return (
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL_NON_POOLING ??
    ""
  ).trim();
}

function normalizeConnectionString(raw: string) {
  try {
    const url = new URL(raw);
    // We control SSL via Pool options below.
    url.searchParams.delete("sslmode");
    url.searchParams.delete("sslcert");
    url.searchParams.delete("sslkey");
    url.searchParams.delete("sslrootcert");
    return url.toString();
  } catch {
    return raw;
  }
}

function getPool() {
  if (pool) {
    return pool;
  }

  const connectionString = normalizeConnectionString(getDatabaseUrl());
  if (!connectionString) {
    throw new Error(
      "Postgres is not configured. Set POSTGRES_URL (or DATABASE_URL) in environment variables.",
    );
  }

  const usesLocalhost =
    connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

  pool = new Pool({
    connectionString,
    ssl: usesLocalhost ? false : { rejectUnauthorized: false },
    max: 10,
  });

  return pool;
}

async function ensureSchema() {
  const db = getPool();
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_created
      ON password_reset_tokens(user_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS assessments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      field TEXT NOT NULL,
      goal TEXT NOT NULL,
      interest TEXT NOT NULL,
      level TEXT NOT NULL,
      hours_per_week INTEGER NOT NULL,
      work_style TEXT NOT NULL DEFAULT 'Balanced',
      math_comfort TEXT NOT NULL DEFAULT 'Medium',
      thinking_style TEXT NOT NULL DEFAULT 'Balanced',
      timeline_urgency TEXT NOT NULL DEFAULT '3-6 Months',
      recommendation_top_json TEXT NOT NULL,
      recommendation_alternatives_json TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_assessments_user_created
      ON assessments(user_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS task_progress (
      user_id TEXT NOT NULL REFERENCES users(id),
      assessment_id TEXT NOT NULL REFERENCES assessments(id),
      task_key TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (user_id, assessment_id, task_key)
    );

    CREATE TABLE IF NOT EXISTS recommendation_feedback (
      user_id TEXT NOT NULL REFERENCES users(id),
      assessment_id TEXT NOT NULL REFERENCES assessments(id),
      helpful INTEGER NOT NULL,
      reason TEXT,
      updated_at TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (user_id, assessment_id)
    );

    CREATE TABLE IF NOT EXISTS outcome_checkins (
      user_id TEXT NOT NULL REFERENCES users(id),
      assessment_id TEXT NOT NULL REFERENCES assessments(id),
      projects_completed INTEGER NOT NULL DEFAULT 0,
      interviews_started INTEGER NOT NULL DEFAULT 0,
      notes TEXT,
      updated_at TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (user_id, assessment_id)
    );
  `);
}

async function ensureSchemaReady() {
  if (!schemaReady) {
    schemaReady = ensureSchema();
  }
  return schemaReady;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values: unknown[] = [],
) {
  await ensureSchemaReady();
  const db = getPool();
  const result = await db.query<T>(text, values);
  return result;
}
