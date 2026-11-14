'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorSegment({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Segment Error Handler caught an error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#241913] border border-[#3E2C22] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-[#D49B42]/15 border border-[#D49B42]/30 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-[#D49B42]" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg font-extrabold text-[#F8F4EC]">Gagal Memuat Segmen Halaman</h2>
          <p className="text-xs text-[#C5B8A8] leading-relaxed">
            Terjadi masalah saat memuat data tampilan. Silakan coba lagi atau kembali beberapa saat kemudian.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-[#D49B42] bg-[#17110C] py-1 px-2.5 rounded-lg inline-block">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#388E3C] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Coba Lagi</span>
          </button>
        </div>
      </div>
    </div>
  );
}

