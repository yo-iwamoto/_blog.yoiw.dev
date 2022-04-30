import { debugErrorLog } from '@/lib/debugLog';
import { getAllPublicPages } from '@/server/dataAccess/getAllPublicPages';
import { errorPageProps, okPageProps } from '@/server/lib/response';

export const getStaticProps = async () => {
  try {
    const pages = await getAllPublicPages();

    return okPageProps({ pages });
  } catch (err) {
    debugErrorLog(err);

    return errorPageProps({ code: 'internal' });
  }
};
