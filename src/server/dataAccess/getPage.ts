import { slugFilter } from '@/server/lib/filters';
import { notion, notionBaseQuery } from '@/server/lib/notion';
import { parseNotionPage } from '@/server/lib/parsers';
import type { ListBlockChildrenParameters } from '@notionhq/client/build/src/api-endpoints';

export const getPage = async (slug: string) => {
  const queryResponse = await notion.databases.query({ ...notionBaseQuery, filter: slugFilter(slug) });
  if (queryResponse.results.length !== 1) {
    throw new Error();
  }

  const block = queryResponse.results[0];
  const listQuery: ListBlockChildrenParameters = { block_id: block.id };

  let listResponse = await notion.blocks.children.list(listQuery);
  const blocks = listResponse.results;

  while (listResponse.has_more && listResponse.next_cursor !== null) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    listResponse = await notion.blocks.children.list({ ...listQuery, start_cursor: listResponse.next_cursor });
    blocks.push(...listResponse.results);
  }

  const properties = parseNotionPage(block);

  return {
    properties,
    blocks,
  };
};
