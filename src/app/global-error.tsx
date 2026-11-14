'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Fatal Global Application Error:', error);
  }, [error]);

  return (
    <html lang="id">
      <body className="bg-[#17110C] text-[#F8F4EC] min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-[#241913] border border-[#3E2C22] rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-red-950/40 border border-red-800/40 mx-auto flex items-center justify-center text-red-400 text-2xl font-bold">
            !
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-extrabold text-[#F8F4EC]">
              Terjadi Kesalahan Sistem Kritis
            </h1>
            <p className="text-xs text-[#C5B8A8] leading-relaxed">
              Sistem mendeteksi kendala pada antarmuka utama. Kesalahan ini telah otomatis dilaporkan
              ke logger pemantau untuk ditinjau.
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-[#D49B42] bg-[#17110C] py-1 px-2 rounded-lg inline-block">
                Kode Insiden: {error.digest}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="w-full py-3 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#388E3C] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

