import { dayjs } from '@/lib/dayjs';
import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

const parseError = new Error('notion-page-type-assertion-failed');

/**
 * cause side-effect: raise error when the properties are invlid
 */
export const parseNotionPage = (page: GetPageResponse) => {
  if (!('properties' in page)) {
    throw parseError;
  }

  // distruct props, these may be undefined
  const {
    properties: { title, slug, is_public, created_at, updated_at, tags },
  } = page;

  // TODO: 抽象化
  if (
    title === undefined ||
    title.type !== 'title' ||
    slug === undefined ||
    slug.type !== 'rich_text' ||
    is_public === undefined ||
    is_public.type !== 'checkbox' ||
    created_at === undefined ||
    created_at.type !== 'created_time' ||
    updated_at === undefined ||
    updated_at.type !== 'last_edited_time' ||
    tags === undefined ||
    tags.type !== 'multi_select'
  ) {
    throw parseError;
  }

  return {
    title: title.title.map((text) => text.plain_text).join(),
    slug: slug.rich_text.map((text) => text.plain_text).join(),
    is_public: is_public.checkbox,
    created_at: dayjs(created_at.created_time).format('YYYY/MM/DD'),
    updated_at: dayjs(updated_at.last_edited_time).format('YYYY/MM/DD'),
    tags: tags.multi_select,
  };
};

/**
 * cause side-effect: raise error when the properties are invlid
 */
export const parseNotionPageSlug = (page: GetPageResponse) => {
  if (!('properties' in page)) {
    throw parseError;
  }

  // distruct props, these may be undefined
  const {
    properties: { slug },
  } = page;

  // TODO: 抽象化
  if (slug === undefined || slug.type !== 'rich_text') {
    throw parseError;
  }

  return {
    slug: slug.rich_text.map((text) => text.plain_text).join(),
  };
};
