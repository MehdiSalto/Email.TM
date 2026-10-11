export const publicPaths = [
  "/", "/about", "/contact", "/privacy-policy", "/terms", "/faq",
  "/how-it-works", "/what-is-temporary-email", "/guides", "/articles",
] as const;

export function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

export function articleLanguage(path: string): "en" | "ar" {
  return path.startsWith("/ar/articles") ? "ar" : "en";
}

export function articlePath(slug?: string, language: "en" | "ar" = "en"): string {
  return `${language === "ar" ? "/ar" : ""}/articles${slug ? `/${slug}` : ""}`;
}

export function legacyPath(hash: string): string | null {
  if (!hash.startsWith("#/")) return null;
  return normalizePath(hash.slice(1));
}
