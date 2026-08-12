import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAIL_TM_BASE = "https://api.mail.tm";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Vercel catch-all parameter is "...path"
  const rawPath = req.query["...path"];

  let path: string;

  if (Array.isArray(rawPath)) {
    path = rawPath.join("/");
  } else if (typeof rawPath === "string") {
    path = rawPath;
  } else {
    return res.status(400).json({
      error: "Missing path",
      query: req.query,
    });
  }

  if (!path) {
    return res.status(400).json({
      error: "Missing path",
      query: req.query,
    });
  }

  // Build query string from Vercel query parameters
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(req.query)) {
    if (key === "...path") continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    } else if (typeof value === "string") {
      params.append(key, value);
    }
  }

  const queryString = params.toString();
  const url = `${MAIL_TM_BASE}/${path}${
    queryString ? `?${queryString}` : ""
  }`;

  const method = req.method || "GET";

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (req.headers["content-type"]) {
    headers["Content-Type"] = req.headers["content-type"];
  }

  if (req.headers["authorization"]) {
    headers["Authorization"] = req.headers["authorization"] as string;
  }

  if (
    method !== "GET" &&
    method !== "HEAD" &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const init: RequestInit = {
      method,
      headers,
    };

    if (method !== "GET" && method !== "HEAD") {
      if (req.body !== undefined && req.body !== null) {
        if (typeof req.body === "string") {
          init.body = req.body;
        } else {
          init.body = JSON.stringify(req.body);
        }
      }
    }

    const upstream = await fetch(url, init);

    const contentType =
      upstream.headers.get("content-type") ||
      "application/json";

    const text = await upstream.text();

    res.status(upstream.status);
    res.setHeader("Content-Type", contentType);

    return res.send(text);
  } catch (error) {
    console.error("Mail.tm proxy error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Upstream request failed";

    return res.status(502).json({
      error: message,
    });
  }
}
