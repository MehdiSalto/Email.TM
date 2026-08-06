/*
# Restrict direct access to credential columns on emails

1. Security Changes
- REVOKE SELECT on `password`, `token`, and `token_expires_at` columns from
  the `anon` and `authenticated` roles.
- This ensures a browser using the anon key can read only the safe, public
  columns (id, address, expires_at, created_at) — never the mail.tm password
  or bearer token. Only the service role (used by the edge function) can read
  the credential columns, because the service role bypasses RLS and column
  privilege grants.

2. Notes
- The SELECT RLS policy on `emails` remains open (USING true) so shared inbox
  links can resolve an email by id. The column-level privilege revocation
  prevents those same queries from leaking credentials.
*/
REVOKE SELECT (password, token, token_expires_at) ON emails FROM anon;
REVOKE SELECT (password, token, token_expires_at) ON emails FROM authenticated;
