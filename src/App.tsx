import { useEffect, useState, Suspense, lazy } from "react";
import { LanguageProvider, useLanguage } from "./language";
import { ThemeProvider } from "./theme";
import { updateSeo } from "./seo";
import { articleLanguage, legacyPath, normalizePath } from "./routing";
import type { EmailRecord } from "./types";
import AppLayout from "@cloudscape-design/components/app-layout";
import Box from "@cloudscape-design/components/box";

const Navbar = lazy(() => import("./components/Navbar"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const CreateEmail = lazy(() => import("./components/CreateEmail"));
const InboxPage = lazy(() => import("./components/InboxPage"));
const AboutPage = lazy(() => import("./components/public/AboutPage"));
const PrivacyPolicyPage = lazy(() => import("./components/public/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./components/public/TermsPage"));
const ContactPage = lazy(() => import("./components/public/ContactPage"));
const FAQPage = lazy(() => import("./components/public/FAQPage"));
const HowItWorksPage = lazy(() => import("./components/public/HowItWorksPage"));
const WhatIsTemporaryEmailPage = lazy(() => import("./components/public/WhatIsTemporaryEmailPage"));
const GuidesPage = lazy(() => import("./components/public/GuidesPage"));
const ArticlesPage = lazy(() => import("./components/public/ArticlesPage"));
const ArticlePage = lazy(() => import("./components/public/ArticlePage"));
const NotFoundPage = lazy(() => import("./components/public/NotFoundPage"));
const Footer = lazy(() => import("./components/Footer"));

function currentPath() {
  return legacyPath(window.location.hash) ?? normalizePath(window.location.pathname);
}

function LoadingFallback() {
  const { lang } = useLanguage();
  return <Box padding="l" textAlign="center"><span role="status">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</span></Box>;
}

function AppShell() {
  const { lang } = useLanguage();
  const [path, setPath] = useState(currentPath);
  const [refreshKey, setRefreshKey] = useState(0);
  const articleMatch = path.match(/^\/(?:ar\/)?articles\/([^/]+)$/);
  const inboxMatch = path.match(/^\/inbox\/([^/]+)$/);
  const isArticleList = path === "/articles" || path === "/ar/articles";
  const page = path === "/" ? "home"
    : path === "/privacy-policy" ? "privacy"
    : path === "/how-it-works" ? "howItWorks"
    : path === "/what-is-temporary-email" ? "whatIsTemporaryEmail"
    : isArticleList ? "articles"
    : articleMatch ? "article"
    : path.slice(1);

  useEffect(() => {
    updateSeo(page, isArticleList || articleMatch ? articleLanguage(path) : lang, path, articleMatch?.[1]);
  }, [path, lang]);

  useEffect(() => {
    const syncLocation = () => {
      const oldPath = legacyPath(window.location.hash);
      if (oldPath) window.history.replaceState(null, "", oldPath + window.location.search);
      setPath(currentPath());
    };
    syncLocation();
    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);
    return () => {
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
    };
  }, []);

  const navigate = (nextPath: string) => {
    window.history.pushState(null, "", nextPath);
    setPath(nextPath);
    window.scrollTo(0, 0);
  };
  const handleCreated = (email: EmailRecord) => {
    setRefreshKey((key) => key + 1);
    navigate("/inbox/" + email.id);
  };
  const knownPage = ["/", "/create", "/about", "/contact", "/privacy-policy", "/terms", "/faq", "/how-it-works", "/what-is-temporary-email", "/guides"].includes(path) || isArticleList || articleMatch || inboxMatch;

  return (
    <>
      <a className="skip-link" href="#main-content">{lang === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <Suspense fallback={<LoadingFallback />}><Navbar /></Suspense>
      <AppLayout contentType="default" navigationHide toolsHide content={
        <div id="main-content" tabIndex={-1}>
          <Box padding={{ bottom: "xl" }}>
            <Suspense fallback={<LoadingFallback />}>
              {path === "/" && <Dashboard onOpenInbox={(id) => navigate("/inbox/" + id)} onCreate={() => navigate("/create")} refreshKey={refreshKey} />}
              {path === "/create" && <CreateEmail onCreated={handleCreated} />}
              {path === "/about" && <AboutPage />}
              {path === "/contact" && <ContactPage />}
              {path === "/privacy-policy" && <PrivacyPolicyPage />}
              {path === "/terms" && <TermsPage />}
              {path === "/faq" && <FAQPage />}
              {path === "/how-it-works" && <HowItWorksPage />}
              {path === "/what-is-temporary-email" && <WhatIsTemporaryEmailPage />}
              {path === "/guides" && <GuidesPage />}
              {isArticleList && <ArticlesPage language={articleLanguage(path)} />}
              {articleMatch && <ArticlePage slug={articleMatch[1]} language={articleLanguage(path)} />}
              {inboxMatch && <InboxPage emailId={inboxMatch[1]} onBack={() => navigate("/")} />}
              {!knownPage && <NotFoundPage />}
            </Suspense>
          </Box>
        </div>
      } />
      <Suspense fallback={<LoadingFallback />}><Footer /></Suspense>
    </>
  );
}

export default function App() {
  return <ThemeProvider><LanguageProvider><AppShell /></LanguageProvider></ThemeProvider>;
}
