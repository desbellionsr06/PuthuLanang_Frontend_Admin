'use client';

import React, { useState, useEffect } from 'react';
import { MenuCategory } from '@/types';
import { Plus, Edit2, ImageIcon, AlertCircle } from 'lucide-react';
import { MAX_IMAGE_SIZE_MB } from '@/lib/uploadApi';

// Resolusi otomatis foto berdasarkan nama menu (untuk preview di form)
function resolvePreviewImage(name: string, category: string): string {
  const n = name.toLowerCase();
  if (n.includes('puthu'))                         return '/images/puthu_bambu.png';
  if (n.includes('klepon'))                        return '/images/klepon_pandan.png';
  if (n.includes('cenil'))                         return '/images/cenil_pelangi.png';
  if (n.includes('lupis'))                         return '/images/lupis_ketan.png';
  if (n.includes('paket') || n.includes('campur')) return '/images/paket_tampah.png';
  if (n.includes('besek') || n.includes('hampers')) return '/images/paket_tampah.png';
  if (category === 'paling_laris')                 return '/images/klepon_pandan.png';
  if (category === 'besek')                        return '/images/paket_tampah.png';
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
  previewImage?: string;
  selectedFile: File | null;
  onFileSelected: (file: File | null) => void;
  onFileError?: (message: string) => void;
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
  selectedFile,
  onFileSelected,
  onFileError,
}) => {
  // Gambar preview: dari props (edit) atau auto-resolve dari nama menu (add)
  const autoPreview = name.trim().length >= 3 ? resolvePreviewImage(name, category) : null;
  const displayImage = previewImage || autoPreview;
  const [imgError, setImgError] = useState(false);

  // Preview lokal (blob URL) dari file yang dipilih
  const [manualImage, setManualImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // State touched untuk validasi inline
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Parent mereset file → bersihkan preview
  if (!selectedFile && manualImage) {
    setManualImage(null);
  }

  // Lepaskan blob URL lama saat diganti / komponen di-unmount
  useEffect(() => {
    return () => {
      if (manualImage) URL.revokeObjectURL(manualImage);
    };
  }, [manualImage]);

  const finalImage = manualImage || displayImage;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      onFileError?.('Hanya file gambar yang diizinkan.');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      onFileError?.(`Ukuran gambar maksimal ${MAX_IMAGE_SIZE_MB} MB.`);
      return;
    }
    setManualImage(URL.createObjectURL(file));
    setImgError(false);
    onFileSelected(file);
  };

  const handleResetManualImage = () => {
    setImgError(false);
    onFileSelected(null);
  };

  // -------------------------------------------------------------
  // VALIDASI KETAT SECARA REAL-TIME (Requirement 3)
  // -------------------------------------------------------------

  // 1. Validasi Nama Menu: Hanya boleh huruf dan spasi (/^[A-Za-z\s]*$/)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Blokir angka dan simbol secara langsung saat mengetik
    const sanitized = rawVal.replace(/[^A-Za-z\s]/g, '');
    setName(sanitized);
    setImgError(false);
    markTouched('name');
  };

  const nameError = (() => {
    if (touched.name || name.length > 0) {
      if (!name.trim()) return 'Nama menu jajanan wajib diisi.';
      if (!/^[A-Za-z\s]+$/.test(name.trim())) {
        return 'Nama menu hanya boleh berisi huruf alfabet dan spasi (tanpa angka/simbol).';
      }
    }
    return null;
  })();

  // 2. Validasi Harga: Hanya angka bulat positif (/^[0-9]*$/), cegah e, E, +, -, ., > 0
  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setPrice(digitsOnly ? Number(digitsOnly) : '');
    markTouched('price');
  };

  const priceError = (() => {
    if (touched.price || price !== '') {
      if (price === '' || price === null || price === undefined) {
        return 'Harga menu wajib diisi.';
      }
      const num = Number(price);
      if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
        return 'Harga harus berupa bilangan bulat positif lebih besar dari 0.';
      }
    }
    return null;
  })();

  // 3. Validasi Estimasi Waktu Kukus: Angka bulat positif (/^[0-9]*$/), rentang 1–180 mnt
  const handlePrepKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePrepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setPreparationTimeMins(digitsOnly ? Number(digitsOnly) : '');
    markTouched('prep');
  };

  const prepError = (() => {
    if (preparationTimeMins !== '') {
      const num = Number(preparationTimeMins);
      if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 180) {
        return 'Estimasi waktu kukus harus berupa angka bulat antara 1 hingga 180 menit.';
      }
    }
    return null;
  })();

  // 4. Validasi Takaran Porsi: Huruf, angka, spasi, dan / (contoh: 5 pcs / porsi)
  const handlePortionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Blokir karakter simbol aneh kecuali garis miring
    const sanitized = raw.replace(/[^A-Za-z0-9\s/]/g, '');
    setPortionDetails(sanitized);
    markTouched('portion');
  };

  const portionError = (() => {
    if (portionDetails.trim()) {
      if (!/^[A-Za-z0-9\s/]+$/.test(portionDetails.trim())) {
        return 'Takaran porsi hanya boleh berisi huruf, angka, spasi, dan garis miring / (contoh: 5 pcs / porsi).';
      }
    }
    return null;
  })();

  // 5. Validasi Kategori: Wajib memilih opsi valid
  const validCategories: MenuCategory[] = ['pusaka', 'paling_laris', 'paket_campur', 'besek'];
  const categoryError = !validCategories.includes(category)
    ? 'Kategori wajib dipilih dari opsi yang tersedia.'
    : null;

  // 6. Validasi Deskripsi: Teks deskriptif (tidak boleh hanya angka/simbol kosong, min 10 karakter jika diisi)
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    markTouched('desc');
  };

  const descError = (() => {
    const trimmed = description.trim();
    if (trimmed) {
      if (/^\d+$/.test(trimmed)) {
        return 'Deskripsi menu tidak boleh hanya terdiri dari angka.';
      }
      if (trimmed.length < 10) {
        return 'Deskripsi menu minimal 10 karakter teks deskriptif.';
      }
    }
    return null;
  })();

  // Status validasi form secara keseluruhan
  const isFormValid =
    !nameError &&
    !priceError &&
    !prepError &&
    !portionError &&
    !categoryError &&
    !descError &&
    name.trim().length > 0 &&
    typeof price === 'number' &&
    price > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markTouched('name');
    markTouched('price');
    markTouched('prep');
    markTouched('portion');
    markTouched('desc');

    if (!isFormValid) return;
    onSaveMenu(e);
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
            className="text-[11px] font-bold text-[#D49B42] hover:underline transition-all cursor-pointer"
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

      {/* Preview Foto Menu */}
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
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
              <div className="flex flex-col items-center gap-1 text-white">
                <ImageIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Ganti Foto</span>
              </div>
            </div>
            <div className="absolute bottom-2 left-3 right-3">
              <p className="text-[10px] text-[#C5B8A8] font-bold uppercase tracking-wide">
                {manualImage ? '☁️ Foto Baru (diunggah ke Cloud saat Simpan)' : editingId ? '📷 Foto Saat Ini' : '📷 Preview Foto Otomatis'}
              </p>
              {name && (
                <p className="text-xs text-[#F8F4EC] font-extrabold truncate">{name}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42]/60 text-[#C5B8A8] hover:text-[#F8F4EC] text-[11px] font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Upload Foto ke Cloud
            </button>
            {manualImage && (
              <button
                type="button"
                onClick={handleResetManualImage}
                className="px-3 py-2 bg-[#1E1510] border border-[#3E2C22] hover:border-red-500/60 text-[#C5B8A8] hover:text-red-400 text-[11px] font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
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

      {/* FORM INPUT DENGAN VALIDASI KETAT */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Field 1: Nama Menu Jajanan */}
        <div>
          <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
            Nama Menu Jajanan *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Puthu Bambu Spesial"
            value={name}
            onChange={handleNameChange}
            onBlur={() => markTouched('name')}
            className={`w-full bg-[#1E1510] border ${
              nameError ? 'border-red-500/80 focus:border-red-500' : 'border-[#3E2C22] focus:border-[#D49B42]'
            } rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:ring-1 focus:ring-[#D49B42] transition-all`}
          />
          {nameError && (
            <p className="text-[11px] text-red-400 font-semibold mt-1 flex items-center gap-1 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{nameError}</span>
            </p>
          )}
          <p className="text-[10px] text-[#C5B8A8]/70 mt-1">
            Hanya huruf alfabet dan spasi (angka & simbol otomatis diblokir).
          </p>
        </div>

        {/* Field 2 & 3: Harga & Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
              Harga (Rp) *
            </label>
            <input
              type="text"
              inputMode="numeric"
              required
              placeholder="Contoh: 18000"
              value={price}
              onKeyDown={handlePriceKeyDown}
              onChange={handlePriceChange}
              onBlur={() => markTouched('price')}
              className={`w-full bg-[#1E1510] border ${
                priceError ? 'border-red-500/80 focus:border-red-500' : 'border-[#3E2C22] focus:border-[#D49B42]'
              } rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:ring-1 focus:ring-[#D49B42] transition-all`}
            />
            {priceError && (
              <p className="text-[11px] text-red-400 font-semibold mt-1 flex items-center gap-1 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{priceError}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
              Kategori *
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
            {categoryError && (
              <p className="text-[11px] text-red-400 font-semibold mt-1 flex items-center gap-1 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{categoryError}</span>
              </p>
            )}
          </div>
        </div>

        {/* Field 4 & 5: Estimasi Waktu Kukus & Takaran Porsi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
              Estimasi Waktu Kukus (Mnt)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Contoh: 10 (rentang 1–180)"
              value={preparationTimeMins}
              onKeyDown={handlePrepKeyDown}
              onChange={handlePrepChange}
              onBlur={() => markTouched('prep')}
              className={`w-full bg-[#1E1510] border ${
                prepError ? 'border-red-500/80 focus:border-red-500' : 'border-[#3E2C22] focus:border-[#D49B42]'
              } rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:ring-1 focus:ring-[#D49B42] transition-all`}
            />
            {prepError && (
              <p className="text-[11px] text-red-400 font-semibold mt-1 flex items-center gap-1 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{prepError}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
              Takaran Porsi
            </label>
            <input
              type="text"
              placeholder="Contoh: 5 pcs / porsi"
              value={portionDetails}
              onChange={handlePortionChange}
              onBlur={() => markTouched('portion')}
              className={`w-full bg-[#1E1510] border ${
                portionError ? 'border-red-500/80 focus:border-red-500' : 'border-[#3E2C22] focus:border-[#D49B42]'
              } rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:ring-1 focus:ring-[#D49B42] transition-all`}
            />
            {portionError && (
              <p className="text-[11px] text-red-400 font-semibold mt-1 flex items-center gap-1 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{portionError}</span>
              </p>
            )}
            <p className="text-[10px] text-[#C5B8A8]/70 mt-1">
              Hanya huruf, angka, spasi, dan garis miring /.
            </p>
          </div>
        </div>

        {/* Field 6: Deskripsi Menu */}
        <div>
          <label className="block font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
            Deskripsi Menu
          </label>
          <textarea
            rows={3}
            placeholder="Penjelasan rasa dan bahan baku otentik 1935 (min. 10 karakter jika diisi)..."
            value={description}
            onChange={handleDescChange}
            onBlur={() => markTouched('desc')}
            className={`w-full bg-[#1E1510] border ${
              descError ? 'border-red-500/80 focus:border-red-500' : 'border-[#3E2C22] focus:border-[#D49B42]'
            } rounded-xl p-3 text-[#F8F4EC] placeholder-[#C5B8A8]/50 focus:outline-none focus:ring-1 focus:ring-[#D49B42] transition-all resize-none`}
          />
          {descError && (
            <p className="text-[11px] text-red-400 font-semibold mt-1 flex items-center gap-1 animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{descError}</span>
            </p>
          )}
        </div>

        {/* Tombol Submit (dinonaktifkan jika form belum valid) */}
        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] disabled:opacity-40 disabled:hover:bg-[#2E7D32] disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{editingId ? 'Simpan Perubahan Menu' : '+ Tambah Menu'}</span>
        </button>
      </form>
    </div>
  );
};
