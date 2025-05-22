import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'number',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
