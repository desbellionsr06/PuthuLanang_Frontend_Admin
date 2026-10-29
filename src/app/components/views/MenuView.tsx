'use client';

import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '@/lib/db';
import { useStore } from '@/store/useStore';
import { MenuDetailModal } from '../MenuDetailModal';
import { Star, Plus, Minus, Info, ShoppingBag, Flame, ShieldCheck, Leaf, Truck, ArrowRight } from 'lucide-react';

export const MenuView: React.FC = () => {
  const { addToCart, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filterTabs = [
    { key: 'semua', label: 'Semua Menu' },
    { key: 'paling_laris', label: 'Paling Laris' },
    { key: 'besek', label: 'Porsi Box Besek' },
    { key: 'paket_campur', label: 'Paket Campur' },
  ];

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [itemId]: updated };
    });
  };

  const getCustomBadge = (itemId: string) => {
    if (itemId === 'puthu-01') return '• SEGAR DIKUKUS';
    if (itemId === 'klepon-02') return '• MELETUP DI MULUT';
    if (itemId === 'cenil-03') return '• TEKSTUR KENYAL';
    if (itemId === 'lupis-04') return '• RESEP KLASIK';
    return '• OTENTIK 1935';
  };

  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'semua' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 bg-[#17110C] animate-fadeIn min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D49B42]/15 border border-[#D49B42]/40 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#D49B42]">
              🏷️ KATALOG PUSAKA 1935
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8F4EC]">
              Menu Jajanan <span className="text-[#D49B42] font-serif italic">Legendaris</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
              Diolah segar setiap sore menggunakan uap bambu alami, kelapa parut pilihan, dan juruh gula aren murni tanpa pengawet. Nikmati kelezatan warisan turun-temurun khas Malang.
            </p>
          </div>

          {/* Status Dapur Card */}
          <div className="bg-[#241913] border border-[#3F2D23] rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#2E7D32]/20 border border-[#2E7D32]/40 flex items-center justify-center text-[#2E7D32] shrink-0">
              <Flame className="w-6 h-6 text-[#2E7D32] animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#C5B8A8] uppercase tracking-wider">STATUS DAPUR</p>
              <h3 className="text-sm font-bold text-[#F8F4EC]">Sedang Mengukus Bambu</h3>
              <p className="text-[11px] text-[#2E7D32] font-semibold mt-0.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-ping" />
                <span>Est. Antrean 15 Menit</span>
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs Horizontal */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === tab.key
                  ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-lg'
                  : 'bg-[#241913] border-[#3F2D23] text-[#C5B8A8] hover:text-[#F8F4EC] hover:border-[#D49B42]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMenuItems.map((item) => {
            const qty = quantities[item.id] || 1;
            return (
              <div
                key={item.id}
                className="bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42]/70 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 group"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full bg-[#17110C] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241913] via-transparent to-black/40" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px]">
                    <span className="px-2.5 py-1 bg-[#17110C]/80 backdrop-blur-md text-[#F8F4EC] font-bold rounded-md border border-[#3F2D23]">
                      {getCustomBadge(item.id)}
                    </span>
                    <span className="px-2.5 py-1 bg-[#241913]/90 backdrop-blur-md text-[#D49B42] font-extrabold rounded-md border border-[#3F2D23] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#D49B42]" /> {item.rating}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#F8F4EC] group-hover:text-[#D49B42] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#C5B8A8] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Portion Info */}
                  <div className="flex justify-between items-baseline pt-2 border-t border-[#3F2D23]/60">
                    <div>
                      <span className="text-base font-extrabold text-[#F8F4EC]">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#C5B8A8] font-medium">
                      {item.portionDetails}
                    </span>
                  </div>

                  {/* Quantity & Add to Cart Controls */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[#17110C] border border-[#3F2D23] rounded-xl px-2 py-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 text-[#C5B8A8] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#F8F4EC] w-5 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 text-[#C5B8A8] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => addToCart(item, qty)}
                        className="flex-1 py-2.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Tambah</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedItemForModal(item)}
                      className="w-full text-center text-[11px] text-[#C5B8A8] hover:text-[#D49B42] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Detail Komposisi & Alergen</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Value Cards Row */}
        <div className="pt-10 border-t border-[#3F2D23]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#241913] border border-[#3F2D23] p-5 rounded-2xl flex items-start gap-4 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/20 border border-[#2E7D32]/40 flex items-center justify-center text-[#2E7D32] shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F8F4EC]">Resep Otentik 1935</h4>
                <p className="text-xs text-[#C5B8A8] mt-1 leading-relaxed">
                  Dipertahankan turun-temurun tanpa mengubah takaran rasa asli warisan leluhur Malang.
                </p>
              </div>
            </div>

            <div className="bg-[#241913] border border-[#3F2D23] p-5 rounded-2xl flex items-start gap-4 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#D49B42]/15 border border-[#D49B42]/40 flex items-center justify-center text-[#D49B42] shrink-0">
                <Leaf className="w-5 h-5 text-[#D49B42]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F8F4EC]">Bebas Bahan Pengawet</h4>
                <p className="text-xs text-[#C5B8A8] mt-1 leading-relaxed">
                  Hanya menggunakan pewarna alami dari daun pandan suji dan gula aren murni pilihan.
                </p>
              </div>
            </div>

            <div className="bg-[#241913] border border-[#3F2D23] p-5 rounded-2xl flex items-start gap-4 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/20 border border-[#2E7D32]/40 flex items-center justify-center text-[#2E7D32] shrink-0">
                <Truck className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F8F4EC]">Dikukus Dadakan</h4>
                <p className="text-xs text-[#C5B8A8] mt-1 leading-relaxed">
                  Puthu dan jajanan lainnya selalu disajikan hangat langsung dari bilah bambu pengukusan.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <MenuDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
      />
    </div>
  );
};
