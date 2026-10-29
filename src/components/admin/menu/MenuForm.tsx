'use client';

import React, { useState } from 'react';
import { MenuItemModel, MenuCategory } from '@/types';
import { Plus, Edit2, ImageIcon } from 'lucide-react';

// Resolusi otomatis foto berdasarkan nama menu (untuk preview di form)
function resolvePreviewImage(name: string, category: string): string {
  const n = name.toLowerCase();
  if (n.includes('puthu'))                      return '/images/puthu_bambu.png';
  if (n.includes('klepon'))                     return '/images/klepon_pandan.png';
  if (n.includes('cenil'))                      return '/images/cenil_pelangi.png';
  if (n.includes('lupis'))                      return '/images/lupis_ketan.png';
  if (n.includes('paket') || n.includes('campur')) return '/images/paket_tampah.png';
  if (n.includes('besek') || n.includes('hampers')) return '/images/paket_tampah.png';
  if (category === 'paling_laris')              return '/images/klepon_pandan.png';
  if (category === 'besek')                     return '/images/paket_tampah.png';
  return '/images/paket_tampah.png';
}

interface MenuFormProps {
  editingId: string | null;
  name: string;
  setName: (val: string) => void;
  price: number | '';
  setPrice: (val: number | '') => void;
  category: MenuCategory;
  setCategory: (val: MenuCategory) => void;
  preparationTimeMins: number | '';
  setPreparationTimeMins: (val: number | '') => void;
  portionDetails: string;
  setPortionDetails: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  onSaveMenu: (e: React.FormEvent) => void;
  onResetForm: () => void;
  // Props baru: gambar item yang sedang diedit
  previewImage?: string;
}

export const MenuForm: React.FC<MenuFormProps> = ({
  editingId,
  name,
  setName,
  price,
  setPrice,
  category,
  setCategory,
  preparationTimeMins,
  setPreparationTimeMins,
  portionDetails,
  setPortionDetails,
  description,
  setDescription,
  onSaveMenu,
  onResetForm,
  previewImage,
}) => {
  // Gambar preview: dari props (edit) atau auto-resolve dari nama menu (add)
  const autoPreview = name.trim().length >= 3 ? resolvePreviewImage(name, category) : null;
  const displayImage = previewImage || autoPreview;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
      <div className="flex justify-between items-center border-b border-[#3E2C22] pb-4">
        <h2 className="text-sm sm:text-base font-bold text-[#F8F4EC] flex items-center gap-2">
          {editingId ? <Edit2 className="w-4 h-4 text-[#D49B42]" /> : <Plus className="w-4 h-4 text-[#2E7D32]" />}
          <span>{editingId ? 'Edit Item Menu' : 'Form Input Tambah Menu Baru'}</span>
        </h2>
        {editingId && (
          <button
            type="button"
            onClick={onResetForm}
            className="text-[11px] font-bold text-[#D49B42] hover:underline transition-all"
          >
            Batal Edit
          </button>
        )}
      </div>

      {/* Preview Foto Menu */}
      {displayImage && !imgError ? (
        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-[#1E1510] border border-[#3E2C22]">
          <img
            src={displayImage}
            alt={name || 'Preview menu'}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1510]/80 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 right-3">
            <p className="text-[10px] text-[#C5B8A8] font-bold uppercase tracking-wide">
              {editingId ? '📷 Foto Saat Ini' : '📷 Preview Foto'}
            </p>
            {name && (
              <p className="text-xs text-[#F8F4EC] font-extrabold truncate">{name}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-24 rounded-xl bg-[#1E1510] border border-dashed border-[#3E2C22] flex flex-col items-center justify-center gap-1.5">
          <ImageIcon className="w-6 h-6 text-[#C5B8A8]/40" />
          <p className="text-[10px] text-[#C5B8A8]/60">
            Ketik nama menu untuk melihat preview foto
          </p>
        </div>
      )}

      <form onSubmit={onSaveMenu} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
            Nama Menu Jajanan *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Puthu Bambu Spesial"
            value={name}
            onChange={(e) => { setName(e.target.value); setImgError(false); }}
            className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MenuCategory)}
              className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] transition-all cursor-pointer"
            >
              <option value="pusaka">Jajanan Pusaka</option>
              <option value="paling_laris">Paling Laris</option>
              <option value="paket_campur">Paket Campur</option>
              <option value="besek">Porsi Box Besek</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
              Estimasi Waktu Kukus (Mnt)
            </label>
            <input
              type="number"
              placeholder="10"
              value={preparationTimeMins}
              onChange={(e) => setPreparationTimeMins(e.target.value ? Number(e.target.value) : '')}
              className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] transition-all"
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
              className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] transition-all"
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
            className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] active:scale-[0.98] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{editingId ? 'Simpan Perubahan Menu' : 'Tambah Menu'}</span>
        </button>
      </form>
    </div>
  );
};
