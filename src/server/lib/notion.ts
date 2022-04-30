import { env } from '@/server/config/env';
import { Client as NotionClient } from '@notionhq/client';

export const notion = new NotionClient({ auth: env.notionIntegrationToken });

export const notionBaseQuery = { database_id: env.notionDatabaseId };
