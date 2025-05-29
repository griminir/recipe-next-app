
import View from '@/components/view';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { RECIPE_BY_ID_QUERY } from '@/sanity/lib/queries';
import { Category } from '@/sanity/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export const experimental_ppr = true; // Enable parallel routes, this needs canary next version

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(RECIPE_BY_ID_QUERY, { id });
  console.log('post', post);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <section className='green_container !min-h-[230px]'>
        <p className='tag text-white'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
      </section>

      <section className='section_container'>
        <img
          src={post.image}
          alt='thumbnail'
          className='w-full h-auto rounded-xl'
        />

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link
              href={`user/${post.author._id}`}
              className='flex items-center gap-2 mb-3'
            >
              <Image
                src={post.author.image}
                alt='avatar'
                width={64}
                height={64}
                className='rounded-full drop-shadow-lg'
              />
              <div>
                <p className='text-20-medium'>{post.author.name}</p>
                <p className='text-16-medium !text-black-300'>
                  @{post.author.username}
                </p>
              </div>
            </Link>

            {post?.category?.length > 0 && (
              <div className='flex gap-2'>
                {post.category.map((cat: Category) => (
                  <p key={cat._id} className='category-tag'>
                    {cat.title}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className='prose prose-lg max-w-4xl font-work-sans'>
            <h3 className='text-30-bold'>Description</h3>
            <p className='text-16-medium'>{post.description}</p>

            <h3 className='text-30-bold'>Ingredients</h3>
            {post.ingredients?.length > 0 ? (
              post.ingredients.map(
                (ingredients: {
                  _key: string;
                  title: string;
                  ingredientList: string[];
                }) => (
                  <React.Fragment key={ingredients._key}>
                    <h3 className='text-20-medium'>{ingredients.title}</h3>
                    <ul>
                      {ingredients.ingredientList?.length > 0 ? (
                        ingredients.ingredientList.map((ing, idx) => (
                          <li key={idx} className='text-16-medium'>
                            {ing}
                          </li>
                        ))
                      ) : (
                        <p className='text-16-medium'>
                          No ingredients provided
                        </p>
                      )}
                    </ul>
                  </React.Fragment>
                )
              )
            ) : (
              <p className='text-16-medium'>No ingredients provided</p>
            )}

            <h3 className='text-30-bold'>Instructions</h3>
            {post.instructions?.length > 0 ? (
              <ol className='list-decimal pl-5'>
                {post.instructions.map(
                  (instruction: string[], index: number) => (
                    <li key={index} className='text-16-medium'>
                      {instruction}
                    </li>
                  )
                )}
              </ol>
            ) : (
              <p className='text-16-medium'>No instructions provided</p>
            )}

            <hr className='divider' />

            <View id={id} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
