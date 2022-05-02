import { notion } from '@/lib/notion';
import { parseNotionPage } from '@/lib/parsers';
import type { NotionQuery } from '@/types/query';

export const fetchPagesByPaging = async (baseQuery: NotionQuery) => {
  let queryResponse = await notion.databases.query(baseQuery);
  const resPages = queryResponse.results;

  // TODO: pagination
  while (queryResponse.has_more && queryResponse.next_cursor !== null) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    queryResponse = await notion.databases.query({
      ...baseQuery,
      start_cursor: queryResponse.next_cursor,
    });
    resPages.push(...queryResponse.results);
  }

  const pages = resPages.map((page) => {
    const properties = parseNotionPage(page);
    return {
      id: page.id,
      properties,
    };
  });

  return pages;
};
