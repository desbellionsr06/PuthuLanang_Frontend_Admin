'use client';

import React from 'react';
import { Utensils, Flame } from 'lucide-react';
import { MenuItemModel } from '@/types';
import { MenuItemCard } from './MenuItemCard';

interface MenuListSectionProps {
  menuList: MenuItemModel[];
  isLoading: boolean;
  onEditClick: (item: MenuItemModel) => void;
  onDeleteClick: (id: string, name: string) => void;
}

// Section: daftar menu aktif (kartu + foto dari Cloud Storage)
export const MenuListSection: React.FC<MenuListSectionProps> = ({
  menuList,
  isLoading,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="lg:col-span-7 space-y-4">
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
        <h2 className="text-sm sm:text-base font-bold text-[#F8F4EC] flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#D49B42]" /> Daftar Menu Aktif (dari Database)
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 border-4 border-[#D49B42]/30 border-t-[#D49B42] rounded-full animate-spin" />
            <p className="text-[#C5B8A8] text-xs">Mengambil data menu dari MySQL...</p>
          </div>
        ) : menuList.length === 0 ? (
          <div className="text-center py-12 text-[#C5B8A8] text-sm">
            <Utensils className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Belum ada menu di database.</p>
            <p className="text-xs mt-1">Tambahkan menu baru menggunakan form di sebelah kiri.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {menuList.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
