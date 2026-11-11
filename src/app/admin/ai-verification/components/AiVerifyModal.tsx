'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { AiLogItem } from '@/lib/adminApi';

interface AiVerifyModalProps {
  log: AiLogItem | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (logId: number, status: 'verified' | 'rejected', notes: string) => Promise<void>;
}

const DEFAULT_VERIFICATION_NOTE =
  'Kondisi antrean dan saran telah divalidasi sesuai pantauan operasional gerai.';

export const AiVerifyModal: React.FC<AiVerifyModalProps> = ({
  log,
  isSubmitting,
  onClose,
  onSubmit,
}) => {
  const [notes, setNotes] = useState(
    () => log?.verification_notes || DEFAULT_VERIFICATION_NOTE
  );

  if (!log) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#241913] border border-[#3E2C22] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-[#2A1D16] border-b border-[#3E2C22] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#2E7D32]/20 border border-[#2E7D32]/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-extrabold text-[#F8F4EC] truncate">
                Verifikasi Output AI #{log.id}
              </h3>
              <p className="text-[11px] text-[#C5B8A8] truncate">
                Tipe: {log.feature_type === 'queue_estimator' ? 'Estimasi Antrean' : 'Rekomendasi Menu'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#C5B8A8] hover:text-white hover:bg-[#3E2C22] transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#17110C] border border-[#3E2C22] rounded-2xl p-3.5 space-y-1.5 min-w-0">
              <p className="font-bold text-[#D49B42] uppercase text-[10px] tracking-wider">
                Input Konteks (Teranonimisasi)
              </p>
              <pre className="text-[11px] text-[#C5B8A8] whitespace-pre-wrap break-words font-mono">
                {JSON.stringify(log.anonymized_input, null, 2)}
              </pre>
            </div>

            <div className="bg-[#17110C] border border-[#3E2C22] rounded-2xl p-3.5 space-y-1.5 min-w-0">
              <p className="font-bold text-[#2E7D32] uppercase text-[10px] tracking-wider">
                Output JSON Tervalidasi (Gemini)
              </p>
              <pre className="text-[11px] text-[#F8F4EC] whitespace-pre-wrap break-words font-mono">
                {JSON.stringify(log.validated_output, null, 2)}
              </pre>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="manager-verification-notes"
              className="block text-xs font-bold text-[#F8F4EC]"
            >
              Catatan Verifikasi / Koreksi Manajer (akan dikirim via Push Notification ke Mobile)
            </label>
            <textarea
              id="manager-verification-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={300}
              placeholder="Contoh: Antrean aktual sekitar 10 menit, silakan menuju gerai Celaket."
              className="w-full bg-[#17110C] border border-[#3E2C22] rounded-xl p-3 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#1E1510] border-t border-[#3E2C22] flex flex-col sm:flex-row justify-end gap-2.5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onSubmit(log.id, 'rejected', notes)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-900/40 hover:bg-red-800/60 border border-red-700/50 text-red-200 text-xs font-bold transition-all disabled:opacity-50"
          >
            <XCircle className="w-4 h-4" />
            <span>Tolak & Beri Koreksi</span>
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onSubmit(log.id, 'verified', notes)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#388E3C] text-white text-xs font-extrabold shadow-lg transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Menyimpan...' : 'Setujui & Notifikasi Pelanggan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
