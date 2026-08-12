import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAIL_TM_BASE = "https://api.mail.tm";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value);
    }

    return res.status(204).end();
  }

  /*
   * Vercel catch-all routes can expose the parameter as:
   *   path
   * or:
   *   ...path
   */
  const rawPath =
    req.query.path ??
    req.query["...path"];

  let path = "";

  if (Array.isArray(rawPath)) {
    path = rawPath.join("/");
  } else if (typeof rawPath === "string") {
    path = rawPath;
  }

  path = path.replace(/^\/+|\/+$/g, "");

  if (!path) {
    return res.status(400).json({
      error: "Missing path",
      query: req.query,
      url: req.url,
    });
  }

  /*
   * Build query parameters from req.query.
   * Remove the catch-all route parameter itself.
   */
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(req.query)) {
    if (key === "path" || key === "...path") {
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

  const queryString = searchParams.toString();

  const url =
    `${MAIL_TM_BASE}/${path}` +
    (queryString ? `?${queryString}` : "");

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

  const init: RequestInit = {
    method,
    headers: new Headers(headers),
  };

  // Forward request body
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

  try {
    console.log("Mail.tm proxy request:", {
      method,
      url,
      path,
    });

    const upstream = await fetch(url, init);

    const contentType =
      upstream.headers.get("content-type") ||
      "application/json";

    res.status(upstream.status);

    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value);
    }

    res.setHeader("Content-Type", contentType);

    if (contentType.includes("application/json")) {
      const data = await upstream.json();
      return res.send(data);
    }

    const buffer = Buffer.from(
      await upstream.arrayBuffer()
    );

    return res.send(buffer);
  } catch (err) {
    console.error("Mail.tm proxy error:", err);

    const message =
      err instanceof Error
        ? err.message
        : "Upstream request failed";

    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value);
    }

    return res.status(502).json({
      error: message,
    });
  }
}
