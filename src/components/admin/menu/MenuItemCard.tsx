'use client';

import React from 'react';
import { MenuItemModel } from '@/types';
import { Edit2, Trash2, Clock } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItemModel;
  onEditClick: (item: MenuItemModel) => void;
  onDeleteClick: (id: string, name: string) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div
      className="bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42] p-4 rounded-2xl flex flex-col justify-between space-y-3 transition-all duration-200 group"
    >
      <div className="flex gap-3 items-start">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-[#3E2C22] group-hover:scale-105 transition-transform"
        />
        <div className="min-w-0 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-[#F8F4EC] truncate text-xs sm:text-sm group-hover:text-[#D49B42] transition-colors">
              {item.name}
            </h3>
          </div>
          <p className="text-xs font-extrabold text-[#D49B42] mt-0.5">
            Rp {item.price.toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-[#C5B8A8] mt-0.5 truncate">
            {item.portionDetails}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#3E2C22] text-xs">
        <span className="text-[10px] text-[#C5B8A8] flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#2E7D32]" /> {item.preparationTimeMins} Mnt Kukus
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onEditClick(item)}
            className="px-2.5 py-1 bg-[#241913] border border-[#3E2C22] hover:border-[#D49B42] text-[#D49B42] font-bold rounded-lg flex items-center gap-1 text-[11px] active:scale-95 transition-all cursor-pointer"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => onDeleteClick(item.id, item.name)}
            className="px-2.5 py-1 bg-red-900/20 border border-red-800/40 text-red-300 hover:bg-red-900/40 font-bold rounded-lg flex items-center gap-1 text-[11px] active:scale-95 transition-all cursor-pointer"
          >
            <Trash2 className="w-3 h-3" /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
};
