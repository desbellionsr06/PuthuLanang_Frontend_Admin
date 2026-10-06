'use client';

import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '@/lib/db';
import { useStore } from '@/store/useStore';
import { Utensils, Plus, Edit2, Trash2, Clock, Star, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export const AdminMenuCrud: React.FC = () => {
  const { addToast } = useStore();

  const [menuList, setMenuList] = useState<MenuItem[]>(MENU_ITEMS);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<MenuItem['category']>('pusaka');
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
      const newMenu: MenuItem = {
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

  const handleEditClick = (item: MenuItem) => {
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
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Title */}
      <div className="bg-[#2A1D16] border border-[#3E2C22] p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F8F4EC] flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#D49B42]" /> Halaman Kelola Menu Makanan (CRUD)
          </h1>
          <p className="text-xs text-[#C5B8A8] mt-1">
            Tambah menu jajanan baru, perbarui harga, atau hapus item dari katalog aktif.
          </p>
        </div>

        <span className="px-3 py-1 bg-[#2E7D32]/20 border border-[#2E7D32]/40 text-[#2E7D32] text-xs font-bold rounded-full">
          Total {menuList.length} Item Aktif
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Input Tambah / Edit Menu */}
        <div className="lg:col-span-5 bg-[#2A1D16] border border-[#3E2C22] rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#3E2C22] pb-4">
            <h2 className="text-base font-bold text-[#F8F4EC] flex items-center gap-2">
              {editingId ? <Edit2 className="w-4 h-4 text-[#D49B42]" /> : <Plus className="w-4 h-4 text-[#2E7D32]" />}
              <span>{editingId ? 'Edit Item Menu' : 'Form Input Tambah Menu Baru'}</span>
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-[11px] font-bold text-[#D49B42] hover:underline"
              >
                Batal Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSaveMenu} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
                Nama Menu Jajanan *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Puthu Bambu Spesial"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
                  Harga (Rp) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="18000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                >
                  <option value="pusaka">Jajanan Pusaka</option>
                  <option value="paling_laris">Paling Laris</option>
                  <option value="paket_campur">Paket Campur</option>
                  <option value="besek">Porsi Box Besek</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
                  Estimasi Waktu Kukus (Mnt)
                </label>
                <input
                  type="number"
                  placeholder="10"
                  value={preparationTimeMins}
                  onChange={(e) => setPreparationTimeMins(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
                  Takaran Porsi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 5 pcs / porsi"
                  value={portionDetails}
                  onChange={(e) => setPortionDetails(e.target.value)}
                  className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
                Deskripsi Menu
              </label>
              <textarea
                rows={3}
                placeholder="Penjelasan rasa dan bahan baku otentik 1935..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{editingId ? 'Simpan Perubahan Menu' : 'Tambah Menu'}</span>
            </button>
          </form>
        </div>

        {/* Right Table & Cards: Daftar Menu Makanan Aktif */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-3xl p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-[#F8F4EC] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#D49B42]" /> Daftar Menu Makanan Aktif
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuList.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42] p-4 rounded-2xl flex flex-col justify-between space-y-3 transition-all"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#3E2C22]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#F8F4EC] truncate text-sm">{item.name}</h3>
                      </div>
                      <p className="text-xs font-extrabold text-[#D49B42] mt-0.5">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[11px] text-[#C5B8A8] mt-0.5">{item.portionDetails}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-[#3E2C22] text-xs">
                    <span className="text-[10px] text-[#C5B8A8] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#2E7D32]" /> {item.preparationTimeMins} Mnt Kukus
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="px-3 py-1 bg-[#241913] border border-[#3E2C22] hover:border-[#D49B42] text-[#D49B42] font-bold rounded-lg flex items-center gap-1 text-[11px]"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id, item.name)}
                        className="px-3 py-1 bg-red-900/20 border border-red-800/40 text-red-300 hover:bg-red-900/40 font-bold rounded-lg flex items-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3 h-3" /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
