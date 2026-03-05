import React, { FC, ReactNode } from 'react';

interface Props {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

const FormField: FC<Props> = ({ label, required, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
      {required && <span className="text-indigo-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && (
      <p className="flex items-center gap-1 text-xs text-red-600 font-medium">
        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

export default FormField;
