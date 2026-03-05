import React, { FC } from 'react';

interface Props { title: string; subtitle: string; }

const EmptyState: FC<Props> = ({ title, subtitle }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="rounded-full bg-gray-100 p-4 mb-4">
      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
    <p className="font-semibold text-gray-700 mb-1">{title}</p>
    <p className="text-sm text-gray-400">{subtitle}</p>
  </div>
);

export default EmptyState;
