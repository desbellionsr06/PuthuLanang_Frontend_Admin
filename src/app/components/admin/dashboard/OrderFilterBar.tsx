'use client';

import React from 'react';
import { ShoppingBag, Filter } from 'lucide-react';

interface OrderFilterBarProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const OrderFilterBar: React.FC<OrderFilterBarProps> = ({
  statusFilter,
  setStatusFilter,
}) => {
  const filterOptions = ['Semua', 'Baru', 'Diproses', 'Selesai', 'Dibatalkan'];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-base sm:text-lg font-bold text-[#F8F4EC] flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#D49B42]" /> Tabel Data Pesanan Masuk
        </h2>
        <p className="text-xs text-[#C5B8A8]">
          Kelola status pesanan dari konsumen dan atur prioritas pengukusan bambu.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
        <span className="text-xs font-bold text-[#C5B8A8] flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter Status:
        </span>
        {filterOptions.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border active:scale-95 ${
              statusFilter === st
                ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-md'
                : 'bg-[#1E1510] border-[#3E2C22] text-[#C5B8A8] hover:text-white hover:border-[#D49B42]/50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>
    </div>
  );
};
