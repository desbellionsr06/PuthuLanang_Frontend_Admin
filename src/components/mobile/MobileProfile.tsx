'use client';

import React from 'react';
import { User, Phone, Sparkles, Cpu, ShieldCheck, History, LogOut, Award, ChevronRight } from 'lucide-react';

interface MobileProfileProps {
  userName: string;
  phone: string;
  onLogout: () => void;
}

export const MobileProfile: React.FC<MobileProfileProps> = ({ userName, phone, onLogout }) => {
  return (
    <div className="p-4 space-y-5 animate-fadeIn pb-24">
      {/* Title */}
      <div>
        <h2 className="text-lg font-extrabold text-[#F8F4EC]">Profil Pelanggan</h2>
        <p className="text-xs text-[#C5B8A8]">Informasi akun & penawaran eksklusif Puthu Lanang</p>
      </div>

      {/* User Info Card */}
      <div className="bg-[#241913] border border-[#3F2D23] rounded-2xl p-4 flex items-center gap-4 shadow-lg">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#2E7D32] to-[#D49B42] flex items-center justify-center text-white font-extrabold text-xl shadow-md border-2 border-[#17110C]">
          {userName ? userName.charAt(0).toUpperCase() : 'P'}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-[#F8F4EC]">
              {userName || 'Pecinta Kuliner'}
            </h3>
            <span className="px-2 py-0.5 bg-[#D49B42]/20 border border-[#D49B42] text-[#D49B42] font-extrabold text-[9px] rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" /> VIP Member
            </span>
          </div>
          <p className="text-xs text-[#C5B8A8] flex items-center gap-1 mt-1">
            <Phone className="w-3 h-3 text-[#2E7D32]" />
            <span>{phone || '0812-3456-7890'}</span>
          </p>
        </div>
      </div>

      {/* UTS MANDATORY REQUIREMENT: AI Feature Announcement Card */}
      <div className="bg-gradient-to-r from-[#241913] via-[#2E7D32]/20 to-[#241913] border-2 border-[#2E7D32] rounded-2xl p-4 space-y-2 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#D49B42]">
          <Cpu className="w-5 h-5 animate-pulse text-[#D49B42]" />
          <span className="text-xs font-black uppercase tracking-wider">Fitur Spesial Masa Depan</span>
        </div>

        <div className="bg-[#17110C]/80 border border-[#3F2D23] p-3 rounded-xl">
          <p className="text-xs font-bold text-[#F8F4EC] leading-relaxed">
            Rencana Fitur AI: <span className="text-[#D49B42]">AI Smart Queue Estimator</span> untuk menghitung estimasi waktu tunggu antrean gerobak secara akurat.
          </p>
        </div>

        <p className="text-[10px] text-[#C5B8A8] italic pl-1">
          *Fitur ini memanfaatkan sensor lalu lintas gerobak Celaket & algoritma machine learning prediksi antrean puncak jam 17:00 - 19:00 WIB.
        </p>
      </div>

      {/* Profile Menu Items */}
      <div className="bg-[#241913] border border-[#3F2D23] rounded-2xl overflow-hidden divide-y divide-[#3F2D23]">
        <button className="w-full p-3.5 flex items-center justify-between hover:bg-[#17110C]/50 transition-colors">
          <div className="flex items-center gap-3">
            <History className="w-4 h-4 text-[#D49B42]" />
            <span className="text-xs font-bold text-[#F8F4EC]">Riwayat Transaksi Smart Takeaway</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#C5B8A8]" />
        </button>

        <button className="w-full p-3.5 flex items-center justify-between hover:bg-[#17110C]/50 transition-colors">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#2E7D32]" />
            <span className="text-xs font-bold text-[#F8F4EC]">Kupon Promo Heritage 1935</span>
          </div>
          <span className="text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/20 px-2 py-0.5 rounded">
            2 Aktif
          </span>
        </button>

        <button className="w-full p-3.5 flex items-center justify-between hover:bg-[#17110C]/50 transition-colors">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#D49B42]" />
            <span className="text-xs font-bold text-[#F8F4EC]">Ketentuan & Kebijakan Privasi</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#C5B8A8]" />
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-3 bg-[#17110C] hover:bg-[#241913] border border-[#3F2D23] text-red-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Keluar dari Akun Mobile</span>
      </button>
    </div>
  );
};
