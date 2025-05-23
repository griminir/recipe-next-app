import { defineQuery } from 'next-sanity';

export const RECIPES_QUERY =
  defineQuery(`*[_type == 'recipe' && defined(slug.current)] | order(_createdAt desc) {
  _id,
  _createdAt,
  author -> {
    _id, name, image
  }, 
  category[] -> {
    _id, title
  }, 
  slug,
  description, 
  image,
  views,
}`);
