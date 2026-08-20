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
import ColumnLayout from "@cloudscape-design/components/column-layout";
import Link from "@cloudscape-design/components/link";

interface DashboardProps {
  onOpenInbox: (id: string) => void;
  onCreate: () => void;
  refreshKey: number;
}

function formatTimeLeft(expiresAt: string): string {
  const ms = new Date(expiresAt).getTime() - Date.now();

  if (ms <= 0) return "—";

  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

export default function Dashboard({
  onOpenInbox,
  onCreate,
  refreshKey,
}: DashboardProps) {
  const { t } = useLanguage();

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
            <Button
              variant="primary"
              iconName="add-plus"
              onClick={onCreate}
            >
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
          <Box
            textAlign="center"
            padding={{ top: "xl", bottom: "xl" }}
          >
            <SpaceBetween size="s" alignItems="center">
              <Icon name="envelope" size="large" />

              <Box variant="h3">
                {t("noEmails")}
              </Box>

              <Box color="text-body-secondary">
                {t("noEmailsHint")}
              </Box>

              <Button
                variant="primary"
                iconName="add-plus"
                onClick={onCreate}
              >
                {t("navCreate")}
              </Button>
            </SpaceBetween>
          </Box>
        ) : (
          <>
            {/* Desktop */}
            <div className="dashboard-desktop">
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
                      const expired =
                        new Date(item.expires_at).getTime() <=
                        Date.now();

                      return expired ? (
                        <StatusIndicator type="error">
                          {t("emailExpired")}
                        </StatusIndicator>
                      ) : (
                        <StatusIndicator type="success">
                          {formatTimeLeft(item.expires_at)}
                        </StatusIndicator>
                      );
                    },
                  },

{
  id: "actions",
  header: t("actions"),
  width: 220,
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
        variant="link"
        iconName="remove"
        onClick={() => handleDelete(item.id)}
      >
        <span style={{ color: "#d91515" }}>
          Delete
        </span>
      </Button>
    </SpaceBetween>
  ),
},
                ]}
                items={emails}
                variant="embedded"
              />
            </div>

            {/* Mobile */}
            <div className="dashboard-mobile">
              <SpaceBetween size="m">
                {emails.map((item) => {
                  const expired =
                    new Date(item.expires_at).getTime() <=
                    Date.now();

                  return (
                    <Container
                      key={item.id}
                      className="dashboard-mobile-email"
                    >
                      <SpaceBetween size="m">
                        {/* Email */}
                        <div className="dashboard-mobile-field">
                          <div className="dashboard-mobile-label">
                            {t("emailColumn")}
                          </div>

                          <div className="dashboard-mobile-value">
                            <CopyToClipboard
                              copyButtonText={t("copyAddress")}
                              copyErrorText="Error"
                              copySuccessText={t("copied")}
                              textToCopy={item.address}
                              textToDisplay={item.address}
                              variant="inline"
                            />
                          </div>
                        </div>

                        {/* Expiration */}
                        <div className="dashboard-mobile-field">
                          <div className="dashboard-mobile-label">
                            {t("expiresIn")}
                          </div>

                          <div className="dashboard-mobile-value">
                            {expired ? (
                              <StatusIndicator type="error">
                                {t("emailExpired")}
                              </StatusIndicator>
                            ) : (
                              <StatusIndicator type="success">
                                {formatTimeLeft(
                                  item.expires_at
                                )}
                              </StatusIndicator>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="dashboard-mobile-field">
                          <div className="dashboard-mobile-label">
                            {t("actions")}
                          </div>

                          <div className="dashboard-mobile-actions">
                            <Button
                              variant="link"
                              iconName="external"
                              onClick={() =>
                                onOpenInbox(item.id)
                              }
                            >
                              {t("openInbox")}
                            </Button>

                            <Button
                              variant="link"
                              iconName="remove"
                              onClick={() => handleDelete(item.id)}
                             >
                             <span style={{ color: "#d91515" }}>
                               Delete
                             </span>
                             </Button>
                          </div>
                        </div>
                      </SpaceBetween>
                    </Container>
                  );
                })}
              </SpaceBetween>
            </div>
          </>
        )}
      </Container>

      {/* Home information */}
      <div className="home-info">
        <Container>
          <SpaceBetween size="l">
            <Header variant="h2">
              {t("homeIntroTitle")}
            </Header>

            <Box color="text-body-secondary">
              {t("homeIntroText")}
            </Box>
          </SpaceBetween>
        </Container>

        <Container>
          <SpaceBetween size="l">
            <Header variant="h2">
              {t("homeWhatTitle")}
            </Header>

            <Box color="text-body-secondary">
              {t("homeWhatText")}
            </Box>
          </SpaceBetween>
        </Container>

        <Container>
          <SpaceBetween size="l">
            <Header variant="h2">
              {t("homeHowTitle")}
            </Header>

            <ColumnLayout
              columns={3}
              variant="text-grid"
            >
              <Box>
                <Box variant="h3">
                  {t("homeStepCreateTitle")}
                </Box>

                <Box color="text-body-secondary">
                  {t("homeStepCreateText")}
                </Box>
              </Box>

              <Box>
                <Box variant="h3">
                  {t("homeStepReceiveTitle")}
                </Box>

                <Box color="text-body-secondary">
                  {t("homeStepReceiveText")}
                </Box>
              </Box>

              <Box>
                <Box variant="h3">
                  {t("homeStepExpireTitle")}
                </Box>

                <Box color="text-body-secondary">
                  {t("homeStepExpireText")}
                </Box>
              </Box>
            </ColumnLayout>
          </SpaceBetween>
        </Container>

        <Container>
          <SpaceBetween size="l">
            <Header variant="h2">
              {t("homeWhyTitle")}
            </Header>

            <Box color="text-body-secondary">
              {t("homeWhyText")}
            </Box>
          </SpaceBetween>
        </Container>

        <Container>
          <SpaceBetween size="l">
            <Header variant="h2">
              {t("homeFaqTitle")}
            </Header>

            <SpaceBetween size="m">
              <Box>
                <Box variant="h3">
                  {t("homeFaqQuestion1")}
                </Box>

                <Box color="text-body-secondary">
                  {t("homeFaqAnswer1")}
                </Box>
              </Box>

              <Box>
                <Box variant="h3">
                  {t("homeFaqQuestion2")}
                </Box>

                <Box color="text-body-secondary">
                  {t("homeFaqAnswer2")}
                </Box>
              </Box>

              <Box>
                <Box variant="h3">
                  {t("homeFaqQuestion3")}
                </Box>

                <Box color="text-body-secondary">
                  {t("homeFaqAnswer3")}
                </Box>
              </Box>

              <Box>
                <Box variant="h3">
                  {t("homeFaqQuestion4")}
                </Box>

                <Box color="text-body-secondary">
                  {t("homeFaqAnswer4")}
                </Box>
              </Box>

              <Link href="#/faq">
                {t("homeFaqLink")}
              </Link>
            </SpaceBetween>
          </SpaceBetween>
        </Container>
      </div>
    </ContentLayout>
  );
}
