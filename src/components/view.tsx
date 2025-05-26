import React from 'react';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { RECIPE_VIEWS_QUERY } from '@/sanity/lib/queries';

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(RECIPE_VIEWS_QUERY, { id });

  // TODO: update the number of views in real-time

  return (
    <div className='view-container'>
      <div className='absolute top-4 -right-2'>
        <Ping />
      </div>

      <p className='view-text'>
        <span className='font-black'>views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
