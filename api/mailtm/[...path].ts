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
        error: "Missing path",
      });
    }

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(req.query)) {
      if (key === "...path") continue;

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (typeof value === "string") {
        params.append(key, value);
      }
    }

    const query = params.toString();
    const targetUrl =
      `${MAIL_TM_BASE}/${path}` + (query ? `?${query}` : "");

    console.log("MAILTM URL:", targetUrl);

    const upstream = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "curl/8.0",
      },
    });

    const body = await upstream.text();

    console.log("MAILTM RESULT:", {
      status: upstream.status,
      statusText: upstream.statusText,
      body,
    });

    return res.status(upstream.status).send(body);
  } catch (error) {
    console.error("MAILTM ERROR:", error);

    return res.status(500).json({
      error: error instanceof Error
        ? error.message
        : String(error),
    });
  }
}
