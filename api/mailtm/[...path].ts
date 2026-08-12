import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAIL_TM_BASE = "https://api.mail.tm";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Client-Info, Apikey"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const rawPath = req.query["...path"];

    const path = Array.isArray(rawPath)
      ? rawPath.join("/")
      : typeof rawPath === "string"
        ? rawPath
        : "";

    if (!path) {
      return res.status(400).json({
        ok: false,
        error: "Missing path",
        query: req.query,
      });
    }

    const targetUrl = `${MAIL_TM_BASE}/${path}`;

    console.log("MAILTM TARGET:", targetUrl);

    const upstream = await fetch(targetUrl, {
      method: req.method || "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "EmailTM/1.0",
      },
    });

    const body = await upstream.text();

    const headers: Record<string, string> = {};

    upstream.headers.forEach((value, key) => {
      headers[key] = value;
    });

    console.log("MAILTM DEBUG:", {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
      bodyLength: body.length,
      body,
    });

    return res.status(200).json({
      ok: true,
      mailTmStatus: upstream.status,
      mailTmStatusText: upstream.statusText,
      mailTmHeaders: headers,
      body,
    });
  } catch (error) {
    console.error("MAILTM FETCH ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error instanceof Error
        ? error.message
        : String(error),
    });
  }
}
