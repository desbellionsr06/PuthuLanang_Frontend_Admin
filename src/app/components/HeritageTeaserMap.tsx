'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { MapPin, Navigation, Clock, PhoneCall, History, Sparkles } from 'lucide-react';

export const HeritageTeaserMap: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <section className="py-16 bg-[#17110C] border-b border-[#3F2D23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heritage Teaser Box */}
        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-8 lg:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D49B42]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#D49B42]/15 border border-[#D49B42]/40 rounded-full text-xs font-bold text-[#D49B42]">
                <History className="w-4 h-4 text-[#D49B42]" /> 90 TAHUN WARISAN KULINER MALANG
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8F4EC]">
                Aroma Bambu & Gula Aren Murni yang Menyapa Malam Malang
              </h2>
              <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
                Sejak tahun 1935, Mbah Soponyono memulai tradisi mengukus puthu beras pandan menggunakan tabung bambu swung di kawasan Celaket. Rahasia kelezatan abadi kami terletak pada penggunaan 100% juruh gula aren murni tanpa campuran glukosa buatan dan kelapa muda parut segar pilihan.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveView('heritage')}
                  className="px-6 py-3 bg-[#D49B42] hover:bg-[#F3B251] text-[#17110C] font-extrabold rounded-xl shadow-lg transition-all text-xs flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Baca Dokumentasi Lengkap 3 Generasi →</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#17110C] p-6 rounded-2xl border border-[#3F2D23] space-y-3">
              <h3 className="text-sm font-bold text-[#F8F4EC] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2E7D32]" /> Jam Operasional Outlet Celaket
              </h3>
              <p className="text-xs text-[#C5B8A8]">
                Setiap Hari: <span className="text-[#D49B42] font-bold">17:30 - 21:30 WIB</span>
              </p>
              <p className="text-[11px] text-[#C5B8A8]/80 leading-normal">
                Disarankan memesan lebih awal melalui platform Smart Takeaway ini untuk menghindari kehabisan stok porsi harian.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Map Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D49B42]">
            Lokasi Strategis Outlet
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC] mt-1">
            Peta Interaktif Celaket Malang
          </h2>
          <p className="text-xs sm:text-sm text-[#C5B8A8] mt-2">
            Jl. Jaksa Agung Suprapto No. 73, Samaan, Klonjen, Kota Malang, Jawa Timur.
          </p>
        </div>

        {/* Interactive Map Canvas Container */}
        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Custom Interactive Map UI */}
          <div className="relative h-80 sm:h-96 w-full bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
            
            {/* Map Roads & Vector Simulation Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <path d="M -100 100 Q 200 150 500 100 T 1200 200" stroke="#3F2D23" strokeWidth="14" fill="none" />
              <path d="M 300 -50 L 350 500" stroke="#543E31" strokeWidth="10" fill="none" />
              <path d="M 100 300 L 900 250" stroke="#3F2D23" strokeWidth="8" fill="none" />
              <circle cx="500" cy="200" r="180" stroke="#D49B42" strokeWidth="1" strokeDasharray="4,4" fill="none" />
            </svg>

            {/* Pin Marker Animation */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2E7D32]/30 border-2 border-[#2E7D32] flex items-center justify-center animate-ping absolute" />
              <div className="w-14 h-14 rounded-2xl bg-[#241913] border-2 border-[#D49B42] flex items-center justify-center shadow-2xl z-10">
                <MapPin className="w-8 h-8 text-[#D49B42]" />
              </div>
              
              {/* Tooltip Card */}
              <div className="mt-3 bg-[#17110C] border border-[#3F2D23] px-4 py-2 rounded-xl text-center shadow-xl">
                <p className="text-xs font-extrabold text-[#F8F4EC]">PUTHU LANANG CELAKET</p>
                <p className="text-[10px] text-[#D49B42] font-semibold">Jl. Jaksa Agung Suprapto No. 73</p>
              </div>
            </div>

            {/* Live Queue Overlay Box inside Map */}
            <div className="absolute top-4 left-4 bg-[#17110C]/90 backdrop-blur-md border border-[#3F2D23] p-4 rounded-2xl max-w-xs shadow-xl hidden sm:block">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32]">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                <span>Outlet Beroperasi (17:30 - 21:30 WIB)</span>
              </div>
              <p className="text-[11px] text-[#C5B8A8] mt-1">
                Antrean Dapur: ~15 Mins • Sisa Stok: 85 Porsi
              </p>
            </div>

            {/* Map Action Buttons Overlay */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <a
                href="https://maps.google.com/?q=Puthu+Lanang+Malang+Jl+Jaksa+Agung+Suprapto+73"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka Google Maps</span>
              </a>
              <button
                onClick={() => setActiveView('location')}
                className="px-4 py-2.5 bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] text-[#F8F4EC] font-semibold text-xs rounded-xl transition-all"
              >
                <span>Info Outlet Lengkap</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
