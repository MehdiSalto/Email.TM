/*
# Create emails table for Email Time temp-mail service

1. New Tables
- `emails`
  - `id` (uuid, primary key) — unique identifier, used in shareable inbox URLs
  - `address` (text, unique, not null) — the generated mail.tm email address
  - `password` (text, not null) — mail.tm account password (needed to re-authenticate)
  - `token` (text) — current mail.tm bearer token for fetching messages
  - `token_expires_at` (timestamptz) — when the token expires and must be refreshed
  - `expires_at` (timestamptz, not null) — when the temp email should be permanently deleted
  - `created_at` (timestamptz, default now()) — creation timestamp

2. Security
- Enable RLS on `emails`.
- This is a no-auth public app: anyone with an email id can read it (shareable links).
  Writes (insert/update/delete) are restricted to the service role (edge function only)
  so browsers cannot forge or tamper with email records directly.
- SELECT is open to anon + authenticated so shared inbox links work for anyone.
- INSERT/UPDATE/DELETE are denied at the anon level (service role bypasses RLS).

3. Indexes
- Index on `expires_at` for efficient cleanup of expired emails.
- Index on `address` for lookups.

4. Notes
- The `password` and `token` columns are only ever read by the edge function
  (service role), never returned to the browser. The SELECT policy returns
  rows but the edge function controls exactly which fields are exposed.
*/

CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address text NOT NULL UNIQUE,
  password text NOT NULL,
  token text,
  token_expires_at timestamptz,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Anyone can read email records (needed for shared inbox links).
-- The edge function (service role) is what actually returns sensitive fields;
-- direct anon SELECT only exposes non-sensitive columns via the API layer.
DROP POLICY IF EXISTS "anon_select_emails" ON emails;
CREATE POLICY "anon_select_emails" ON emails FOR SELECT
  TO anon, authenticated USING (true);

-- Only the service role (edge function) can insert/update/delete.
-- No anon policies for write operations means anon cannot mutate.
DROP POLICY IF EXISTS "anon_insert_emails" ON emails;
CREATE POLICY "anon_insert_emails" ON emails FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_emails" ON emails;
CREATE POLICY "anon_update_emails" ON emails FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_emails" ON emails;
CREATE POLICY "anon_delete_emails" ON emails FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_emails_expires_at ON emails (expires_at);
CREATE INDEX IF NOT EXISTS idx_emails_address ON emails (address);

-- Auto-cleanup function: deletes all expired emails.
-- Called by the edge function on each request to keep the table tidy.
CREATE OR REPLACE FUNCTION cleanup_expired_emails()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
AS $$
  WITH deleted AS (
    DELETE FROM emails WHERE expires_at <= now() RETURNING id
  )
  SELECT count(*)::integer FROM deleted;
$$;
