'use client';

import React, { useState } from 'react';
import { Flame, LayoutDashboard, Utensils, Bot, LogOut, Globe, UserCheck, Menu, X } from 'lucide-react';
import { AdminTab } from '@/types';

export interface AdminSidebarNavbarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onOpenAiModal: () => void;
  onLogout: () => void;
  onGoToCustomerWeb: () => void;
  adminUsername: string;
}

export const AdminSidebarNavbar: React.FC<AdminSidebarNavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiModal,
  onLogout,
  onGoToCustomerWeb,
  adminUsername
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleAiModalClick = () => {
    onOpenAiModal();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#2A1D16] border-b border-[#3E2C22] sticky top-0 z-40 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center gap-3 cursor-pointer group select-none" 
          onClick={() => handleTabChange('dashboard')}
        >
          <div className="w-10 h-10 rounded-2xl bg-[#2E7D32] border border-[#2E7D32]/50 flex items-center justify-center text-[#D49B42] shadow-md group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-[#D49B42]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wide text-[#F8F4EC] group-hover:text-[#D49B42] transition-colors">
                Puthu Lanang Admin
              </span>
              <span className="px-2 py-0.5 bg-[#D49B42]/20 border border-[#D49B42]/40 text-[#D49B42] text-[10px] font-extrabold rounded-md uppercase">
                ADMIN SYSTEM
              </span>
            </div>
            <p className="text-[10px] text-[#C5B8A8]">Management System • Celaket Malang</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-[#1E1510] p-1.5 rounded-2xl border border-[#3E2C22]">
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
              activeTab === 'dashboard'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#C5B8A8] hover:text-[#F8F4EC] hover:bg-[#2A1D16]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Utama</span>
          </button>

          <button
            onClick={() => handleTabChange('menu_crud')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
              activeTab === 'menu_crud'
                ? 'bg-[#2E7D32] text-white shadow-md'
                : 'text-[#C5B8A8] hover:text-[#F8F4EC] hover:bg-[#2A1D16]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Kelola Menu (CRUD)</span>
          </button>

          <button
            onClick={handleAiModalClick}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#D49B42] hover:bg-[#D49B42]/15 border border-[#D49B42]/30 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Bot className="w-4 h-4 text-[#D49B42]" />
            <span>Rencana Fitur AI</span>
          </button>
        </nav>

        {/* Right Desktop Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onGoToCustomerWeb}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42] text-[#F8F4EC] text-xs font-bold rounded-xl transition-all active:scale-95"
            title="Lihat Halaman Konsumen"
          >
            <Globe className="w-3.5 h-3.5 text-[#D49B42]" />
            <span className="hidden lg:inline">Portal Konsumen</span>
          </button>

          <div className="flex items-center gap-2 bg-[#1E1510] border border-[#3E2C22] px-3 py-1.5 rounded-xl">
            <UserCheck className="w-4 h-4 text-[#2E7D32]" />
            <span className="text-xs font-bold text-[#F8F4EC]">{adminUsername}</span>
            <button
              onClick={onLogout}
              className="text-[#C5B8A8] hover:text-red-400 p-1 ml-1 transition-colors"
              title="Keluar Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 bg-[#1E1510] border border-[#3E2C22] text-[#F8F4EC] rounded-xl hover:border-[#D49B42] transition-all"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Responsive Mobile Drawer / Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1E1510] border-t border-[#3E2C22] px-4 py-4 space-y-3 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'bg-[#2E7D32] text-white shadow-md'
                  : 'text-[#C5B8A8] bg-[#2A1D16] hover:text-[#F8F4EC]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Utama</span>
            </button>

            <button
              onClick={() => handleTabChange('menu_crud')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'menu_crud'
                  ? 'bg-[#2E7D32] text-white shadow-md'
                  : 'text-[#C5B8A8] bg-[#2A1D16] hover:text-[#F8F4EC]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Kelola Menu (CRUD)</span>
            </button>

            <button
              onClick={handleAiModalClick}
              className="w-full px-4 py-2.5 rounded-xl text-xs font-bold text-[#D49B42] bg-[#2A1D16] border border-[#D49B42]/30 flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-[#D49B42]" />
              <span>Rencana Fitur AI</span>
            </button>

            <button
              onClick={() => {
                onGoToCustomerWeb();
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2.5 rounded-xl text-xs font-bold text-[#F8F4EC] bg-[#2A1D16] border border-[#3E2C22] flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-[#D49B42]" />
              <span>Portal Konsumen</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
