import React, { FC, ReactNode } from 'react';
import type { ToastState } from '../types';

// ─── Spinner ──────────────────────────────────────────────────────────────────

interface SpinnerProps { size?: number; color?: string; }

export const Spinner: FC<SpinnerProps> = ({ size = 22, color = '#c8a96e' }) => (
  <svg className="spin" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

// ─── Page Loader ──────────────────────────────────────────────────────────────

export const PageLoader: FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: 280, gap: '1rem', color: '#999' }}>
    <Spinner size={36} />
    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{text}</span>
  </div>
);

// ─── Toast ────────────────────────────────────────────────────────────────────

export const Toast: FC<{ toast: ToastState | null }> = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.type === 'success'
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
      }
      {toast.message}
    </div>
  );
};

// ─── Form Field ───────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export const FormField: FC<FormFieldProps> = ({ label, required, error, children }) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600,
      color: '#666', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
      {label}
      {required && <span style={{ color: '#c8a96e', marginLeft: 3 }}>*</span>}
    </label>
    {children}
    {error && (
      <p style={{ margin: '0.3rem 0 0', fontSize: '0.76rem', color: '#dc2626',
        display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// ─── Gender Badge ─────────────────────────────────────────────────────────────

export const GenderBadge: FC<{ gender?: string }> = ({ gender }) => {
  const isMale = gender === 'M';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
      padding: '0.18rem 0.6rem', borderRadius: 20,
      fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em',
      background: isMale ? '#dbeafe' : '#fce7f3',
      color: isMale ? '#1d4ed8' : '#be185d',
    }}>
      {isMale ? '♂ Male' : '♀ Female'}
    </span>
  );
};

// ─── Error State ──────────────────────────────────────────────────────────────

interface ErrorStateProps { message: string; onRetry?: () => void; }

export const ErrorState: FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#dc2626"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#555', marginBottom: '1.25rem' }}>{message}</p>
    {onRetry && (
      <button onClick={onRetry} style={{ background: '#1a1a1a', color: '#f5f4f0', border: 'none',
        padding: '0.6rem 1.4rem', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
        Try again
      </button>
    )}
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

export const EmptyState: FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#d6d3cc"
      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
    <p style={{ fontSize: '1rem', fontWeight: 700, color: '#555', margin: '0 0 0.35rem' }}>{title}</p>
    <p style={{ fontSize: '0.85rem', color: '#999', margin: 0 }}>{subtitle}</p>
  </div>
);
