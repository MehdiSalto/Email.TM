import { useState } from "react";
import { useLanguage } from "../language";
import { DURATIONS } from "../i18n";
import type { DurationKey, EmailRecord } from "../types";
import { createEmail } from "../api";
import { addSessionEmail } from "../session";
import AppLayout from "@cloudscape-design/components/app-layout";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import FormField from "@cloudscape-design/components/form-field";
import Select from "@cloudscape-design/components/select";
import Button from "@cloudscape-design/components/button";
import Alert from "@cloudscape-design/components/alert";
import Box from "@cloudscape-design/components/box";
import Icon from "@cloudscape-design/components/icon";

interface CreateEmailProps {
  onCreated: (email: EmailRecord) => void;
}

export default function CreateEmail({ onCreated }: CreateEmailProps) {
  const { t } = useLanguage();
  const [duration, setDuration] = useState<DurationKey>("1d");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const durationOptions = DURATIONS.map((d) => ({
    label: t(`duration${d.key}`),
    value: d.key,
  }));

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const email = await createEmail(duration);
      addSessionEmail(email);
      onCreated(email);
    } catch {
      setError(t("createError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout
      header={
        <Header variant="h1" description={t("createSubtitle")}>
          {t("createTitle")}
        </Header>
      }
    >
      <Container>
        <SpaceBetween size="l">
          {error && (
            <Alert type="error" dismissible onDismiss={() => setError(null)}>
              {error}
            </Alert>
          )}
          <FormField label={t("chooseDuration")}>
            <Select
              selectedOption={{
                label: t(`duration${duration}`),
                value: duration,
              }}
              onChange={({ detail }) =>
                setDuration(detail.selectedOption.value as DurationKey)
              }
              options={durationOptions}
              expandToViewport
            />
          </FormField>
          <Box>
            <Button
              variant="primary"
              onClick={handleCreate}
              loading={loading}
              iconName="add-plus"
            >
              {loading ? t("creating") : t("createButton")}
            </Button>
          </Box>
          <Box color="text-body-secondary" fontSize="body-s">
            <Icon name="status-info" /> {t("sessionHint")}
          </Box>
        </SpaceBetween>
      </Container>
    </ContentLayout>
  );
}
