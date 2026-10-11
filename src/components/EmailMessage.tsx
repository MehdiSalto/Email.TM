import { useMemo } from "react";

// Email markup gets its own opaque origin. Scripts, forms, embeds, and parent navigation are blocked.
export function emailDocument(html: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'none'; img-src https: data:; style-src 'unsafe-inline'; font-src 'none'; connect-src 'none'; form-action 'none'; base-uri 'none'"><meta name="referrer" content="no-referrer"><base target="_blank"><style>body{margin:0;padding:16px;color:#18202b;background:#fff;font:15px/1.65 Arial,sans-serif;overflow-wrap:anywhere}img{max-width:100%;height:auto}table{max-width:100%}pre{white-space:pre-wrap}a{color:#0066c0}</style></head><body>${html}</body></html>`;
}

export default function EmailMessage({ html, title }: { html: string; title: string }) {
  const source = useMemo(() => emailDocument(html), [html]);
  return <iframe className="email-message-frame" title={title} srcDoc={source}
    sandbox="allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" />;
}
