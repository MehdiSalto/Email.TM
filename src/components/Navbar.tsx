import { useLanguage } from "../language";
import { useTheme } from "../theme";
import { LANGUAGES } from "../i18n";
import type { LanguageCode } from "../types";
import Button from "@cloudscape-design/components/button";
import Select from "@cloudscape-design/components/select";
import Toggle from "@cloudscape-design/components/toggle";
import Icon from "@cloudscape-design/components/icon";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { mode, toggle } = useTheme();

  const langOptions = LANGUAGES.map((l) => ({
    label: l.label,
    value: l.code,
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
          <Select
            selectedOption={
              langOptions.find((o) => o.value === lang) ?? langOptions[0]
            }
            onChange={({ detail }) =>
              setLang(detail.selectedOption.value as LanguageCode)
            }
            options={langOptions}
            ariaLabel={t("language")}
            expandToViewport
            triggerVariant="option"
          />
          <Toggle
            onChange={toggle}
            checked={mode === "dark"}
            ariaLabel={mode === "dark" ? t("darkMode") : t("lightMode")}
          />
          <Icon name="light-dark" />
        </div>
      </div>
    </div>
  );
}
