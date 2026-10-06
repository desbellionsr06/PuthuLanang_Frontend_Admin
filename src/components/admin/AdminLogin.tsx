'use client';

import React, { useState } from 'react';
import { Flame, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (adminData: { username: string }) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Username dan Password wajib diisi.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (username === 'admin' && (password === 'admin' || password === 'admin123' || password.length >= 4)) {
        onLoginSuccess({ username });
      } else {
        setErrorMsg('Username atau Password salah. (Coba: admin / admin123)');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#1E1510] flex items-center justify-center p-4 selection:bg-[#D49B42] selection:text-[#1E1510]">
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49B42]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2E7D32]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#2E7D32] border border-[#2E7D32]/50 flex items-center justify-center text-[#D49B42] mx-auto shadow-xl">
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
        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          {errorMsg && (
            <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-xl text-xs text-red-200">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1.5 uppercase tracking-wider">
              Username Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl py-3 pl-9 pr-4 text-xs text-[#F8F4EC] placeholder-[#C5B8A8]/60 focus:outline-none focus:border-[#D49B42] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1.5 uppercase tracking-wider">
              Kata Sandi / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl py-3 pl-9 pr-4 text-xs text-[#F8F4EC] placeholder-[#C5B8A8]/60 focus:outline-none focus:border-[#D49B42] transition-all"
              />
            </div>
          </div>

          {/* Quick Demo Helper */}
          <div className="p-3 bg-[#1E1510] border border-[#3E2C22] rounded-xl text-[11px] text-[#C5B8A8] flex items-center justify-between">
            <span>Demo Akses:</span>
            <span className="font-mono text-[#D49B42] font-bold">admin / admin123</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] text-[#F8F4EC] font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 text-xs"
          >
            {loading ? (
              <span>Memverifikasi Hak Akses...</span>
            ) : (
              <>
                <span>Masuk Ke Dashboard Admin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#3E2C22] text-center text-[11px] text-[#C5B8A8] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
          <span>Sistem Manajemen Resmi Celaket Malang</span>
        </div>

      </div>
    </div>
  );
};
