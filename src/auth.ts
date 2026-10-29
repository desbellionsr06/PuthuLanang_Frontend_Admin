// =============================================================
// auth.ts — Konfigurasi Auth.js (NextAuth v5) + Google OAuth
// -------------------------------------------------------------
// Env yang dibutuhkan (lihat .env.example):
//   AUTH_SECRET            → secret enkripsi sesi (npx auth secret)
//   AUTH_GOOGLE_ID         → OAuth Client ID  (Google Cloud Console)
//   AUTH_GOOGLE_SECRET     → OAuth Client Secret
//   ADMIN_ALLOWED_EMAILS   → daftar email admin, dipisah koma
// =============================================================

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// Daftar email yang boleh masuk ke panel admin.
// Jika env kosong → semua login ditolak (aman secara default).
function getAllowedEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // AUTH_GOOGLE_ID & AUTH_GOOGLE_SECRET dibaca otomatis dari env
  providers: [Google],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login', // error (mis. AccessDenied) ditampilkan di halaman login
  },
  callbacks: {
    // Dipanggil setelah Google berhasil mengautentikasi user.
    // Return false → login ditolak (redirect ke /login?error=AccessDenied).
    signIn({ account, profile }) {
      if (account?.provider !== 'google') return false;

      const email = profile?.email?.toLowerCase();
      if (!email || profile?.email_verified === false) return false;

      return getAllowedEmails().includes(email);
    },
  },
});
