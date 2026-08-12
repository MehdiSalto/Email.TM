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
        query: req.query,
      });
    }

    const targetUrl = `${MAIL_TM_BASE}/${path}`;

    console.log("MAILTM TARGET:", targetUrl);

    const upstream = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "EmailTM/1.0",
      },
    });

    const body = await upstream.text();

    console.log("MAILTM STATUS:", upstream.status);
    console.log("MAILTM BODY LENGTH:", body.length);

    res.status(upstream.status);
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") ||
        "application/json; charset=utf-8"
    );

    return res.send(body);
  } catch (error) {
    console.error("MAILTM ERROR:", error);

    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
