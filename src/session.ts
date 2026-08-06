import type { EmailRecord } from "./types";

const STORAGE_KEY = "emailtime_session_emails";

export function getSessionEmails(): EmailRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is EmailRecord =>
        e && typeof e.id === "string" && typeof e.address === "string"
    );
  } catch {
    return [];
  }
}

export function addSessionEmail(email: EmailRecord): EmailRecord[] {
  const current = getSessionEmails();
  const exists = current.some((e) => e.id === email.id);
  if (exists) return current;
  const updated = [email, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function removeSessionEmail(id: string): EmailRecord[] {
  const current = getSessionEmails();
  const updated = current.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
