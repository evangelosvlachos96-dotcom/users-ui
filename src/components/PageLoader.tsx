import React, { FC } from 'react';
import Spinner from './Spinner';

interface Props { text?: string; }

const PageLoader: FC<Props> = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
    <Spinner className="h-8 w-8 text-indigo-500" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default PageLoader;
