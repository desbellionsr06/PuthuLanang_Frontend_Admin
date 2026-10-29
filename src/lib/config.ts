// =============================================================
// config.ts — Konfigurasi koneksi ke Backend (Node.js/Express)
// Sebelumnya BACKEND_URL & ADMIN_KEY di-hardcode di beberapa file.
// Nilai default sama persis dengan sebelumnya, sehingga perilaku
// tidak berubah jika env tidak di-set.
// =============================================================

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';

export const ADMIN_KEY =
  process.env.NEXT_PUBLIC_ADMIN_KEY ?? 'puthu-admin-2026';
