import { debugErrorLog } from '@/lib/debugLog';
import { notionQuery } from '@/lib/notionQuery';
import { statusFilter, tagsFilter } from '@/lib/filters';
import { notion } from '@/lib/notion';
import { errorPageProps, okPageProps } from '@/lib/response';
import { fetchPagesByPaging } from '@/lib/fetchPagesByPaging';
import { createdTimeAscSort } from '@/lib/sorts';
import type { GetStaticPaths, GetStaticPropsContext } from 'next';

type PathParams = {
  name: string;
};

const retrieveDatabaseQuery = notionQuery({});
const filterByTagQuery = (tagName: string) =>
  notionQuery({
    filter: {
      and: [statusFilter('public'), tagsFilter(tagName)],
    },
    sorts: [createdTimeAscSort],
  });

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const { properties } = await notion.databases.retrieve(retrieveDatabaseQuery);
  if (properties.tags.type !== 'multi_select') {
    throw new Error('invalid-database-schema');
  }

  // TODO: 通信回数最適化
  const paths = properties.tags.multi_select.options
    .filter(async ({ name }) => {
      const res = await notion.databases.query(filterByTagQuery(name));
      return res.results.length !== 0;
    })
    .map(({ name }) => ({ params: { name } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<PathParams>) => {
  try {
    if (params === undefined) {
      return errorPageProps({ code: 'internal' });
    }

    const { name } = params;

    const pages = await fetchPagesByPaging(filterByTagQuery(name));

    return okPageProps({ name, pages });
  } catch (err) {
    debugErrorLog(err);

    return errorPageProps({ code: 'internal' });
  }
};
