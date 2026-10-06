'use client';

import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-heritage-wood text-heritage-cream flex flex-col selection:bg-heritage-amber selection:text-heritage-wood overflow-x-hidden">
      <AdminSidebarNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onLogout={onLogout}
        onGoToCustomerWeb={onGoToCustomerWeb}
        adminUsername={adminUsername}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-16">
        <section className="bg-linear-to-r from-heritage-card via-heritage-forest/25 to-heritage-card border border-heritage-amber/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-heritage-amber/20 border border-heritage-amber/40 flex items-center justify-center text-heritage-amber shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-heritage-amber animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-heritage-amber text-heritage-wood text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                  RENCANA FITUR AI
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-heritage-cream">
                  AI Smart Stock & Demand Predictor
                </h3>
              </div>
              <p className="text-xs text-heritage-tan mt-1 leading-relaxed max-w-3xl">
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

        <div className="w-full overflow-hidden">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'menu_crud' && <AdminMenuCrud />}
        </div>
      </main>

      <AdminAiPredictorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};
