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
  try {
    // CORS
    if (req.method === "OPTIONS") {
      Object.entries(CORS_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
      });

      return res.status(204).end();
    }

    /*
     * Vercel catch-all:
     * /api/mailtm/domains
     *
     * gives:
     * req.query["...path"] = "domains"
     */
    const rawPath = req.query["...path"];

    let path = "";

    if (Array.isArray(rawPath)) {
      path = rawPath.join("/");
    } else if (typeof rawPath === "string") {
      path = rawPath;
    }

    // Fallback for local/dev environments
    if (!path && req.url) {
      const pathname = req.url.split("?")[0];
      const prefix = "/api/mailtm/";

      if (pathname.startsWith(prefix)) {
        path = pathname.slice(prefix.length);
      }
    }

    if (!path) {
      Object.entries(CORS_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
      });

      return res.status(400).json({
        error: "Missing path",
        query: req.query,
        url: req.url,
      });
    }

    // Build upstream URL
    const upstreamUrl = new URL(
      `${MAIL_TM_BASE}/${path}`
    );

    // Forward query parameters except Vercel's catch-all parameter
    for (const [key, value] of Object.entries(req.query)) {
      if (key === "...path") continue;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          upstreamUrl.searchParams.append(key, v);
        });
      } else if (typeof value === "string") {
        upstreamUrl.searchParams.set(key, value);
      }
    }

    const method = req.method || "GET";

    const headers = new Headers();

    headers.set("Accept", "application/json");

    if (req.headers["content-type"]) {
      headers.set(
        "Content-Type",
        req.headers["content-type"]
      );
    }

    if (req.headers["authorization"]) {
      headers.set(
        "Authorization",
        req.headers["authorization"] as string
      );
    }

    if (
      method !== "GET" &&
      method !== "HEAD" &&
      !headers.has("Content-Type")
    ) {
      headers.set("Content-Type", "application/json");
    }

    const init: RequestInit = {
      method,
      headers,
    };

    // Forward body
    if (method !== "GET" && method !== "HEAD") {
      if (req.body !== undefined && req.body !== null) {
        if (typeof req.body === "string") {
          init.body = req.body;
        } else {
          init.body = JSON.stringify(req.body);
        }
      }
    }

    console.log(
      `[mailtm-proxy] ${method} ${upstreamUrl.toString()}`
    );

    const upstream = await fetch(upstreamUrl.toString(), init);

    const contentType =
      upstream.headers.get("content-type") ||
      "application/json";

    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    res.status(upstream.status);

    if (contentType.includes("json")) {
      const data = await upstream.json();
      return res.json(data);
    }

    const buffer = Buffer.from(
      await upstream.arrayBuffer()
    );

    res.setHeader("Content-Type", contentType);

    return res.send(buffer);
  } catch (error) {
    console.error("[mailtm-proxy] ERROR:", error);

    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(502).json({
      error: "Mail.tm proxy failed",
      message:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
}
