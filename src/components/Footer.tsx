import { useLanguage } from "../language";
import Icon from "@cloudscape-design/components/icon";
import { articlePath } from "../routing";

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <>
      <style>
        {`
          .emailtm-footer-link {
            color: inherit;
            text-decoration: none;
            font-size: 15px;
            opacity: 0.82;
            transition:
              color 0.2s ease,
              opacity 0.2s ease,
              transform 0.2s ease;
            display: inline-block;
          }

          .emailtm-footer-link:hover {
            color: var(--et-accent);
            opacity: 1;
            transform: translateX(3px);
          }

          .emailtm-footer-heading {
            color: var(--et-accent);
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 16px;
          }

          @media (max-width: 760px) {
            .emailtm-footer-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 32px !important;
            }

            .emailtm-footer-brand {
              grid-column: 1 / -1;
            }
          }

          @media (max-width: 480px) {
            .emailtm-footer-grid {
              grid-template-columns: 1fr !important;
              gap: 28px !important;
            }

            .emailtm-footer-brand {
              grid-column: auto;
            }

            .emailtm-footer {
              padding-left: 18px !important;
              padding-right: 18px !important;
            }
          }
        `}
      </style>

      <footer
        className="emailtm-footer"
        style={{
          borderTop:
            "1px solid var(--color-border-divider-default, #2a2f3a)",
          marginTop: "60px",
          padding: "48px 20px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            className="emailtm-footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(260px, 1.8fr) repeat(3, minmax(120px, 1fr))",
              gap: "40px",
              alignItems: "start",
            }}
          >
            {/* Brand */}
            <div className="emailtm-footer-brand">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontWeight: 700,
                  fontSize: "21px",
                  marginBottom: "14px",
                }}
              >
                <span style={{ color: "var(--et-accent)", display: "flex" }}>
                      <Icon name="envelope" size="small" />
                </span>

                <span>
                  {t("siteName")} · {t("siteNameAr")}
                </span>
              </div>

              <div
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  opacity: 0.68,
                  maxWidth: "320px",
                }}
              >
                {t("tagline")}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="emailtm-footer-heading">
                {t("footerQuickLinks")}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "11px",
                }}
              >
                <a className="emailtm-footer-link" href="/">
                  {t("navHome")}
                </a>

                <a
                  className="emailtm-footer-link"
                  href="/how-it-works"
                >
                  {t("navHowItWorks")}
                </a>

                <a className="emailtm-footer-link" href="/faq">
                  {t("navFaq")}
                </a>

                <a className="emailtm-footer-link" href="/guides">
                  {t("navGuides")}
                </a>

                <a className="emailtm-footer-link" href={articlePath(undefined, lang === "ar" ? "ar" : "en")}>
                  {t("navArticles")}
                </a>

                <a className="emailtm-footer-link" href="/about">
                  {t("navAbout")}
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div className="emailtm-footer-heading">
                {t("footerLegal")}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "11px",
                }}
              >
                <a
                  className="emailtm-footer-link"
                  href="/privacy-policy"
                >
                  {t("footerPrivacy")}
                </a>

                <a
                  className="emailtm-footer-link"
                  href="/terms"
                >
                  {t("footerTerms")}
                </a>
              </div>
            </div>

            {/* Support */}
            <div>
              <div className="emailtm-footer-heading">
                {t("footerSupport")}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "11px",
                }}
              >
                <a
                  className="emailtm-footer-link"
                  href="/contact"
                >
                  {t("footerContact")}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div
            style={{
              marginTop: "42px",
              paddingTop: "18px",
              borderTop:
                "1px solid var(--color-border-divider-default, #2a2f3a)",
              textAlign: "center",
              fontSize: "12px",
              opacity: 0.58,
            }}
          >
            © {new Date().getFullYear()} {t("siteName")}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
