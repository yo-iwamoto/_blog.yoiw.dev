import { isServerSide } from '@/lib/isServerSide';

export const env = isServerSide
  ? {
      notionIntegrationToken: process.env.NOTION_INTEGRATION_TOKEN as string,
      notionDatabaseId: process.env.NOTION_DATABASE_ID as string,
    }
  : undefined;
