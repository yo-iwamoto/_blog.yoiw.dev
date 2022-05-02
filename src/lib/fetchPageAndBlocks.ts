import { notion } from '@/lib/notion';
import { parseNotionPage } from '@/lib/parsers';
import type { ListBlockChildrenParameters } from '@notionhq/client/build/src/api-endpoints';
import type { NotionQuery } from '@/types/query';

/**
 * cause side-effect: throw an error when the results length not equal to 1
 */
export const fetchPageAndBlocks = async (query: NotionQuery) => {
  const queryResponse = await notion.databases.query(query);

  if (queryResponse.results.length !== 1) {
    throw new Error();
  }

  const page = queryResponse.results[0];
  const properties = parseNotionPage(page);

  const blocksQuery: ListBlockChildrenParameters = { block_id: page.id };

  let listResponse = await notion.blocks.children.list({ block_id: page.id });
  const blocks = listResponse.results;

  while (listResponse.has_more && listResponse.next_cursor !== null) {
    // reason: Promise.all can't be used here because has_more and next_cursor in the response are refered each time
    // eslint-disable-next-line no-await-in-loop
    listResponse = await notion.blocks.children.list({ ...blocksQuery, start_cursor: listResponse.next_cursor });
    blocks.push(...listResponse.results);
  }

  return {
    id: page.id,
    properties,
    blocks,
  };
};
