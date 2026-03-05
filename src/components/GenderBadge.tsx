import React, { FC } from 'react';

interface Props { gender?: string; }

const GenderBadge: FC<Props> = ({ gender }) => {
  const isMale = gender === 'M';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
      ${isMale ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
      {isMale ? '♂ Male' : '♀ Female'}
    </span>
  );
};

export default GenderBadge;
