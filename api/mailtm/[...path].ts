import type { VercelRequest, VercelResponse } from "@vercel/node";

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

  console.log("MAILTM DEBUG", {
    method: req.method,
    url: req.url,
    query: req.query,
  });

  return res.status(200).json({
    ok: true,
    method: req.method,
    url: req.url,
    query: req.query,
    path: req.query["...path"],
  });
}
