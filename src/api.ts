import { createClient } from "@supabase/supabase-js";
import type { DurationKey, EmailRecord, InboxMessage, MessageDetail } from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MAIL_TM_BASE = "https://api.mail.tm";

const DURATION_MS: Record<DurationKey, number> = {
  "1h": 60 * 60 * 1000,
  "2h": 2 * 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "2d": 2 * 24 * 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
};

function randomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

interface MailTmDomain {
  domain: string;
  isActive: boolean;
}

interface MailTmTokenResponse {
  token: string;
  id: string;
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

async function fetchMailTmMessages(token: string): Promise<InboxMessage[]> {
  const res = await fetch(`${MAIL_TM_BASE}/messages?page=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch messages: ${res.status} ${text}`);
  }
  const data = await res.json();
  const raw = (data["hydra:member"] as Record<string, unknown>[]) || [];
  return raw.map((m) => ({
    id: m.id as string,
    from: m.from as { address: string; name: string },
    subject: (m.subject as string) || "",
    intro: (m.intro as string) || "",
    seen: (m.seen as boolean) ?? false,
    hasAttachments: (m.hasAttachments as boolean) ?? false,
    createdAt: (m.createdAt as string) || "",
  }));
}

async function fetchMailTmMessageDetail(token: string, messageId: string): Promise<MessageDetail> {
  const res = await fetch(`${MAIL_TM_BASE}/messages/${messageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch message: ${res.status} ${text}`);
  }
  const m = await res.json();
  return {
    id: m.id as string,
    from: m.from as { address: string; name: string },
    to: (m.to as { address: string; name: string }[]) || [],
    subject: (m.subject as string) || "",
    text: (m.text as string) || "",
    html: (m.html as string[]) || [],
    intro: (m.intro as string) || "",
    seen: (m.seen as boolean) ?? false,
    hasAttachments: (m.hasAttachments as boolean) ?? false,
    createdAt: (m.createdAt as string) || "",
  };
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

export async function createEmail(duration: DurationKey): Promise<EmailRecord> {
  const durationMs = DURATION_MS[duration] ?? DURATION_MS["1d"];
  const expiresAt = new Date(Date.now() + durationMs).toISOString();

  const domains = await getMailTmDomains();
  if (domains.length === 0) throw new Error("No mail.tm domains available");

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

  if (error) throw new Error(`DB insert failed: ${error.message}`);
  return data;
}

export async function fetchInbox(
  emailId: string
): Promise<{ email: EmailRecord; messages: InboxMessage[] }> {
  const { data: emailRow, error: emailError } = await supabase
    .from("emails")
    .select("id, address, password, token, token_expires_at, expires_at, created_at")
    .eq("id", emailId)
    .maybeSingle();

  if (emailError) throw new Error(`DB error: ${emailError.message}`);
  if (!emailRow) throw new Error("Email not found or expired");

  const email = emailRow as EmailRow;

  if (new Date(email.expires_at) <= new Date()) {
    await supabase.from("emails").delete().eq("id", emailId);
    throw new Error("Email not found or expired");
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

  let messages: InboxMessage[] = [];
  try {
    messages = await fetchMailTmMessages(token);
  } catch {
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
  }

  return {
    email: {
      id: email.id,
      address: email.address,
      expires_at: email.expires_at,
      created_at: email.created_at,
    },
    messages,
  };
}

export async function fetchMessageDetail(
  emailId: string,
  messageId: string
): Promise<MessageDetail> {
  const { data: emailRow, error: emailError } = await supabase
    .from("emails")
    .select("id, address, password, token, token_expires_at, expires_at")
    .eq("id", emailId)
    .maybeSingle();

  if (emailError) throw new Error(`DB error: ${emailError.message}`);
  if (!emailRow) throw new Error("Email not found or expired");

  const email = emailRow as EmailRow;
  if (new Date(email.expires_at) <= new Date()) {
    await supabase.from("emails").delete().eq("id", emailId);
    throw new Error("Email not found or expired");
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

  return await fetchMailTmMessageDetail(token, messageId);
}
