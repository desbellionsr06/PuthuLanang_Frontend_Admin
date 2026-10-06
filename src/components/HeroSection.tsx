'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { ArrowRight, Flame, Sparkles, Award, Clock, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveView } = useStore();

  const stats = [
    { value: '1935', label: 'Awal Berdiri', desc: 'Merintis di Celaket Malang' },
    { value: '90 Thn', label: 'Tradisi Resep', desc: 'Resep Mbah Soponyono' },
    { value: '100%', label: 'Gula Aren Murni', desc: 'Tanpa Pembuat Sintetis' },
    { value: '4 Varian', label: 'Jajanan Pusaka', desc: 'Puthu, Klepon, Cenil, Lupis' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#17110C] py-12 lg:py-20 border-b border-[#3F2D23]">
      {/* Background steam ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D49B42]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2E7D32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#241913] border border-[#D49B42]/40 rounded-full text-xs font-bold text-[#D49B42]">
              <Flame className="w-4 h-4 text-[#D49B42] animate-bounce" />
              <span>WARISAN KULINER LEGENDA MALANG SINCE 1935</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8F4EC] leading-tight tracking-tight">
              Cita Rasa Warisan & <br />
              <span className="bg-gradient-to-r from-[#D49B42] via-[#F3B251] to-[#D49B42] bg-clip-text text-transparent">
                Kuliner Tradisional
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#C5B8A8] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Dikukus dadakan dalam tabung bambu clungup alami dengan harum daun suji dan kucuran juruh gula aren murni. Nikmati kepraktisan pesanan <span className="text-[#F8F4EC] font-semibold">Smart Takeaway</span> tanpa perlu mengantre lama di outlet Celaket Malang.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveView('menu')}
                className="w-full sm:w-auto px-8 py-4 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold rounded-2xl shadow-xl hover:shadow-[#2E7D32]/30 transition-all flex items-center justify-center gap-3 group text-sm"
              >
                <span>Pesan Sekarang (Smart Takeaway)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveView('heritage')}
                className="w-full sm:w-auto px-8 py-4 bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] text-[#F8F4EC] font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4 text-[#D49B42]" />
                <span>Lihat Cerita Heritage 1935</span>
              </button>
            </div>

            {/* Value assurance badge list */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#C5B8A8]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Bebas Pengawet</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D49B42]" />
                <span>Estimasi Antrean Live</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D49B42]" />
                <span>Rating 4.9 dari 1.500+ Ulasan</span>
              </div>
            </div>
          </div>

          {/* Right Column Visual Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Visual Container */}
            <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 shadow-2xl relative">
              
              {/* Steaming effect decoration */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none">
                <div className="w-2 h-8 bg-gradient-to-t from-white/30 to-transparent rounded-full animate-steam" />
                <div className="w-2 h-10 bg-gradient-to-t from-white/40 to-transparent rounded-full animate-steam [animation-delay:0.5s]" />
                <div className="w-2 h-7 bg-gradient-to-t from-white/30 to-transparent rounded-full animate-steam [animation-delay:1s]" />
              </div>

              {/* Main Image */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#3F2D23]">
                <img
                  src="/images/paket_tampah.png"
                  alt="Paket Tampah Puthu Lanang Malang"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17110C] via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#D49B42] text-[#17110C] font-extrabold text-xs rounded-full">
                    Best Seller Pusaka
                  </span>
                  <span className="px-3 py-1 bg-[#241913]/90 backdrop-blur-md text-[#F8F4EC] font-bold text-xs rounded-full border border-[#3F2D23]">
                    Rp 20.000 / Box
                  </span>
                </div>
              </div>

              {/* Small Showcase Cards */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-[#17110C] p-2.5 rounded-xl border border-[#3F2D23] text-center">
                  <p className="text-xs font-bold text-[#F8F4EC]">Puthu Bambu</p>
                  <p className="text-[10px] text-[#D49B42]">5 Biji • Aren Murni</p>
                </div>
                <div className="bg-[#17110C] p-2.5 rounded-xl border border-[#3F2D23] text-center">
                  <p className="text-xs font-bold text-[#F8F4EC]">Klepon Lumer</p>
                  <p className="text-[10px] text-[#D49B42]">8 Biji • Meletus</p>
                </div>
                <div className="bg-[#17110C] p-2.5 rounded-xl border border-[#3F2D23] text-center">
                  <p className="text-xs font-bold text-[#F8F4EC]">Cenil & Lupis</p>
                  <p className="text-[10px] text-[#D49B42]">Kenyal & Gurih</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((st, i) => (
            <div
              key={i}
              className="bg-[#241913] border border-[#3F2D23] rounded-2xl p-5 text-center hover:border-[#D49B42]/50 transition-all shadow-lg"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-[#D49B42] tracking-tight">
                {st.value}
              </p>
              <p className="text-xs font-bold text-[#F8F4EC] mt-1">{st.label}</p>
              <p className="text-[11px] text-[#C5B8A8] mt-0.5">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
