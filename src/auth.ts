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

// Daftar email yang boleh masuk ke panel admin (whitelist dari env).
// Mendukung banyak email dipisah koma (atau titik koma / baris baru),
// serta toleran terhadap spasi, tanda kutip, dan perbedaan huruf besar/kecil.
// Jika env kosong → semua login ditolak (aman secara default).
function getAllowedEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? '')
    .split(/[,;\n]/)
    .map((e) => e.trim().replace(/^['"]|['"]$/g, '').trim().toLowerCase())
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
    // Whitelist: email dari profil Google dicocokkan dengan ADMIN_ALLOWED_EMAILS.
    // Cocok → true (boleh login, termasuk saat pertama kali, tanpa akun di DB).
    // Tidak cocok → false (redirect ke /login?error=AccessDenied).
    signIn({ account, profile, user }) {
      if (account?.provider !== 'google') return false;

      const email = (profile?.email ?? user?.email)?.trim().toLowerCase();
      if (!email || profile?.email_verified === false) return false;

      const allowed = getAllowedEmails().includes(email);
      if (!allowed && process.env.NODE_ENV !== 'production') {
        console.warn(
          `[auth] Login ditolak untuk "${email}". Whitelist saat ini: [${getAllowedEmails().join(', ')}]`
        );
      }
      return allowed;
    },
  },
});
