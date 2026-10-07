'use client';

import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '@/lib/db';
import { useStore } from '@/store/useStore';
import { MenuItemModel, MenuCategory } from '@/types';
import { Utensils, Flame } from 'lucide-react';
import { MenuForm } from './menu/MenuForm';
import { MenuItemCard } from './menu/MenuItemCard';

export const AdminMenuCrud: React.FC = () => {
  const { addToast } = useStore();

  const [menuList, setMenuList] = useState<MenuItemModel[]>(MENU_ITEMS as MenuItemModel[]);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<MenuCategory>('pusaka');
  const [preparationTimeMins, setPreparationTimeMins] = useState<number | ''>(10);
  const [portionDetails, setPortionDetails] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setCategory('pusaka');
    setPreparationTimeMins(10);
    setPortionDetails('');
    setDescription('');
  };

  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) {
      addToast('Mohon isi nama menu dan harga.', 'warning');
      return;
    }

    if (editingId) {
      // Edit existing menu
      setMenuList((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name,
                price: Number(price),
                category,
                preparationTimeMins: Number(preparationTimeMins) || 10,
                portionDetails: portionDetails || item.portionDetails,
                description: description || item.description
              }
            : item
        )
      );
      addToast(`Menu "${name}" berhasil diperbarui!`, 'success');
    } else {
      // Create new menu
      const newMenu: MenuItemModel = {
        id: `custom-menu-${Date.now()}`,
        name,
        category,
        description: description || 'Sajian jajanan pasar tradisional otentik 1935.',
        portionDetails: portionDetails || '1 Porsi Komplit',
        price: Number(price),
        rating: 5.0,
        reviewsCount: 1,
        image: '/images/paket_tampah.png',
        ingredients: ['Bahan Pilihan 100% Alami'],
        allergens: ['Bebas Bahan Pengawet'],
        isAvailable: true,
        stockRemaining: 100,
        preparationTimeMins: Number(preparationTimeMins) || 10
      };

      setMenuList((prev) => [newMenu, ...prev]);
      addToast(`Menu baru "${name}" berhasil ditambahkan!`, 'success');
    }

    resetForm();
  };

  const handleEditClick = (item: MenuItemModel) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
    setPreparationTimeMins(item.preparationTimeMins);
    setPortionDetails(item.portionDetails);
    setDescription(item.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (id: string, menuName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus menu "${menuName}"?`)) {
      setMenuList((prev) => prev.filter((i) => i.id !== id));
      addToast(`Menu "${menuName}" berhasil dihapus dari katalog!`, 'info');
      if (editingId === id) resetForm();
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Title */}
      <div className="bg-[#2A1D16] border border-[#3E2C22] p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#F8F4EC] flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#D49B42]" /> Halaman Kelola Menu Makanan (CRUD)
          </h1>
          <p className="text-xs text-[#C5B8A8] mt-1">
            Tambah menu jajanan baru, perbarui harga, atau hapus item dari katalog aktif.
          </p>
        </div>

        <span className="px-3 py-1 bg-[#2E7D32]/20 border border-[#2E7D32]/40 text-[#2E7D32] text-xs font-bold rounded-full shrink-0">
          Total {menuList.length} Item Aktif
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Form: Input Tambah / Edit Menu */}
        <div className="lg:col-span-5">
          <MenuForm
            editingId={editingId}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory}
            preparationTimeMins={preparationTimeMins}
            setPreparationTimeMins={setPreparationTimeMins}
            portionDetails={portionDetails}
            setPortionDetails={setPortionDetails}
            description={description}
            setDescription={setDescription}
            onSaveMenu={handleSaveMenu}
            onResetForm={resetForm}
          />
        </div>

        {/* Right Table & Cards: Daftar Menu Makanan Aktif */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-[#F8F4EC] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#D49B42]" /> Daftar Menu Makanan Aktif
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuList.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
