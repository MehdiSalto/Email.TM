import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAIL_TM_BASE = "https://api.mail.tm";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }

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

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(req.query)) {
      if (key === "...path") continue;

      if (Array.isArray(value)) {
        for (const item of value) {
          searchParams.append(key, item);
        }
      } else if (typeof value === "string") {
        searchParams.append(key, value);
      }
    }

    const query = searchParams.toString();

    const targetUrl =
      `${MAIL_TM_BASE}/${path}` + (query ? `?${query}` : "");

    const headers: Record<string, string> = {
      Accept: "application/json",
      "User-Agent": "EmailTM/1.0",
    };

    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    if (req.headers["content-type"]) {
      headers["Content-Type"] = req.headers["content-type"];
    }

    const init: RequestInit = {
      method: req.method || "GET",
      headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      if (req.body !== undefined && req.body !== null) {
        if (typeof req.body === "string") {
          init.body = req.body;
        } else if (Buffer.isBuffer(req.body)) {
          init.body = new Uint8Array(req.body);
        } else {
          init.body = JSON.stringify(req.body);
        }
      }
    }

    console.log("MAILTM TARGET:", targetUrl);

    const upstream = await fetch(targetUrl, init);

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
    console.error("MAILTM PROXY ERROR:", error);

    return res.status(502).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
