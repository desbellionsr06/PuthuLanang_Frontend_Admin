'use client';

import React, { useState } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminSidebarNavbar } from '@/components/global/AdminSidebarNavbar';
import { AdminMenuCrud } from '@/components/admin/AdminMenuCrud';
import { AdminAiPredictorModal } from '@/components/admin/AdminAiPredictorModal';
import { AiFeatureBanner } from '@/components/admin/AiFeatureBanner';
import { ToastContainer } from '@/components/ToastContainer';
import { AdminTab } from '@/types';

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
        <AiFeatureBanner onOpenAiModal={() => setIsAiModalOpen(true)} />

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
