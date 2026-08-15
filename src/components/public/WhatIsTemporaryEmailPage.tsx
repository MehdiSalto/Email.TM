import PublicPage from "./PublicPage";

export default function WhatIsTemporaryEmailPage() {
  return (
    <PublicPage
      title="What Is a Temporary Email?"
      description="Learn what temporary email is, how it works, when it can be useful, and what its limitations are."
    >
      <section>
        <h2>What is a temporary email?</h2>

        <p>
          A temporary email is a short-term email address created for receiving
          messages without using your primary email address. Unlike a regular
          email account that is normally intended for long-term communication,
          a temporary email is designed to remain available for a limited
          period of time.
        </p>

        <p>
          Temporary email services can be useful when you need an address for a
          short-term purpose and do not want to add another service or website
          to your primary inbox.
        </p>
      </section>

      <section>
        <h2>Temporary email vs. a regular email address</h2>

        <p>
          A regular email address is generally intended for long-term use. It
          can be connected to important accounts, personal communication,
          password recovery, and other services that you may need to access
          over a long period.
        </p>

        <p>
          A temporary email address has a different purpose. It is designed for
          situations where the email address only needs to be available for a
          limited time. Because the address can expire, it should not be
          treated as a replacement for a permanent email account.
        </p>
      </section>

      <section>
        <h2>When can temporary email be useful?</h2>

        <p>
          There are legitimate situations where a temporary email address can
          make managing your inbox easier. For example, you may want to use a
          separate address when testing a website, receiving a one-time
          confirmation message, or trying a service that you do not expect to
          use regularly.
        </p>

        <p>
          It can also be useful when you want to avoid giving your primary
          email address to every website that asks for an address before
          providing access to non-essential content or features.
        </p>
      </section>

      <section>
        <h2>Advantages of temporary email</h2>

        <ul>
          <li>
            It can help keep short-term messages away from your primary inbox.
          </li>
          <li>
            It can be created without setting up another traditional email
            account.
          </li>
          <li>
            It is useful for short-lived activities where a permanent address
            is unnecessary.
          </li>
          <li>
            It can make testing and one-time email verification workflows more
            convenient.
          </li>
        </ul>
      </section>

      <section>
        <h2>Important limitations</h2>

        <p>
          Temporary email should not be used for accounts or services where
          continued access to the email address is important. If an address
          expires, you may no longer be able to receive messages sent to it.
        </p>

        <p>
          For this reason, avoid using temporary email for banking, financial
          services, important personal accounts, password recovery, or any
          account that you expect to use for a long time.
        </p>
      </section>

      <section>
        <h2>Privacy considerations</h2>

        <p>
          A temporary email address does not automatically mean that every
          message received through it is private. Email.TM provides inbox
          access through a share link, and anyone who obtains an active share
          link may be able to view the associated inbox and its messages.
        </p>

        <p>
          Avoid sending or receiving sensitive information through a temporary
          inbox when you cannot control who may have access to the inbox link.
        </p>
      </section>

      <section>
        <h2>When should you use a regular email instead?</h2>

        <p>
          Use a permanent email address when you need reliable long-term
          access, account recovery, personal communication, important
          notifications, or records that you may need in the future.
        </p>

        <p>
          The main idea is simple: temporary email is a tool for temporary
          situations, while a regular email address is better suited to
          long-term communication and account ownership.
        </p>
      </section>

      <section>
        <h2>Using Email.TM</h2>

        <p>
          Email.TM lets you create a temporary email address, choose an
          available lifetime, and use the address to receive messages while it
          is active. When the temporary email expires, the service performs
          cleanup of expired email records.
        </p>

        <p>
          If you are new to temporary email, see our{" "}
          <a href="#/how-it-works">How It Works</a> page for a step-by-step
          explanation or visit the{" "}
          <a href="#/faq">FAQ</a> for answers to common questions.
        </p>
      </section>
    </PublicPage>
  );
}
