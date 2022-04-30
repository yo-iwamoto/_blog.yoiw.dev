import { debugErrorLog } from '@/lib/debugLog';
import { getAllPublicPageSlugs } from '@/server/dataAccess/getAllPublicPageSlugs';
import { getPage } from '@/server/dataAccess/getPage';
import { errorPageProps, okPageProps } from '@/server/lib/response';
import type { GetStaticPropsContext } from 'next';

type PathParams = {
  slug: string;
};

export const getStaticPaths = async () => {
  const { slugs } = await getAllPublicPageSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<PathParams>) => {
  try {
    if (params === undefined) {
      return errorPageProps({ code: 'internal' });
    }

    const page = await getPage(params.slug);

    return okPageProps(page);
  } catch (err) {
    debugErrorLog(err);

    return errorPageProps({ code: 'internal' });
  }
};
