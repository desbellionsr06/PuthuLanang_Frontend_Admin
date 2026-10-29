'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { MenuItemModel, MenuCategory } from '@/types';
import { Utensils, Flame, RefreshCw, Loader2 } from 'lucide-react';
import { fetchAdminMenu, BackendMenu } from '@/lib/adminApi';
import { MenuForm } from './menu/MenuForm';
import { MenuItemCard } from './menu/MenuItemCard';

const BACKEND_URL = 'http://localhost:5000';
const ADMIN_KEY = 'puthu-admin-2026';

// ==================================================================
// Helper: Konversi path gambar dari format Flutter/DB → URL Next.js
// Database menyimpan: "assets/images/xxx.png"
// Next.js butuh    : "/images/xxx.png" (dari folder public/)
// ==================================================================
function resolveImageUrl(rawPath: string | undefined, menuId?: string | number): string {
  if (!rawPath) return resolveImageByMenuId(menuId);

  // Jika sudah berupa URL absolut (http/https), gunakan langsung
  if (rawPath.startsWith('http')) return rawPath;

  // Konversi path Flutter "assets/images/xxx.png" → "/images/xxx.png"
  if (rawPath.startsWith('assets/images/')) {
    return '/' + rawPath.replace('assets/', '');
  }

  // Jika sudah berformat "/images/xxx.png", gunakan langsung
  if (rawPath.startsWith('/images/')) return rawPath;

  // Fallback: ekstrak nama file saja
  const filename = rawPath.split('/').pop();
  if (filename) return `/images/${filename}`;

  return resolveImageByMenuId(menuId);
}

// Pemetaan ID menu → file foto (untuk menu tanpa field gambar)
function resolveImageByMenuId(id?: string | number): string {
  const str = String(id || '').toLowerCase();
  if (str.includes('puthu'))          return '/images/puthu_bambu.png';
  if (str.includes('klepon'))         return '/images/klepon_pandan.png';
  if (str.includes('cenil'))          return '/images/cenil_pelangi.png';
  if (str.includes('lupis'))          return '/images/lupis_ketan.png';
  if (str.includes('paket') || str.includes('campur')) return '/images/paket_tampah.png';
  if (str.includes('besek') || str.includes('hampers')) return '/images/paket_tampah.png';
  return '/images/paket_tampah.png';
}

// ==================================================================
// Helper: Konversi BackendMenu → MenuItemModel (untuk komponen lama)
// Mendukung kedua skema kolom MySQL (name/category/price dan nama/kategori/harga)
// ==================================================================
function mapBackendToMenuItemModel(m: BackendMenu): MenuItemModel {
  const displayName = m.name || m.nama || 'Menu';
  const displayPrice = m.price ?? m.harga ?? 0;
  const displayCategory = (m.category || m.kategori || 'pusaka') as MenuCategory;
  const displayDescription = m.description || m.deskripsi || 'Sajian jajanan pasar tradisional otentik 1935.';
  // Konversi path gambar dari format DB/Flutter ke URL Next.js
  const displayImage = resolveImageUrl(m.image || m.gambar, m.id);

  return {
    id: String(m.id),
    name: displayName,
    category: displayCategory,
    description: displayDescription,
    portionDetails: '1 Porsi',
    price: Number(displayPrice) || 0,
    rating: typeof m.rating === 'string' ? parseFloat(m.rating) : (m.rating || 5.0),
    reviewsCount: 1,
    image: displayImage,
    ingredients: ['Bahan Pilihan Alami'],
    allergens: ['Bebas Bahan Pengawet'],
    isAvailable: m.tersedia !== 0,
    stockRemaining: m.stock ?? 100,
    preparationTimeMins: 10,
  };
}


const POLL_INTERVAL_MS = 15000; // Refresh menu lebih jarang

