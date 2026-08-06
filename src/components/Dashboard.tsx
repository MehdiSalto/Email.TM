import { useEffect, useState } from "react";
import { useLanguage } from "../language";
import type { EmailRecord } from "../types";
import { getSessionEmails, removeSessionEmail } from "../session";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Table from "@cloudscape-design/components/table";
import CopyToClipboard from "@cloudscape-design/components/copy-to-clipboard";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import Icon from "@cloudscape-design/components/icon";

interface DashboardProps {
  onOpenInbox: (id: string) => void;
  onCreate: () => void;
  refreshKey: number;
}

function formatTimeLeft(expiresAt: string, lang: string): string {
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return "—";
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "always" });
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function Dashboard({ onOpenInbox, onCreate, refreshKey }: DashboardProps) {
  const { t, lang } = useLanguage();
  const [emails, setEmails] = useState<EmailRecord[]>([]);

  useEffect(() => {
    setEmails(getSessionEmails());
  }, [refreshKey]);

  const handleDelete = (id: string) => {
    const updated = removeSessionEmail(id);
    setEmails(updated);
  };

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description={t("dashboardSubtitle")}
          actions={
            <Button variant="primary" iconName="add-plus" onClick={onCreate}>
              {t("navCreate")}
            </Button>
          }
        >
          {t("dashboardTitle")}
        </Header>
      }
    >
      <Container>
        {emails.length === 0 ? (
          <Box textAlign="center" padding={{ top: "xl", bottom: "xl" }}>
            <SpaceBetween size="s" alignItems="center">
              <Icon name="envelope" size="large" />
              <Box variant="h3">{t("noEmails")}</Box>
              <Box color="text-body-secondary">{t("noEmailsHint")}</Box>
              <Button variant="primary" iconName="add-plus" onClick={onCreate}>
                {t("navCreate")}
              </Button>
            </SpaceBetween>
          </Box>
        ) : (
          <Table
            columnDefinitions={[
              {
                id: "address",
                header: t("emailColumn"),
                cell: (item: EmailRecord) => (
                  <CopyToClipboard
                    copyButtonText={t("copyAddress")}
                    copyErrorText="Error"
                    copySuccessText={t("copied")}
                    textToCopy={item.address}
                    textToDisplay={item.address}
                    variant="inline"
                  />
                ),
                isRowHeader: true,
              },
              {
                id: "expires",
                header: t("expiresIn"),
                cell: (item: EmailRecord) => {
                  const expired = new Date(item.expires_at).getTime() <= Date.now();
                  return expired ? (
                    <StatusIndicator type="error">{t("emailExpired")}</StatusIndicator>
                  ) : (
                    <StatusIndicator type="success">
                      {formatTimeLeft(item.expires_at, lang)}
                    </StatusIndicator>
                  );
                },
              },
              {
                id: "actions",
                header: t("actions"),
                cell: (item: EmailRecord) => (
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button
                      variant="link"
                      iconName="external"
                      onClick={() => onOpenInbox(item.id)}
                    >
                      {t("openInbox")}
                    </Button>
                    <Button
                      variant="icon"
                      iconName="remove"
                      ariaLabel={t("actions")}
                      onClick={() => handleDelete(item.id)}
                    />
                  </SpaceBetween>
                ),
              },
            ]}
            items={emails}
            variant="embedded"
          />
        )}
      </Container>
    </ContentLayout>
  );
}
