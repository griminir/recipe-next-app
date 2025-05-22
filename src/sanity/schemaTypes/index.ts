import { type SchemaTypeDefinition } from 'sanity';
import { author } from './author';
import { recipe } from './recipe';
import { category } from './category';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, recipe, category],
};
