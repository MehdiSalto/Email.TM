import PublicPage from "./PublicPage";

const faqs = [
  {
    question: "What is a temporary email?",
    answer:
      "A temporary email is a short-term email address that can be used to receive messages without using your primary email address.",
  },
  {
    question: "How do I create a temporary email?",
    answer:
      "Open Email.TM and use the email creation interface to generate a temporary email address. You can choose the available lifetime for the address.",
  },
  {
    question: "How long does my temporary email last?",
    answer:
      "The lifetime depends on the duration you select when creating the temporary email. The available durations are shown in the Email.TM interface.",
  },
  {
    question: "Can I receive emails?",
    answer:
      "Yes. Email.TM provides an inbox for receiving messages sent to your temporary email address while the address is active.",
  },
  {
    question: "Can I send emails from my temporary address?",
    answer:
      "No. The current Email.TM application is designed for receiving emails. It does not provide an email-sending feature.",
  },
  {
    question: "What happens when my temporary email expires?",
    answer:
      "After the selected lifetime has passed, the temporary email is considered expired. The service performs cleanup of expired email records.",
  },
  {
    question: "Can I recover an expired email?",
    answer:
      "You should not rely on recovering an expired temporary email. Temporary addresses are intended for short-term use and expired records are cleaned up by the service.",
  },
  {
    question: "Can someone else access my inbox?",
    answer:
      "Anyone who has access to an active inbox share link may be able to view that inbox and its messages. Do not share an inbox link if the messages contain information you do not want others to see.",
  },
  {
    question: "Should I use a temporary email for important accounts?",
    answer:
      "No. Temporary email is better suited to short-term situations. For important accounts, financial services, password recovery, or services you may need to access later, use a permanent email address.",
  },
  {
    question: "Why didn't I receive an email?",
    answer:
      "There can be several reasons. The sender may not have completed delivery, the message may still be processing, or the temporary address may no longer be active. You can refresh the inbox and check again while the address is still valid.",
  },
  {
    question: "How often does the inbox refresh?",
    answer:
      "The Email.TM inbox can refresh to check for new messages while the temporary email is active.",
  },
  {
    question: "Can I create multiple temporary email addresses?",
    answer:
      "Yes. Email.TM allows you to create temporary email addresses without creating a traditional account.",
  },
];

export default function FAQPage() {
  return (
    <PublicPage
      title="Frequently Asked Questions"
      description="Answers to common questions about Email.TM and temporary email."
    >
      <div
        style={{
          display: "grid",
          gap: "24px",
        }}
      >
        {faqs.map((faq) => (
          <section key={faq.question}>
            <h2
              style={{
                fontSize: "20px",
                lineHeight: 1.4,
                marginBottom: "8px",
              }}
            >
              {faq.question}
            </h2>

            <p style={{ margin: 0 }}>
              {faq.answer}
            </p>
          </section>
        ))}
      </div>
    </PublicPage>
  );
}
