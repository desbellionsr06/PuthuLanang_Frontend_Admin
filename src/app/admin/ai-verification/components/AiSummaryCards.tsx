'use client';

import React from 'react';
import { Sparkles, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { AiVerificationStats } from '@/lib/adminApi';

interface AiSummaryCardsProps {
  stats: AiVerificationStats | null;
  isLoading: boolean;
}

export const AiSummaryCards: React.FC<AiSummaryCardsProps> = ({ stats, isLoading }) => {
  const val = (n?: number) => (isLoading ? '...' : String(n ?? 0));

  const cards = [
    {
      label: 'Total Prediksi AI',
      value: val(stats?.total_logs),
      hint: 'Tersimpan tervalidasi JSON',
      Icon: Sparkles,
      accent: 'text-[#D49B42]',
    },
    {
      label: 'Menunggu Verifikasi',
      value: val(stats?.pending_count),
      hint: 'Antrean review manajer',
      Icon: Clock,
      accent: 'text-[#D49B42]',
    },
    {
      label: 'Disetujui (Verified)',
      value: val(stats?.verified_count),
      hint: `Tingkat akurasi ${stats?.verification_rate_pct ?? 0}%`,
      Icon: CheckCircle2,
      accent: 'text-[#2E7D32]',
    },
    {
      label: 'Ditolak / Dikoreksi',
      value: val(stats?.rejected_count),
      hint: 'Diberi catatan manajer',
      Icon: XCircle,
      accent: 'text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, hint, Icon, accent }) => (
        <div
          key={label}
          className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-3 hover:border-[#D49B42]/70 transition-colors min-w-0"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#C5B8A8] truncate">{label}</span>
            <div className="w-9 h-9 rounded-xl bg-[#1E1510] border border-[#3E2C22] flex items-center justify-center shrink-0">
              <Icon className={`w-4 h-4 ${accent}`} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#F8F4EC]">{value}</p>
            <p className="text-[11px] text-[#D49B42] font-semibold mt-0.5 truncate">{hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