export const AdminMenuCrud: React.FC = () => {
  const { addToast } = useStore();

  const [menuList, setMenuList] = useState<MenuItemModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<string | undefined>(undefined); // foto item yang diedit
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<MenuCategory>('pusaka');
  const [preparationTimeMins, setPreparationTimeMins] = useState<number | ''>(10);
  const [portionDetails, setPortionDetails] = useState('');
  const [description, setDescription] = useState('');

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

  useEffect(() => {
    loadMenu();
    const interval = setInterval(() => loadMenu(), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadMenu]);

  // ----------------------------------------------------------------
  // Reset form
  // ----------------------------------------------------------------
  const resetForm = () => {
    setEditingId(null);
    setEditingImage(undefined);
    setName('');
    setPrice('');
    setCategory('pusaka');
    setPreparationTimeMins(10);
    setPortionDetails('');
    setDescription('');
  };

  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  // Simpan menu (CREATE atau UPDATE) → kirim ke backend API
  // ----------------------------------------------------------------
  const handleSaveMenu = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi client-side sebelum kirim ke API
    const parsedPrice = Number(price);
    if (!name.trim()) {
      addToast('Nama menu wajib diisi.', 'warning');
      return;
    }
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      addToast('Harga menu wajib diisi dan harus berupa angka positif.', 'warning');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        // ── UPDATE menu yang sudah ada ─────────────────────────────────
        const res = await fetch(
          `${BACKEND_URL}/api/admin/menu/${editingId}?admin_key=${ADMIN_KEY}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'X-Admin-Key': ADMIN_KEY },
            body: JSON.stringify({
              name:        name.trim(),
              price:       parsedPrice,
              category,
              description: description.trim() || undefined,
            }),
          }
        );

        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          addToast(`Gagal memperbarui menu: ${json.error || res.statusText}`, 'warning');
          return;
        }

        addToast(`✅ Menu "${name}" berhasil diperbarui di database!`, 'success');
        await loadMenu(); // re-fetch agar UI sinkron dengan DB

      } else {
        // ── CREATE menu baru ───────────────────────────────────────────
        const payload = {
          name:        name.trim(),
          price:       parsedPrice,          // Number (bukan string)
          category,
          description: description.trim() || 'Sajian jajanan pasar tradisional otentik 1935.',
          stock:       100,                  // default stok awal
        };

        const res = await fetch(
          `${BACKEND_URL}/api/admin/menu?admin_key=${ADMIN_KEY}`,
          {
            method:  'POST',
            headers: { 'Content-Type': 'application/json', 'X-Admin-Key': ADMIN_KEY },
            body:    JSON.stringify(payload),
          }
        );

        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          // Tampilkan pesan error dari API ke pengguna (bukan silent fallback)
          addToast(
            `Gagal menyimpan menu ke database: ${json.error || res.statusText}`,
            'warning'
          );
          return;
        }

        // ✅ Sukses: notifikasi + re-fetch daftar menu agar langsung muncul
        addToast(`✅ Menu baru "${name}" berhasil ditambahkan ke database!`, 'success');
        await loadMenu(); // re-fetch langsung tanpa menunggu polling
      }

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke backend gagal.';
      addToast(`Gagal: ${msg}. Pastikan backend berjalan di port 5000.`, 'warning');
    } finally {
      setIsSaving(false);
      resetForm(); // bersihkan form setelah selesai
    }
  };


  // ----------------------------------------------------------------
  // Edit item
  // ----------------------------------------------------------------
  const handleEditClick = (item: MenuItemModel) => {
    setEditingId(item.id);
    setEditingImage(item.image); // simpan foto item untuk preview di form
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
    setPreparationTimeMins(item.preparationTimeMins);
    setPortionDetails(item.portionDetails);
    setDescription(item.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----------------------------------------------------------------
  // Hapus item
  // ----------------------------------------------------------------
  const handleDeleteClick = async (id: string, menuName: string) => {
    if (!confirm(`Hapus menu "${menuName}" dari database?\n\nTindakan ini tidak dapat dibatalkan.`)) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/menu/${id}?admin_key=${ADMIN_KEY}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Key': ADMIN_KEY },
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        addToast(`Gagal menghapus menu: ${json.error || res.statusText}`, 'warning');
        return;
      }

      addToast(`🗑️ Menu "${menuName}" berhasil dihapus dari database!`, 'info');
      await loadMenu(); // re-fetch agar daftar sinkron dengan DB
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke backend gagal.';
      addToast(`Gagal hapus menu: ${msg}`, 'warning');
    }

    if (editingId === id) resetForm();
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
            Data menu diambil langsung dari database MySQL via Backend API.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="px-3 py-1 bg-[#2E7D32]/20 border border-[#2E7D32]/40 text-[#2E7D32] text-xs font-bold rounded-full">
            {isLoading ? '...' : `${menuList.length} Item Aktif`}
          </span>
          <button
            onClick={() => loadMenu(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42]/60 text-[#C5B8A8] hover:text-[#F8F4EC] text-xs font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Memuat...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-2xl px-4 py-3 text-xs text-red-300">
          ⚠️ {error} — Pastikan backend berjalan di <strong>http://localhost:5000</strong>.
        </div>
      )}

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
            previewImage={editingImage}
          />
          {isSaving && (
            <div className="mt-3 flex items-center gap-2 text-xs text-[#D49B42]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan ke database...
            </div>
          )}
        </div>

        {/* Right Table & Cards: Daftar Menu Makanan Aktif */}
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
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
