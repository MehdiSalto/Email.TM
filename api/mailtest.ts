import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const started = Date.now();

  try {
    const response = await fetch("https://api.mail.tm/domains?page=1", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "EmailTM/1.0",
      },
    });

    const body = await response.text();

    const responseHeaders: Record<string, string> = {};

    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return res.status(200).json({
      ok: true,
      status: response.status,
      statusText: response.statusText,
      duration: `${Date.now() - started}ms`,
      headers: responseHeaders,
      body,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      duration: `${Date.now() - started}ms`,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
