import PublicPage from "./PublicPage";

export default function PrivacyPolicyPage() {
  return (
    <PublicPage
      title="Privacy Policy"
      description="How Email.TM handles temporary email addresses, inbox messages, local storage, and related service data."
    >
      <p className="policy-date">Last updated: <time dateTime="2026-10-11">October 11, 2026</time></p>
      <section>
        <h2>1. Overview</h2>
        <p>
          Email.TM provides temporary email addresses that can be used to
          receive messages without creating a traditional account. This
          Privacy Policy explains what information is handled when you use
          the service and how that information is used to operate the
          temporary email service.
        </p>
      </section>

      <section>
        <h2>2. Temporary Email Data</h2>
        <p>
          When you create a temporary email address, Email.TM needs to
          maintain information required to operate that address and its
          inbox. This can include the temporary email address, a unique
          identifier, creation time, expiration time, and information required
          by the underlying email service to retrieve incoming messages.
        </p>
        <p>
          Temporary email accounts are intended for short-term use. When a
          temporary email expires, you should not rely on continued access.
          The application performs cleanup of expired records; this is not a
          guarantee that all copies of messages are deleted at the expiration
          time. Retention may also depend on the underlying mail service and
          the sender.
        </p>
      </section>

      <section>
        <h2>3. Inbox Messages</h2>
        <p>
          Messages received by a temporary email address are processed so
          that they can be displayed in the corresponding inbox. Depending on
          the message, this can include the sender address and name, subject,
          message content, attachment information, and the time the message
          was received.
        </p>
        <p>
          You should avoid using a temporary email address for sensitive
          information or services that require permanent access to your
          mailbox.
        </p>
        <p>
          HTML messages are displayed in an isolated frame that blocks scripts
          and forms. If a message includes externally hosted HTTPS images, your
          browser may request those images from the sender or another host,
          exposing network information such as your IP address to that host.
          Links you choose to open are governed by the destination site's policy.
        </p>
      </section>

      <section>
        <h2>4. Shared Inbox Links</h2>
        <p>
          Email.TM provides shareable links for temporary inboxes. Anyone who
          has access to a valid inbox share link may be able to view that
          inbox and its messages while the temporary email remains active.
        </p>
        <p>
          Do not share an inbox link if the messages in that inbox contain
          information that you do not want other people to see.
        </p>
      </section>

      <section>
        <h2>5. Information Stored on Your Device</h2>
        <p>
          Email.TM uses browser local storage to remember temporary email
          records created during your session. The information stored locally
          includes the email identifier, temporary email address, creation
          time, and expiration time.
        </p>
        <p>
          The application also uses local storage to remember certain
          preferences, such as your selected language and display theme.
        </p>
        <p>Clearing site data removes these browser records and preferences.
          Removing a mailbox from the dashboard removes its local entry; it
          does not promise deletion of provider records or revocation of a
          previously shared inbox link.</p>
      </section>

      <section>
        <h2>6. Service Infrastructure</h2>
        <p>
          Email.TM uses Supabase for application data and service
          infrastructure and uses mail.tm to provide the underlying temporary
          email functionality.
        </p>
        <p>
          Information required to create and operate temporary email
          accounts may therefore be processed through these services.
        </p>
        <p>The website is hosted on Vercel. Infrastructure providers may process
          request and technical data required to deliver and protect their services.
          See the privacy information published by <a href="https://supabase.com/privacy">Supabase</a>,
          {" "}<a href="https://mail.tm/en/privacy/">mail.tm</a>, and <a href="https://vercel.com/legal/privacy-policy">Vercel</a>.</p>
      </section>

      <section>
        <h2>7. Expiration and Deletion</h2>
        <p>
          Temporary email addresses have a selected lifetime. After the
          expiration time is reached, Email.TM performs cleanup of expired
          temporary email records.
        </p>
        <p>
          Because temporary email addresses are designed for short-term use,
          you should not rely on them as permanent mailboxes or as a recovery
          method for important accounts.
        </p>
      </section>

      <section>
        <h2>8. Cookies, Analytics, and Advertising</h2>
        <p>
          Email Time includes Google Analytics to measure website usage and
          the Google AdSense script for advertising. These services may use
          cookies and similar technologies and process information about
          page visits, browser or device details, and interactions according
          to their configuration and Google's policies.
        </p>
        <p>Third-party vendors, including Google, may use cookies to serve ads
          based on previous visits to this website or other websites. Google's
          advertising cookies allow Google and its partners to personalize ads
          using browsing activity. Whether ads are displayed depends on the
          service's availability and configuration.</p>
        <p>You can manage personalized advertising through <a href="https://myadcenter.google.com/">Google My Ad Center</a>,
          review <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from partner websites</a>,
          or use the <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out browser add-on</a>.
          Browser settings can also block or clear cookies. These controls are
          separate from removing local mailbox entries.</p>
      </section>

      <section>
        <h2>9. Security and Limitations</h2>
        <p>
          Email.TM is designed for temporary email use and should not be
          treated as a replacement for a permanent email provider. Users
          should avoid sending or receiving sensitive information through
          temporary inboxes.
        </p>
        <p>
          No online service can guarantee absolute security or privacy, so
          users should consider the nature of the information they receive
          before using a temporary email address.
        </p>
      </section>

      <section>
        <h2>10. Changes to This Policy</h2>
        <p>
          This Privacy Policy may be updated when the Email.TM service,
          infrastructure, or data practices change. Any updated version will
          be published on this page.
        </p>
        <p>For questions about this website's published information, visit our <a href="/contact">contact page</a>.
          Do not include private mailbox contents or access links in a public report.</p>
      </section>
    </PublicPage>
  );
}
