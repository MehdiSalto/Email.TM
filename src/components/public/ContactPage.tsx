import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";

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
          an issue with the service, you can use the contact method provided
          by Email.TM when one is available.
        </p>

        <h2>Questions and support</h2>

        <p>
          For questions about creating a temporary email address, receiving
          messages, email expiration, or using the inbox, please review the
          FAQ and How It Works pages first.
        </p>

        <h2>Reporting an issue</h2>

        <p>
          If you experience a technical problem with Email.TM, please provide
          enough information to help us understand the issue, such as what
          action you were trying to perform and what happened.
        </p>

        <p>
          We do not publish a contact email address on this page until an
          official Email.TM contact address is configured.
        </p>
      </SpaceBetween>
    </Container>
  );
}
