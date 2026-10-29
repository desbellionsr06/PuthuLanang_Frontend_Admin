'use client';

import React from 'react';
import { useStore, ViewTab } from '@/store/useStore';
import { Flame, MapPin, Clock, ShieldCheck, Camera, Music, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <footer className="bg-[#110B07] border-t border-[#3F2D23] text-[#C5B8A8] text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveView('home')}>
              <div className="w-8 h-8 rounded-xl bg-[#2E7D32] flex items-center justify-center text-[#D49B42]">
                <Flame className="w-5 h-5 text-[#D49B42]" />
              </div>
              <span className="font-extrabold text-base tracking-wide text-[#F8F4EC]">
                Puthu Lanang
              </span>
            </div>

            <p className="text-xs text-[#C5B8A8] leading-relaxed max-w-xs">
              Tradisi kuliner pusaka Malang sejak 1935. Mempertahankan keaslian resep puthu, cenil, lupis, dan klepon dengan teknik kukus bambu tradisional dan gula kelapa murni pilihan.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#241913] border border-[#3F2D23] flex items-center justify-center hover:border-[#D49B42] text-[#C5B8A8] hover:text-[#F8F4EC] transition-colors"
                title="Instagram Puthu Lanang"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#241913] border border-[#3F2D23] flex items-center justify-center hover:border-[#D49B42] text-[#C5B8A8] hover:text-[#F8F4EC] transition-colors"
                title="TikTok Puthu Lanang"
              >
                <Music className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#241913] border border-[#3F2D23] flex items-center justify-center hover:border-[#D49B42] text-[#C5B8A8] hover:text-[#F8F4EC] transition-colors"
                title="WhatsApp Puthu Lanang"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigasi Cepat */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-[11px] text-[#F8F4EC] uppercase tracking-wider">
              NAVIGASI CEPAT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('menu')} className="hover:text-[#D49B42] transition-colors">
                  Menu Jajanan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('heritage')} className="hover:text-[#D49B42] transition-colors">
                  Kisah Heritage
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('location')} className="hover:text-[#D49B42] transition-colors">
                  Lokasi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('custom')} className="hover:text-[#D49B42] transition-colors">
                  FAQ & Bantuan
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Operasional & Kontak */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-[11px] text-[#F8F4EC] uppercase tracking-wider">
              OPERASIONAL & KONTAK
            </h4>
            <div className="space-y-2.5 text-xs text-[#C5B8A8]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#D49B42] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#F8F4EC]">Buka Setiap Hari</p>
                  <p className="text-[#D49B42] font-extrabold">17:30 - 21:30 WIB</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D49B42] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Jl. Jaksa Agung Suprapto No.73, Samaan, Kec. Klojen, Kota Malang, Jawa Timur
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Sertifikasi Mutu */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-extrabold text-[11px] text-[#F8F4EC] uppercase tracking-wider">
              SERTIFIKASI MUTU
            </h4>
            <div className="bg-[#241913] border border-[#3F2D23] p-3.5 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#F8F4EC] text-xs">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>100% Bahan Alami</span>
              </div>
              <p className="text-[11px] text-[#C5B8A8] leading-relaxed">
                Diproses segar setiap sore tanpa pengawet atau pewarna buatan.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#3F2D23] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#C5B8A8]">
          <p>© 2025 Puthu Lanang Malang. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveView('home')} className="hover:text-[#F8F4EC]">Kebijakan Privasi</button>
            <span>•</span>
            <button onClick={() => setActiveView('home')} className="hover:text-[#F8F4EC]">Syarat & Ketentuan</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
