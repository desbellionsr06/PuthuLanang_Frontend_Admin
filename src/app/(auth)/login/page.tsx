// Route: /login
// Berada di dalam Route Group (auth) — folder ini tidak memengaruhi URL path.
// Login admin menggunakan Google OAuth (Auth.js / NextAuth v5).

import { redirect } from 'next/navigation';
import { Flame, ShieldCheck, AlertTriangle } from 'lucide-react';
import { auth, signIn } from '@/auth';

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied: 'Akun Google ini tidak terdaftar sebagai admin Puthu Lanang.',
  Configuration: 'Konfigurasi autentikasi server belum lengkap. Hubungi developer.',
  Verification: 'Tautan verifikasi tidak valid atau sudah kedaluwarsa.',
};

// Hanya izinkan callback ke rute /admin (hindari open redirect)
function safeCallbackUrl(raw?: string): string {
  if (raw && raw.startsWith('/admin') && !raw.startsWith('//')) return raw;
  return '/admin/dashboard';
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl } = await searchParams;
  const redirectTo = safeCallbackUrl(callbackUrl);

  // Sudah login → langsung ke dashboard
  const session = await auth();
  if (session?.user) redirect(redirectTo);

  const errorMsg = error
    ? ERROR_MESSAGES[error] ?? 'Login gagal. Silakan coba lagi.'
    : '';

  async function handleGoogleSignIn() {
    'use server';
    await signIn('google', { redirectTo });
  }

  return (
    <div className="min-h-screen bg-[#1E1510] flex items-center justify-center p-4 selection:bg-[#D49B42] selection:text-[#1E1510]">
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 relative overflow-hidden">

        {/* Ambient glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49B42]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2E7D32]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#2E7D32] border border-[#2E7D32]/50 flex items-center justify-center mx-auto shadow-xl">
            <Flame className="w-8 h-8 text-[#D49B42] animate-pulse" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#F8F4EC] tracking-tight pt-2">
            Puthu Lanang Malang
          </h1>
          <p className="text-xs font-bold text-[#D49B42] uppercase tracking-wider">
            ADMIN MANAGEMENT SYSTEM
          </p>
          <p className="text-xs text-[#C5B8A8] pt-1">
            Silakan masuk dengan akun Google admin untuk mengelola pesanan, stok, dan menu jajanan.
          </p>
        </div>

        <div className="space-y-4 relative z-10">
          {/* Error message */}
          {errorMsg && (
            <div
              role="alert"
              className="p-3 bg-red-900/30 border border-red-700/50 rounded-xl text-xs text-red-200 flex items-start gap-2"
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-px" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Google Sign-In (server action) */}
          <form action={handleGoogleSignIn}>
            <button
              id="google-signin-button"
              type="submit"
              className="w-full py-3.5 bg-[#F8F4EC] hover:bg-white active:scale-[0.98] text-[#1E1510] font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 text-xs cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.9 7.35 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>Masuk dengan Google</span>
            </button>
          </form>
        </div>

        <div className="pt-4 border-t border-[#3E2C22] text-center text-[11px] text-[#C5B8A8] flex items-center justify-center gap-1.5 relative z-10">
          <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
          <span>Sistem Manajemen Resmi Celaket Malang</span>
        </div>
      </div>
    </div>
  );
}
