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
  // CORS headers
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    // Vercel catch-all parameter
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

    // Build query parameters
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(req.query)) {
      if (key === "...path") {
        continue;
      }

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
      `${MAIL_TM_BASE}/${path}` +
      (query ? `?${query}` : "");

    const method = req.method || "GET";

    // Request headers
    const headers: Record<string, string> = {
      Accept: "application/json",
      "User-Agent": "EmailTM/1.0",
    };

    const authorization = req.headers.authorization;
    const contentType = req.headers["content-type"];

    if (authorization) {
      headers.Authorization = authorization;
    }

    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    const init: RequestInit = {
      method,
      headers,
    };

    // Forward request body for POST/PUT/PATCH/etc.
    if (method !== "GET" && method !== "HEAD") {
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

    console.log("Mail.tm proxy request:", {
      method,
      targetUrl,
    });

    // Request Mail.tm
    const upstream = await fetch(targetUrl, init);

    // Read response
    const responseBody = await upstream.text();

    console.log("Mail.tm proxy response:", {
      status: upstream.status,
      contentType: upstream.headers.get("content-type"),
      bodyLength: responseBody.length,
    });

    // Return Mail.tm status
    res.status(upstream.status);

    // Preserve content type
    const upstreamContentType =
      upstream.headers.get("content-type") ||
      "application/json; charset=utf-8";

    res.setHeader("Content-Type", upstreamContentType);

    return res.send(responseBody);
  } catch (error) {
    console.error("Mail.tm proxy exception:", error);

    return res.status(502).json({
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
}
