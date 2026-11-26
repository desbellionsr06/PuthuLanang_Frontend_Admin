'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { User, Lock, Eye, EyeOff, LogIn, Loader2, AlertTriangle } from 'lucide-react';

interface CredentialsLoginFormProps {
  redirectTo: string;
}

export const CredentialsLoginForm: React.FC<CredentialsLoginFormProps> = ({ redirectTo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      setErrorMsg('Username dan password wajib diisi.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        username: cleanUsername,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setErrorMsg('Username atau password salah. Silakan periksa kembali.');
        setIsLoading(false);
        return;
      }

      // Arahkan ke halaman dashboard dengan full reload agar cookie sesi langsung terbaca server
      window.location.assign(redirectTo);
    } catch {
      setErrorMsg('Terjadi kesalahan saat menghubungi server autentikasi. Coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      {errorMsg && (
        <div
          role="alert"
          className="p-3 bg-red-900/30 border border-red-700/50 rounded-xl text-xs text-red-200 flex items-start gap-2"
        >
          <AlertTriangle className="w-4 h-4 shrink-0 mt-px" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="admin-username"
          className="block text-[11px] font-bold uppercase tracking-wider text-[#C5B8A8]"
        >
          Username
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-[#C5B8A8]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="admin-username"
            name="username"
            type="text"
            autoComplete="username"
            required
            disabled={isLoading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username admin"
            className="w-full bg-[#1E1510] border border-[#3E2C22] focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] rounded-xl py-3 pl-10 pr-3.5 text-xs font-medium text-[#F8F4EC] placeholder:text-[#C5B8A8]/45 focus:outline-none transition-all disabled:opacity-60"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="admin-password"
          className="block text-[11px] font-bold uppercase tracking-wider text-[#C5B8A8]"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[#C5B8A8]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="admin-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password admin"
            className="w-full bg-[#1E1510] border border-[#3E2C22] focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-[#F8F4EC] placeholder:text-[#C5B8A8]/45 focus:outline-none transition-all disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isLoading}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5B8A8]/70 hover:text-[#D49B42] transition-colors p-1 cursor-pointer disabled:opacity-50"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        id="credentials-signin-button"
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#256628] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-[#F8F4EC] font-bold rounded-xl shadow-xl border border-[#2E7D32]/60 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#D49B42]" />
            <span>Memverifikasi...</span>
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4 text-[#D49B42]" />
            <span>Masuk</span>
          </>
        )}
      </button>
    </form>
  );
};

