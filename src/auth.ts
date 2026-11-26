// =============================================================
// auth.ts — Konfigurasi Auth.js (NextAuth v5):
//   1. Google OAuth (whitelist email via ADMIN_ALLOWED_EMAILS)
//   2. Credentials (Username & Password via ADMIN_USERNAME / ADMIN_PASSWORD)
// -------------------------------------------------------------
// Env yang dibutuhkan (lihat .env.example):
//   AUTH_SECRET            → secret enkripsi sesi (npx auth secret)
//   AUTH_GOOGLE_ID         → OAuth Client ID  (Google Cloud Console)
//   AUTH_GOOGLE_SECRET     → OAuth Client Secret
//   ADMIN_ALLOWED_EMAILS   → daftar email admin, dipisah koma
//   ADMIN_USERNAME         → username login admin manual (default: admin)
//   ADMIN_PASSWORD         → password login admin manual (default: puthulanang2026)
//   ADMIN_EMAIL            → opsional, email identitas untuk sesi login manual
// =============================================================

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

// Daftar email yang boleh masuk ke panel admin (whitelist dari env).
// Mendukung banyak email dipisah koma (atau titik koma / baris baru),
// serta toleran terhadap spasi, tanda kutip, dan perbedaan huruf besar/kecil.
// Jika env kosong → semua login Google ditolak (aman secara default).
function getAllowedEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? '')
    .split(/[,;\n]/)
    .map((e) => e.trim().replace(/^['"]|['"]$/g, '').trim().toLowerCase())
    .filter(Boolean);
}

// Perbandingan string constant-time (tanpa dependency Node-only agar aman di semua runtime)
function timingSafeEqualStr(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < maxLen; i++) {
    const ca = i < a.length ? a.charCodeAt(i) : 0;
    const cb = i < b.length ? b.charCodeAt(i) : 0;
    diff |= ca ^ cb;
  }
  return diff === 0;
}

function getManualAdminConfig() {
  const username = (process.env.ADMIN_USERNAME || 'admin').trim();
  const password = process.env.ADMIN_PASSWORD || 'puthulanang2026';
  const email =
    process.env.ADMIN_EMAIL?.trim().toLowerCase() ||
    getAllowedEmails()[0] ||
    'admin@puthulanang.com';
  const name = (process.env.ADMIN_DISPLAY_NAME || 'Admin Puthu Lanang').trim();
  return { username, password, email, name };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // AUTH_GOOGLE_ID & AUTH_GOOGLE_SECRET dibaca otomatis dari env
  providers: [
    Google,
    Credentials({
      id: 'credentials',
      name: 'Admin Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const inputUsername = typeof credentials?.username === 'string' ? credentials.username.trim() : '';
        const inputPassword = typeof credentials?.password === 'string' ? credentials.password : '';

        if (!inputUsername || !inputPassword) {
          return null;
        }

        const cfg = getManualAdminConfig();
        const usernameOk = timingSafeEqualStr(inputUsername.toLowerCase(), cfg.username.toLowerCase());
        const passwordOk = timingSafeEqualStr(inputPassword, cfg.password);

        if (!usernameOk || !passwordOk) {
          return null;
        }

        return {
          id: 'admin-credentials',
          name: cfg.name,
          email: cfg.email,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login', // error (mis. AccessDenied) ditampilkan di halaman login
  },
  callbacks: {
    // Whitelist: email dari profil Google dicocokkan dengan ADMIN_ALLOWED_EMAILS.
    // Cocok → true (boleh login, termasuk saat pertama kali, tanpa akun di DB).
    // Tidak cocok → false (redirect ke /login?error=AccessDenied).
    // Untuk provider 'credentials', kredensial sudah divalidasi oleh authorize().
    signIn({ account, profile, user }) {
      if (account?.provider === 'credentials') {
        return Boolean(user?.email);
      }

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
