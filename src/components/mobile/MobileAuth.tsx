'use client';

import React, { useState } from 'react';
import { Flame, Phone, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface MobileAuthProps {
  onSuccess: (userData: { name: string; phone: string }) => void;
}

export const MobileAuth: React.FC<MobileAuthProps> = ({ onSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('081234567890');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('Budi Santoso');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone.trim() || !password.trim() || (tab === 'register' && !name.trim())) {
      setErrorMsg('Semua kolom input wajib diisi!');
      return;
    }

    if (phone.length < 9) {
      setErrorMsg('Nomor WhatsApp tidak valid (minimal 9 digit).');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      onSuccess({
        name: tab === 'register' ? name : 'Budi Santoso',
        phone
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-5 space-y-6 animate-fadeIn pb-24">
      
      {/* Brand Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-[#D49B42] mx-auto shadow-lg">
          <Flame className="w-7 h-7 text-[#D49B42] animate-pulse" />
        </div>
        <h2 className="text-xl font-extrabold text-[#F8F4EC]">Puthu Lanang Malang</h2>
        <p className="text-xs text-[#D49B42] font-semibold">Pelanggan End-User Mobile App</p>
      </div>

      {/* Toggle Buttons */}
      <div className="grid grid-cols-2 p-1 bg-[#241913] border border-[#3F2D23] rounded-2xl text-xs font-bold">
        <button
          type="button"
          onClick={() => { setTab('login'); setErrorMsg(''); }}
          className={`py-2.5 rounded-xl transition-all ${
            tab === 'login' ? 'bg-[#2E7D32] text-white shadow-md' : 'text-[#C5B8A8]'
          }`}
        >
          Masuk Akun
        </button>
        <button
          type="button"
          onClick={() => { setTab('register'); setErrorMsg(''); }}
          className={`py-2.5 rounded-xl transition-all ${
            tab === 'register' ? 'bg-[#2E7D32] text-white shadow-md' : 'text-[#C5B8A8]'
          }`}
        >
          Daftar Akun Baru
        </button>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-5 shadow-xl space-y-4 text-xs">
        {errorMsg && (
          <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-xl text-xs text-red-200">
            {errorMsg}
          </div>
        )}

        {tab === 'register' && (
          <div>
            <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl py-3 pl-9 pr-3 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
            Nomor WhatsApp
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              placeholder="081234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl py-3 pl-9 pr-3 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1 uppercase tracking-wider">
            Kata Sandi
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl py-3 pl-9 pr-3 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-2"
        >
          {loading ? (
            <span>Memproses...</span>
          ) : (
            <>
              <span>{tab === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-[11px] text-[#C5B8A8] flex items-center justify-center gap-1">
        <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
        <span>100% Bebas Pengawet & Gula Aren Murni</span>
      </div>

    </div>
  );
};
