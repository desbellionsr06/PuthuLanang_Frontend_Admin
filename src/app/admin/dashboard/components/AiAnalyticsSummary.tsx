'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, Clock, XCircle, ArrowRight, ShieldCheck, Play } from 'lucide-react';
import { AiVerificationStats } from '@/lib/adminApi';

interface AiAnalyticsSummaryProps {
  aiStats: AiVerificationStats | null;
  isLoading: boolean;
}

/**
 * Panel Analitik AI khusus peran Pemantau/Manajer pada Dashboard.
 * Menampilkan ringkasan status validasi hasil generate Gemini AI dan shortcut ke Verifikasi Manual.
 */
export const AiAnalyticsSummary: React.FC<AiAnalyticsSummaryProps> = ({ aiStats, isLoading }) => {
  const total = aiStats?.total_logs ?? 0;
  const pending = aiStats?.pending_count ?? 0;
  const verified = aiStats?.verified_count ?? 0;
  const rejected = aiStats?.rejected_count ?? 0;
  const rate = aiStats?.verification_rate_pct ?? 0;

  return (
    <section className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Sparkles className="w-5 h-5 text-[#D49B42] shrink-0" />
            <h2 className="text-base sm:text-lg font-extrabold text-[#F8F4EC]">
              Analitik & Audit Hasil Gemini AI
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#D49B42]/15 border border-[#D49B42]/40 text-[#D49B42] text-[10px] font-extrabold uppercase">
              Pemantau / Manajer
            </span>
          </div>
          <p className="text-xs text-[#C5B8A8] mt-1">
            Ringkasan kepatuhan dan status verifikasi manual output AI dari pengguna Mobile sebelum dipublikasikan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href="/admin/ai-verification"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D49B42] hover:bg-[#F3B251] text-[#17110C] text-xs font-extrabold shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Generate / Uji AI</span>
          </Link>
          <Link
            href="/admin/ai-verification"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#388E3C] text-white text-xs font-extrabold shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>Verifikasi Manual</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#1E1510] border border-[#3E2C22] rounded-2xl p-3.5 sm:p-4 min-w-0">
          <div className="flex items-center justify-between text-xs text-[#C5B8A8]">
            <span className="truncate">Total Output AI</span>
            <ShieldCheck className="w-4 h-4 text-[#D49B42] shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-[#F8F4EC] mt-2">
            {isLoading ? '...' : total}
          </p>
          <p className="text-[11px] text-[#C5B8A8] mt-0.5 truncate">Lolos validasi JSON</p>
        </div>

        <div className="bg-[#1E1510] border border-[#3E2C22] rounded-2xl p-3.5 sm:p-4 min-w-0">
          <div className="flex items-center justify-between text-xs text-[#C5B8A8]">
            <span className="truncate">Menunggu Review</span>
            <Clock className="w-4 h-4 text-[#D49B42] shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-[#D49B42] mt-2">
            {isLoading ? '...' : pending}
          </p>
          <p className="text-[11px] text-[#C5B8A8] mt-0.5 truncate">Butuh verifikasi manajer</p>
        </div>

        <div className="bg-[#1E1510] border border-[#3E2C22] rounded-2xl p-3.5 sm:p-4 min-w-0">
          <div className="flex items-center justify-between text-xs text-[#C5B8A8]">
            <span className="truncate">Terverifikasi</span>
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-[#2E7D32] mt-2">
            {isLoading ? '...' : verified}
          </p>
          <p className="text-[11px] text-[#C5B8A8] mt-0.5 truncate">Tingkat validitas {rate}%</p>
        </div>

        <div className="bg-[#1E1510] border border-[#3E2C22] rounded-2xl p-3.5 sm:p-4 min-w-0">
          <div className="flex items-center justify-between text-xs text-[#C5B8A8]">
            <span className="truncate">Ditolak / Koreksi</span>
            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-red-300 mt-2">
            {isLoading ? '...' : rejected}
          </p>
          <p className="text-[11px] text-[#C5B8A8] mt-0.5 truncate">Dikoreksi manual</p>
        </div>
      </div>
    </section>
  );
};

