import { zPageSchema } from './schema';
import { dayjs } from '@/lib/dayjs';
import type { TMultiSelectEntry } from './schema';
import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

type ParseNotionPageReturn = {
  title: string;
  slug: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  tags: TMultiSelectEntry[];
};

/**
 * @throws Error when the properties are invlid
 */
export const parseNotionPage = (page: GetPageResponse): ParseNotionPageReturn => {
  const result = zPageSchema.safeParse(page);
  if (!result.success) {
    throw new Error('notion-page-type-assertion-failed');
  }

  const {
    data: {
      properties: { title, slug, is_public, created_at, updated_at, tags },
    },
  } = result;
  console.log();

  const formatted = {
    title: title.title.map((t) => t.plain_text).join(''),
    slug: slug.rich_text.map((t) => t.plain_text).join(''),
    is_public: is_public.checkbox,
    created_at: dayjs(created_at.created_time).format('YYYY/MM/DD'),
    updated_at: dayjs(updated_at.last_edited_time).format('YYYY/MM/DD'),
    tags: tags.multi_select,
  };

  return formatted;
};
