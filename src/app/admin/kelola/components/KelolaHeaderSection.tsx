'use client';

import React from 'react';
import { Utensils, RefreshCw } from 'lucide-react';

interface KelolaHeaderSectionProps {
  isLoading: boolean;
  isRefreshing: boolean;
  itemCount: number;
  error: string | null;
  onRefresh: () => void;
}

// Section: judul halaman + jumlah item + tombol refresh + banner error
export const KelolaHeaderSection: React.FC<KelolaHeaderSectionProps> = ({
  isLoading,
  isRefreshing,
  itemCount,
  error,
  onRefresh,
}) => {
  return (
    <>
      {/* Header Title */}
      <div className="bg-[#2A1D16] border border-[#3E2C22] p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#F8F4EC] flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#D49B42]" /> Halaman Kelola Menu Makanan (CRUD)
          </h1>
          <p className="text-xs text-[#C5B8A8] mt-1">
            Data menu diambil langsung dari database MySQL via Backend API. Foto disimpan di Cloud Storage.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="px-3 py-1 bg-[#2E7D32]/20 border border-[#2E7D32]/40 text-[#2E7D32] text-xs font-bold rounded-full">
            {isLoading ? '...' : `${itemCount} Item Aktif`}
          </span>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42]/60 text-[#C5B8A8] hover:text-[#F8F4EC] text-xs font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Memuat...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-2xl px-4 py-3 text-xs text-red-300">
          ⚠️ {error} — Pastikan backend berjalan di <strong>http://localhost:5000</strong>.
        </div>
      )}
    </>
  );
};
