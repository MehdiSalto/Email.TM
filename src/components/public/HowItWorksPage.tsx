import PublicPage from "./PublicPage";

const steps = [
  {
    title: "1. Create a temporary email",
    text:
      "Start by creating a temporary email address from the Email.TM interface. No traditional account or login is required.",
  },
  {
    title: "2. Choose the email lifetime",
    text:
      "Select one of the available durations when creating your temporary email. The selected lifetime determines how long the address is intended to remain available.",
  },
  {
    title: "3. Copy your email address",
    text:
      "Copy the generated temporary email address and use it wherever you need to receive a short-term email.",
  },
  {
    title: "4. Receive an email",
    text:
      "When someone sends a message to your temporary address, it can appear in your Email.TM inbox while the address is active.",
  },
  {
    title: "5. Open your inbox",
    text:
      "Open the inbox associated with your temporary email to check received messages. You can refresh the inbox to check for new messages.",
  },
{
  title: "6. The temporary email expires",
  text:
    "When the selected lifetime has passed, the temporary email is considered expired. Email.TM removes the associated temporary email record from its application database, and the inbox may no longer be available through Email.TM.",
},
];

export default function HowItWorksPage() {
  return (
    <PublicPage
      title="How Email.TM Works"
      description="Learn how to create and use a temporary email address with Email.TM."
    >
      <div
        style={{
          display: "grid",
          gap: "24px",
        }}
      >
        {steps.map((step) => (
          <section key={step.title}>
            <h2
              style={{
                fontSize: "21px",
                lineHeight: 1.4,
                marginBottom: "8px",
              }}
            >
              {step.title}
            </h2>

            <p style={{ margin: 0 }}>
              {step.text}
            </p>
          </section>
        ))}
      </div>

      <section style={{ marginTop: "36px" }}>
        <h2>Important limitation</h2>

        <p>
          Temporary email is intended for short-term use. It should not be
          relied on for important accounts, financial services, password
          recovery, or other situations where you may need permanent access
          to the email address.
        </p>
      </section>
    </PublicPage>
  );
}
