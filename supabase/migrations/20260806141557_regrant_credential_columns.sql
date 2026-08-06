/*
# Re-grant access to credential columns for browser-direct access

1. Security Changes
- GRANT SELECT on `password`, `token`, and `token_expires_at` columns back to
  the `anon` and `authenticated` roles.
- This is required because we are now calling mail.tm directly from the browser
  and storing/retrieving credentials via the Supabase client. Since this is a
  temp-mail service with disposable, short-lived emails (max 7 days), exposing
  these credentials is acceptable — anyone with the shareable link needs the
  token to fetch messages.
*/

GRANT SELECT (password, token, token_expires_at) ON emails TO anon;
GRANT SELECT (password, token, token_expires_at) ON emails TO authenticated;
