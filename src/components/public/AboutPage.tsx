import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";

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
        </p>

        <p>
          A temporary email address can be useful when you want to receive
          emails without giving your primary inbox to a website or service.
          This can help reduce unwanted messages and keep your main inbox
          easier to manage.
        </p>

        <h2>How Email.TM works</h2>

        <p>
          You can generate a temporary email address and choose how long the
          address should remain available. Messages received by the temporary
          inbox can then be viewed through the Email.TM interface while the
          address is active.
        </p>

        <h2>Important limitations</h2>

        <p>
          Temporary email addresses are designed for short-term use. They
          should not be relied on for important accounts, password recovery,
          financial services, or other situations where you need permanent
          access to an email address.
        </p>
      </SpaceBetween>
    </Container>
  );
}
