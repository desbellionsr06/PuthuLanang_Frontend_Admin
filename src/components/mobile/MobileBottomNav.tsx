'use client';

import React from 'react';
import { Home, Utensils, Ticket, User } from 'lucide-react';

export type MobileTab = 'home' | 'menu' | 'ticket' | 'profile';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  setActiveTab: (tab: MobileTab) => void;
  activeTicketCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  activeTicketCount = 1
}) => {
  const navItems: { id: MobileTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'menu', label: 'Menu', icon: <Utensils className="w-5 h-5" /> },
    { id: 'ticket', label: 'Pesanan/Tiket', icon: <Ticket className="w-5 h-5" /> },
    { id: 'profile', label: 'Profil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#17110C]/95 backdrop-blur-md border-t border-[#3F2D23] max-w-md mx-auto">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all relative ${
                isActive ? 'text-[#D49B42] font-bold' : 'text-[#C5B8A8] hover:text-white'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.id === 'ticket' && activeTicketCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 w-4 h-4 bg-[#2E7D32] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border border-[#17110C]">
                    {activeTicketCount}
                  </span>
                )}
              </div>
              <span className="text-[10px]">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-[#D49B42] rounded-b-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
