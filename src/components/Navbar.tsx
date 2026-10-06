'use client';

import React, { useState } from 'react';
import { useStore, ViewTab } from '@/store/useStore';
import { ShoppingBag, Search, User as UserIcon, Flame, Menu as MenuIcon, X, LogOut, Ticket, MessageSquare, Clock } from 'lucide-react';
import { CartDrawer } from './CartDrawer';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    getTotalItems,
    getTotalPrice,
    user,
    logout,
    setAuthModal,
    searchQuery,
    setSearchQuery,
    activeTicketId
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const navLinks: { label: string; view: ViewTab }[] = [
    { label: 'Beranda', view: 'home' },
    { label: 'Menu Jajanan', view: 'menu' },
    { label: 'Heritage Story', view: 'heritage' },
    { label: 'Lokasi & Jam', view: 'location' },
    { label: 'Pesanan Khusus', view: 'custom' },
  ];

  return (
    <>
      {/* Top Operational Status Bar */}
      <div className="bg-[#110B07] border-b border-[#3F2D23] py-1.5 px-4 text-[11px] text-[#C5B8A8] flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#D49B42]" />
          <span>Buka Sore Ini: <strong className="text-[#F8F4EC]">17:30 - 21:30 WIB</strong></span>
          <span className="text-[#3F2D23] hidden sm:inline">•</span>
          <span className="text-[#2E7D32] font-semibold hidden sm:inline">Estimasi Antrean: 12 Menit</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/mobile"
            className="text-[#2E7D32] hover:text-[#388E3C] font-extrabold transition-colors flex items-center gap-1 bg-[#2E7D32]/20 border border-[#2E7D32]/50 px-2 py-0.5 rounded-lg"
          >
            <span>📱 Mobile App (UTS)</span>
          </a>
          <a
            href="/admin"
            className="text-[#D49B42] hover:text-[#F3B251] font-bold transition-colors flex items-center gap-1"
          >
            <span>Portal Admin System</span>
            <span className="text-[10px] bg-[#D49B42]/20 border border-[#D49B42]/40 px-1.5 py-0.5 rounded">Login Admin →</span>
          </a>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#17110C]/95 backdrop-blur-md border-b border-[#3F2D23] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D49B42] to-[#2E7D32] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#17110C] rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#D49B42]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-wide text-[#F8F4EC]">
                  Puthu Lanang
                </span>
              </div>
              <p className="text-[10px] text-[#D49B42] font-bold tracking-wider uppercase">
                EST. 1935 MALANG
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#241913] p-1.5 rounded-2xl border border-[#3F2D23]">
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => setActiveView(link.view)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all relative ${
                    isActive
                      ? 'bg-[#2E7D32] text-white shadow-md'
                      : 'text-[#C5B8A8] hover:text-[#F8F4EC] hover:bg-[#3F2D23]/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-[#D49B42]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input (Desktop) */}
            <div className="hidden xl:flex items-center relative">
              <Search className="w-3.5 h-3.5 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari jajanan..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'menu') setActiveView('menu');
                }}
                className="bg-[#241913] border border-[#3F2D23] rounded-xl py-2 pl-8 pr-3 text-xs text-[#F8F4EC] placeholder-[#C5B8A8]/60 focus:outline-none focus:border-[#D49B42] transition-all w-36 focus:w-48"
              />
            </div>

            {/* Cart Button Pill */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] text-[#F8F4EC] font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#D49B42]" />
              <span>{totalItems} Item</span>
              <span className="text-[#3F2D23]">•</span>
              <span className="text-[#D49B42]">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </button>

            {/* CS WhatsApp Pill Button */}
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Puthu%20Lanang,%20saya%20ingin%20bertanya"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#2E7D32]/20 border border-[#2E7D32]/50 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white font-bold text-xs rounded-xl transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>CS WhatsApp</span>
            </a>

            {/* User Profile Avatar / Auth */}
            {user ? (
              <div className="flex items-center gap-2 bg-[#241913] border border-[#3F2D23] p-1.5 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-[#D49B42] text-[#17110C] font-extrabold text-xs flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={logout}
                  className="text-[#C5B8A8] hover:text-red-400 p-1"
                  title="Keluar"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModal(true, 'login')}
                className="w-9 h-9 rounded-full bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] text-[#C5B8A8] hover:text-[#F8F4EC] flex items-center justify-center transition-all"
                title="Masuk / Daftar"
              >
                <UserIcon className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#C5B8A8] hover:text-white rounded-xl bg-[#241913] border border-[#3F2D23]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#17110C] border-b border-[#3F2D23] p-4 space-y-3 animate-fadeIn">
            <div className="relative">
              <Search className="w-4 h-4 text-[#C5B8A8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari jajanan..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'menu') setActiveView('menu');
                }}
                className="w-full bg-[#241913] border border-[#3F2D23] rounded-xl py-2.5 pl-9 pr-4 text-xs text-[#F8F4EC]"
              />
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => {
                    setActiveView(link.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeView === link.view
                      ? 'bg-[#2E7D32] text-white'
                      : 'text-[#C5B8A8] hover:bg-[#241913] hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#2E7D32] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi CS WhatsApp</span>
            </a>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
