import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Link from "@cloudscape-design/components/link";

export default function AboutPage() {
  return (
    <Container
      header={
        <Header variant="h1">
          About Email.TM
        </Header>
      }
    >
      <SpaceBetween size="l">
        <p>
          Email.TM is a temporary email service that lets you create a
          disposable email address without creating a traditional account.
          The service is designed for short-term email receiving when you do
          not want to use your primary email address.
        </p>

        <h2>Why temporary email can be useful</h2>

        <p>
          Many websites and online services ask for an email address before
          allowing access to a download, trial, newsletter, or other
          feature. In situations where you do not need a permanent
          relationship with that service, using a temporary email address can
          help keep your primary inbox separate from those messages.
        </p>

        <p>
          A temporary address can also be useful when testing email-based
          workflows, receiving a one-time message, or avoiding unnecessary
          messages in a personal inbox. It should be used responsibly and
          only where temporary email addresses are appropriate.
        </p>

        <h2>How Email.TM works</h2>

        <p>
          Email.TM allows you to generate a temporary email address and
          choose how long it should remain available. Once created, the
          address can receive messages that are displayed in the Email.TM
          inbox while the address is active.
        </p>

        <p>
          You can learn more about the process on our{" "}
          <Link href="#/how-it-works">How It Works</Link> page.
        </p>

        <h2>What Email.TM is designed for</h2>

        <p>
          Email.TM is intended for short-term email receiving rather than
          replacing a permanent email provider. It can be useful for
          situations where temporary access to an inbox is sufficient.
        </p>

        <h2>Important limitations</h2>

        <p>
          Temporary email addresses are not suitable for every situation.
          You should not rely on a temporary address for important accounts,
          financial services, password recovery, identity verification that
          requires long-term access, or any service where losing access to
          the email address could cause a problem.
        </p>

        <p>
          Temporary inboxes can also contain information that should not be
          shared. Email.TM provides inbox sharing through a link, so anyone
          who has access to a valid share link may be able to view the
          associated inbox while it remains active.
        </p>

        <h2>Using Email.TM responsibly</h2>

        <p>
          Like any online service, Email.TM should be used responsibly and
          in accordance with applicable laws and the service's{" "}
          <Link href="#/terms">Terms of Service</Link>. Avoid using temporary
          email for sensitive information or activities that require a
          permanent and private mailbox.
        </p>

        <h2>Learn more</h2>

        <p>
          If you are new to temporary email, our{" "}
          <Link href="#/what-is-temporary-email">
            What Is a Temporary Email?
          </Link>{" "}
          guide explains the concept, common uses, advantages, and
          limitations in more detail.
        </p>
      </SpaceBetween>
    </Container>
  );
}
