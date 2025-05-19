import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import React from 'react';

const RecipeCard = ({ post }: { post: RecipeTypeCard }) => {
  return (
    <li className='recipe-card group:'>
      <div className='flex-between'>
        <p className='recipe-card_date'>{formatDate(post._createdAt)}</p>
      </div>
      <div className='flex gap-1.5'>
        <EyeIcon />
      </div>
    </li>
  );
};

export default RecipeCard;
