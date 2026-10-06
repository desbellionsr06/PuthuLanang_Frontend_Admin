'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminSidebarNavbar, AdminTab } from '@/components/admin/AdminSidebarNavbar';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminMenuCrud } from '@/components/admin/AdminMenuCrud';
import { AdminAiPredictorModal } from '@/components/admin/AdminAiPredictorModal';
import { ToastContainer } from '@/components/ToastContainer';
import { Button } from '@/components/ui/Button';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#1E1510] text-[#F8F4EC] flex flex-col selection:bg-[#D49B42] selection:text-[#1E1510]">
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
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Banner Rencana Fitur AI */}
        <div className="bg-gradient-to-r from-[#2A1D16] via-[#2E7D32]/25 to-[#2A1D16] border border-[#D49B42]/50 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#D49B42]/20 border border-[#D49B42]/40 flex items-center justify-center text-[#D49B42] shrink-0">
              <Bot className="w-6 h-6 text-[#D49B42] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#D49B42] text-[#1E1510] text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                  RENCANA FITUR AI
                </span>
                <h3 className="text-sm font-extrabold text-[#F8F4EC]">
                  AI Smart Stock & Demand Predictor
                </h3>
              </div>
              <p className="text-xs text-[#C5B8A8] mt-1 leading-relaxed max-w-3xl">
                Fitur AI Rencana Pengembangan: AI Smart Stock & Demand Predictor yang memprediksi lonjakan pembeli dan kebutuhan adonan kelapa/gula aren berdasarkan cuaca dan hari libur di Malang.
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAiModalOpen(true)}
            className="shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Lihat Konsep AI →</span>
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'menu_crud' && <AdminMenuCrud />}

      </main>

      {/* Admin Footer */}
      <footer className="bg-[#17110C] border-t border-[#3E2C22] py-4 text-center text-xs text-[#C5B8A8]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Puthu Lanang Malang - Admin Management System.</p>
          <button
            onClick={() => router.push('/')}
            className="text-[#D49B42] font-bold hover:underline flex items-center gap-1"
          >
            <span>Beralih Ke Portal Konsumen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
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
