import { z } from 'zod';

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

export const zRichTextSchema = z
  .object({
    type: z.literal('text'),
    text: z.object({
      content: z.string(),
      link: z.object({}).passthrough().nullable(),
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

export type TRichTextSchema = z.infer<typeof zRichTextSchema>;

export const zMultiSelectEntry = z
  .object({
    id: z.string(),
    name: z.string(),
    color: z.nativeEnum(NotionAnnotationColor),
  })
  .passthrough();

export type TMultiSelectEntry = z.infer<typeof zMultiSelectEntry>;

export const zPageSchema = z
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
            multi_select: z.array(zMultiSelectEntry),
          })
          .passthrough(),
      })
      .passthrough(),
  })
  .passthrough();

export type TPageSchema = z.infer<typeof zPageSchema>;
