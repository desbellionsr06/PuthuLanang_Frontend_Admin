'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Sparkles, RefreshCw, Play, AlertCircle } from 'lucide-react';
import {
  AiLogItem,
  AiVerificationStats,
  AiVerificationStatus,
  fetchAiLogs,
  fetchAiStats,
  generateAiQueueTest,
  verifyAiLog,
} from '@/lib/adminApi';
import { AiSummaryCards } from './components/AiSummaryCards';
import { AiVerificationTable } from './components/AiVerificationTable';
import { AiVerifyModal } from './components/AiVerifyModal';
import { useStore } from '@/store/useStore';

export default function AiVerificationPage() {
  const addToast = useStore((s) => s.addToast);

  const [logs, setLogs] = useState<AiLogItem[]>([]);
  const [stats, setStats] = useState<AiVerificationStats | null>(null);
  const [statusFilter, setStatusFilter] = useState<AiVerificationStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<AiLogItem | null>(null);

  const loadAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [logRows, aiStats] = await Promise.all([
        fetchAiLogs(statusFilter),
        fetchAiStats(),
      ]);
      setLogs(logRows);
      setStats(aiStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data log AI.');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    let active = true;
    const fetchInitial = async () => {
      try {
        const [logRows, aiStats] = await Promise.all([
          fetchAiLogs(statusFilter),
          fetchAiStats(),
        ]);
        if (!active) return;
        setLogs(logRows);
        setStats(aiStats);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Gagal memuat data log AI.');
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    void fetchInitial();
    return () => {
      active = false;
    };
  }, [statusFilter]);

  const handleSelectFilter = (tab: AiVerificationStatus | 'all') => {
    setIsLoading(true);
    setError(null);
    setStatusFilter(tab);
  };

  const handleVerifySubmit = async (
    logId: number,
    decision: 'verified' | 'rejected',
    notes: string
  ) => {
    setIsSubmitting(true);
    try {
      await verifyAiLog(logId, decision, notes);
      addToast(
        decision === 'verified'
          ? `Hasil AI #${logId} disetujui & notifikasi dikirim ke pelanggan.`
          : `Hasil AI #${logId} ditolak dengan catatan koreksi.`,
        decision === 'verified' ? 'success' : 'info'
      );
      setSelectedLog(null);
      await loadAll();
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Gagal memverifikasi hasil AI.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickVerify = async (logId: number, decision: 'verified' | 'rejected') => {
    await handleVerifySubmit(
      logId,
      decision,
      'Tervalidasi oleh Pemantau/Manajer gerai Puthu Lanang.'
    );
  };

  const handleRunAiTest = async () => {
    setIsGenerating(true);
    try {
      await generateAiQueueTest({
        outlet: 'Gerai Pusat Celaket',
        day: 'Hari Ini',
        timeSlot: '17:00 - 17:30',
        distanceKm: 1.5,
      });
      addToast('Prediksi Gemini AI baru berhasil dibuat dan masuk antrean verifikasi.', 'success');
      await loadAll();
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Gagal menjalankan simulasi AI.', 'warning');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn min-w-0">
      {/* Header Banner */}
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Sparkles className="w-5 h-5 text-[#D49B42] shrink-0" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#F8F4EC]">
              Verifikasi Manual Hasil AI
            </h1>
            <span className="px-2.5 py-0.5 bg-[#D49B42]/20 border border-[#D49B42]/40 text-[#D49B42] text-[10px] font-extrabold rounded-full uppercase">
              Pemantau / Manajer
            </span>
          </div>
          <p className="text-xs text-[#C5B8A8]">
            Audit dan validasi keluaran JSON dari Gemini AI sebelum dijadikan rekomendasi resmi atau dikirim via Push Notification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleRunAiTest}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D49B42] hover:bg-[#F3B251] text-[#17110C] text-xs font-extrabold shadow-md transition-all disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Memanggil Gemini...' : 'Uji Generate AI'}</span>
          </button>
          <button
            onClick={loadAll}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E1510] hover:bg-[#3E2C22] border border-[#3E2C22] text-[#F8F4EC] text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#D49B42] ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Analitik AI */}
      <AiSummaryCards stats={stats} isLoading={isLoading} />

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#241913] border border-[#3E2C22] rounded-2xl p-3 sm:p-4">
        <span className="text-xs font-bold text-[#C5B8A8]">Filter Status Verifikasi:</span>
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'verified', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleSelectFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#2E7D32] text-white shadow-md'
                  : 'bg-[#1E1510] text-[#C5B8A8] border border-[#3E2C22] hover:text-white'
              }`}
            >
              {tab === 'all' ? 'Semua' : tab}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-2xl p-4 flex items-center gap-2.5 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabel / Card Verifikasi AI */}
      <AiVerificationTable
        logs={logs}
        isLoading={isLoading}
        onInspect={(log) => setSelectedLog(log)}
        onQuickVerify={handleQuickVerify}
      />

      {/* Modal Detail & Verifikasi Manual */}
      <AiVerifyModal
        key={selectedLog?.id ?? 'closed'}
        log={selectedLog}
        isSubmitting={isSubmitting}
        onClose={() => setSelectedLog(null)}
        onSubmit={handleVerifySubmit}
      />
    </div>
  );
}
