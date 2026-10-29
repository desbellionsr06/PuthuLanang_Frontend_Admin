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
  // Callback: meneruskan file asli yang dipilih user ke parent (AdminMenuCrud)
  onFileSelected?: (file: File | null) => void;
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
  onFileSelected,
}) => {
  // Gambar preview: dari props (edit) atau auto-resolve dari nama menu (add)
  const autoPreview = name.trim().length >= 3 ? resolvePreviewImage(name, category) : null;
  const displayImage = previewImage || autoPreview;
  const [imgError, setImgError] = useState(false);

  // State untuk gambar yang diupload manual oleh user
  const [manualImage, setManualImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Gambar final: manual upload > previewImage (edit) > auto-resolve
  const finalImage = manualImage || displayImage;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validasi: hanya file gambar
    if (!file.type.startsWith('image/')) return;
    const objectUrl = URL.createObjectURL(file);
    setManualImage(objectUrl);
    setImgError(false);
    // Teruskan file asli ke parent (AdminMenuCrud) agar bisa dikirim ke backend
    onFileSelected?.(file);
    // Reset nilai input file agar file yang sama bisa dipilih ulang
    e.target.value = '';
  };

  const handleResetManualImage = () => {
    if (manualImage) URL.revokeObjectURL(manualImage);
    setManualImage(null);
    setImgError(false);
    // Beritahu parent bahwa tidak ada lagi file yang dipilih
    onFileSelected?.(null);
  };

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

      {/* Input file tersembunyi untuk upload gambar manual */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Preview Foto Menu — klik untuk upload gambar manual */}
      {finalImage && !imgError ? (
        <div className="space-y-2">
          <div
            className="relative w-full h-36 rounded-xl overflow-hidden bg-[#1E1510] border border-[#3E2C22] cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            title="Klik untuk mengganti foto"
          >
            <img
              src={finalImage}
              alt={name || 'Preview menu'}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1510]/80 via-transparent to-transparent" />
            {/* Overlay hover: tampilkan ikon ganti foto */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
              <div className="flex flex-col items-center gap-1 text-white">
                <ImageIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Ganti Foto</span>
              </div>
            </div>
            <div className="absolute bottom-2 left-3 right-3">
              <p className="text-[10px] text-[#C5B8A8] font-bold uppercase tracking-wide">
                {manualImage ? '🖼️ Foto Diunggah Manual' : editingId ? '📷 Foto Saat Ini' : '📷 Preview Foto Otomatis'}
              </p>
              {name && (
                <p className="text-xs text-[#F8F4EC] font-extrabold truncate">{name}</p>
              )}
            </div>
          </div>
          {/* Tombol aksi foto */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42]/60 text-[#C5B8A8] hover:text-[#F8F4EC] text-[11px] font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Upload Foto Manual
            </button>
            {manualImage && (
              <button
                type="button"
                onClick={handleResetManualImage}
                className="px-3 py-2 bg-[#1E1510] border border-[#3E2C22] hover:border-red-500/60 text-[#C5B8A8] hover:text-red-400 text-[11px] font-bold rounded-xl transition-all active:scale-95"
                title="Kembali ke foto otomatis"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="w-full h-24 rounded-xl bg-[#1E1510] border border-dashed border-[#3E2C22] hover:border-[#D49B42]/60 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all group"
          onClick={() => fileInputRef.current?.click()}
          title="Klik untuk mengunggah foto"
        >
          <ImageIcon className="w-6 h-6 text-[#C5B8A8]/40 group-hover:text-[#D49B42]/70 transition-colors" />
          <p className="text-[10px] text-[#C5B8A8]/60 group-hover:text-[#C5B8A8] transition-colors">
            {imgError ? 'Klik untuk mengunggah foto manual' : 'Ketik nama menu untuk preview otomatis, atau klik untuk upload'}
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
