'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { History, Flame, Sparkles, Award, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const HeritageView: React.FC = () => {
  const { setActiveView } = useStore();

  const stats = [
    { value: '1935', label: 'TAHUN BERDIRI' },
    { value: '3 Gen', label: 'PENERUS RESEP' },
    { value: '100%', label: 'BAMBU & ALAMI' },
    { value: 'Celaket', label: 'KAWASAN LEGENGARIS' },
  ];

  const timelineActs = [
    {
      num: '01',
      period: '1935 - 1974',
      title: 'Generasi Pendiri',
      desc: 'Dimulai oleh pendiri pertama dengan berkeliling membawa pikulan bambu di sekitar Jalan Jaksa Agung Suprapto, mempertahankan kelezatan kue puthu hangat kepada warga lokal.',
      highlight: '🎯 Fondasi Resep Otentik'
    },
    {
      num: '02',
      period: '1975 - 2005',
      title: 'Generasi Pengepul & Menetap',
      desc: 'Mulai menetap di lokasi tetap di kawasan Celaket. Mempertahankan kualitas bahan baku di tengah dinamika zaman dan mulai dikenal luas sebagai ikon kuliner malam Malang.',
      highlight: '🎯 Konsistensi Lokasi & Rasa'
    },
    {
      num: '03',
      period: '2006 - Sekarang',
      title: 'Generasi Modernisasi',
      desc: 'Menggabungkan metode pengukusan bambu kuno dengan sistem pelayanan digital modern, reservasi daring, serta pengemasan besek higienis tanpa menghilangkan cita rasa asli.',
      highlight: '🎯 Inovasi Digital & Warisan'
    }
  ];

  const photoGallery = [
    {
      badge: 'ARSIP 1947',
      title: 'Gerobak Pertama di Celaket',
      img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80'
    },
    {
      badge: 'TEKNIK PUSAKA',
      title: 'Pengukusan Bambu Alami',
      img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'
    },
    {
      badge: 'DEDIKASI KELUARGA',
      title: 'Dedikasi Turun-Temurun',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="py-12 bg-[#17110C] animate-fadeIn min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#D49B42]/15 border border-[#D49B42]/40 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#D49B42]">
            🏷️ RESEP PUSAKA SINCE 1935
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8F4EC]">
            Menjaga Keharuman Malam Malang Selama Tiga Generasi
          </h1>
          <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
            Dari sebuah gerobak sederhana di sudut Jalan Jaksa Agung Suprapto hingga menjadi warisan kuliner legendaris yang menghangatkan malam kota kembang.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((st, i) => (
            <div
              key={i}
              className="bg-[#241913] border border-[#3F2D23] rounded-2xl p-6 text-center shadow-lg"
            >
              <p className="text-3xl font-extrabold text-[#D49B42] tracking-tight">{st.value}</p>
              <p className="text-[11px] font-extrabold text-[#C5B8A8] uppercase tracking-wider mt-1">{st.label}</p>
            </div>
          ))}
        </div>

        {/* Main Story Card */}
        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#3F2D23]">
                <img
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
                  alt="Almarhum Pendiri Mbah Soponyono"
                  className="w-full h-full object-cover grayscale brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17110C] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#17110C]/90 backdrop-blur-md p-3 rounded-xl border border-[#3F2D23]">
                  <span className="text-[10px] font-extrabold text-[#D49B42] uppercase tracking-wider">
                    ALMARHUM PENDIRI
                  </span>
                  <p className="text-xs text-[#F8F4EC] italic mt-0.5">
                    "Kelezatan sejati lahir dari kesabaran mengukus dan ketulusan hati melayani."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Story Column */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-extrabold text-[#2E7D32] uppercase tracking-wider">
                • AKAR TRADISI NUSANTARA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC]">
                Menyalakan Api Kecil di Tengah Dinginnya Malam Malang
              </h2>
              <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
                Bermula dari dorongan untuk menghadirkan kudapan malam yang menghangatkan jiwa, Puthu Lanang mempertahankan metode memasak tradisional tanpa kompromi. Aroma pandan segar, uap air dari bilah bambu pilihan, serta manisnya gula aren murni berpadu dalam harmoni yang tidak lekang oleh zaman.
              </p>
              <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
                Setiap kepalan adonan tepung beras diisi dengan gula jawa asli, dimasukkan ke dalam potongan bambu kecil, lalu dikukus di atas ceret tanah liat bertekanan uap khas. Suara desis uap yang keluar dari lubang bambu telah menjadi melodi malam yang dinantikan oleh para penikmat kuliner lintas generasi di kawasan Celaket.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#17110C] p-4 rounded-xl border border-[#3F2D23] space-y-1">
                  <p className="text-xs font-bold text-[#D49B42] flex items-center gap-1.5">
                    🌾 Bambu Alami Pilihan
                  </p>
                  <p className="text-[11px] text-[#C5B8A8]">
                    Bilah bambu khusus yang memberikan aroma khas tanpa merusak keaslian rasa adonan.
                  </p>
                </div>

                <div className="bg-[#17110C] p-4 rounded-xl border border-[#3F2D23] space-y-1">
                  <p className="text-xs font-bold text-[#2E7D32] flex items-center gap-1.5">
                    🍯 Juruh Gula Aren Murni
                  </p>
                  <p className="text-[11px] text-[#C5B8A8]">
                    Pemilihan gula aren murni pilihan yang dimasak perlahan hingga kental dan legit.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Estafet Rasa Selama 9 Dekade Timeline */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold text-[#D49B42] uppercase tracking-wider">
              PERJALANAN DEKADE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC]">
              Estafet Rasa Selama 9 Dekade
            </h2>
            <p className="text-xs text-[#C5B8A8]">
              Bagaimana sebuah resep warisan keluarga dijaga keotentikannya dari masa kolonial hingga era digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timelineActs.map((act) => (
              <div
                key={act.num}
                className="bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 bg-[#17110C] border border-[#3F2D23] text-[10px] font-extrabold text-[#D49B42] rounded-md">
                      {act.period}
                    </span>
                    <span className="text-2xl font-extrabold text-[#3F2D23] font-mono">{act.num}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#F8F4EC]">{act.title}</h3>
                  <p className="text-xs text-[#C5B8A8] leading-relaxed">{act.desc}</p>
                </div>

                <div className="pt-3 border-t border-[#3F2D23] text-xs font-semibold text-[#2E7D32]">
                  {act.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jejak Visual Lintas Zaman Photo Archive */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <div>
              <span className="text-[11px] font-extrabold text-[#D49B42] uppercase tracking-wider">
                GALERI ARSIP TEMPO DULU
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC] mt-1">
                Jejak Visual Lintas Zaman
              </h2>
            </div>
            <p className="text-xs text-[#C5B8A8] max-w-md">
              Dokumentasi autentik perjalanan Puthu Lanang dari masa ke masa, merekam senyum pelanggan setia diuap bambu yang tak pernah padam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photoGallery.map((photo, i) => (
              <div
                key={i}
                className="bg-[#241913] border border-[#3F2D23] rounded-2xl overflow-hidden shadow-xl group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={photo.img}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241913] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#17110C]/90 text-[#D49B42] text-[10px] font-extrabold rounded-md border border-[#3F2D23]">
                    {photo.badge}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#F8F4EC]">{photo.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
