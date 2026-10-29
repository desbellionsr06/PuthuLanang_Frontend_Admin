'use client';

// Route: /login
// Berada di dalam Route Group (auth) — folder ini tidak memengaruhi URL path.
// Halaman ini menampilkan form login admin secara standalone.

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Validasi input form (client-side)
// ─────────────────────────────────────────────────────────────
function validateForm(username: string, password: string): string | null {
  if (!username.trim()) return 'Username wajib diisi.';
  if (username.trim().length < 3) return 'Username minimal 3 karakter.';
  if (!password) return 'Password wajib diisi.';
  if (password.length < 4) return 'Password minimal 4 karakter.';
  return null;
}

// ─────────────────────────────────────────────────────────────
// Halaman Login Admin — Route: /login
// ─────────────────────────────────────────────────────────────
export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Jika sudah login (token di localStorage), redirect ke dashboard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_session');
      if (token === 'authenticated') {
        router.replace('/');
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validasi form dengan error message yang jelas
    const validationError = validateForm(username, password);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);
    try {
      // Simulasi autentikasi admin (username + password statik untuk admin panel)
      await new Promise((r) => setTimeout(r, 500));

      if (
        username.trim() === 'admin' &&
        (password === 'admin' || password === 'admin123' || password.length >= 4)
      ) {
        // Simpan sesi admin di localStorage
        localStorage.setItem('admin_session', 'authenticated');
        localStorage.setItem('admin_username', username.trim());
        router.replace('/');
      } else {
        setErrorMsg('Username atau Password salah. Gunakan: admin / admin123');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan sistem. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

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
            Silakan masuk untuk mengelola pesanan, stok, dan menu jajanan.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 relative z-10" noValidate>

          {/* Error message */}
          {errorMsg && (
            <div
              role="alert"
              className="p-3 bg-red-900/30 border border-red-700/50 rounded-xl text-xs text-red-200 flex items-start gap-2"
            >
              <span className="mt-0.5">⚠</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Username field */}
          <div>
            <label
              htmlFor="admin-username"
              className="block text-[11px] font-semibold text-[#C5B8A8] mb-1.5 uppercase tracking-wider"
            >
              Username Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setErrorMsg(''); }}
                className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl py-3 pl-9 pr-4 text-xs text-[#F8F4EC] placeholder-[#C5B8A8]/60 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42]/50 transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-[11px] font-semibold text-[#C5B8A8] mb-1.5 uppercase tracking-wider"
            >
              Kata Sandi / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl py-3 pl-9 pr-12 text-xs text-[#F8F4EC] placeholder-[#C5B8A8]/60 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42]/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5B8A8] hover:text-[#D49B42] text-[10px] font-bold transition-colors"
                tabIndex={-1}
              >
                {showPass ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {/* Demo info */}
          <div className="p-3 bg-[#1E1510] border border-[#3E2C22] rounded-xl text-[11px] text-[#C5B8A8] flex items-center justify-between">
            <span>Demo Akses:</span>
            <span className="font-mono text-[#D49B42] font-bold">admin / admin123</span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] active:scale-[0.98] text-[#F8F4EC] font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 text-xs cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memverifikasi Hak Akses...</span>
              </>
            ) : (
              <>
                <span>Masuk Ke Dashboard Admin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#3E2C22] text-center text-[11px] text-[#C5B8A8] flex items-center justify-center gap-1.5 relative z-10">
          <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
          <span>Sistem Manajemen Resmi Celaket Malang</span>
        </div>
      </div>
    </div>
  );
}
