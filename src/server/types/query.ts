import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

export type NotionQuery = QueryDatabaseParameters & {
  auth?: string;
};
