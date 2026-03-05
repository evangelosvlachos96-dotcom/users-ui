import { useState, useCallback } from 'react';
import type { ToastState } from '../types';

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const show = useCallback((message: string, type: ToastState['type']) => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  return {
    toast,
    success: (msg: string) => show(msg, 'success'),
    error:   (msg: string) => show(msg, 'error'),
  };
}
