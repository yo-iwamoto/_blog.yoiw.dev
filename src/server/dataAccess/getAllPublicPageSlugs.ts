import { parseNotionPageSlug } from '@/server/lib/parsers';
import { statusFilter } from '@/server/lib/filters';
import { notion, notionBaseQuery } from '@/server/lib/notion';
import type { NotionQuery } from '@/server/types/query';

export const getAllPublicPageSlugs = async () => {
  const query: NotionQuery = { ...notionBaseQuery, filter: statusFilter('public') };

  let queryResponse = await notion.databases.query(query);
  const resPages = queryResponse.results;

  while (queryResponse.has_more && queryResponse.next_cursor !== null) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    queryResponse = await notion.databases.query({
      ...query,
      start_cursor: queryResponse.next_cursor,
    });
    resPages.push(...queryResponse.results);
  }

  const slugs = resPages.map((page) => parseNotionPageSlug(page).slug);

  return {
    slugs,
  };
};
