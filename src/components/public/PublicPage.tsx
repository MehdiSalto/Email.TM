import type { ReactNode } from "react";

interface PublicPageProps {
  title: string;
  description?: string;
  children: ReactNode;
  language?: "en" | "ar";
}

export default function PublicPage({
  title,
  description,
  children,
  language = "en",
}: PublicPageProps) {
  return (
    <main
      className="public-page"
      lang={language}
      dir={language === "ar" ? "rtl" : "ltr"}
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "32px 20px 64px",
        lineHeight: 1.7,
      }}
    >
      <header style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            lineHeight: 1.2,
            marginBottom: "12px",
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              margin: 0,
              fontSize: "17px",
              opacity: 0.75,
              maxWidth: "720px",
            }}
          >
            {description}
          </p>
        )}
      </header>

      <div>{children}</div>
    </main>
  );
}
