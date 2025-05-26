import { defineQuery } from 'next-sanity';

export const RECIPES_QUERY =
  defineQuery(`*[_type == 'recipe' && defined(slug.current) && (!defined($search) || title match $search || category[]->title match $search || author->name match $search)] | order(_createdAt desc) {
  _id,
  _createdAt,
  title,
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

export const RECIPE_BY_ID_QUERY =
  defineQuery(`*[_type == 'recipe' && _id == $id][0]{
  _id,
  _createdAt,
  author -> {
    _id, name, username, image,
  }, 
  category[] -> {
    _id, title
  }, 
  slug,
  title,
  description, 
  image,
  ingredients, 
  instructions,
  views,
}`);

export const RECIPE_VIEWS_QUERY =
  defineQuery(`*[_type == 'recipe' && _id == $id][0]{
  _id,
  views
}`);
