'use client';
import React, { useEffect, useState } from 'react';

const View = ({ id }: { id: string }) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views?id=${id}`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, [id]);

  return (
    <div className='view-container'>
      <p className='view-text'>
        <span className='font-black'>views: {views ?? '...'}</span>
      </p>
    </div>
  );
};

export default View;
