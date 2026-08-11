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
  try {
    // CORS
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.setHeader(key, value);
    }

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // Get path from Vercel request URL
    const requestUrl = req.url || "";

    const parsedUrl = new URL(
      requestUrl,
      "https://email-tm.vercel.app"
    );

    const prefix = "/api/mailtm/";

    if (!parsedUrl.pathname.startsWith(prefix)) {
      return res.status(400).json({
        error: "Invalid path",
        requestUrl,
        pathname: parsedUrl.pathname,
      });
    }

    const path = parsedUrl.pathname.slice(prefix.length);

    if (!path) {
      return res.status(400).json({
        error: "Missing path",
        requestUrl,
        pathname: parsedUrl.pathname,
      });
    }

    const targetUrl =
      `${MAIL_TM_BASE}/${path}${parsedUrl.search}`;

    // Headers
    const headers = new Headers();

    headers.set("Accept", "application/json");

    const contentType = req.headers["content-type"];

    if (contentType) {
      headers.set(
        "Content-Type",
        Array.isArray(contentType) ? contentType[0] : contentType
      );
    }

    const authorization = req.headers["authorization"];

    if (authorization) {
      headers.set(
        "Authorization",
        Array.isArray(authorization)
          ? authorization[0]
          : authorization
      );
    }

    const method = req.method || "GET";

    // Request options
    const options: RequestInit = {
      method,
      headers,
    };

    if (method !== "GET" && method !== "HEAD") {
      if (req.body !== undefined && req.body !== null) {
        if (typeof req.body === "string") {
          options.body = req.body;
        } else {
          options.body = JSON.stringify(req.body);
        }
      }
    }

    console.log("Mail.tm proxy request:", {
      method,
      targetUrl,
    });

    // Call Mail.tm
    const upstream = await fetch(targetUrl, options);

    const responseText = await upstream.text();

    console.log("Mail.tm response:", {
      status: upstream.status,
      contentType: upstream.headers.get("content-type"),
    });

    res.status(upstream.status);

    const upstreamContentType =
      upstream.headers.get("content-type");

    if (upstreamContentType) {
      res.setHeader("Content-Type", upstreamContentType);
    }

    return res.send(responseText);
  } catch (error) {
    console.error("Mail.tm proxy error:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return res.status(500).json({
      error: "Mail.tm proxy failed",
      message,
    });
  }
}
