import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MAIL_TM_BASE = "https://api.mail.tm";

interface MailTmDomain {
  domain: string;
  isActive: boolean;
}

interface MailTmTokenResponse {
  token: string;
  id: string;
}

interface MailTmMessage {
  id: string;
  from: { address: string; name: string };
  to: { address: string; name: string }[];
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface EmailRow {
  id: string;
  address: string;
  password: string;
  token: string;
  token_expires_at: string;
  expires_at: string;
  created_at: string;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errorResponse(message: string, status = 500): Response {
  return jsonResponse({ error: message }, status);
}

function randomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

async function getMailTmDomains(): Promise<string[]> {
  const res = await fetch(`${MAIL_TM_BASE}/domains?page=1`);
  if (!res.ok) throw new Error(`Failed to fetch domains: ${res.status}`);
  const data = await res.json();
  const domains = (data["hydra:member"] as MailTmDomain[]) || [];
  return domains.filter((d) => d.isActive).map((d) => d.domain);
}

async function createMailTmAccount(address: string, password: string): Promise<void> {
  const res = await fetch(`${MAIL_TM_BASE}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create account: ${res.status} ${text}`);
  }
}

async function getMailTmToken(address: string, password: string): Promise<MailTmTokenResponse> {
  const res = await fetch(`${MAIL_TM_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get token: ${res.status} ${text}`);
  }
  return await res.json();
}

async function fetchMailTmMessages(token: string, page = 1): Promise<MailTmMessage[]> {
  const res = await fetch(`${MAIL_TM_BASE}/messages?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch messages: ${res.status} ${text}`);
  }
  const data = await res.json();
  return (data["hydra:member"] as MailTmMessage[]) || [];
}

async function fetchMailTmMessageDetail(token: string, messageId: string): Promise<unknown> {
  const res = await fetch(`${MAIL_TM_BASE}/messages/${messageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch message detail: ${res.status} ${text}`);
  }
  return await res.json();
}

function getSupabaseClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing Supabase env vars");
  return createClient(url, serviceKey);
}

const DURATION_MS: Record<string, number> = {
  "1h": 60 * 60 * 1000,
  "2h": 2 * 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "2d": 2 * 24 * 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const supabase = getSupabaseClient();

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/functions\/v1\/emailtime\/?/, "");

    // Run cleanup on every request
    await supabase.rpc("cleanup_expired_emails");

    // GET /domains — available mail.tm domains
    if (path === "domains" && req.method === "GET") {
      const domains = await getMailTmDomains();
      return jsonResponse({ domains });
    }

    // POST /create — create a new temp email
    if (path === "create" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const durationKey = (body.duration as string) || "1d";
      const durationMs = DURATION_MS[durationKey] ?? DURATION_MS["1d"];
      const expiresAt = new Date(Date.now() + durationMs).toISOString();

      const domains = await getMailTmDomains();
      if (domains.length === 0) {
        return errorResponse("No mail.tm domains available", 503);
      }

      const localPart = `et${randomString(8)}`;
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const address = `${localPart}@${domain}`;
      const password = randomString(16);

      await createMailTmAccount(address, password);
      const tokenData = await getMailTmToken(address, password);

      const { data, error } = await supabase
        .from("emails")
        .insert({
          address,
          password,
          token: tokenData.token,
          token_expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          expires_at: expiresAt,
        })
        .select("id, address, expires_at, created_at")
        .single();

      if (error) {
        return errorResponse(`DB insert failed: ${error.message}`, 500);
      }

      return jsonResponse({ email: data });
    }

    // GET /inbox/:id — fetch messages for a specific email
    const inboxMatch = path.match(/^inbox\/([^/]+)$/);
    if (inboxMatch && req.method === "GET") {
      const emailId = inboxMatch[1];

      const { data: emailRow, error: emailError } = await supabase
        .from("emails")
        .select("id, address, password, token, token_expires_at, expires_at, created_at")
        .eq("id", emailId)
        .maybeSingle();

      if (emailError) return errorResponse(`DB error: ${emailError.message}`, 500);
      if (!emailRow) return errorResponse("Email not found or expired", 404);

      const email = emailRow as EmailRow;

      // Check expiration
      if (new Date(email.expires_at) <= new Date()) {
        await supabase.from("emails").delete().eq("id", emailId);
        return errorResponse("Email not found or expired", 404);
      }

      // Refresh token if needed
      let token = email.token;
      const tokenExpired =
        !email.token_expires_at || new Date(email.token_expires_at) <= new Date();
      if (tokenExpired || !token) {
        try {
          const newToken = await getMailTmToken(email.address, email.password);
          token = newToken.token;
          await supabase
            .from("emails")
            .update({
              token: token,
              token_expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
            })
            .eq("id", emailId);
        } catch {
          return errorResponse("Failed to refresh auth token", 502);
        }
      }

      // Fetch messages
      let messages: MailTmMessage[] = [];
      try {
        messages = await fetchMailTmMessages(token);
      } catch {
        // Try re-authenticating once
        try {
          const newToken = await getMailTmToken(email.address, email.password);
          token = newToken.token;
          await supabase
            .from("emails")
            .update({
              token: token,
              token_expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
            })
            .eq("id", emailId);
          messages = await fetchMailTmMessages(token);
        } catch {
          return errorResponse("Failed to fetch messages", 502);
        }
      }

      const safeMessages = messages.map((m) => ({
        id: m.id,
        from: m.from,
        subject: m.subject,
        intro: m.intro,
        seen: m.seen,
        hasAttachments: m.hasAttachments,
        createdAt: m.createdAt,
      }));

      return jsonResponse({
        email: {
          id: email.id,
          address: email.address,
          expires_at: email.expires_at,
          created_at: email.created_at,
        },
        messages: safeMessages,
      });
    }

    // GET /message/:emailId/:messageId — fetch a single message detail
    const msgMatch = path.match(/^message\/([^/]+)\/([^/]+)$/);
    if (msgMatch && req.method === "GET") {
      const emailId = msgMatch[1];
      const messageId = msgMatch[2];

      const { data: emailRow, error: emailError } = await supabase
        .from("emails")
        .select("id, address, password, token, token_expires_at, expires_at")
        .eq("id", emailId)
        .maybeSingle();

      if (emailError) return errorResponse(`DB error: ${emailError.message}`, 500);
      if (!emailRow) return errorResponse("Email not found or expired", 404);

      const email = emailRow as EmailRow;
      if (new Date(email.expires_at) <= new Date()) {
        await supabase.from("emails").delete().eq("id", emailId);
        return errorResponse("Email not found or expired", 404);
      }

      let token = email.token;
      const tokenExpired =
        !email.token_expires_at || new Date(email.token_expires_at) <= new Date();
      if (tokenExpired || !token) {
        const newToken = await getMailTmToken(email.address, email.password);
        token = newToken.token;
        await supabase
          .from("emails")
          .update({
            token: token,
            token_expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          })
          .eq("id", emailId);
      }

      const detail = await fetchMailTmMessageDetail(token, messageId);
      return jsonResponse({ message: detail });
    }

    return errorResponse("Not found", 404);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Unknown error", 500);
  }
});
