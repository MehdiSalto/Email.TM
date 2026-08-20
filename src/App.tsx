import { useEffect, useState, Suspense, lazy } from "react";
import { LanguageProvider, useLanguage } from "./language";
import { ThemeProvider } from "./theme";
import { updateSeo } from "./seo";
import type { EmailRecord } from "./types";

// ✅ غير هاد الجزء: استعمل lazy للصفحات والمكونات الثقيلة
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
const Footer = lazy(() => import("./components/Footer"));

// ✅ خلي هادو عاديين حيت خفاف ومهمين للـ Layout
import AppLayout from "@cloudscape-design/components/app-layout";
import Box from "@cloudscape-design/components/box";

type Route =
  | { name: "dashboard" }
  | { name: "create" }
  | { name: "about" }
  | { name: "contact" }
  | { name: "privacy" }
  | { name: "terms" }
  | { name: "faq" }
  | { name: "how-it-works" }
  | { name: "what-is-temporary-email" }
  | { name: "guides" }
  | { name: "inbox"; id: string };

function LoadingFallback() {
  const { lang } = useLanguage();
  
  const loadingText = lang === 'ar' ? 'جاري التحميل...' : 'Loading...';
  
  return (
    <Box padding="l" textAlign="center">
      {loadingText}
    </Box>
  );
}

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash.startsWith("inbox/")) {
    const id = hash.replace("inbox/", "");
    if (id) return { name: "inbox", id };
  }
  if (hash === "create") return { name: "create" };
  if (hash === "about") return { name: "about" };
  if (hash === "contact") return { name: "contact" };
  if (hash === "privacy-policy") return { name: "privacy" };
  if (hash === "terms") return { name: "terms" };
  if (hash === "faq") return { name: "faq" };
  if (hash === "how-it-works") return { name: "how-it-works" };
  if (hash === "what-is-temporary-email") {
    return { name: "what-is-temporary-email" };
  }
  if (hash === "guides") return { name: "guides" };
  return { name: "dashboard" };
}

// ✅ زيد مكون صغير للـ Loadin

function AppShell() {
  const { lang } = useLanguage();
  const [route, setRoute] = useState<Route>(parseHash);
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    const page =
      route.name === "dashboard" ? "home"
      : route.name === "about" ? "about"
      : route.name === "contact" ? "contact"
      : route.name === "privacy" ? "privacy"
      : route.name === "terms" ? "terms"
      : route.name === "faq" ? "faq"
      : route.name === "how-it-works" ? "howItWorks"
      : route.name === "what-is-temporary-email" ? "whatIsTemporaryEmail"
      : route.name === "guides" ? "guides"
      : "home";

    updateSeo(page, lang);
  }, [route, lang]);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (hash: string) => {
    window.location.hash = hash;
  };

  const handleCreated = (email: EmailRecord) => {
    setRefreshKey((k) => k + 1);
    navigate(`/inbox/${email.id}`);
  };

  const handleOpenInbox = (id: string) => navigate(`/inbox/${id}`);
  const handleCreate = () => navigate("/create");
  const handleBack = () => navigate("/");

  return (
    <>
      {/* ✅ حط Navbar في Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        <Navbar />
      </Suspense>
      
      <AppLayout
        contentType="default"
        navigationHide
        toolsHide
        content={
          <Box padding={{ bottom: "xl" }}>
            {/* ✅ حط المحتوى كامل في Suspense واحد */}
            <Suspense fallback={<LoadingFallback />}>
              {route.name === "dashboard" && (
                <Dashboard
                  onOpenInbox={handleOpenInbox}
                  onCreate={handleCreate}
                  refreshKey={refreshKey}
                />
              )}
              {route.name === "create" && <CreateEmail onCreated={handleCreated} />}
              {route.name === "about" && <AboutPage />}
              {route.name === "contact" && <ContactPage />}
              {route.name === "privacy" && <PrivacyPolicyPage />}
              {route.name === "terms" && <TermsPage />}
              {route.name === "faq" && <FAQPage />}
              {route.name === "how-it-works" && <HowItWorksPage />}
              {route.name === "what-is-temporary-email" && (
                <WhatIsTemporaryEmailPage />
              )}
              {route.name === "guides" && <GuidesPage />}
              {route.name === "inbox" && (
                <InboxPage emailId={route.id} onBack={handleBack} />
              )}
            </Suspense>
          </Box>
        }
      />
      
      {/* ✅ حط Footer في Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </ThemeProvider>
  );
}
