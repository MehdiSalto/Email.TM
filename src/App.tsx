import { useEffect, useState } from "react";
import { LanguageProvider, useLanguage } from "./language";
import { ThemeProvider } from "./theme";
import { updateSeo } from "./seo";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CreateEmail from "./components/CreateEmail";
import InboxPage from "./components/InboxPage";
import AboutPage from "./components/public/AboutPage";
import PrivacyPolicyPage from "./components/public/PrivacyPolicyPage";
import TermsPage from "./components/public/TermsPage";
import ContactPage from "./components/public/ContactPage";
import FAQPage from "./components/public/FAQPage";
import HowItWorksPage from "./components/public/HowItWorksPage";
import WhatIsTemporaryEmailPage from "./components/public/WhatIsTemporaryEmailPage";
import GuidesPage from "./components/public/GuidesPage";
import Footer from "./components/Footer";
import AppLayout from "@cloudscape-design/components/app-layout";
import Box from "@cloudscape-design/components/box";
import type { EmailRecord } from "./types";

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

function AppShell() {
  const { lang } = useLanguage();
  const [route, setRoute] = useState<Route>(parseHash);
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
  const page =
    route.name === "dashboard"
      ? "home"
      : route.name === "about"
        ? "about"
        : route.name === "contact"
          ? "contact"
          : route.name === "privacy"
            ? "privacy"
            : route.name === "terms"
              ? "terms"
              : route.name === "faq"
                ? "faq"
                : route.name === "how-it-works"
                  ? "howItWorks"
                  : route.name === "what-is-temporary-email"
                    ? "whatIsTemporaryEmail"
                    : route.name === "guides"
                      ? "guides"
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
      <Navbar />
      <AppLayout
        contentType="default"
        navigationHide
        toolsHide
        content={
          <Box padding={{ bottom: "xl" }}>
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
          </Box>
        }
      />
      <Footer />
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
