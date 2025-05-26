import React from 'react';
import { client } from '@/sanity/lib/client';
import { RECIPE_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(RECIPE_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className='view-container'>
      <p className='view-text'>
        <span className='font-black'>views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
