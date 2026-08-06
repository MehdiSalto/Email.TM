export type DurationKey = "1h" | "2h" | "1d" | "2d" | "1w";

export type LanguageCode = "en" | "ar" | "es" | "pt" | "fr";

export interface EmailRecord {
  id: string;
  address: string;
  expires_at: string;
  created_at: string;
}

export interface InboxMessage {
  id: string;
  from: { address: string; name: string };
  subject: string;
  intro: string;
  seen: boolean;
  hasAttachments: boolean;
  createdAt: string;
}

export interface InboxResponse {
  email: EmailRecord;
  messages: InboxMessage[];
}

export interface MessageDetail {
  id: string;
  from: { address: string; name: string };
  to: { address: string; name: string }[];
  subject: string;
  text: string;
  html: string[];
  intro: string;
  seen: boolean;
  hasAttachments: boolean;
  createdAt: string;
}
