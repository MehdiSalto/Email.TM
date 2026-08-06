import { useState } from "react";
import { useLanguage } from "../language";
import { useTheme } from "../theme";
import { LANGUAGES } from "../i18n";
import type { LanguageCode } from "../types";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import Toggle from "@cloudscape-design/components/toggle";
import Icon from "@cloudscape-design/components/icon";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { mode, toggle } = useTheme();

  const langItems = LANGUAGES.map((l) => ({
    id: l.code,
    text: l.label,
    iconName: l.code === "ar" ? undefined : undefined,
  }));

  return (
    <div style={{ borderBottom: "1px solid var(--color-border-divider-default, #e9ebed)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <a
          href="#/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Icon name="envelope" size="medium" />
          <span style={{ fontWeight: 700, fontSize: "18px" }}>
            {t("siteName")} · {t("siteNameAr")}
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ButtonDropdown
            items={langItems}
            onItemClick={({ detail }) =>
              setLang(detail.id as LanguageCode)
            }
            variant="inline-icon"
            iconName="globe"
            ariaLabel={t("language")}
          >
            {LANGUAGES.find((l) => l.code === lang)?.label ?? "English"}
          </ButtonDropdown>
          <Toggle
            onChange={toggle}
            checked={mode === "dark"}
            ariaLabel={mode === "dark" ? t("darkMode") : t("lightMode")}
          />
          <Icon
            name={mode === "dark" ? "light-dark" : "light-dark"}
          />
        </div>
      </div>
    </div>
  );
}
