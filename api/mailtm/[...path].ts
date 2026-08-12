import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAIL_TM_BASE = "https://api.mail.tm";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Vercel catch-all route:
    // /api/mailtm/domains?page=1
    // path = ["domains"]
    const pathParam = req.query.path;

    let path = "";

    if (Array.isArray(pathParam)) {
      path = pathParam.join("/");
    } else if (typeof pathParam === "string") {
      path = pathParam;
    }

    if (!path) {
      return res.status(400).json({
        error: "Missing path",
        query: req.query,
        url: req.url,
      });
    }

    const queryString = new URLSearchParams();

    for (const [key, value] of Object.entries(req.query)) {
      if (key === "path") continue;

      if (Array.isArray(value)) {
        for (const item of value) {
          queryString.append(key, item);
        }
      } else if (value !== undefined) {
        queryString.set(key, value);
      }
    }

    const query = queryString.toString();

    const targetUrl =
      `${MAIL_TM_BASE}/${path}` + (query ? `?${query}` : "");

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    if (req.headers["content-type"]) {
      headers["Content-Type"] = req.headers["content-type"];
    }

    const options: RequestInit = {
      method: req.method || "GET",
      headers,
    };

    if (
      req.method !== "GET" &&
      req.method !== "HEAD" &&
      req.body !== undefined
    ) {
      if (typeof req.body === "string") {
        options.body = req.body;
      } else {
        options.body = JSON.stringify(req.body);
      }
    }

    console.log("Mail.tm proxy:", {
      method: req.method,
      path,
      targetUrl,
    });

    const response = await fetch(targetUrl, options);

    const contentType =
      response.headers.get("content-type") || "application/json";

    const body = await response.arrayBuffer();

    res.status(response.status);
    res.setHeader("Content-Type", contentType);

    return res.send(Buffer.from(body));
  } catch (error) {
    console.error("Mail.tm proxy error:", error);

    return res.status(502).json({
      error: "Mail.tm proxy failed",
      message:
        error instanceof Error ? error.message : String(error),
    });
  }
}
