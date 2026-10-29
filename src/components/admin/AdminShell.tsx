'use client';

// Shell UI untuk semua halaman /admin/**:
// navbar, banner fitur AI, footer, modal AI, dan toast.
// State shell (modal AI) berada di sini; halaman (dashboard/kelola)
// hanya fokus pada kontennya sendiri.

import React, { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';


import { AdminSidebarNavbar } from '@/components/global/AdminSidebarNavbar';
import { AdminAiPredictorModal } from '@/components/admin/AdminAiPredictorModal';
import { AiFeatureBanner } from '@/components/admin/AiFeatureBanner';
import { ToastContainer } from '@/components/ToastContainer';

interface AdminShellProps {
  adminName: string;
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ adminName, children }) => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Logout → hapus sesi NextAuth & kembali ke /login
  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: '/login' });
  }, []);

  return (
    <div className="min-h-screen bg-heritage-wood text-heritage-cream flex flex-col selection:bg-heritage-amber selection:text-heritage-wood overflow-x-hidden">

      {/* Admin Header & Navigation */}
      <AdminSidebarNavbar
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onLogout={handleLogout}
        adminUsername={adminName}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6 sm:space-y-8">

        {/* Banner Rencana Fitur AI */}
        <AiFeatureBanner onOpenAiModal={() => setIsAiModalOpen(true)} />

        {/* Konten halaman (dashboard / kelola) */}
        <div className="w-full overflow-hidden">{children}</div>

      </main>

      {/* Admin Footer */}
      <footer className="bg-heritage-dark border-t border-heritage-border py-4 text-center text-xs text-heritage-tan mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Puthu Lanang Malang - Admin Management System.</p>
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
};
