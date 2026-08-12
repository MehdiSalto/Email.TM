import Icon from "@cloudscape-design/components/icon";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border-divider-default, #e9ebed)",
        marginTop: "40px",
        padding: "28px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: 700,
              marginBottom: "6px",
            }}
          >
            <Icon name="envelope" size="small" />
            Email Time
          </div>

          <div style={{ fontSize: "13px", opacity: 0.7 }}>
            Free temporary email — no sign-up, no login
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
            fontSize: "14px",
          }}
        >
          <a href="#/about">About</a>
          <a href="#/contact">Contact</a>
          <a href="#/privacy-policy">Privacy Policy</a>
          <a href="#/terms">Terms of Service</a>
        </nav>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "20px auto 0",
          paddingTop: "16px",
          borderTop:
            "1px solid var(--color-border-divider-default, #e9ebed)",
          textAlign: "center",
          fontSize: "12px",
          opacity: 0.6,
        }}
      >
        © {new Date().getFullYear()} Email Time. All rights reserved.
      </div>
    </footer>
  );
}
