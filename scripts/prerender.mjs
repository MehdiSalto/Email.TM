import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createServer } from "vite";

// Build-time HTML only: no server runtime, mail API, or database changes.
const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { staticPages } = await server.ssrLoadModule("/src/prerender.tsx");
  const pages = staticPages();
  const template = await readFile(resolve("dist/index.html"), "utf8");
  const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  for (const page of pages) {
    let html = template.replace('<html lang="en">', `<html lang="${page.language}" dir="${page.language === "ar" ? "rtl" : "ltr"}">`);
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`);
    for (const [attribute, key, value] of [
      ["name", "description", page.description], ["name", "robots", page.indexable ? "index, follow" : "noindex, follow"],
      ["property", "og:title", page.title], ["property", "og:description", page.description],
      ["property", "og:type", page.schema ? "article" : "website"],
      ["name", "twitter:title", page.title], ["name", "twitter:description", page.description],
    ]) {
      const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[\\s\\S]*?\\/>`);
      html = html.replace(pattern, `<meta ${attribute}="${key}" content="${escape(value)}" />`);
    }
    const metadata = `<link rel="canonical" href="${page.canonical}" /><meta property="og:url" content="${page.canonical}" />`
      + page.alternates.map((alternate) => `<link rel="alternate" hreflang="${alternate.language}" href="${alternate.href}" />`).join("")
      + (page.schema ? `<script id="article-schema" type="application/ld+json">${JSON.stringify(page.schema).replaceAll("<", "\\u003c")}</script>` : "");
    html = html.replace("</head>", metadata + "</head>");
    html = html.replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);
    const output = resolve("dist", page.path === "/" ? "index.html" : page.path.slice(1) + ".html");
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
  }
  const urls = pages.filter((page) => page.indexable).map((page) => `  <url><loc>${escape(page.canonical)}</loc>${page.slug ? "<lastmod>2026-10-11</lastmod>" : ""}</url>`).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(resolve("dist/sitemap.xml"), sitemap);
  console.log(`Generated ${pages.length} static HTML pages, including 4 original articles in English and Arabic.`);
} finally {
  await server.close();
}
