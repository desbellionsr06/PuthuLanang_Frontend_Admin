'use client';

import React from 'react';
import { MENU_ITEMS } from '@/lib/db';
import { useStore } from '@/store/useStore';
import { ShoppingBag, Flame, Star, Sparkles, MapPin, Clock, Plus, ArrowRight } from 'lucide-react';
import { MobileTab } from './MobileBottomNav';

interface MobileHomeProps {
  userName: string;
  onNavigateTab: (tab: MobileTab) => void;
}

export const MobileHome: React.FC<MobileHomeProps> = ({ userName, onNavigateTab }) => {
  const { addToCart, getTotalItems } = useStore();
  const totalItems = getTotalItems();

  const popularItems = MENU_ITEMS.slice(0, 4);

  return (
    <div className="p-4 space-y-5 animate-fadeIn pb-24">
      
      {/* Header Ringkas */}
      <div className="flex justify-between items-center bg-[#241913] border border-[#3F2D23] p-4 rounded-2xl shadow-md">
        <div>
          <p className="text-[11px] text-[#C5B8A8]">Selamat Datang 👋</p>
          <h2 className="text-base font-extrabold text-[#F8F4EC]">{userName || 'Pecinta Kuliner'}</h2>
          <p className="text-[10px] text-[#2E7D32] font-bold mt-0.5 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-ping" />
            <span>Gerai Celaket: Antrean ~12 Mnt</span>
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('menu')}
          className="relative w-10 h-10 rounded-xl bg-[#17110C] border border-[#3F2D23] flex items-center justify-center text-[#D49B42]"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D49B42] text-[#17110C] font-extrabold text-[9px] rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Banner Promo / Heritage Ringkas */}
      <div className="relative rounded-2xl overflow-hidden border border-[#3F2D23] bg-gradient-to-r from-[#241913] via-[#2E7D32]/25 to-[#241913] p-5 shadow-xl">
        <div className="space-y-2 relative z-10">
          <span className="px-2.5 py-0.5 bg-[#D49B42] text-[#17110C] font-extrabold text-[10px] rounded-md uppercase">
            EST. 1935 MALANG
          </span>
          <h3 className="text-lg font-extrabold text-[#F8F4EC] leading-tight">
            Cita Rasa Pusaka <br />
            <span className="text-[#D49B42]">Sejak 1935</span>
          </h3>
          <p className="text-[11px] text-[#C5B8A8] line-clamp-2">
            Dikukus dadakan dalam tabung bambu swung murni dengan harum pandan suji dan gula aren melaka.
          </p>
          <button
            onClick={() => onNavigateTab('menu')}
            className="mt-2 px-4 py-2 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1"
          >
            <span>Pesan Smart Takeaway</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Outlet Location Pill */}
      <div className="bg-[#241913] border border-[#3F2D23] p-3 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#D49B42] shrink-0" />
          <div className="truncate">
            <p className="font-bold text-[#F8F4EC]">Gerai Asli Celaket</p>
            <p className="text-[10px] text-[#C5B8A8]">Jl. Jaksa Agung Suprapto No. 73</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/20 px-2 py-0.5 rounded">
          17:30 - 21:30
        </span>
      </div>

      {/* Pilihan Menu Populer (Horizontal & Cards Slider) */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-extrabold text-[#F8F4EC] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D49B42]" /> Pilihan Menu Populer
          </h3>
          <button
            onClick={() => onNavigateTab('menu')}
            className="text-[11px] font-bold text-[#D49B42] hover:underline"
          >
            Lihat Semua →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#241913] border border-[#3F2D23] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div className="relative h-28 w-full bg-[#17110C]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#17110C]/90 text-[#D49B42] text-[9px] font-extrabold rounded flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-[#D49B42]" /> {item.rating}
                </span>
              </div>

              <div className="p-3 space-y-2">
                <div>
                  <h4 className="text-xs font-bold text-[#F8F4EC] truncate">{item.name}</h4>
                  <p className="text-[10px] text-[#D49B42] font-semibold">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item, 1)}
                  className="w-full py-1.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-[11px] rounded-lg shadow flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
