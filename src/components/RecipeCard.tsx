import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Author, Category, Recipe } from '@/sanity/sanity.types';

export type RecipeCardType = Omit<Recipe, 'author' | 'category'> & {
  author?: Author;
  category?: Category[];
};

const RecipeCard = ({ post }: { post: RecipeCardType }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className='recipe-card group'>
      <div className='flex-between'>
        <p className='recipe-card_date'>{formatDate(_createdAt)}</p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${author?._id}`}>
            <p className='text-16-medium line-clamp-1'>{author?.name}</p>
          </Link>
          <Link href={`/recipe/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src='https://placehold.co/400/000000/FFFFFF/png'
            alt='placeholder'
            width={48}
            height={48}
            className='rounded-full'
          />
        </Link>
      </div>
      <Link href={`/recipe/${_id}`}>
        <p className='recipe-card_desc'>{description}</p>
        <img src={image} alt='placeholder' className='recipe-card_img' />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        {Array.isArray(category) &&
          category.slice(0, 2).map((cat) => (
            <Link key={cat._id} href={`/?query=${cat.title?.toLowerCase()}`}>
              <p className='text-16-medium'>{cat.title}</p>
            </Link>
          ))}
        <button className='recipe-card_btn'>
          <Link href={`/recipe/${_id}`}>Details</Link>
        </button>
      </div>
    </li>
  );
};

export default RecipeCard;
