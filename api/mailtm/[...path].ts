import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const response = await fetch("https://api.mail.tm/domains?page=1");

    const body = await response.text();

    return res.status(200).json({
      ok: true,
      status: response.status,
      statusText: response.statusText,
      body,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
