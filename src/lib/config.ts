// =============================================================
// config.ts — Konfigurasi koneksi ke Backend (Node.js/Express)
// Secara otomatis mengarah ke Railway Production saat di-deploy (Vercel)
// dan fallback ke localhost:5000 saat development lokal.
// =============================================================

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  (process.env.NODE_ENV === 'production'
    ? 'https://puthulanangbackend-production.up.railway.app'
    : 'http://localhost:5000');

export const ADMIN_KEY =
  process.env.NEXT_PUBLIC_ADMIN_KEY ?? 'puthu-admin-2026';
