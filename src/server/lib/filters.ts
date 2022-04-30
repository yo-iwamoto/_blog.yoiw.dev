export const slugFilter = (slug: string) => ({
  property: 'slug',
  rich_text: {
    contains: slug,
  },
});

export const statusFilter = (status: 'public' | 'draft') => ({
  property: 'is_public',
  checkbox: {
    equals: status === 'public',
  },
});

export const tagsFilter = (tag: string) => ({
  property: 'tags',
  multi_select: {
    contains: tag,
  },
});
