import React, { FC } from 'react';

interface Props {
  page: number;         // 0-based current page
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: FC<Props> = ({ page, totalPages, hasNext, hasPrevious, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50">
      <span className="text-xs text-gray-400 font-medium">
        Page {page + 1} of {totalPages}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevious}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600
            hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-8 h-8 text-xs font-bold rounded-lg transition-colors
              ${i === page
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-100'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600
            hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
