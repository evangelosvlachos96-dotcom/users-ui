import React, { FC } from 'react';
import type { ToastState } from '../types';

interface Props { toast: ToastState | null; }

const Toast: FC<Props> = ({ toast }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium transition-all
      ${isSuccess ? 'bg-gray-900 text-white' : 'bg-red-600 text-white'}`}>
      {isSuccess ? (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )}
      <span>{toast.message}</span>
    </div>
  );
};

export default Toast;
