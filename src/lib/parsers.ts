import { dayjs } from '@/lib/dayjs';
import { z } from 'zod';
import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

enum NotionAnnotationColor {
  Default = 'default',
  Gray = 'gray',
  Brown = 'brown',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple',
  Pink = 'pink',
  Red = 'red',
  GrayBg = 'gray_background',
  BrownBg = 'brown_background',
  OrangeBg = 'orange_background',
  YellowBg = 'yellow_background',
  GreenBg = 'green_background',
  BlueBg = 'blue_background',
  PurpleBg = 'purple_background',
  PinkBg = 'pink_background',
  RedBg = 'red_background',
}

const zRichTextSchema = z
  .object({
    type: z.literal('text'),
    text: z.object({
      content: z.string(),
      link: z.string().nullable(),
    }),
    annotations: z
      .object({
        bold: z.boolean(),
        italic: z.boolean(),
        strikethrough: z.boolean(),
        underline: z.boolean(),
        code: z.boolean(),
        color: z.nativeEnum(NotionAnnotationColor),
      })
      .passthrough(),
    plain_text: z.string(),
  })
  .passthrough();

const zPageSchema = z
  .object({
    properties: z
      .object({
        title: z
          .object({
            type: z.literal('title'),
            title: z.array(zRichTextSchema),
          })
          .passthrough(),
        slug: z
          .object({
            type: z.literal('rich_text'),
            rich_text: z.array(zRichTextSchema.passthrough()),
          })
          .passthrough(),
        is_public: z
          .object({
            type: z.literal('checkbox'),
            checkbox: z.boolean(),
          })
          .passthrough(),
        created_at: z
          .object({
            type: z.literal('created_time'),
            created_time: z.string(),
          })
          .passthrough(),
        updated_at: z
          .object({
            type: z.literal('last_edited_time'),
            last_edited_time: z.string(),
          })
          .passthrough(),
        tags: z
          .object({
            type: z.literal('multi_select'),
            multi_select: z.array(
              z
                .object({
                  id: z.string(),
                  name: z.string(),
                  color: z.nativeEnum(NotionAnnotationColor),
                })
                .passthrough()
            ),
          })
          .passthrough(),
      })
      .passthrough(),
  })
  .passthrough();

/**
 * @throws Error when the properties are invlid
 */
export const parseNotionPage = (page: GetPageResponse) => {
  const result = zPageSchema.safeParse(page);
  if (!result.success) {
    throw new Error('notion-page-type-assertion-failed');
  }

  const {
    data: {
      properties: { title, slug, is_public, created_at, updated_at, tags },
    },
  } = result;

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
