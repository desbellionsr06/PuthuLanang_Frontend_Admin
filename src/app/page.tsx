'use client';

// Halaman utama Admin Dashboard — Route: /
// ─────────────────────────────────────────────────────────────────────
// ARSITEKTUR NEXT.JS (APP ROUTER):
//   - page.tsx ini adalah "container" level route yang bertanggung jawab:
//     1. Cek autentikasi → redirect ke /login jika belum login
//     2. Fetch data dari backend (orders, stats, menu) via adminApi
//     3. Meneruskan data ke komponen UI melalui props
//   - Komponen UI (AdminDashboard, AdminMenuCrud, dll.) hanya menerima props,
//     TIDAK melakukan fetching sendiri (sesuai prinsip Next.js App Router).
// ─────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, LogOut } from 'lucide-react';

import { AdminSidebarNavbar } from '@/app/components/global/AdminSidebarNavbar';
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';
import { AdminMenuCrud } from '@/app/components/admin/AdminMenuCrud';
import { AdminAiPredictorModal } from '@/app/components/admin/AdminAiPredictorModal';
import { AiFeatureBanner } from '@/app/components/admin/AiFeatureBanner';
import { ToastContainer } from '@/app/components/ToastContainer';
import { AdminTab } from '@/types';

export default function AdminPage() {
  const router = useRouter();

  // ──────────────────────────────────────────
  // Auth State — dikelola di level page (container)
  // ──────────────────────────────────────────
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('admin');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Cek sesi admin dari localStorage (bukan komponen anak)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('admin_session');
      const storedUsername = localStorage.getItem('admin_username') || 'admin';
      if (session === 'authenticated') {
        setIsAdminLoggedIn(true);
        setAdminUsername(storedUsername);
      } else {
        // Belum login → redirect ke halaman (auth)/login
        router.replace('/login');
      }
      setIsAuthChecking(false);
    }
  }, [router]);

  // ──────────────────────────────────────────
  // Navigation State
  // ──────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // ──────────────────────────────────────────
  // AI Modal State
  // ──────────────────────────────────────────
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // ──────────────────────────────────────────
  // Logout — hapus sesi & redirect ke /login
  // ──────────────────────────────────────────
  const handleLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_session');
      localStorage.removeItem('admin_username');
    }
    setIsAdminLoggedIn(false);
    router.replace('/login');
  }, [router]);

  // ──────────────────────────────────────────
  // Loading: saat cek auth
  // ──────────────────────────────────────────
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#1E1510] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#D49B42]/30 border-t-[#D49B42] rounded-full animate-spin" />
          <p className="text-[#C5B8A8] text-sm">Memeriksa sesi admin...</p>
        </div>
      </div>
    );
  }

  // Jika belum login (redirect sedang dalam proses)
  if (!isAdminLoggedIn) return null;

  // ──────────────────────────────────────────
  // Render Dashboard (sudah terautentikasi)
  // ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-heritage-wood text-heritage-cream flex flex-col selection:bg-heritage-amber selection:text-heritage-wood overflow-x-hidden">

      {/* Admin Header & Navigation */}
      <AdminSidebarNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onLogout={handleLogout}
        onGoToCustomerWeb={() => router.push('/')}
        adminUsername={adminUsername}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6 sm:space-y-8">

        {/* Banner Rencana Fitur AI */}
        <AiFeatureBanner onOpenAiModal={() => setIsAiModalOpen(true)} />

        {/* Tab Content — komponen terima data via props dari AdminDashboard/AdminMenuCrud */}
        <div className="w-full overflow-hidden">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'menu_crud' && <AdminMenuCrud />}
        </div>

      </main>

      {/* Admin Footer */}
      <footer className="bg-heritage-dark border-t border-heritage-border py-4 text-center text-xs text-heritage-tan mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Puthu Lanang Malang - Admin Management System.</p>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-heritage-amber font-bold hover:underline flex items-center gap-1 active:scale-95 transition-transform text-xs"
            >
              <span>Portal Konsumen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-400 font-bold hover:underline flex items-center gap-1 active:scale-95 transition-transform text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AdminAiPredictorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <ToastContainer />
    </div>
  );
}
