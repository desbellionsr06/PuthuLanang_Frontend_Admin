'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Gift, Calendar, Clock, Sliders, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Truck, ShoppingBag, Plus, Minus } from 'lucide-react';

export const CustomEventView: React.FC = () => {
  const { addToast } = useStore();

  const [packageType, setPackageType] = useState<'tampah_sedang' | 'tampah_besar' | 'besek_eksklusif'>('tampah_besar');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('16:00 - 17:00 WIB (Sore)');
  const [unitQuantity, setUnitQuantity] = useState(1);
  
  // Ratios (Default Standar Pusaka 1935: 40% Puthu, 20% Klepon, 20% Cenil, 20% Lupis)
  const [puthuRatio, setPuthuRatio] = useState(40);
  const [kleponRatio, setKleponRatio] = useState(20);
  const [cenilRatio, setCenilRatio] = useState(20);
  const [lupisRatio, setLupisRatio] = useState(20);

  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const packages = [
    {
      id: 'tampah_sedang',
      name: 'Paket Tampah Klasik 1935',
      categoryTag: 'TAMPAH SEDANG',
      pax: '15 - 25 Orang',
      price: 150000,
      desc: 'Kombinasi merata Puthu Bambu, Klepon gula jawa cair, Cenil kenyal, dan Lupis ketan legit di atas nampan bambu asli.',
      badge: 'TERFAVORIT ARISAN',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'tampah_besar',
      name: 'Paket Tampah Sultan Malang',
      categoryTag: 'TAMPAH BESAR • GRAND ASSORTMENT',
      pax: '35 - 50 Orang',
      price: 350000,
      desc: 'Porsi jumbo untuk hajatan besar. Dilengkapi opsi tambahan live steaming station (bambu uap langsung di lokasi acara).',
      badge: 'TERFAVORIT HAJATAN',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'besek_eksklusif',
      name: 'Paket Besek Hajatan Tamu',
      categoryTag: 'BESEK EKSKLUSIF TAMU',
      pax: 'PerPax / Box',
      price: 25000,
      desc: 'Kotak besek bambu alami individual untuk buah tangan undangan pernikahan atau seminar. Higienis dan elegan.',
      badge: 'BESEK EKSKLUSIF',
      img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const currentPackage = packages.find((p) => p.id === packageType)!;
  const totalPrice = currentPackage.price * unitQuantity;

  const handleSubmitWA = () => {
    const waText = encodeURIComponent(
      `*PESANAN KHUSUS TAMPAH / HAJATAN PUTHU LANANG*\n` +
      `Paket: ${currentPackage.name}\n` +
      `Jumlah: ${unitQuantity} Unit\n` +
      `Tanggal: ${eventDate}\n` +
      `Jam Tiba: ${pickupTime}\n` +
      `Komposisi Varian:\n` +
      ` - Puthu Bambu: ${puthuRatio}%\n` +
      ` - Klepon Gula: ${kleponRatio}%\n` +
      ` - Cenil Kenyal: ${cenilRatio}%\n` +
      ` - Lupis Ketan: ${lupisRatio}%\n` +
      `Catatan: ${notes || '-'}\n\n` +
      `Total Estimasi: Rp ${totalPrice.toLocaleString('id-ID')}`
    );
    window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
  };

  return (
    <div className="py-12 bg-[#17110C] animate-fadeIn min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D49B42]/15 border border-[#D49B42]/40 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-[#D49B42]">
              🏷️ PESANAN KHUSUS & HAJATAN • SEJAK 1935
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8F4EC]">
              Pesanan Khusus, Tampah Besar & Hajatan
            </h1>
            <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed">
              Hadirkan kelezatan pusaka legendaris Malang ke setiap momen istimewa Anda. Pilihan jajanan pasar otentik dalam nampan bambu tradisional (tampah) atau besek eksklusif untuk pernikahan, rapat instansi, dan perayaan akbar. Minimum pemesanan H-1.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#2E7D32]">
              <span className="flex items-center gap-1">🛡️ 100% Gula Aren Murni & Kelapa Segar</span>
              <span className="flex items-center gap-1">🚚 Pengiriman Kurir Khusus / Instant Malang</span>
            </div>
          </div>

          {/* Status Dapur Utama Box */}
          <div className="bg-[#241913] border border-[#3F2D23] rounded-2xl p-5 space-y-3 shrink-0 shadow-xl max-w-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-[#C5B8A8] uppercase tracking-wider">
                STATUS DAPUR UTAMA
              </span>
              <span className="px-2 py-0.5 bg-[#2E7D32]/20 text-[#2E7D32] font-bold text-[10px] rounded-md">
                ● BUKA PESANAN
              </span>
            </div>
            <p className="text-xs text-[#F8F4EC] font-bold">Slot Pengiriman Hari Ini</p>
            <div className="w-full bg-[#17110C] h-2 rounded-full overflow-hidden border border-[#3F2D23]">
              <div className="bg-gradient-to-r from-[#2E7D32] to-[#D49B42] h-full w-[70%]" />
            </div>
            <p className="text-[11px] text-[#C5B8A8]">70% Kapasitas Terpesona</p>
            <button
              onClick={() => {
                const el = document.getElementById('configurator-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Pilih Paket Tampah & Besek
            </button>
          </div>
        </div>

        {/* Section Format & Ukuran Tampah */}
        <div className="space-y-6">
          <div>
            <span className="text-[11px] font-extrabold text-[#D49B42] uppercase tracking-wider">
              KATALOG PUSAKA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F4EC] mt-1">
              Pilih Format & Ukuran Tampah
            </h2>
            <p className="text-xs text-[#C5B8A8] mt-1">
              Setiap paket diracik langsung menjelang acara untuk menjamin kelembutan puthu bambu dan kelezatan taburan kelapa parut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const isSelected = packageType === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setPackageType(pkg.id as any)}
                  className={`bg-[#241913] border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/50 bg-gradient-to-b from-[#241913] to-[#2E7D32]/10'
                      : 'border-[#3F2D23] hover:border-[#D49B42]'
                  }`}
                >
                  <div className="relative h-44 w-full bg-[#17110C] overflow-hidden">
                    <img
                      src={pkg.img}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px]">
                      <span className="px-2.5 py-1 bg-[#17110C]/90 text-[#F8F4EC] font-bold rounded-md border border-[#3F2D23]">
                        {pkg.pax}
                      </span>
                      {pkg.badge && (
                        <span className="px-2.5 py-1 bg-[#D49B42] text-[#17110C] font-extrabold rounded-md shadow-md">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold text-[#D49B42] uppercase tracking-wider">
                        {pkg.categoryTag}
                      </p>
                      <h3 className="text-base font-bold text-[#F8F4EC] mt-0.5">{pkg.name}</h3>
                      <p className="text-xs text-[#C5B8A8] mt-2 leading-relaxed">{pkg.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-[#3F2D23] space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-[#C5B8A8]">Harga Paket</span>
                        <span className="text-base font-extrabold text-[#F8F4EC]">
                          Rp {pkg.price.toLocaleString('id-ID')}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                          isSelected
                            ? 'bg-[#2E7D32] text-white shadow-md'
                            : 'bg-[#17110C] border border-[#3F2D23] text-[#C5B8A8] hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Paket Terpilih ✓' : 'Pilih Paket Ini'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Configurator Section (2 Columns Layout) */}
        <div id="configurator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Detail Acara & Komposisi */}
          <div className="lg:col-span-7 bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-extrabold text-[#D49B42] uppercase tracking-wider">
                ⚙️ KONFIGURATOR PESANAN KHUSUS
              </span>
              <h2 className="text-2xl font-extrabold text-[#F8F4EC] mt-1">
                Atur Detail Acara & Komposisi
              </h2>
              <p className="text-xs text-[#C5B8A8] mt-1">
                Sesuaikan waktu pengiriman, rasio jajanan, dan catatan khusus sesuai kebutuhan hajatan Anda.
              </p>
            </div>

            {/* Banner Paket Terpilih */}
            <div className="bg-[#17110C] p-4 rounded-xl border border-[#3F2D23] flex justify-between items-center text-xs">
              <div>
                <p className="text-[10px] text-[#C5B8A8] uppercase tracking-wider">PAKET TERPILIH</p>
                <p className="font-bold text-[#F8F4EC] text-sm">{currentPackage.name}</p>
              </div>
              <span className="text-base font-extrabold text-[#D49B42]">
                Rp {currentPackage.price.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="space-y-5">
              {/* Tanggal & Jam */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1.5 uppercase">
                    Tanggal Acara / Pengiriman
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl py-2.5 px-3 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1.5 uppercase">
                    Jam Terima di Lokasi
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl py-2.5 px-3 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                  >
                    <option value="16:00 - 17:00 WIB (Sore)">16:00 - 17:00 WIB (Sore)</option>
                    <option value="17:00 - 18:00 WIB (Sore)">17:00 - 18:00 WIB (Sore)</option>
                    <option value="18:00 - 19:00 WIB (Malam)">18:00 - 19:00 WIB (Malam)</option>
                    <option value="19:00 - 20:00 WIB (Malam)">19:00 - 20:00 WIB (Malam)</option>
                  </select>
                </div>
              </div>

              {/* Jumlah Tampah / Unit */}
              <div>
                <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1.5 uppercase">
                  Jumlah Tampah / Paket / Pax
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-[#17110C] border border-[#3F2D23] rounded-xl px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => setUnitQuantity(Math.max(1, unitQuantity - 1))}
                      className="p-1 text-[#C5B8A8] hover:text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-[#F8F4EC] w-8 text-center">
                      {unitQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setUnitQuantity(unitQuantity + 1)}
                      className="p-1 text-[#C5B8A8] hover:text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-[#C5B8A8]">Unit / Tampah</span>
                </div>
              </div>

              {/* Composition Ratios */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-semibold text-[#C5B8A8] uppercase">
                    Komposisi Varian Jajanan
                  </label>
                  <span className="text-[10px] text-[#2E7D32] font-bold">Standar Pusaka 1935</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-[#17110C] p-3 rounded-xl border border-[#3F2D23] text-center">
                    <p className="text-[10px] text-[#C5B8A8]">Puthu Bambu</p>
                    <p className="text-sm font-bold text-[#D49B42]">{puthuRatio}%</p>
                  </div>
                  <div className="bg-[#17110C] p-3 rounded-xl border border-[#3F2D23] text-center">
                    <p className="text-[10px] text-[#C5B8A8]">Klepon Gula</p>
                    <p className="text-sm font-bold text-[#2E7D32]">{kleponRatio}%</p>
                  </div>
                  <div className="bg-[#17110C] p-3 rounded-xl border border-[#3F2D23] text-center">
                    <p className="text-[10px] text-[#C5B8A8]">Cenil Kenyal</p>
                    <p className="text-sm font-bold text-[#2E7D32]">{cenilRatio}%</p>
                  </div>
                  <div className="bg-[#17110C] p-3 rounded-xl border border-[#3F2D23] text-center">
                    <p className="text-[10px] text-[#C5B8A8]">Lupis Ketan</p>
                    <p className="text-sm font-bold text-[#2E7D32]">{lupisRatio}%</p>
                  </div>
                </div>
              </div>

              {/* Catatan Khusus */}
              <div>
                <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1.5 uppercase">
                  Catatan Khusus Acara / Permintaan Rasa
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Kurangi sedikit kelapa parut, berikan label nama instansi di setiap besek..."
                  className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl p-3 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Rangkuman Pesanan & Konfirmasi */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 sticky top-24">
              <div>
                <span className="text-[10px] font-extrabold text-[#C5B8A8] uppercase tracking-wider">
                  RANGKUMAN PESANAN
                </span>
                <h3 className="text-xl font-bold text-[#F8F4EC] mt-0.5">
                  Estimasi Biaya & Konfirmasi
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Paket Terpilih:</span>
                  <span className="font-bold text-[#F8F4EC]">{currentPackage.name}</span>
                </div>
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Jumlah Unit:</span>
                  <span className="font-bold text-[#F8F4EC]">{unitQuantity} Unit</span>
                </div>
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Estimasi Pengemasan:</span>
                  <span className="text-[#F8F4EC]">Tampah Bambu Daun Pisang</span>
                </div>
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Biaya Kurir Instant:</span>
                  <span className="text-[#D49B42] font-semibold">Dihitung Berdasarkan Lokasi</span>
                </div>

                <div className="pt-4 border-t border-[#3F2D23] flex justify-between items-baseline text-base font-extrabold text-[#F8F4EC]">
                  <span>Total Estimasi:</span>
                  <span className="text-xl text-[#D49B42]">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleSubmitWA}
                  className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pesan Khusus via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    addToast('Pesanan tampah berhasil ditambahkan ke keranjang!', 'success');
                  }}
                  className="w-full py-3 bg-[#17110C] border border-[#3F2D23] hover:border-[#D49B42] text-[#F8F4EC] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D49B42]" />
                  <span>Tambahkan ke Keranjang Partai Besar</span>
                </button>
              </div>

              <div className="p-3 bg-[#17110C] border border-[#3F2D23] rounded-xl text-[11px] text-[#C5B8A8] space-y-1">
                <p className="font-semibold text-[#D49B42]">
                  ⓘ CS Hotline Resmi: +62 812-3456-1935
                </p>
                <p className="text-[10px]">
                  Tim kami akan segera merespon konfirmasi jadwal dan pembayaran DP Anda.
                </p>
              </div>

              <div className="bg-[#17110C] p-4 rounded-xl border border-[#3F2D23] flex items-center gap-3 text-xs">
                <div className="w-9 h-9 rounded-lg bg-[#2E7D32]/20 border border-[#2E7D32]/40 flex items-center justify-center text-[#2E7D32] shrink-0">
                  🌱
                </div>
                <div>
                  <p className="font-bold text-[#F8F4EC]">Jaminan Asli Kukus Bambu</p>
                  <p className="text-[10px] text-[#C5B8A8] mt-0.5">
                    Tidak menggunakan pengawet. Dimasak segar menggunakan tungku tradisional setiap sore menjelang buka.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
