import type { DurationKey, EmailRecord, InboxResponse, MessageDetail } from "./types";

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/emailtime`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json",
    apikey: ANON_KEY,
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.error) message = body.error;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }
  return await res.json();
}

export async function createEmail(duration: DurationKey): Promise<EmailRecord> {
  const res = await fetch(`${FUNCTION_URL}/create`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ duration }),
  });
  const data = await handleResponse<{ email: EmailRecord }>(res);
  return data.email;
}

export async function fetchInbox(emailId: string): Promise<InboxResponse> {
  const res = await fetch(`${FUNCTION_URL}/inbox/${emailId}`, {
    headers: headers(),
  });
  return await handleResponse<InboxResponse>(res);
}

export async function fetchMessageDetail(
  emailId: string,
  messageId: string
): Promise<MessageDetail> {
  const res = await fetch(`${FUNCTION_URL}/message/${emailId}/${messageId}`, {
    headers: headers(),
  });
  return await handleResponse<{ message: MessageDetail }>(res).then((d) => d.message);
}
