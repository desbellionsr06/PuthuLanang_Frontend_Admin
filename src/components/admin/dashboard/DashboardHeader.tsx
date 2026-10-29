'use client';

import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#2A1D16] border border-[#3E2C22] p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl">
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#F8F4EC]">
            Dashboard Admin - Puthu Lanang
          </h1>
          <span className="px-2.5 py-0.5 bg-[#2E7D32] text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-xs">
            ADMIN
          </span>
        </div>
        <p className="text-xs text-[#C5B8A8]">
          Ringkasan data transaksi real-time & manajemen antrean dapur Celaket Malang.
        </p>
      </div>

      <div className="text-left sm:text-right text-xs text-[#C5B8A8] bg-[#1E1510] px-3.5 py-2 rounded-xl border border-[#3E2C22] shrink-0">
        Tanggal Hari Ini: <span className="text-[#D49B42] font-bold block sm:inline">Rabu, 30 September 2026</span>
      </div>
    </div>
  );
};
