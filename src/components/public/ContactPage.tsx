import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Link from "@cloudscape-design/components/link";

export default function ContactPage() {
  return (
    <Container
      header={
        <Header variant="h1">
          Contact Us
        </Header>
      }
    >
      <SpaceBetween size="l">
        <p>
          If you have a question, need help using Email.TM, or want to report
          a problem with the service, this page explains how to find help and
          what information is useful when reporting an issue.
        </p>

        <h2>Questions and support</h2>

        <p>
          For common questions about temporary email addresses, receiving
          messages, expiration, inbox access, and other features, please
          review our FAQ and How It Works pages.
        </p>

        <p>
          <Link href="#/faq">Visit the FAQ</Link>
        </p>

        <p>
          <Link href="#/how-it-works">How Email.TM Works</Link>
        </p>

        <h2>Reporting a technical issue</h2>

        <p>
          If you experience a problem while using Email.TM, note what you
          were trying to do, what happened, and whether the problem can be
          reproduced. This information can help identify technical issues
          more effectively.
        </p>

        <h2>Contact availability</h2>

        <p>
          Email.TM does not currently publish a dedicated support email
          address on this website. A direct contact method may be added to
          this page when an official support channel is configured.
        </p>

        <p>
          Please do not include passwords, authentication tokens, or other
          sensitive information when reporting a technical problem.
        </p>
      </SpaceBetween>
    </Container>
  );
}
