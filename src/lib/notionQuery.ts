import { env } from '@/config/env';
import type { NotionQuery } from '@/types/query';

export const notionQuery = (query: Omit<NotionQuery, 'database_id'>): NotionQuery => ({
  database_id: env.notionDatabaseId,
  ...query,
});
