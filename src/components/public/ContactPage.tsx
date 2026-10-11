import PublicPage from "./PublicPage";

const issueUrl = "https://github.com/MehdiSalto/Email.TM/issues/new?title=Website%20feedback";

export default function ContactPage() {
  return <PublicPage title="Contact Email Time" description="Report a website problem, suggest an improvement, or flag an error in an article.">
    <section className="contact-panel">
      <h2>Website support and feedback</h2>
      <p>You can contact the project through its GitHub issue tracker. A GitHub account is required to post, and reports are public. Check existing reports before opening a new one.</p>
      <div className="contact-actions">
        <a className="primary-link" href={issueUrl} target="_blank" rel="noopener noreferrer">Report a problem on GitHub ↗</a>
        <a href="https://github.com/MehdiSalto/Email.TM/issues" target="_blank" rel="noopener noreferrer">View existing reports ↗</a>
      </div>
    </section>
    <section>
      <h2>What to include in a report</h2>
      <ul>
        <li>The page or article where the problem occurred.</li>
        <li>The steps you followed, the expected result, and what appeared instead.</li>
        <li>Your browser, device type, and the approximate time with your timezone.</li>
        <li>A screenshot with personal information and inbox links removed, if it helps explain the issue.</li>
      </ul>
      <p>Do not post passwords, confirmation codes, authentication tokens, private message contents, or an active inbox share link. A valid share link may let others read the mailbox.</p>
    </section>
    <section>
      <h2>Help with receiving a message</h2>
      <p>Start with the <a href="/articles/missing-verification-email">missing confirmation checklist</a>, our <a href="/faq">FAQ</a>, or <a href="/how-it-works">How It Works</a>. If another website rejected the address or did not send its confirmation, that website's support team may need to help.</p>
    </section>
    <section>
      <h2>Article corrections and privacy questions</h2>
      <p>For a correction, include the article title and the passage you are asking about. For a privacy question, describe the issue without posting personal data in the public tracker. Please review our <a href="/privacy-policy">Privacy Policy</a> before sharing information.</p>
      <p>Email Time is an independent project that uses mail.tm as its underlying email provider. This contact channel is for this website; it is not an official Google, Supabase, or mail.tm support channel.</p>
    </section>
  </PublicPage>;
}
