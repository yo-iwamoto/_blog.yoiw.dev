import { slugFilter } from '@/server/lib/filters';
import { notion, notionBaseQuery } from '@/server/lib/notion';
import { parseNotionPage } from '@/server/lib/parsers';

export const getPage = async (slug: string) => {
  const queryResponse = await notion.databases.query({ ...notionBaseQuery, filter: slugFilter(slug) });
  if (queryResponse.results.length !== 1) {
    throw new Error();
  }

  const data = queryResponse.results[0];

  return {
    id: data.id,
    properties: parseNotionPage(data),
  };
};
