import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await fetch("https://api.mail.tm/domains?page=1");

    const text = await response.text();

    return res.status(200).json({
      ok: true,
      status: response.status,
      contentType: response.headers.get("content-type"),
      body: text,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
