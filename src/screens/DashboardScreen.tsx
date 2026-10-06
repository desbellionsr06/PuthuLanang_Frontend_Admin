'use client';

import React from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminSidebarNavbar, AdminTab } from '@/components/admin/AdminSidebarNavbar';
import { AdminMenuCrud } from '@/components/admin/AdminMenuCrud';
import { AdminAiPredictorModal } from '@/components/admin/AdminAiPredictorModal';
import { ToastContainer } from '@/components/ToastContainer';
import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardScreenProps {
  adminUsername: string;
  onLogout: () => void;
  onGoToCustomerWeb: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  adminUsername,
  onLogout,
  onGoToCustomerWeb
}) => {
  const [activeTab, setActiveTab] = React.useState<AdminTab>('dashboard');
  const [isAiModalOpen, setIsAiModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#1E1510] text-[#F8F4EC] flex flex-col selection:bg-[#D49B42] selection:text-[#1E1510] overflow-x-hidden">
      {/* Header & Sticky Navigation */}
      <AdminSidebarNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onLogout={onLogout}
        onGoToCustomerWeb={onGoToCustomerWeb}
        adminUsername={adminUsername}
      />

      {/* Main Container dengan Flexbox dan CSS Grid Responsif */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-16">
        {/* Banner Rencana Fitur AI */}
        <section className="bg-gradient-to-r from-[#2A1D16] via-[#2E7D32]/25 to-[#2A1D16] border border-[#D49B42]/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#D49B42]/20 border border-[#D49B42]/40 flex items-center justify-center text-[#D49B42] shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#D49B42] animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-[#D49B42] text-[#1E1510] text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                  RENCANA FITUR AI
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-[#F8F4EC]">
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
            className="shrink-0 flex items-center gap-1.5 font-extrabold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lihat Konsep AI →</span>
          </Button>
        </section>

        {/* Dynamic Responsive Tab View */}
        <div className="w-full overflow-hidden">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'menu_crud' && <AdminMenuCrud />}
        </div>
      </main>

      {/* AI Modal & Notifications */}
      <AdminAiPredictorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};
