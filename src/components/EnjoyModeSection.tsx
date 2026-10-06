'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { MapPin, Clock, Flame, PieChart, Check } from 'lucide-react';

export const EnjoyModeSection: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <section className="py-12 bg-[#17110C] border-b border-[#3F2D23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC]">
            Tentukan Cara Menikmati Jajanan
          </h2>
          <p className="text-xs sm:text-sm text-[#C5B8A8] mt-2">
            Pilih metode pengambilan Smart Takeaway atau Jadwal Pickup terukur agar pesanan Anda siap dalam keadaan hangat terbaik.
          </p>
        </div>

        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Panel Outlet */}
            <div className="bg-[#17110C] p-5 rounded-2xl border border-[#3F2D23] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D49B42] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D49B42]" /> Outlet Utama Celaket
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-ping" />
                </div>
                <h3 className="text-base font-bold text-[#F8F4EC]">Jl. Jaksa Agung Suprapto No. 73</h3>
                <p className="text-xs text-[#C5B8A8] mt-1">Samaan, Klonjen, Kota Malang (17:30 - 21:30 WIB)</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#3F2D23] flex items-center justify-between text-xs text-[#2E7D32]">
                <span className="flex items-center gap-1 font-semibold">
                  <Check className="w-4 h-4" /> Buka & Dapur Siap
                </span>
                <button
                  onClick={() => setActiveView('location')}
                  className="text-xs text-[#D49B42] hover:underline font-bold"
                >
                  Lihat Peta →
                </button>
              </div>
            </div>

            {/* Panel Estimasi Tunggu */}
            <div className="bg-[#17110C] p-5 rounded-2xl border border-[#3F2D23] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D49B42] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D49B42]" /> Estimasi Waktu Antrean
                  </span>
                  <span className="px-2 py-0.5 bg-[#2E7D32]/20 text-[#2E7D32] font-bold text-[10px] rounded-md">
                    Lancar
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#F8F4EC]">~ 15 Menit</h3>
                <p className="text-xs text-[#C5B8A8] mt-1">
                  Waktu rata-rata pengukusan bambu & pengemasan di lokasi
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#3F2D23] flex items-center gap-2 text-xs text-[#C5B8A8]">
                <Flame className="w-4 h-4 text-[#D49B42]" />
                <span>Bara Dapur Aktif: 6 Dandang Bambu</span>
              </div>
            </div>

            {/* Panel Ringkasan Kuota */}
            <div className="bg-[#17110C] p-5 rounded-2xl border border-[#3F2D23] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D49B42] flex items-center gap-1.5">
                    <PieChart className="w-4 h-4 text-[#D49B42]" /> Ringkasan Kuota Hari Ini
                  </span>
                  <span className="text-xs font-bold text-[#D49B42]">85 / 500 Porsi</span>
                </div>
                <h3 className="text-base font-bold text-[#F8F4EC]">83% Terpesan</h3>
                
                {/* Progress bar */}
                <div className="w-full bg-[#241913] h-3 rounded-full overflow-hidden mt-3 border border-[#3F2D23]">
                  <div className="bg-gradient-to-r from-[#2E7D32] to-[#D49B42] h-full w-[83%]" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#3F2D23] flex items-center justify-between text-xs text-[#C5B8A8]">
                <span>Sisa 85 porsi untuk slot malam ini</span>
                <button
                  onClick={() => setActiveView('menu')}
                  className="font-bold text-[#2E7D32] hover:underline"
                >
                  Amankan Slot →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
