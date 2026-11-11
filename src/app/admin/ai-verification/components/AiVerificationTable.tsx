'use client';

import React from 'react';
import { CheckCircle2, XCircle, Eye, Clock, MapPin } from 'lucide-react';
import { AiLogItem, AiVerificationStatus } from '@/lib/adminApi';

interface AiVerificationTableProps {
  logs: AiLogItem[];
  isLoading: boolean;
  onInspect: (log: AiLogItem) => void;
  onQuickVerify: (logId: number, status: 'verified' | 'rejected') => void;
}

function StatusBadge({ status }: { status: AiVerificationStatus }) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2E7D32]/20 border border-[#2E7D32]/50 text-[#2E7D32] text-[11px] font-bold">
        <CheckCircle2 className="w-3 h-3" /> Terverifikasi
      </span>
    );
  }
  if (status === 'rejected') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-900/30 border border-red-700/50 text-red-300 text-[11px] font-bold">
        <XCircle className="w-3 h-3" /> Ditolak
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D49B42]/20 border border-[#D49B42]/50 text-[#D49B42] text-[11px] font-bold">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

function summarizeAiOutput(item: AiLogItem): { headline: string; detail: string } {
  const out = item.validated_output || {};
  if (item.feature_type === 'queue_estimator') {
    const level = String(out.crowd_level ?? '-');
    const min = out.wait_time_min ?? '-';
    const max = out.wait_time_max ?? '-';
    return {
      headline: `${level} (~${min}–${max} mnt)`,
      detail: String(out.tips ?? '-'),
    };
  }
  return {
    headline: String(out.recommendation_title ?? 'Rekomendasi Menu AI'),
    detail: String(out.reason ?? '-'),
  };
}

export const AiVerificationTable: React.FC<AiVerificationTableProps> = ({
  logs,
  isLoading,
  onInspect,
  onQuickVerify,
}) => {
  if (isLoading) {
    return (
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl p-10 text-center text-xs text-[#C5B8A8]">
        Memuat data log AI dari backend...
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl p-10 text-center text-xs text-[#C5B8A8]">
        Belum ada hasil generate AI yang cocok dengan filter ini.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Mobile Card View (< md) agar bebas overflow pada layar sempit */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {logs.map((item) => {
          const summary = summarizeAiOutput(item);
          const input = item.anonymized_input || {};
          return (
            <div
              key={item.id}
              className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl p-4 space-y-3 shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[11px] font-mono font-bold text-[#D49B42]">
                    AI-#{item.id} • {item.feature_type === 'queue_estimator' ? 'Antrean' : 'Rekomendasi'}
                  </span>
                  <h3 className="text-sm font-extrabold text-[#F8F4EC] break-words mt-0.5">
                    {summary.headline}
                  </h3>
                </div>
                <StatusBadge status={item.verification_status} />
              </div>

              <p className="text-xs text-[#C5B8A8] break-words">{summary.detail}</p>

              <div className="text-[11px] text-[#C5B8A8] bg-[#1E1510] border border-[#3E2C22] rounded-xl p-2.5 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D49B42] shrink-0" />
                  <span className="truncate">
                    {String(input.outlet ?? 'Gerai Pusat Celaket')} ({String(input.timeSlot ?? '-')})
                  </span>
                </div>
                <div>
                  Jarak GPS: {input.distanceKm != null ? `${input.distanceKm} km` : '-'} • Akurasi:{' '}
                  <span className="text-[#D49B42] font-semibold">{item.confidence_score || '-'}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => onInspect(item)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1E1510] border border-[#3E2C22] text-[#F8F4EC] text-xs font-bold"
                >
                  <Eye className="w-3.5 h-3.5" /> Detail & Verifikasi
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (>= md) dengan overflow-x-auto */}
      <div className="hidden md:block bg-[#2A1D16] border border-[#3E2C22] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#1E1510] text-[#C5B8A8] uppercase tracking-wider font-bold border-b border-[#3E2C22]">
              <tr>
                <th className="p-4">ID & Fitur</th>
                <th className="p-4">Konteks Anonim</th>
                <th className="p-4">Output Tervalidasi (JSON)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi Manajer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3E2C22] text-[#F8F4EC]">
              {logs.map((item) => {
                const summary = summarizeAiOutput(item);
                const input = item.anonymized_input || {};
                return (
                  <tr key={item.id} className="hover:bg-[#1E1510]/60 transition-colors">
                    <td className="p-4 align-top whitespace-nowrap">
                      <div className="font-mono font-extrabold text-[#D49B42]">AI-#{item.id}</div>
                      <div className="text-[11px] text-[#C5B8A8] mt-0.5">
                        {item.feature_type === 'queue_estimator' ? 'Queue Estimator' : 'Smart Menu'}
                      </div>
                      <div className="text-[10px] text-[#C5B8A8] mt-1">
                        Oleh: {item.requested_by_name || 'Guest / Sistem'}
                      </div>
                    </td>
                    <td className="p-4 align-top max-w-[220px]">
                      <div className="font-bold text-[#F8F4EC] truncate">
                        {String(input.outlet ?? 'Gerai Pusat Celaket')}
                      </div>
                      <div className="text-[11px] text-[#C5B8A8] mt-0.5">
                        Slot: {String(input.timeSlot ?? '-')} ({String(input.day ?? '-')})
                      </div>
                      <div className="text-[11px] text-[#C5B8A8] mt-0.5">
                        Jarak GPS: {input.distanceKm != null ? `${input.distanceKm} km` : '-'}
                      </div>
                    </td>
                    <td className="p-4 align-top max-w-sm">
                      <div className="font-bold text-[#D49B42]">{summary.headline}</div>
                      <p className="text-[11px] text-[#C5B8A8] mt-1 break-words line-clamp-2">
                        {summary.detail}
                      </p>
                      {item.confidence_score && (
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-[#1E1510] border border-[#3E2C22] text-[10px] text-[#D49B42]">
                          {item.confidence_score}
                        </span>
                      )}
                    </td>
                    <td className="p-4 align-top whitespace-nowrap">
                      <StatusBadge status={item.verification_status} />
                      {item.verification_notes && (
                        <p className="text-[10px] text-[#C5B8A8] mt-1.5 max-w-[160px] truncate" title={item.verification_notes}>
                          {item.verification_notes}
                        </p>
                      )}
                    </td>
                    <td className="p-4 align-top text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onInspect(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#1E1510] hover:bg-[#3E2C22] border border-[#3E2C22] text-[#F8F4EC] text-[11px] font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Detail
                        </button>
                        {item.verification_status === 'pending' && (
                          <>
                            <button
                              onClick={() => onQuickVerify(item.id, 'verified')}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#388E3C] text-white text-[11px] font-bold transition-colors"
                              title="Setujui Langsung"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Setujui
                            </button>
                            <button
                              onClick={() => onInspect(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-900/40 hover:bg-red-800/60 border border-red-700/50 text-red-200 text-[11px] font-bold transition-colors"
                              title="Tolak & Beri Catatan"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Tolak
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

