import { env } from '@/config/env';
import { Client as NotionClient } from '@notionhq/client';

export const notion = new NotionClient({ auth: env.notionIntegrationToken });
