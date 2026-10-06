'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { X, Lock, Phone, User as UserIcon, ArrowRight, Flame } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalTab, setAuthModal, setUser, addToast } = useStore();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const endpoint = authModalTab === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = authModalTab === 'login' ? { phone, password } : { name, phone, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Terjadi kesalahan');
        setLoading(false);
        return;
      }

      setUser(data.user, data.token);
      addToast(data.message || 'Berhasil masuk ke akun!', 'success');
      setAuthModal(false);
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#241913] border border-[#3F2D23] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-6 bg-[#17110C] border-b border-[#3F2D23] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/20 border border-[#2E7D32]/40 flex items-center justify-center text-[#D49B42]">
              <Flame className="w-5 h-5 text-[#D49B42]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F8F4EC]">Puthu Lanang Malang</h3>
              <p className="text-xs text-[#C5B8A8]">Est. 1935 Celaket Malang</p>
            </div>
          </div>
          <button
            onClick={() => setAuthModal(false)}
            className="p-2 rounded-lg text-[#C5B8A8] hover:text-[#F8F4EC] hover:bg-[#3F2D23]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1 bg-[#17110C] border-b border-[#3F2D23]">
          <button
            type="button"
            onClick={() => { setAuthModal(true, 'login'); setErrorMsg(''); }}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
              authModalTab === 'login'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#C5B8A8] hover:text-[#F8F4EC]'
            }`}
          >
            Masuk Akun
          </button>
          <button
            type="button"
            onClick={() => { setAuthModal(true, 'register'); setErrorMsg(''); }}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
              authModalTab === 'register'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#C5B8A8] hover:text-[#F8F4EC]'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-xl text-xs text-red-200">
              {errorMsg}
            </div>
          )}

          {authModalTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#C5B8A8] mb-1.5 uppercase tracking-wider">
                Nama Lengkap
              </label>
              <div className="relative">
                <UserIcon className="w-5 h-5 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F8F4EC] placeholder-[#C5B8A8]/60 focus:outline-none focus:border-[#D49B42] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#C5B8A8] mb-1.5 uppercase tracking-wider">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="Contoh: 081234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F8F4EC] placeholder-[#C5B8A8]/60 focus:outline-none focus:border-[#D49B42] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#C5B8A8] mb-1.5 uppercase tracking-wider">
              Kata Sandi / Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F8F4EC] placeholder-[#C5B8A8]/60 focus:outline-none focus:border-[#D49B42] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] text-[#F8F4EC] font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <span>Memproses...</span>
            ) : (
              <>
                <span>{authModalTab === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#C5B8A8]/80 mt-4">
            Dengan melanjutkan, Anda menyetujui Ketentuan Layanan Smart Takeaway Puthu Lanang Malang.
          </p>
        </form>
      </div>
    </div>
  );
};
