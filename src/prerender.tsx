import { renderToStaticMarkup } from "react-dom/server";
import AboutPage from "./components/public/AboutPage";
import ContactPage from "./components/public/ContactPage";
import PrivacyPolicyPage from "./components/public/PrivacyPolicyPage";
import TermsPage from "./components/public/TermsPage";
import FAQPage from "./components/public/FAQPage";
import HowItWorksPage from "./components/public/HowItWorksPage";
import WhatIsTemporaryEmailPage from "./components/public/WhatIsTemporaryEmailPage";
import GuidesPage from "./components/public/GuidesPage";
import ArticlesPage from "./components/public/ArticlesPage";
import ArticlePage from "./components/public/ArticlePage";
import HomeArticles from "./components/public/HomeArticles";
import NotFoundPage from "./components/public/NotFoundPage";
import PublicPage from "./components/public/PublicPage";
import { articles } from "./content/articles";
import { articlePath } from "./routing";
import { articleSchema, getSeoData, isIndexable, SITE_URL } from "./seo";
import type { ReactNode } from "react";

function StaticFrame({ children, language = "en" }: { children: ReactNode; language?: "en" | "ar" }) {
  const ar = language === "ar";
  return <>
    <a className="skip-link" href="#main-content">{ar ? "انتقل إلى المحتوى" : "Skip to content"}</a>
    <header className="static-nav"><a className="static-nav-brand" href="/">Email Time · إيميل تايم</a>
      <nav aria-label={ar ? "القائمة الرئيسية" : "Main navigation"}>
        <a href="/">{ar ? "الرئيسية" : "Home"}</a><a href="/how-it-works">{ar ? "كيف تعمل الخدمة" : "How it works"}</a>
        <a href="/faq">{ar ? "الأسئلة الشائعة" : "FAQ"}</a><a href={articlePath(undefined, language)}>{ar ? "المقالات" : "Articles"}</a><a href="/about">{ar ? "عن الموقع" : "About"}</a>
      </nav>
    </header>
    <div id="main-content">{children}</div>
    <footer className="static-footer"><a href="/contact">{ar ? "تواصل معنا" : "Contact"}</a><a href="/privacy-policy">{ar ? "سياسة الخصوصية" : "Privacy policy"}</a><a href="/terms">{ar ? "شروط الاستخدام" : "Terms of service"}</a><span>© 2026 Email Time</span></footer>
  </>;
}

function StaticHome() {
  return <main className="static-home">
    <h1>Free temporary email</h1>
    <p>Create a disposable email address without registration or login. Choose a lifetime from one hour to one week and use the inbox for a short task. Keep ongoing accounts and recovery messages attached to a permanent address you control.</p>
    <a className="primary-link" href="/create">Create a temporary email</a>
    <HomeArticles />
    <section className="article-endnote"><h2>How it works</h2><ol><li>Choose a mailbox lifetime and generate an address.</li><li>Copy the address and receive messages while it is active.</li><li>Finish your task before expiration and keep inbox share links private.</li></ol><p>Read the <a href="/how-it-works">full walkthrough</a>, <a href="/faq">frequently asked questions</a>, and <a href="/guides">temporary email guides</a>.</p></section>
  </main>;
}

const pages = [
  { path: "/", page: "home", content: <StaticHome /> },
  { path: "/about", page: "about", content: <AboutPage /> },
  { path: "/contact", page: "contact", content: <ContactPage /> },
  { path: "/privacy-policy", page: "privacy", content: <PrivacyPolicyPage /> },
  { path: "/terms", page: "terms", content: <TermsPage /> },
  { path: "/faq", page: "faq", content: <FAQPage /> },
  { path: "/how-it-works", page: "howItWorks", content: <HowItWorksPage /> },
  { path: "/what-is-temporary-email", page: "whatIsTemporaryEmail", content: <WhatIsTemporaryEmailPage /> },
  { path: "/guides", page: "guides", content: <GuidesPage /> },
  { path: "/create", page: "create", content: <PublicPage title="Create a temporary email" description="Choose your mailbox lifetime in the email creation form."><p>The interactive form requires JavaScript. <a href="/how-it-works">Read how the service works</a>.</p></PublicPage> },
  { path: "/app", page: "inbox", content: <PublicPage title="Temporary inbox"><p>The inbox requires JavaScript. <a href="/">Return to Email Time</a>.</p></PublicPage> },
  { path: "/404", page: "notFound", content: <NotFoundPage /> },
];

export function staticPages() {
  const result = pages.map(({ path, page, content }) => ({ path, page, language: "en" as "en" | "ar", slug: undefined as string | undefined, content }));
  for (const language of ["en", "ar"] as const) {
    result.push({ path: articlePath(undefined, language), page: "articles", language, slug: undefined, content: <ArticlesPage language={language} /> });
    for (const article of articles) result.push({ path: articlePath(article.slug, language), page: "article", language, slug: article.slug, content: <ArticlePage slug={article.slug} language={language} /> });
  }
  return result.map(({ content, ...entry }) => ({
    ...entry,
    ...getSeoData(entry.page, entry.language, entry.slug),
    indexable: isIndexable(entry.page, entry.slug),
    canonical: SITE_URL + (isIndexable(entry.page, entry.slug) ? entry.path : "/"),
    schema: entry.slug ? articleSchema(entry.slug, entry.language) : null,
    alternates: entry.page === "article" || entry.page === "articles" ? ["en", "ar"].map((lang) => ({ language: lang, href: SITE_URL + articlePath(entry.slug, lang as "en" | "ar") })) : [],
    html: renderToStaticMarkup(<StaticFrame language={entry.language}>{content}</StaticFrame>),
  }));
}
