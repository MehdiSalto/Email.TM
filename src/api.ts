import { createClient } from "@supabase/supabase-js";
import type {
  DurationKey,
  EmailRecord,
  InboxMessage,
  MessageDetail,
} from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const FUNCTION_URL = `${supabaseUrl}/functions/v1/emailtime`;

const DURATION_MS: Record<DurationKey, number> = {
  "1h": 60 * 60 * 1000,
  "2h": 2 * 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "2d": 2 * 24 * 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
};

async function functionFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${FUNCTION_URL}/${path}`, {
    ...options,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      ...(options.headers || {}),
    },
  });
}

interface CreateResponse {
  email: EmailRecord;
  message?: string;
}

interface InboxResponse {
  email: EmailRecord;
  messages: InboxMessage[];
}

interface MessageResponse {
  message: MessageDetail;
}

export async function createEmail(
  duration: DurationKey
): Promise<EmailRecord> {
  const response = await functionFetch("create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      duration,
    }),
  });

  if (!response.ok) {
    const text = await response.text();

    let message = `Failed to create email: ${response.status}`;

    try {
      const data = JSON.parse(text);
      if (data?.error) {
        message = data.error;
      }
    } catch {
      if (text) {
        message = `${message} ${text}`;
      }
    }

    throw new Error(message);
  }

  const data = (await response.json()) as CreateResponse;

  if (!data.email) {
    throw new Error("Invalid response from email service");
  }

  return data.email;
}

export async function fetchInbox(
  emailId: string
): Promise<InboxResponse> {
  const response = await functionFetch(`inbox/${encodeURIComponent(emailId)}`, {
    method: "GET",
  });

  if (!response.ok) {
    const text = await response.text();

    let message = `Failed to fetch inbox: ${response.status}`;

    try {
      const data = JSON.parse(text);
      if (data?.error) {
        message = data.error;
      }
    } catch {
      if (text) {
        message = `${message} ${text}`;
      }
    }

    throw new Error(message);
  }

  const data = (await response.json()) as InboxResponse;

  if (!data.email) {
    throw new Error("Invalid email response");
  }

  return {
    email: data.email,
    messages: data.messages || [],
  };
}

export async function fetchMessageDetail(
  emailId: string,
  messageId: string
): Promise<MessageDetail> {
  const response = await functionFetch(
    `message/${encodeURIComponent(emailId)}/${encodeURIComponent(messageId)}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const text = await response.text();

    let message = `Failed to fetch message: ${response.status}`;

    try {
      const data = JSON.parse(text);
      if (data?.error) {
        message = data.error;
      }
    } catch {
      if (text) {
        message = `${message} ${text}`;
      }
    }

    throw new Error(message);
  }

  const data = (await response.json()) as MessageResponse;

  if (!data.message) {
    throw new Error("Invalid message response");
  }

  return data.message;
}
