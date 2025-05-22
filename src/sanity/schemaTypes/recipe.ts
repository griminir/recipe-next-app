import { defineField, defineType } from 'sanity';

export const recipe = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'views',
      type: 'number',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule) =>
        Rule.min(1)
          .max(3)
          .required()
          .error('At least one category is required, max three'),
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
    defineField({
      name: 'ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'ingredientList',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().error('Ingredients are required'),
    }),
    defineField({
      name: 'instructions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
