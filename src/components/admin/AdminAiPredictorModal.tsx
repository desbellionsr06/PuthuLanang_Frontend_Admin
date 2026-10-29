'use client';

import React from 'react';
import { Bot, Sparkles, X, TrendingUp, CloudSun, Calendar, Zap, AlertTriangle } from 'lucide-react';

interface AdminAiPredictorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAiPredictorModal: React.FC<AdminAiPredictorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#241913] border-2 border-[#D49B42]/60 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#241913] via-[#2E7D32]/30 to-[#241913] border-b border-[#3F2D23] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D49B42]/20 border border-[#D49B42]/50 flex items-center justify-center text-[#D49B42]">
              <Bot className="w-6 h-6 text-[#D49B42] animate-bounce" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 bg-[#D49B42] text-[#17110C] font-extrabold text-[10px] rounded-md uppercase tracking-wider">
                RENCANA FITUR AI
              </span>
              <h2 className="text-xl font-extrabold text-[#F8F4EC]">
                AI Smart Stock & Demand Predictor
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#C5B8A8] hover:text-white hover:bg-[#3F2D23] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Main Statement Box */}
          <div className="bg-[#17110C] p-5 rounded-2xl border border-[#D49B42]/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D49B42]">
              <Sparkles className="w-4 h-4 text-[#D49B42]" />
              <span>SPESIFIKASI RENCANA PENGEMBANGAN FITUR AI</span>
            </div>
            <p className="text-xs sm:text-sm text-[#F8F4EC] leading-relaxed font-medium">
              "Fitur AI Rencana Pengembangan: <strong className="text-[#D49B42]">AI Smart Stock & Demand Predictor</strong> yang memprediksi lonjakan pembeli dan kebutuhan adonan kelapa/gula aren berdasarkan cuaca dan hari libur di Malang."
            </p>
          </div>

          {/* Simulated Live Intelligence Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-[#17110C] p-4 rounded-xl border border-[#3F2D23] space-y-2">
              <div className="flex items-center justify-between text-[#2E7D32]">
                <CloudSun className="w-5 h-5" />
                <span className="text-[10px] font-bold bg-[#2E7D32]/20 px-2 py-0.5 rounded">Cuaca Malang</span>
              </div>
              <p className="text-xs text-[#C5B8A8]">Prediksi Cuaca Sore</p>
              <p className="text-sm font-bold text-[#F8F4EC]">Hujan Ringan (21°C)</p>
              <p className="text-[11px] text-[#D49B42] font-semibold">+25% Deman Kudapan Hangat</p>
            </div>

            <div className="bg-[#17110C] p-4 rounded-xl border border-[#3F2D23] space-y-2">
              <div className="flex items-center justify-between text-[#D49B42]">
                <Calendar className="w-5 h-5" />
                <span className="text-[10px] font-bold bg-[#D49B42]/20 px-2 py-0.5 rounded">Hari Libur</span>
              </div>
              <p className="text-xs text-[#C5B8A8]">Kalender Wisata</p>
              <p className="text-sm font-bold text-[#F8F4EC]">Long Weekend Malang</p>
              <p className="text-[11px] text-[#2E7D32] font-semibold">+40% Pengunjung Celaket</p>
            </div>

            <div className="bg-[#17110C] p-4 rounded-xl border border-[#3F2D23] space-y-2">
              <div className="flex items-center justify-between text-[#2E7D32]">
                <TrendingUp className="w-5 h-5" />
                <span className="text-[10px] font-bold bg-[#2E7D32]/20 px-2 py-0.5 rounded">Rekomendasi</span>
              </div>
              <p className="text-xs text-[#C5B8A8]">Rekomendasi Stok Adonan</p>
              <p className="text-sm font-bold text-[#F8F4EC]">550 Porsi Puthu</p>
              <p className="text-[11px] text-[#2E7D32] font-semibold">+15kg Gula Aren Murni</p>
            </div>

          </div>

          {/* Algorithm Work Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5B8A8]">
              Bagaimana Modul AI Bekerja:
            </h4>
            <div className="space-y-2 text-xs text-[#C5B8A8]">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#17110C] border border-[#3F2D23]">
                <Zap className="w-4 h-4 text-[#D49B42] shrink-0 mt-0.5" />
                <span>
                  <strong>1. Monitoring Parameter Real-Time:</strong> Mengintegrasikan data API cuaca kota Malang & kalender event pariwisata.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#17110C] border border-[#3F2D23]">
                <Zap className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <span>
                  <strong>2. Auto-Kalkulasi Bahan Baku:</strong> Memberikan peringatan otomatis kepada kepala dapur untuk menambah gilingan tepung pandan & parutan kelapa murni.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#17110C] border-t border-[#3F2D23] flex justify-between items-center text-xs">
          <span className="text-[#C5B8A8] flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-[#D49B42]" /> Modul AI siap diintegrasikan pada Fase II.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Mengerti & Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
