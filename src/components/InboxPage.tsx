import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../language";
import { fetchInbox, fetchMessageDetail } from "../api";
import type { EmailRecord, InboxMessage, MessageDetail } from "../types";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Alert from "@cloudscape-design/components/alert";
import Spinner from "@cloudscape-design/components/spinner";
import CopyToClipboard from "@cloudscape-design/components/copy-to-clipboard";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import Icon from "@cloudscape-design/components/icon";
import Badge from "@cloudscape-design/components/badge";

interface InboxPageProps {
  emailId: string;
  onBack: () => void;
}

function formatTimeLeft(expiresAt: string, lang: string): string {
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return "—";
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function formatDate(iso: string, lang: string): string {
  try {
    return new Intl.DateTimeFormat(lang, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function InboxPage({ emailId, onBack }: InboxPageProps) {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState<EmailRecord | null>(null);
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const shareUrl = `${window.location.origin}/#/inbox/${emailId}`;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadInbox = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await fetchInbox(emailId);
      setEmail(data.email);
      setMessages(data.messages);
      setExpired(false);
      setNotFound(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("not found") || msg.includes("expired")) {
        setExpired(true);
        setNotFound(false);
      } else {
        setError(t("loadInboxError"));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [emailId, t]);

  useEffect(() => {
    loadInbox();
  }, [loadInbox]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      loadInbox(true);
    }, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loadInbox]);

  // Update countdown timer every second
  useEffect(() => {
    if (!email) return;
    const update = () => {
      setTimeLeft(formatTimeLeft(email.expires_at, lang));
      if (new Date(email.expires_at).getTime() <= Date.now()) {
        setExpired(true);
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [email, lang]);

  const handleMessageClick = async (messageId: string) => {
    setMessageLoading(true);
    setMessageError(null);
    setSelectedMessage(null);
    try {
      const detail = await fetchMessageDetail(emailId, messageId);
      setSelectedMessage(detail);
    } catch {
      setMessageError(t("loadMessageError"));
    } finally {
      setMessageLoading(false);
    }
  };

  if (loading) {
    return (
      <Box padding={{ top: "xl" }} textAlign="center">
        <Spinner size="large" />
        <Box color="text-body-secondary" padding={{ top: "s" }}>
          {t("loadingInbox")}
        </Box>
      </Box>
    );
  }

  if (expired || notFound) {
    return (
      <ContentLayout
        header={
          <Header variant="h1">
            {notFound ? t("emailNotFound") : t("emailExpired")}
          </Header>
        }
      >
        <Container>
          <SpaceBetween size="m">
            <Alert type="warning">
              {notFound ? t("emailNotFoundHint") : t("emailExpiredHint")}
            </Alert>
            <Button variant="link" iconName="arrow-left" onClick={onBack}>
              {t("backToDashboard")}
            </Button>
          </SpaceBetween>
        </Container>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description={
            <SpaceBetween size="xs" direction="horizontal">
              <StatusIndicator type="success">
                {t("timeLeft")}: {timeLeft}
              </StatusIndicator>
              <Badge color="blue">{t("autoRefresh")}</Badge>
            </SpaceBetween>
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                iconName="refresh"
                loading={refreshing}
                onClick={() => loadInbox(true)}
              >
                {refreshing ? t("refreshing") : t("refresh")}
              </Button>
              <Button variant="link" iconName="arrow-left" onClick={onBack}>
                {t("backToDashboard")}
              </Button>
            </SpaceBetween>
          }
        >
          {t("inboxTitle")}
        </Header>
      }
    >
      <SpaceBetween size="l">
        <Container>
          <SpaceBetween size="m">
            <Header variant="h2">{t("emailColumn")}</Header>
            <ColumnLayout columns={2}>
              <div>
                <Box color="text-body-secondary" fontSize="body-s" margin={{ bottom: "xxs" }}>
                  {t("emailColumn")}
                </Box>
                <CopyToClipboard
                  copyButtonText={t("copyAddress")}
                  copyErrorText="Error"
                  copySuccessText={t("copied")}
                  textToCopy={email?.address ?? ""}
                  textToDisplay={email?.address ?? ""}
                  variant="inline"
                />
              </div>
              <div>
                <Box color="text-body-secondary" fontSize="body-s" margin={{ bottom: "xxs" }}>
                  {t("shareLink")}
                </Box>
                <CopyToClipboard
                  copyButtonText={t("copyLink")}
                  copyErrorText="Error"
                  copySuccessText={t("copied")}
                  textToCopy={shareUrl}
                  textToDisplay={shareUrl}
                  variant="inline"
                />
                <Box color="text-body-secondary" fontSize="body-s" padding={{ top: "xxs" }}>
                  <Icon name="status-info" /> {t("shareLinkHint")}
                </Box>
              </div>
            </ColumnLayout>
            <Box color="text-body-secondary" fontSize="body-s">
              {t("expiresAt")}: {email ? formatDate(email.expires_at, lang) : "—"}
            </Box>
          </SpaceBetween>
        </Container>

        {error && (
          <Alert type="error" dismissible onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}

        {selectedMessage ? (
          <Container
            header={
              <Header
                variant="h2"
                actions={
                  <Button
                    variant="link"
                    iconName="angle-left"
                    onClick={() => setSelectedMessage(null)}
                  >
                    {t("closeMessage")}
                  </Button>
                }
              >
                {selectedMessage.subject || "(no subject)"}
              </Header>
            }
          >
            <SpaceBetween size="m">
              <ColumnLayout columns={2} variant="text-grid">
                <div>
                  <Box color="text-body-secondary" fontSize="body-s">
                    {t("from")}
                  </Box>
                  <Box>
                    {selectedMessage.from?.name || selectedMessage.from?.address || "—"}
                  </Box>
                </div>
                <div>
                  <Box color="text-body-secondary" fontSize="body-s">
                    {t("received")}
                  </Box>
                  <Box>{formatDate(selectedMessage.createdAt, lang)}</Box>
                </div>
              </ColumnLayout>
              {selectedMessage.hasAttachments && (
                <Badge color="blue">{t("attachments")}: {t("yes")}</Badge>
              )}
              <Box>
                {selectedMessage.html && selectedMessage.html.length > 0 ? (
                  <Box>
    <div
      dangerouslySetInnerHTML={{
        __html: selectedMessage.html.join(""),
      }}
    />
  </Box>
) : selectedMessage.text ? (
  <Box variant="pre">{selectedMessage.text}</Box>
) : (
  <Box color="text-body-secondary">
    {selectedMessage.intro || "—"}
                   </Box>
)}
              </Box>
            </SpaceBetween>
          </Container>
        ) : messageLoading ? (
          <Box textAlign="center" padding={{ top: "l" }}>
            <Spinner />
            <Box color="text-body-secondary" padding={{ top: "s" }}>
              {t("loadingMessage")}
            </Box>
          </Box>
        ) : messageError ? (
          <Alert type="error" dismissible onDismiss={() => setMessageError(null)}>
            {messageError}
          </Alert>
        ) : (
          <Container
            header={
              <Header variant="h2" counter={messages.length > 0 ? `(${messages.length})` : ""}>
                {t("inboxTitle")}
              </Header>
            }
          >
            {messages.length === 0 ? (
              <Box textAlign="center" padding={{ top: "l", bottom: "l" }}>
                <SpaceBetween size="s" alignItems="center">
                  <Icon name="envelope" size="large" />
                  <Box variant="h3">{t("noMessages")}</Box>
                  <Box color="text-body-secondary">{t("noMessagesHint")}</Box>
                </SpaceBetween>
              </Box>
            ) : (
              <SpaceBetween size="s">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleMessageClick(msg.id)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border-item-default, #e9ebed)",
                      padding: "12px",
                    }}
                  >
                    <ColumnLayout columns={3} variant="text-grid">
                      <div>
                        <Box color="text-body-secondary" fontSize="body-s">
                          {t("from")}
                        </Box>
                        <Box fontSize="body-s">
                          {msg.from?.name || msg.from?.address || "—"}
                        </Box>
                      </div>
                      <div>
                        <Box color="text-body-secondary" fontSize="body-s">
                          {t("subject")}
                        </Box>
                        <Box fontSize="body-s">{msg.subject || "—"}</Box>
                      </div>
                      <div>
                        <Box color="text-body-secondary" fontSize="body-s">
                          {t("received")}
                        </Box>
                        <Box fontSize="body-s">{formatDate(msg.createdAt, lang)}</Box>
                      </div>
                    </ColumnLayout>
                    {msg.hasAttachments && (
                      <Box padding={{ top: "xxs" }}>
                        <Badge color="blue">{t("attachments")}</Badge>
                      </Box>
                    )}
                  </div>
                ))}
              </SpaceBetween>
            )}
          </Container>
        )}
      </SpaceBetween>
    </ContentLayout>
  );
}
