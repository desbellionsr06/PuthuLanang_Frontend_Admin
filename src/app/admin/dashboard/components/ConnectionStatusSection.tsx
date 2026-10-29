'use client';

import React from 'react';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { POLL_INTERVAL_MS } from '../useDashboardData';

interface ConnectionStatusSectionProps {
  error: string | null;
  lastUpdated: Date | null;
  isRefreshing: boolean;
  onRefresh: () => void;
}

// Section: status bar koneksi backend + tombol refresh
export const ConnectionStatusSection: React.FC<ConnectionStatusSectionProps> = ({
  error,
  lastUpdated,
  isRefreshing,
  onRefresh,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#2A1D16] border border-[#3E2C22] rounded-2xl px-4 py-3">
      <div className="flex items-center gap-2 text-xs">
        {error ? (
          <>
            <WifiOff className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-400 font-semibold">Tidak dapat terhubung ke backend:</span>
            <span className="text-red-300">{error}</span>
          </>
        ) : (
          <>
            <Wifi className="w-4 h-4 text-[#2E7D32] shrink-0" />
            <span className="text-[#2E7D32] font-semibold">Terhubung ke Backend</span>
            {lastUpdated && (
              <span className="text-[#C5B8A8]">
                — Terakhir diperbarui: {lastUpdated.toLocaleTimeString('id-ID')}
              </span>
            )}
            <span className="text-[#C5B8A8] hidden sm:inline">
              (Auto-refresh setiap {POLL_INTERVAL_MS / 1000} detik)
            </span>
          </>
        )}
      </div>
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42]/60 text-[#C5B8A8] hover:text-[#F8F4EC] text-xs font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 shrink-0"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? 'Memperbarui...' : 'Perbarui Sekarang'}
      </button>
    </div>
  );
};
