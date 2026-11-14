'use client';

import React, { useEffect } from 'react';
import { ShieldAlert, RefreshCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function AdminErrorSegment({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Panel Segment Error:', error);
  }, [error]);

  return (
    <div className="p-4 sm:p-8 flex items-center justify-center min-h-[65vh]">
      <div className="max-w-lg w-full bg-[#241913] border border-[#3E2C22] rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-red-950/40 border border-red-700/40 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7 text-red-400" />
        </div>

        <div className="space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#D49B42]/20 border border-[#D49B42]/40 text-[#D49B42]">
            Panel Manajer / Pemantau
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#F8F4EC]">
            Kendala Akses Data Operasional
          </h2>
          <p className="text-xs text-[#C5B8A8] leading-relaxed">
            Gagal mengambil atau memperbarui data analitik gerai. Pastikan sesi login manajer masih aktif
            dan server backend Express dapat dijangkau.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-[#D49B42] bg-[#17110C] py-1 px-2 rounded-lg inline-block">
              Ref Insiden: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#388E3C] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Muat Ulang Panel</span>
          </button>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E1510] hover:bg-[#3E2C22] border border-[#3E2C22] text-[#F8F4EC] text-xs font-bold transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#D49B42]" />
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

