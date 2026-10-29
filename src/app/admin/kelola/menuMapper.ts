// =============================================================
// menuMapper.ts — Helper konversi data menu dari backend → model UI
// =============================================================

import { MenuItemModel, MenuCategory } from '@/types';
import { BackendMenu } from '@/lib/adminApi';
import { BACKEND_URL } from '@/lib/config';

// Pemetaan ID menu → file foto fallback (untuk menu tanpa field gambar)
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
// Konversi path gambar dari DB → URL yang bisa ditampilkan di browser.
// - Gambar baru            : URL Cloud Storage (https://res.cloudinary.com/...)
//                            → dipakai langsung.
// - Data lama (legacy)     : "/uploads/xxx.jpg" (disk lokal backend) dan
//                            "assets/images/xxx.png" (aset bawaan Flutter)
//                            tetap didukung agar menu lama tidak rusak.
// ==================================================================
export function resolveImageUrl(rawPath: string | undefined, menuId?: string | number): string {
  if (!rawPath) return resolveImageByMenuId(menuId);

  // URL absolut (Cloud Storage) → gunakan langsung
  if (rawPath.startsWith('http')) return rawPath;

  // Legacy: upload lama yang tersimpan di backend lokal
  if (rawPath.startsWith('/uploads/')) return `${BACKEND_URL}${rawPath}`;

  // Legacy: "assets/images/xxx.png" → "/images/xxx.png"
  if (rawPath.startsWith('assets/images/')) {
    return '/' + rawPath.replace('assets/', '');
  }

  if (rawPath.startsWith('/images/')) return rawPath;

  // Fallback: ekstrak nama file saja
  const filename = rawPath.split('/').pop();
  if (filename) return `/images/${filename}`;

  return resolveImageByMenuId(menuId);
}

// Konversi BackendMenu → MenuItemModel
// Mendukung kedua skema kolom MySQL (name/category/price dan nama/kategori/harga)
export function mapBackendToMenuItemModel(m: BackendMenu): MenuItemModel {
  const displayName = m.name || m.nama || 'Menu';
  const displayPrice = m.price ?? m.harga ?? 0;
  const displayCategory = (m.category || m.kategori || 'pusaka') as MenuCategory;
  const displayDescription = m.description || m.deskripsi || 'Sajian jajanan pasar tradisional otentik 1935.';
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
