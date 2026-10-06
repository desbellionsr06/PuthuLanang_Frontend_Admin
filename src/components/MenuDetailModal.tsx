'use client';

import React from 'react';
import { MenuItem } from '@/lib/db';
import { useStore } from '@/store/useStore';
import { X, ShieldCheck, Flame, Star, CheckCircle, Clock, ShoppingBag } from 'lucide-react';

interface MenuDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({ item, onClose }) => {
  const { addToCart } = useStore();

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header Image Showcase */}
        <div className="relative h-48 w-full bg-[#17110C] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241913] via-transparent to-black/40" />

          {/* Badge rating & category */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-[#D49B42] text-[#17110C] font-extrabold text-xs rounded-full shadow-lg flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#17110C]" /> {item.rating} ({item.reviewsCount} Ulasan)
            </span>
            <span className="px-3 py-1 bg-[#2E7D32] text-[#F8F4EC] font-semibold text-xs rounded-full shadow-lg">
              Freshly Steamed
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#17110C]/80 backdrop-blur-md text-[#C5B8A8] hover:text-white rounded-full border border-[#3F2D23] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-[#F8F4EC]">{item.name}</h3>
              <p className="text-xl font-extrabold text-[#D49B42]">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
            <p className="text-xs text-[#D49B42] font-medium mt-1">{item.portionDetails}</p>
            <p className="text-sm text-[#C5B8A8] mt-3 leading-relaxed">{item.description}</p>
          </div>

          {/* Ingredients list */}
          <div className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D49B42] flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-[#D49B42]" /> Komposisi Bahan Resep Otentik 1935
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {item.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#F8F4EC]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Allergen & Health standard */}
          <div className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E7D32] flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32]" /> Informasi Alergen & Jaminan Alami
            </h4>
            <ul className="text-xs text-[#C5B8A8] space-y-1 list-disc list-inside">
              {item.allergens.map((alg, idx) => (
                <li key={idx}>{alg}</li>
              ))}
              <li>100% Gula Aren Murni dari Pengrajin Tradisional Trenggalek & Melaka.</li>
              <li>Tanpa pemanis buatan, tanpa pengawet kimiawi, tanpa pewarna sintetis.</li>
            </ul>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#C5B8A8]">
            <Clock className="w-4 h-4 text-[#D49B42]" />
            <span>Estimasi Pengukusan Dadakan: {item.preparationTimeMins} Menit saat dipesan</span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-[#17110C] border-t border-[#3F2D23] flex gap-3">
          <button
            onClick={() => {
              addToCart(item, 1);
              onClose();
            }}
            className="flex-1 py-3 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tambah ke Keranjang • Rp {item.price.toLocaleString('id-ID')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
