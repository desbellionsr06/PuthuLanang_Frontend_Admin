'use client';

// Hook logika halaman Kelola Menu (CRUD):
// load + polling, state form, simpan (create/update), hapus.
// Upload foto → Cloud Storage (Cloudinary) lalu URL-nya dikirim ke backend.

import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { MenuItemModel, MenuCategory } from '@/types';
import {
  fetchAdminMenu,
  createAdminMenu,
  updateAdminMenu,
  deleteAdminMenu,
} from '@/lib/adminApi';
import { uploadImageToCloud } from '@/lib/uploadApi';
import { mapBackendToMenuItemModel } from './menuMapper';

const POLL_INTERVAL_MS = 15000; // Refresh menu lebih jarang

export function useKelolaMenu() {
  const { addToast } = useStore();

  const [menuList, setMenuList] = useState<MenuItemModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<string | undefined>(undefined); // foto item yang diedit
  const [editingStock, setEditingStock] = useState<number>(100);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<MenuCategory>('pusaka');
  const [preparationTimeMins, setPreparationTimeMins] = useState<number | ''>(10);
  const [portionDetails, setPortionDetails] = useState('');
  const [description, setDescription] = useState('');
  // File gambar yang dipilih user (belum di-upload; di-upload saat Simpan)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // ----------------------------------------------------------------
  // Load menu dari backend
  // ----------------------------------------------------------------
  const loadMenu = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    setError(null);
    try {
      const data = await fetchAdminMenu();
      setMenuList(data.map(mapBackendToMenuItemModel));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memuat menu.';
      setError(msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Load awal + polling otomatis (setState hanya di callback async)
  useEffect(() => {
    let active = true;
    fetchAdminMenu()
      .then((data) => {
        if (!active) return;
        setMenuList(data.map(mapBackendToMenuItemModel));
        setError(null);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Gagal memuat menu.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    const interval = setInterval(() => loadMenu(), POLL_INTERVAL_MS);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [loadMenu]);

  // ----------------------------------------------------------------
  // Reset form
  // ----------------------------------------------------------------
  const resetForm = () => {
    setEditingId(null);
    setEditingImage(undefined);
    setEditingStock(100);
    setName('');
    setPrice('');
    setCategory('pusaka');
    setPreparationTimeMins(10);
    setPortionDetails('');
    setDescription('');
    setSelectedImageFile(null);
  };

  // ----------------------------------------------------------------
  // Simpan menu (CREATE atau UPDATE)
  // 1. Jika ada foto baru → upload ke Cloud Storage → dapat URL
  // 2. Kirim data (+ URL foto) ke backend
  // ----------------------------------------------------------------
  const handleSaveMenu = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi client-side sebelum kirim ke API (Strict Validation)
    const parsedPrice = Number(price);

    // 1. Nama menu: hanya huruf dan spasi
    if (!name.trim() || !/^[A-Za-z\s]+$/.test(name.trim())) {
      addToast('Nama menu hanya boleh berisi huruf alfabet dan spasi (tanpa angka/simbol).', 'warning');
      return;
    }

    // 2. Harga menu: angka bulat positif > 0
    if (!price || isNaN(parsedPrice) || !Number.isInteger(parsedPrice) || parsedPrice <= 0) {
      addToast('Harga menu wajib diisi dengan bilangan bulat positif (> 0).', 'warning');
      return;
    }

    // 3. Estimasi waktu kukus: rentang 1 - 180 menit
    if (preparationTimeMins !== '' && (Number(preparationTimeMins) < 1 || Number(preparationTimeMins) > 180)) {
      addToast('Estimasi waktu kukus harus berupa angka antara 1 hingga 180 menit.', 'warning');
      return;
    }

    // 4. Takaran porsi: huruf, angka, spasi, dan /
    if (portionDetails.trim() && !/^[A-Za-z0-9\s/]+$/.test(portionDetails.trim())) {
      addToast('Takaran porsi hanya boleh berisi huruf, angka, spasi, dan garis miring / (contoh: 5 pcs / porsi).', 'warning');
      return;
    }

    // 5. Deskripsi: minimal 10 karakter dan tidak boleh hanya angka
    if (description.trim()) {
      if (/^\d+$/.test(description.trim())) {
        addToast('Deskripsi menu tidak boleh hanya terdiri dari angka.', 'warning');
        return;
      }
      if (description.trim().length < 10) {
        addToast('Deskripsi menu minimal 10 karakter jika diisi.', 'warning');
        return;
      }
    }

    setIsSaving(true);
    try {
      // ── 1. Upload foto ke Cloud Storage (jika user memilih file) ────
      let imageUrl: string | undefined;
      if (selectedImageFile) {
        try {
          imageUrl = await uploadImageToCloud(selectedImageFile);
        } catch (uploadErr: unknown) {
          const msg = uploadErr instanceof Error ? uploadErr.message : 'Upload gagal.';
          addToast(`Gagal mengunggah foto: ${msg}`, 'warning');
          return; // batalkan simpan; data form tetap utuh agar bisa dicoba lagi
        }
      }

      const trimmedDescription = description.trim();

      if (editingId && !imageUrl) {
        // ── 2a. UPDATE data teks saja (foto tidak berubah) ───────────
        await updateAdminMenu(editingId, {
          name:        name.trim(),
          price:       parsedPrice,
          category,
          description: trimmedDescription || undefined,
          estimasi_waktu_kukus: preparationTimeMins !== '' ? Number(preparationTimeMins) : 10,
          takaran_porsi: portionDetails.trim() || undefined,
        });
        addToast(`✅ Menu "${name}" berhasil diperbarui di database!`, 'success');

      } else if (editingId && imageUrl) {
        // ── 2b. UPDATE + GANTI FOTO ───────────────────────────────────
        // Endpoint PATCH /api/admin/menu/:id di backend tidak menerima
        // field `image` (dan backend tidak boleh diubah). Jalur yang
        // tersedia: buat menu baru dengan URL foto cloud, lalu hapus
        // menu lama. Catatan: ID menu berubah.
        await createAdminMenu({
          name:        name.trim(),
          price:       parsedPrice,
          category,
          description: trimmedDescription || undefined,
          stock:       editingStock,
          image:       imageUrl,
          estimasi_waktu_kukus: preparationTimeMins !== '' ? Number(preparationTimeMins) : 10,
          takaran_porsi: portionDetails.trim() || undefined,
        });

        try {
          await deleteAdminMenu(editingId);
          addToast(`✅ Menu "${name}" berhasil diperbarui dengan foto baru!`, 'success');
        } catch (delErr: unknown) {
          const msg = delErr instanceof Error ? delErr.message : 'Gagal menghapus menu lama.';
          addToast(
            `Menu baru dibuat, tetapi menu lama gagal dihapus (${msg}). Hapus manual dari daftar.`,
            'warning'
          );
        }

      } else {
        // ── 2c. CREATE menu baru (image = URL Cloud Storage, jika ada) ─
        await createAdminMenu({
          name:        name.trim(),
          price:       parsedPrice,          // Number (bukan string)
          category,
          description: trimmedDescription || 'Sajian jajanan pasar tradisional otentik 1935.',
          stock:       100,                  // default stok awal
          estimasi_waktu_kukus: preparationTimeMins !== '' ? Number(preparationTimeMins) : 10,
          takaran_porsi: portionDetails.trim() || undefined,
          ...(imageUrl ? { image: imageUrl } : {}),
        });
        addToast(`✅ Menu baru "${name}" berhasil ditambahkan ke database!`, 'success');
      }

      await loadMenu(); // re-fetch agar UI sinkron dengan DB
      resetForm();      // bersihkan form hanya jika berhasil

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke backend gagal.';
      addToast(`Gagal: ${msg}. Pastikan backend berjalan di port 5000.`, 'warning');
    } finally {
      setIsSaving(false);
    }
  };

  // ----------------------------------------------------------------
  // Edit item
  // ----------------------------------------------------------------
  const handleEditClick = (item: MenuItemModel) => {
    setEditingId(item.id);
    setEditingImage(item.image); // simpan foto item untuk preview di form
    setEditingStock(item.stockRemaining);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
    setPreparationTimeMins(item.preparationTimeMins);
    setPortionDetails(item.portionDetails);
    setDescription(item.description);
    setSelectedImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----------------------------------------------------------------
  // Hapus item
  // ----------------------------------------------------------------
  const handleDeleteClick = async (id: string, menuName: string) => {
    if (!confirm(`Hapus menu "${menuName}" dari database?\n\nTindakan ini tidak dapat dibatalkan.`)) return;

    try {
      await deleteAdminMenu(id);
      addToast(`🗑️ Menu "${menuName}" berhasil dihapus dari database!`, 'info');
      await loadMenu(); // re-fetch agar daftar sinkron dengan DB
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke backend gagal.';
      addToast(`Gagal hapus menu: ${msg}`, 'warning');
    }

    if (editingId === id) resetForm();
  };

  return {
    // data list
    menuList,
    isLoading,
    isRefreshing,
    isSaving,
    error,
    loadMenu,
    // form
    editingId,
    editingImage,
    name, setName,
    price, setPrice,
    category, setCategory,
    preparationTimeMins, setPreparationTimeMins,
    portionDetails, setPortionDetails,
    description, setDescription,
    selectedImageFile, setSelectedImageFile,
    // actions
    resetForm,
    handleSaveMenu,
    handleEditClick,
    handleDeleteClick,
  };
}
