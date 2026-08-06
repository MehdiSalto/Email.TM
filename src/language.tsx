import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.all";
import type { LanguageCode } from "./types";
import { LANGUAGES, t as translate } from "./i18n";

interface LanguageContextValue {
  lang: LanguageCode;
  dir: "ltr" | "rtl";
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "emailtime_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
    } catch {
      // ignore
    }
    return "en";
  });

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang, dir]);

  const setLang = (l: LanguageCode) => setLangState(l);
  const t = (key: string) => translate(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, t }}>
      <I18nProvider locale={lang} messages={[messages]}>
        {children}
      </I18nProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
