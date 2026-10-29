'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { MENU_ITEMS, MenuItem } from '@/lib/db';
import { MenuDetailModal } from '../MenuDetailModal';
import { Star, Plus, Minus, Info, ShoppingBag, Flame, Sparkles, MapPin, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { addToCart, setActiveView, selectedCategory, setSelectedCategory } = useStore();
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [pickupMode, setPickupMode] = useState<'takeaway' | 'delivery'>('takeaway');

  const filterTabs = [
    { key: 'semua', label: 'Semua Menu' },
    { key: 'paling_laris', label: 'Paling Laris' },
    { key: 'besek', label: 'Porsi Box Besek' },
    { key: 'paket_campur', label: 'Paket Campur' },
  ];

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [itemId]: updated };
    });
  };

  const getCustomBadge = (itemId: string) => {
    if (itemId === 'puthu-01') return '• SEGAR DIKUKUS';
    if (itemId === 'klepon-02') return '• MELETUP DI MULUT';
    if (itemId === 'cenil-03') return '• TEKSTUR KENYAL';
    if (itemId === 'lupis-04') return '• RESEP KLASIK';
    return '• OTENTIK 1935';
  };

  const pusakaItems = MENU_ITEMS.filter((item) => {
    if (selectedCategory === 'semua') return true;
    return item.category === selectedCategory;
  }).slice(0, 4);

  return (
    <div className="py-8 bg-[#17110C] animate-fadeIn min-h-screen space-y-16">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D49B42]/15 border border-[#D49B42]/40 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#D49B42]">
              🏷️ LEGENDARIS SEJAK 1935 • KULINER KHAS MALANG
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8F4EC] leading-tight">
              Cita Rasa Warisan & <br />
              <span className="text-[#D49B42]">Kuliner Tradisional</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed max-w-xl">
              Nikmati kelezatan Puthu Lanang asli — resep pusaka turun-temurun dengan aroma pandan suji murni, gula aren murni melimpah, dan parutan kelapa gurih yang dikukus segar di atas cerobong bambu.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('menu')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
              >
                <span>Pesan Sekarang</span>
                <ShoppingBag className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('heritage')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] text-[#F8F4EC] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
              >
                <span>📖 Lihat Cerita Heritage</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-[#241913] border border-[#3F2D23] p-3 rounded-xl">
                <p className="text-xs font-bold text-[#F8F4EC]">1935 Awal</p>
                <p className="text-[10px] text-[#C5B8A8]">Resep bambu sama semula</p>
              </div>
              <div className="bg-[#241913] border border-[#3F2D23] p-3 rounded-xl">
                <p className="text-xs font-bold text-[#F8F4EC]">Sejak 1935</p>
                <p className="text-[10px] text-[#C5B8A8]">Resep 3 generasi</p>
              </div>
              <div className="bg-[#241913] border border-[#3F2D23] p-3 rounded-xl">
                <p className="text-xs font-bold text-[#F8F4EC]">100% Aren Jeruk</p>
                <p className="text-[10px] text-[#C5B8A8]">Pasraren murni</p>
              </div>
              <div className="bg-[#241913] border border-[#3F2D23] p-3 rounded-xl">
                <p className="text-xs font-bold text-[#D49B42]">4.9 / 5.0</p>
                <p className="text-[10px] text-[#C5B8A8]">10.000+ ulasan rasa</p>
              </div>
            </div>
          </div>

          {/* Right Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-5 shadow-2xl relative">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#3F2D23]">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Paket Campur 4 Varian"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#17110C]/90 backdrop-blur-md text-[#D49B42] text-[10px] font-extrabold rounded-md border border-[#3F2D23]">
                  • KAWASAN TRADISIONAL KULINER
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-[#17110C]/90 backdrop-blur-md p-3 rounded-xl border border-[#3F2D23] flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-[#F8F4EC]">Paket Campur 4 Varian</p>
                    <p className="text-[10px] text-[#C5B8A8]">Puthu • Klepon • Cenil • Lupis</p>
                  </div>
                  <span className="text-sm font-extrabold text-[#D49B42]">Rp 18.000</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MODE PENGAMBILAN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold text-[#D49B42] uppercase tracking-wider">
                MODE PENGAMBILAN LANGSUNG
              </span>
              <h2 className="text-xl font-bold text-[#F8F4EC] mt-0.5">
                Tentukan Cara Menikmati Puthu Lanang
              </h2>
            </div>

            <div className="flex bg-[#17110C] p-1 rounded-xl border border-[#3F2D23]">
              <button
                onClick={() => setPickupMode('takeaway')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  pickupMode === 'takeaway' ? 'bg-[#2E7D32] text-white' : 'text-[#C5B8A8]'
                }`}
              >
                Ambil di Toko
              </button>
              <button
                onClick={() => setPickupMode('delivery')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  pickupMode === 'delivery' ? 'bg-[#2E7D32] text-white' : 'text-[#C5B8A8]'
                }`}
              >
                Kurir Instant Express
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23] space-y-2">
              <span className="text-[10px] font-bold text-[#C5B8A8] uppercase">LOKASI PENGAMBILAN</span>
              <h3 className="text-sm font-bold text-[#F8F4EC]">Outlet Utama Jaksa Agung</h3>
              <p className="text-xs text-[#C5B8A8]">Jl. Jaksa Agung Suprapto No.73, Samaan, Klojen, Malang</p>
              <p className="text-[11px] text-[#2E7D32] font-semibold pt-1">● Status: Antrean Ringan (Buka 17:30)</p>
            </div>

            <div className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23] space-y-2">
              <span className="text-[10px] font-bold text-[#C5B8A8] uppercase">PILIH JAM AMBIL SORE/MALAM INI</span>
              <select className="w-full bg-[#241913] border border-[#3F2D23] rounded-xl p-2 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]">
                <option>Hari ini, 17.15 WIB • Slot Terbuka</option>
                <option>Hari ini, 17.45 WIB • Slot Terbuka</option>
                <option>Hari ini, 18.15 WIB • Slot Terbuka</option>
                <option>Hari ini, 19.00 WIB • Slot Terbuka</option>
              </select>
              <p className="text-[11px] text-[#D49B42] font-semibold pt-1">⏱️ Estimasi Pesanan Diolah: 15 Menit</p>
            </div>

            <div className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#C5B8A8] uppercase">METODE PICKUP</span>
                <h3 className="text-sm font-bold text-[#F8F4EC]">Gratis Tanpa Ukur</h3>
                <p className="text-xs text-[#C5B8A8]">Tunjukkan kode tiket di konter takeaway tanpa antre biasa.</p>
              </div>
              <button
                onClick={() => setActiveView('checkout')}
                className="w-full py-2 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl transition-all"
              >
                Konfirmasi Pengambilan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EKSPLORASI LAYANAN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-[10px] font-extrabold text-[#D49B42] uppercase tracking-wider">
            NAVIGASI TERINTEGRASI
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC] mt-0.5">
            Eksplorasi Layanan & Ragam Tradisi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => setActiveView('menu')}
            className="bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] rounded-2xl p-5 shadow-xl cursor-pointer group transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="px-2 py-0.5 bg-[#17110C] text-[#C5B8A8] text-[10px] font-bold rounded-md">
                4 Menu Utama
              </span>
              <ShoppingBag className="w-5 h-5 text-[#D49B42]" />
            </div>
            <h3 className="text-base font-bold text-[#F8F4EC] group-hover:text-[#D49B42] transition-colors">
              Menu Jajanan
            </h3>
            <p className="text-xs text-[#C5B8A8] mt-1 leading-relaxed">
              Nikmati pilihan jajanan legendaris: Puthu bambu, Klepon pandan, Cenil kenyal, & Lupis ketan.
            </p>
            <p className="text-xs text-[#2E7D32] font-bold mt-4">Buka Katalog Menu →</p>
          </div>

          <div
            onClick={() => setActiveView('heritage')}
            className="bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] rounded-2xl p-5 shadow-xl cursor-pointer group transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="px-2 py-0.5 bg-[#17110C] text-[#C5B8A8] text-[10px] font-bold rounded-md">
                Dokumentasi
              </span>
              <Flame className="w-5 h-5 text-[#D49B42]" />
            </div>
            <h3 className="text-base font-bold text-[#F8F4EC] group-hover:text-[#D49B42] transition-colors">
              Heritage Story
            </h3>
            <p className="text-xs text-[#C5B8A8] mt-1 leading-relaxed">
              Sejarah & kisah Puthu Lanang sejak tahun 1935 hingga dirawat oleh generasi ketiga saat ini.
            </p>
            <p className="text-xs text-[#2E7D32] font-bold mt-4">Baca Peta Sejarah →</p>
          </div>

          <div
            onClick={() => setActiveView('location')}
            className="bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] rounded-2xl p-5 shadow-xl cursor-pointer group transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="px-2 py-0.5 bg-[#17110C] text-[#C5B8A8] text-[10px] font-bold rounded-md">
                Buka Sore
              </span>
              <MapPin className="w-5 h-5 text-[#D49B42]" />
            </div>
            <h3 className="text-base font-bold text-[#F8F4EC] group-hover:text-[#D49B42] transition-colors">
              Kontak & Lokasi
            </h3>
            <p className="text-xs text-[#C5B8A8] mt-1 leading-relaxed">
              Titik alamat gerai, petunjuk arah jalan Celaket, dan waktu buka sore jam operasional.
            </p>
            <p className="text-xs text-[#2E7D32] font-bold mt-4">Cek Titik Peta →</p>
          </div>

          <div
            onClick={() => setActiveView('custom')}
            className="bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42] rounded-2xl p-5 shadow-xl cursor-pointer group transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="px-2 py-0.5 bg-[#17110C] text-[#C5B8A8] text-[10px] font-bold rounded-md">
                Pre-Order H-1
              </span>
              <Sparkles className="w-5 h-5 text-[#D49B42]" />
            </div>
            <h3 className="text-base font-bold text-[#F8F4EC] group-hover:text-[#D49B42] transition-colors">
              Pesanan Khusus
            </h3>
            <p className="text-xs text-[#C5B8A8] mt-1 leading-relaxed">
              Layanan pemesanan tampah besar dan hampers besek bambu untuk acara hajatan & syukuran.
            </p>
            <p className="text-xs text-[#2E7D32] font-bold mt-4">Reservasi Event →</p>
          </div>
        </div>
      </section>

      {/* 4. PILIHAN JAJANAN PUSAKA SIAP PESAN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-[#D49B42] uppercase tracking-wider">
              MENU KODIK PUTHU LANANG
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC] mt-0.5">
              Pilihan Jajanan Pusaka Siap Pesan
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === tab.key
                    ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-lg'
                    : 'bg-[#241913] border-[#3F2D23] text-[#C5B8A8] hover:text-[#F8F4EC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pusakaItems.map((item) => {
            const qty = quantities[item.id] || 1;
            return (
              <div
                key={item.id}
                className="bg-[#241913] border border-[#3F2D23] hover:border-[#D49B42]/70 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all group"
              >
                <div className="relative h-48 w-full bg-[#17110C] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px]">
                    <span className="px-2.5 py-1 bg-[#17110C]/80 text-[#F8F4EC] font-bold rounded-md border border-[#3F2D23]">
                      {getCustomBadge(item.id)}
                    </span>
                    <span className="px-2.5 py-1 bg-[#241913]/90 text-[#D49B42] font-extrabold rounded-md border border-[#3F2D23] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#D49B42]" /> {item.rating}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#F8F4EC] group-hover:text-[#D49B42] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#C5B8A8] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-[#3F2D23]/60">
                    <span className="text-base font-extrabold text-[#F8F4EC]">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[11px] text-[#C5B8A8] font-medium">
                      {item.portionDetails}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[#17110C] border border-[#3F2D23] rounded-xl px-2 py-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 text-[#C5B8A8] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#F8F4EC] w-5 text-center">{qty}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 text-[#C5B8A8] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => addToCart(item, qty)}
                        className="flex-1 py-2.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Tambah</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setSelectedItemForModal(item)}
                      className="w-full text-center text-[11px] text-[#C5B8A8] hover:text-[#D49B42] font-semibold flex items-center justify-center gap-1"
                    >
                      <span>Detail Komposisi & Alergen</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. HERITAGE TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#3F2D23]">
                <img
                  src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80"
                  alt="Gerobak Kayu Sederhana Malang 1935"
                  className="w-full h-full object-cover grayscale brightness-90"
                />
                <div className="absolute bottom-3 left-3 bg-[#17110C]/90 px-3 py-1 rounded-md text-[10px] font-extrabold text-[#D49B42] border border-[#3F2D23]">
                  Arsip Malang 1935
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-extrabold text-[#D49B42] uppercase tracking-wider">
                TAKRIF KEARIFAN RESEP NUSANTARA
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8F4EC]">
                Dari Gerobak Kayu Sederhana Menjadi Pusaka Kuliner Legendaris Malang
              </h2>
              <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
                Dimulai oleh Soeponyono Lanang pada tahun 1935 di sudut Jalan Jaksa Agung Suprapto, Puthu Lanang tetap memegang teguh pada prinsip yang sama: pantang mengganti bahan dasar demi keuntungan cepat. Beras pilihan ditumbuk manual, daun pandan suji diperas murni, dan cerobong bambu wulung tetap menjadi jantung utama yang menghasilkan aroma tiada tanding.
              </p>

              {/* Quote Box */}
              <div className="bg-[#17110C] p-5 rounded-2xl border border-[#3F2D23] relative">
                <p className="text-xs text-[#F8F4EC] italic leading-relaxed">
                  "Kue puthu yang enak itu bunyinya nyaring saat suwit. Bambu melengking, aromanya memanggil dari kejauhan. Dan manis arennya tidak pernah menyengat di tenggorokan. Rasa itulah yang kami jaga sejak sembilan dekade lalu."
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#2E7D32] text-white font-bold text-xs flex items-center justify-center">
                    SL
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F8F4EC]">SOEPONYONO LANANG</p>
                    <p className="text-[10px] text-[#D49B42]">Pendiri Generasi Pertama Puthu Lanang Malang</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#3F2D23] text-center">
            <div>
              <p className="text-xl font-extrabold text-[#D49B42]">1935</p>
              <p className="text-[10px] text-[#C5B8A8] font-bold">TAHUN BERDIRI</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-[#D49B42]">90 Thn</p>
              <p className="text-[10px] text-[#C5B8A8] font-bold">TRADISI RESEP</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-[#D49B42]">Gen ke-3</p>
              <p className="text-[10px] text-[#C5B8A8] font-bold">PENERUS AKTIF</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LOCATION TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold text-[#D49B42] uppercase tracking-wider">
                TANGAP LOKASI & ARAH
              </span>
              <h2 className="text-2xl font-extrabold text-[#F8F4EC] mt-0.5">
                Kunjungi Gerai Asli di Pusat Malang
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 bg-[#17110C] border border-[#3F2D23] rounded-2xl overflow-hidden h-64 relative flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="130" x2="1000" y2="130" stroke="#3F2D23" strokeWidth="10" />
                <line x1="300" y1="0" x2="300" y2="400" stroke="#543E31" strokeWidth="8" />
              </svg>
              <div className="relative z-10 text-center">
                <MapPin className="w-10 h-10 text-[#D49B42] mx-auto mb-1 animate-bounce" />
                <p className="text-xs font-bold text-[#F8F4EC]">Puthu Lanang Malang (Original)</p>
                <p className="text-[10px] text-[#C5B8A8]">Jl. Jaksa Agung Suprapto No. 73, Samaan, Malang</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23] space-y-2 text-xs">
                <p className="text-[10px] font-extrabold text-[#2E7D32] uppercase">STATUS JAM BUKA: BUKA SORE</p>
                <p className="font-bold text-[#F8F4EC]">Senin - Minggu: 17:30 - 21:30 WIB</p>
                <p className="text-[#C5B8A8] text-[11px]">Jl. Jaksa Agung Suprapto No.73, Samaan, Kec. Klojen, Kota Malang</p>
              </div>

              <div className="space-y-2">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#17110C] border border-[#2E7D32]/50 text-[#2E7D32] font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  <span>💬 Tanya Antrean via WhatsApp</span>
                </a>

                <button
                  onClick={() => setActiveView('custom')}
                  className="w-full py-3 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl transition-all"
                >
                  Pemesanan Porsi Tampah & Acara
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Detail Popup Modal */}
      <MenuDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
      />
    </div>
  );
};
