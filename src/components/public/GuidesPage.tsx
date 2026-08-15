import PublicPage from "./PublicPage";

const guides = [
  {
    title: "How to Use a Temporary Email",
    paragraphs: [
      "A temporary email can be useful when you need to receive a message for a short-term purpose without using your primary email address.",
      "With Email.TM, create a temporary email address, choose an available lifetime, and copy the generated address. You can then use it when a website or service needs an email address for a temporary activity.",
      "Once a message is sent to the address, open the associated inbox to read it. Remember that the address is temporary, so do not use it for accounts or services that require long-term access.",
    ],
  },
  {
    title: "How to Protect Your Primary Inbox",
    paragraphs: [
      "Your primary email address is often used for important communication, account recovery, and long-term services. Using it everywhere can make it harder to keep your inbox organized.",
      "For short-term situations, a temporary email can provide a separate address for receiving messages without adding those messages directly to your primary inbox.",
      "Temporary email is not a replacement for a secure permanent email account. Use your primary or permanent email whenever you need reliable long-term access.",
    ],
  },
  {
    title: "Temporary Email vs. Regular Email",
    paragraphs: [
      "A regular email address is designed for continued use. It is appropriate for personal communication, important accounts, notifications, and password recovery.",
      "A temporary email address is designed for short-term use and has a limited lifetime. It can be useful when you only need to receive a message for a temporary activity.",
      "The main difference is how long you expect to need the address. If you need the address later, a permanent email account is the safer choice.",
    ],
  },
  {
    title: "When Should You Use a Temporary Email?",
    paragraphs: [
      "Temporary email can be appropriate for legitimate short-term activities such as testing a website, receiving a one-time confirmation message, or trying a service that you do not expect to use regularly.",
      "Before using a temporary address, consider whether you may need the account or messages again in the future. If you might need password recovery or continued access, use a permanent email address instead.",
      "Avoid using temporary email for banking, financial services, important personal accounts, or other services where losing access to the email address could cause problems.",
    ],
  },
  {
    title: "What Happens When a Temporary Email Expires?",
    paragraphs: [
      "A temporary email is designed to remain available only for its selected lifetime. After that period, the address is considered expired.",
      "Email.TM performs cleanup of expired email records. This means you should not rely on an expired address being available later.",
      "For this reason, save anything important before the temporary email expires and never use a temporary address as the only recovery method for an important account.",
    ],
  },
];

export default function GuidesPage() {
  return (
    <PublicPage
      title="Temporary Email Guides"
      description="Practical guides to help you understand and use temporary email responsibly."
    >
      <div
        style={{
          display: "grid",
          gap: "36px",
        }}
      >
        {guides.map((guide) => (
          <article key={guide.title}>
            <h2
              style={{
                fontSize: "23px",
                lineHeight: 1.4,
                marginBottom: "12px",
              }}
            >
              {guide.title}
            </h2>

            {guide.paragraphs.map((paragraph) => (
              <p key={paragraph} style={{ marginBottom: "14px" }}>
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>

      <section style={{ marginTop: "40px" }}>
        <h2>Learn more</h2>

        <p>
          If you are new to temporary email, visit our{" "}
          <a href="#/what-is-temporary-email">
            What Is a Temporary Email?
          </a>{" "}
          page for a detailed explanation.
        </p>

        <p>
          You can also read{" "}
          <a href="#/how-it-works">How Email.TM Works</a> or visit our{" "}
          <a href="#/faq">FAQ</a> for common questions.
        </p>
      </section>
    </PublicPage>
  );
}
