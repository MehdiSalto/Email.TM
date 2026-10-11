import { useLanguage } from "../language";
import { useTheme } from "../theme";
import { LANGUAGES } from "../i18n";
import type { LanguageCode } from "../types";
import { articlePath, normalizePath } from "../routing";
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

  const navLinks = [
    { href: "/", label: t("navHome") },
    { href: "/how-it-works", label: t("navHowItWorks") },
    { href: "/faq", label: t("navFaq") },
    { href: "/guides", label: t("navGuides") },
    { href: articlePath(undefined, lang === "ar" ? "ar" : "en"), label: t("navArticles") },
    { href: "/about", label: t("navAbout") },
  ];

  return (
    <>
      <style>
        {`
          .emailtm-navbar {
            border-bottom: 1px solid var(--color-border-divider-default, #e9ebed);
          }

          .emailtm-navbar-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 20px;
            gap: 16px;
          }

          .emailtm-navbar-brand {
            flex-shrink: 0;
          }

          .emailtm-navbar-links {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
          }

          .emailtm-navbar-link {
          position: relative;
          color: inherit;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0.85;
          padding: 8px 0;
          transition:
          color 0.2s ease,
          opacity 0.2s ease;
          }
          
          
.emailtm-navbar-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--et-accent);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
}

          .emailtm-navbar-link:hover {
            color: var(--et-accent);
            opacity: 1;
            text-shadow: 0 0 10px rgba(10, 132, 255, 0.25);
          }

.emailtm-navbar-link:hover::after {
  transform: scaleX(1);
}

.emailtm-navbar-link.active {
  color: var(--et-accent);
  opacity: 1;
}

.emailtm-navbar-link.active::after {
  transform: scaleX(1);
}

          .emailtm-navbar-controls {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
          }

          @media (max-width: 900px) {
            .emailtm-navbar-inner {
              flex-wrap: wrap;
            }

            .emailtm-navbar-brand {
              flex: 1;
            }

            .emailtm-navbar-links {
              order: 3;
              width: 100%;
              justify-content: center;
              padding-top: 4px;
            }
          }

          @media (max-width: 560px) {
            .emailtm-navbar-inner {
              padding: 10px 14px;
              gap: 10px;
            }

            .emailtm-navbar-brand span {
              font-size: 15px !important;
            }

            .emailtm-navbar-links {
              gap: 12px;
              overflow-x: auto;
              justify-content: flex-start;
              padding-bottom: 3px;
              scrollbar-width: none;
            }

            .emailtm-navbar-links::-webkit-scrollbar {
              display: none;
            }

            .emailtm-navbar-link {
              font-size: 13px;
            }

            .emailtm-navbar-controls {
              gap: 7px;
            }
          }
        `}
      </style>

      <div className="emailtm-navbar">
        <div className="emailtm-navbar-inner">
          {/* Brand */}
          <a
            href="/"
            className="emailtm-navbar-brand"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: "var(--et-accent)",
            }}
          >
            <span style={{ color: "var(--et-accent)", display: "flex" }}>
                  <Icon name="envelope" size="medium" />
            </span>

            <span
              style={{
                fontWeight: 700,
                fontSize: "18px",
                whiteSpace: "nowrap",
              }}
            >
              {t("siteName")} · {t("siteNameAr")}
            </span>
          </a>

          {/* Navigation */}
          <nav
            className="emailtm-navbar-links"
            aria-label="Main navigation"
          >
{navLinks.map((link) => (
  <a
    key={link.href}
    href={link.href}
    className={`emailtm-navbar-link ${
      (link.href.endsWith("/articles") ? normalizePath(window.location.pathname).startsWith(link.href) : normalizePath(window.location.pathname) === link.href) ? "active" : ""
    }`}
    aria-current={(link.href.endsWith("/articles") ? normalizePath(window.location.pathname).startsWith(link.href) : normalizePath(window.location.pathname) === link.href) ? "page" : undefined}
  >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="emailtm-navbar-controls">
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
    </>
  );
}
