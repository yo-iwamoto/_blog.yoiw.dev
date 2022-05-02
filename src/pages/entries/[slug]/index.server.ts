import { debugErrorLog } from '@/lib/debugLog';
import { notionQuery } from '@/lib/notionQuery';
import { fetchPagesByPaging } from '@/lib/fetchPagesByPaging';
import { slugFilter, statusFilter } from '@/lib/filters';
import { errorPageProps, okPageProps } from '@/lib/response';
import { fetchPageAndBlocks } from '@/lib/fetchPageAndBlocks';
import type { GetStaticPropsContext } from 'next';

type PathParams = {
  slug: string;
};

const publicQuery = notionQuery({ filter: statusFilter('public') });
const filterBySlugQuery = (slug: string) =>
  notionQuery({
    filter: {
      and: [statusFilter('public'), slugFilter(slug)],
    },
  });

export const getStaticPaths = async () => {
  const pages = await fetchPagesByPaging(publicQuery);

  const paths = pages.map((page) => ({ params: { slug: page.properties.slug } }));

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

    const { slug } = params;
    const page = await fetchPageAndBlocks(filterBySlugQuery(slug));

    return okPageProps(page);
  } catch (err) {
    debugErrorLog(err);

    return errorPageProps({ code: 'internal' });
  }
};
