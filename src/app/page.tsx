'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminSidebarNavbar } from '@/components/global/AdminSidebarNavbar';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminMenuCrud } from '@/components/admin/AdminMenuCrud';
import { AdminAiPredictorModal } from '@/components/admin/AdminAiPredictorModal';
import { AiFeatureBanner } from '@/components/admin/AiFeatureBanner';
import { ToastContainer } from '@/components/ToastContainer';
import { ArrowRight } from 'lucide-react';
import { AdminTab } from '@/types';

export default function AdminPage() {
  const router = useRouter();

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('admin');

  // Navigation State
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // AI Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleLoginSuccess = (data: { username: string }) => {
    setAdminUsername(data.username);
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  if (!isAdminLoggedIn) {
    return (
      <>
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
        <ToastContainer />
      </>
    );
  }

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

        {/* Tab Content */}
        <div className="w-full overflow-hidden">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'menu_crud' && <AdminMenuCrud />}
        </div>

      </main>

      {/* Admin Footer */}
      <footer className="bg-heritage-dark border-t border-heritage-border py-4 text-center text-xs text-heritage-tan mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Puthu Lanang Malang - Admin Management System.</p>
          <Link
            href="/"
            className="text-heritage-amber font-bold hover:underline flex items-center gap-1 active:scale-95 transition-transform"
          >
            <span>Beralih Ke Portal Konsumen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
