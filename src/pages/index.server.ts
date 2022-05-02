import { debugErrorLog } from '@/lib/debugLog';
import { notionQuery } from '@/lib/notionQuery';
import { fetchPagesByPaging } from '@/lib/fetchPagesByPaging';
import { statusFilter } from '@/lib/filters';
import { errorPageProps, okPageProps } from '@/lib/response';
import { createdTimeAscSort } from '@/lib/sorts';

const publicQuery = notionQuery({
  filter: statusFilter('public'),
  sorts: [createdTimeAscSort],
});

export const getStaticProps = async () => {
  try {
    // const pages = await getAllPublicPages();
    const pages = await fetchPagesByPaging(publicQuery);

    return okPageProps({ pages });
  } catch (err) {
    debugErrorLog(err);

    return errorPageProps({ code: 'internal' });
  }
};
