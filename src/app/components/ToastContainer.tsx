'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 animate-pulse-subtle ${
            toast.type === 'success'
              ? 'bg-[#241913] border-[#2E7D32] text-[#F8F4EC]'
              : toast.type === 'warning'
              ? 'bg-[#241913] border-[#D49B42] text-[#F8F4EC]'
              : 'bg-[#241913] border-[#3F2D23] text-[#C5B8A8]'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-[#D49B42] shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#D49B42] shrink-0" />}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#C5B8A8] hover:text-[#F8F4EC] p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
