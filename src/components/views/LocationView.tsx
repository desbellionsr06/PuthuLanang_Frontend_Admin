'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { MapPin, Navigation, Clock, MessageSquare, Flame, Users, CheckCircle2 } from 'lucide-react';

export const LocationView: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <div className="py-12 bg-[#17110C] animate-fadeIn min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D49B42]/15 border border-[#D49B42]/40 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#D49B42]">
              🏷️ PUSAT KULINER LEGENDARIS 1935
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8F4EC]">
              Titik Gerai Asli di Pusat Malang
            </h1>
            <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
              Menyajikan kelezatan Puthu bambu otentik langsung dari tungku. Rasakan aroma daun pandan dan gula aren murni di bawah temaram malam Kota Malang.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold">
              <span className="px-3 py-1 bg-[#241913] border border-[#3F2D23] rounded-lg text-[#D49B42] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D49B42]" /> Jam Operasional: 17:30 - 21:30 WIB
              </span>
              <span className="px-3 py-1 bg-[#241913] border border-[#3F2D23] rounded-lg text-[#2E7D32] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#2E7D32]" /> Status Antrean Live: 12 Porsi Menunggu (±10 Mnt)
              </span>
            </div>
          </div>

          {/* Gerai Banner Photo Card */}
          <div className="bg-[#241913] border border-[#3F2D23] rounded-2xl overflow-hidden shadow-xl max-w-sm shrink-0 relative group">
            <div className="h-52 bg-[#17110C] overflow-hidden relative">
              <img
                src="/images/gerai_puthu_lanang.png"
                alt="Gerai Asli Celaket - Jl. Jaksa Agung Suprapto No. 73, Malang"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241913] via-transparent to-transparent" />
              <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#2E7D32] text-white text-[10px] font-extrabold rounded-md shadow-md">
                Buka
              </span>
            </div>
            <div className="p-3 text-center bg-[#17110C] border-t border-[#3F2D23]">
              <p className="text-xs font-bold text-[#F8F4EC]">Gerai Asli Celaket</p>
              <p className="text-[11px] text-[#D49B42] font-semibold mt-0.5">
                Jl. Jaksa Agung Suprapto No. 73, Malang
              </p>
            </div>
          </div>
        </div>

        {/* Section LOKASI GERAI */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-[#F8F4EC]">LOKASI GERAI</h2>
            <button
              onClick={() => window.open("https://maps.google.com/?q=Puthu+Lanang+Malang+Jl+Jaksa+Agung+Suprapto+73", "_blank")}
              className="px-4 py-2 bg-[#2E7D32] text-white text-xs font-bold rounded-xl shadow-md"
            >
              Gerai Pusat
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Map Canvas Left */}
            <div className="lg:col-span-7 bg-[#241913] border border-[#3F2D23] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between">
              <div className="relative h-[400px] w-full bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 180 L 1000 180" stroke="#3F2D23" strokeWidth="12" />
                  <path d="M 450 0 L 450 500" stroke="#543E31" strokeWidth="10" />
                  <circle cx="450" cy="180" r="150" stroke="#D49B42" strokeWidth="1" strokeDasharray="4,4" fill="none" />
                </svg>

                {/* Map Marker Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#2E7D32]/30 border-2 border-[#2E7D32] flex items-center justify-center animate-ping absolute" />
                  <div className="w-16 h-16 rounded-2xl bg-[#241913] border-2 border-[#D49B42] flex items-center justify-center shadow-2xl z-10 mb-2">
                    <MapPin className="w-9 h-9 text-[#D49B42]" />
                  </div>
                  <div className="bg-[#17110C] border border-[#3F2D23] px-4 py-2 rounded-xl shadow-xl max-w-xs text-center">
                    <p className="text-xs font-extrabold text-[#F8F4EC]">Puthu Lanang Malang (Original)</p>
                    <p className="text-[10px] text-[#D49B42] font-semibold mt-0.5">Gerai Asli Celaket - No. 73</p>
                  </div>
                </div>

                {/* Bottom Address Overlay on Map */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#17110C]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#3F2D23] flex items-center justify-between gap-2">
                  <div className="text-xs text-[#C5B8A8] truncate">
                    <span className="font-bold text-[#F8F4EC]">Gerai Asli Celaket - Jl. Jaksa Agung Suprapto No. 73, Malang</span>
                    <p className="text-[10px] text-[#C5B8A8]">Kec. Klojen, Kota Malang (Dekat Klenteng Eng An Kiong / RS Lavalette)</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Puthu+Lanang+Malang+Jl+Jaksa+Agung+Suprapto+73"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Buka Rute Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side Outlet Info Card & Visual */}
            <div className="lg:col-span-5 bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Visual Outlet Photo Header */}
                <div className="relative h-44 rounded-2xl overflow-hidden border border-[#3F2D23]">
                  <img
                    src="/images/gerai_puthu_lanang.png"
                    alt="Suasana Gerai Asli Celaket Malang"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241913] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[11px] font-extrabold text-[#D49B42] bg-[#17110C]/90 px-2.5 py-1 rounded-md border border-[#3F2D23]">
                    Gerai Asli Celaket - Jl. Jaksa Agung Suprapto No. 73, Malang
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#D49B42]/15 border border-[#D49B42]/40 text-[#D49B42] text-[10px] font-extrabold rounded-md">
                    GERAI UTAMA • SEJAK 1935
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#17110C] border border-[#3F2D23] flex items-center justify-center text-[#D49B42]">
                    🏠
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-[#F8F4EC]">Puthu Lanang</h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2 text-[#C5B8A8]">
                    <MapPin className="w-4 h-4 text-[#D49B42] shrink-0 mt-0.5" />
                    <span>
                      <strong>Gerai Asli Celaket</strong> - Jl. Jaksa Agung Suprapto No. 73, Samaan, Kec. Klojen, Kota Malang, Jawa Timur 65111 (Kawasan Celaket, dekat RS Lavalette).
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-[#C5B8A8]">
                    <Clock className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#F8F4EC]">Buka Setiap Hari: 17.30 – 21.30 WIB</span>
                      <p className="text-[11px] text-[#C5B8A8]/80 mt-0.5">
                        Sangat disarankan datang lebih awal sebelum antrean memuncak pada pukul 19.00 WIB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live Queue Box inside Card */}
                <div className="bg-[#17110C] p-4 rounded-xl border border-[#3F2D23] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#C5B8A8] uppercase tracking-wider font-bold">
                      ANTREAN LANGSUNG
                    </span>
                    <p className="text-sm font-extrabold text-[#2E7D32]">12 Porsi / ± 10 Menit</p>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-[#2E7D32] animate-ping" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#3F2D23]">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Admin%20Puthu%20Lanang,%20saya%20ingin%20tanya%20antrean"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-[#17110C] border border-[#2E7D32]/50 text-[#2E7D32] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Tanya Antrean WA</span>
                </a>

                <button
                  onClick={() => setActiveView('custom')}
                  className="py-3 px-3 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Pesan Tampah</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
