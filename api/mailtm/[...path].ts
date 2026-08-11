import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAIL_TM_BASE = "https://api.mail.tm";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value);
    }
    return res.status(200).end();
  }

  const pathParam = req.query.path;
  const path = Array.isArray(pathParam) ? pathParam.join("/") : pathParam || "";
  if (!path) {
    return res.status(400).json({ error: "Missing path" });
  }

  const url = `${MAIL_TM_BASE}/${path}`;
  const method = req.method || "GET";

  const headers: Record<string, string> = { Accept: "application/json" };
  if (req.headers["content-type"]) {
    headers["Content-Type"] = req.headers["content-type"];
  }
  if (req.headers["authorization"]) {
    headers["Authorization"] = req.headers["authorization"] as string;
  }

  if (method !== "GET" && method !== "HEAD" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const init: RequestInit = { method, headers: new Headers(headers) };

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
    const upstream = await fetch(url, init);
    const contentType = upstream.headers.get("content-type") || "";

    res.status(upstream.status);
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value);
    }
    res.setHeader("Content-Type", contentType || "application/json");

    if (contentType.includes("application/json")) {
      const data = await upstream.json();
      return res.send(data);
    } else {
      const buffer = Buffer.from(await upstream.arrayBuffer());
      return res.send(buffer);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream request failed";
    return res.status(502).json({ error: message });
  }
}
