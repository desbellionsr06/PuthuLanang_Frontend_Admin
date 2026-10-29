'use client';

import React, { useState } from 'react';
import { MenuItemModel } from '@/types';
import { Edit2, Trash2, Star, Package, CheckCircle, XCircle } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItemModel;
  onEditClick: (item: MenuItemModel) => void;
  onDeleteClick: (id: string, name: string) => void;
}

// Badge warna per kategori
const CATEGORY_BADGE: Record<string, { label: string; color: string }> = {
  pusaka:       { label: 'Pusaka 1935', color: 'bg-[#D49B42]/20 text-[#D49B42] border-[#D49B42]/40' },
  paling_laris: { label: 'Paling Laris', color: 'bg-[#2E7D32]/20 text-[#2E7D32] border-[#2E7D32]/40' },
  paket_campur: { label: 'Paket Campur', color: 'bg-blue-900/30 text-blue-300 border-blue-700/40' },
  besek:        { label: 'Hampers Besek', color: 'bg-purple-900/30 text-purple-300 border-purple-700/40' },
};

const FALLBACK_IMAGE = '/images/paket_tampah.png';

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onEditClick,
  onDeleteClick,
}) => {
  const [imgSrc, setImgSrc] = useState(item.image || FALLBACK_IMAGE);
  const badge = CATEGORY_BADGE[item.category] ?? { label: item.category, color: 'bg-[#3E2C22] text-[#C5B8A8] border-[#3E2C22]' };

  return (
    <div className="bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42]/60 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 group shadow-lg hover:shadow-[#D49B42]/10 hover:shadow-xl hover:-translate-y-0.5">

      {/* Foto Menu — full width, square crop */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#241913]">
        <img
          src={imgSrc}
          alt={item.name}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay gradient bawah */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1510]/90 via-transparent to-transparent" />

        {/* Badge status tersedia */}
        <div className="absolute top-2 right-2">
          {item.isAvailable ? (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-[#2E7D32]/90 text-white text-[10px] font-bold rounded-full backdrop-blur-sm">
              <CheckCircle className="w-3 h-3" /> Tersedia
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-red-900/90 text-red-200 text-[10px] font-bold rounded-full backdrop-blur-sm">
              <XCircle className="w-3 h-3" /> Habis
            </span>
          )}
        </div>

        {/* Harga di atas foto (overlay bawah) */}
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-base font-extrabold text-[#D49B42] drop-shadow-lg">
            Rp {item.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Konten bawah */}
      <div className="p-3 flex flex-col gap-2 flex-1">

        {/* Nama + badge kategori */}
        <div>
          <h3 className="font-extrabold text-[#F8F4EC] text-sm leading-tight group-hover:text-[#D49B42] transition-colors line-clamp-1">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
              {badge.label}
            </span>
            {item.rating > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-[#D49B42]">
                <Star className="w-3 h-3 fill-[#D49B42]" />
                {typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating}
              </span>
            )}
          </div>
        </div>

        {/* Deskripsi singkat */}
        {item.description && (
          <p className="text-[11px] text-[#C5B8A8] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Stok */}
        <div className="flex items-center gap-1 text-[10px] text-[#C5B8A8]">
          <Package className="w-3 h-3 text-[#2E7D32]" />
          Stok: <span className="font-bold text-[#F8F4EC]">{item.stockRemaining}</span>
        </div>

        {/* Tombol aksi */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#3E2C22] mt-auto">
          <button
            onClick={() => onEditClick(item)}
            className="flex-1 py-1.5 bg-[#241913] border border-[#3E2C22] hover:border-[#D49B42] text-[#D49B42] font-bold rounded-xl flex items-center justify-center gap-1 text-[11px] active:scale-95 transition-all cursor-pointer"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => onDeleteClick(item.id, item.name)}
            className="flex-1 py-1.5 bg-red-900/20 border border-red-800/40 text-red-300 hover:bg-red-900/40 hover:border-red-600/60 font-bold rounded-xl flex items-center justify-center gap-1 text-[11px] active:scale-95 transition-all cursor-pointer"
          >
            <Trash2 className="w-3 h-3" /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
};
