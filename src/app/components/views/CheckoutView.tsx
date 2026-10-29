'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Calendar, Clock, ShoppingBag, CreditCard, ShieldCheck, ArrowRight, User, Phone, Lock, CheckCircle2, QrCode, Sparkles } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    getTotalPrice,
    getTotalItems,
    user,
    setUser,
    selectedDate,
    selectedTimeSlot,
    setPickupSlot,
    setActiveView,
    setActiveTicketId,
    addToast,
    clearCart
  } = useStore();

  // Slot options
  const timeSlots = [
    '16:00 - 16:30 WIB',
    '16:30 - 17:00 WIB',
    '17:00 - 17:30 WIB',
    '17:30 - 18:00 WIB',
    '18:00 - 18:30 WIB',
    '18:30 - 19:00 WIB',
    '19:00 - 19:30 WIB',
    '19:30 - 20:00 WIB'
  ];

  // Auth Form State (Inline if user is guest)
  const [authTab, setAuthTab] = useState<'guest' | 'login' | 'register'>('guest');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'GOPAY' | 'OVO' | 'CASH'>('QRIS');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-[#17110C] min-h-screen flex items-center justify-center text-center p-4">
        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-8 max-w-md w-full space-y-4">
          <ShoppingBag className="w-16 h-16 text-[#3F2D23] mx-auto stroke-1" />
          <h2 className="text-xl font-bold text-[#F8F4EC]">Keranjang Belanja Kosong</h2>
          <p className="text-xs text-[#C5B8A8]">
            Silakan pilih jajanan pusaka Puthu Lanang terlebih dahulu sebelum melanjutkan ke checkout.
          </p>
          <button
            onClick={() => setActiveView('menu')}
            className="w-full py-3 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold text-xs rounded-xl"
          >
            Lihat Katalog Menu
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    // Validate guest/user contact
    const finalName = user ? user.name : guestName;
    const finalPhone = user ? user.phone : guestPhone;

    if (!finalName || !finalPhone) {
      addToast('Mohon isi nama dan nomor WhatsApp untuk penerbitan Tiket Ambil.', 'warning');
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        userId: user ? user.id : 'GUEST',
        customerName: finalName,
        customerPhone: finalPhone,
        items: cart.map((c) => ({
          menuId: c.item.id,
          name: c.item.name,
          quantity: c.quantity,
          price: c.item.price,
          notes: c.notes || ''
        })),
        pickupType: 'SCHEDULED_PICKUP',
        pickupDate: selectedDate,
        pickupTimeSlot: selectedTimeSlot,
        paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.error || 'Gagal membuat pesanan', 'warning');
        setIsProcessing(false);
        return;
      }

      // If user registered inline, set state
      if (!user && finalName && finalPhone) {
        setUser({ id: `usr-${Date.now()}`, name: finalName, phone: finalPhone }, 'GUEST_SESSION');
      }

      addToast('Pesanan berhasil dikonfirmasi! Penerbitan Tiket Ambil...', 'success');
      setActiveTicketId(data.order.id);
      clearCart();
      setActiveView('ticket');
    } catch (err) {
      addToast('Terjadi kesalahan koneksi server', 'warning');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-12 bg-[#17110C] animate-fadeIn min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D49B42]">
            Smart Takeaway Userflow
          </span>
          <h1 className="text-3xl font-extrabold text-[#F8F4EC] mt-1">
            Checkout & Penjadwalan Slot Ambil
          </h1>
          <p className="text-xs text-[#C5B8A8] mt-1">
            Lengkapi jam pengambilan dan metode pembayaran digital untuk penerbitan Tiket Ambil QR Code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Pickup Slot & Auth & Payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Slot Pengambilan Time Picker */}
            <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-[#F8F4EC] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D49B42]" /> 1. Pilih Slot Jam Pengambilan (Hari Ini)
              </h3>
              <p className="text-xs text-[#C5B8A8]">
                Pesanan Anda akan dikukus hangat tepat waktu mendekati jam slot yang dipilih.
              </p>

              {/* Date Input */}
              <div className="flex items-center gap-3 bg-[#17110C] p-3 rounded-xl border border-[#3F2D23] text-xs">
                <Calendar className="w-4 h-4 text-[#D49B42]" />
                <span className="text-[#C5B8A8]">Tanggal Pengambilan:</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setPickupSlot(e.target.value, selectedTimeSlot)}
                  className="bg-transparent text-[#F8F4EC] font-bold focus:outline-none"
                />
              </div>

              {/* Time Slots Pills Horizontal */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setPickupSlot(selectedDate, slot)}
                      className={`p-3 rounded-2xl text-xs font-bold transition-all text-center border ${
                        isSelected
                          ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-lg ring-2 ring-[#2E7D32]/40'
                          : 'bg-[#17110C] border-[#3F2D23] text-[#C5B8A8] hover:text-[#F8F4EC] hover:border-[#D49B42]'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auth Information (If not logged in, inline form) */}
            <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-[#F8F4EC] flex items-center gap-2">
                <User className="w-5 h-5 text-[#D49B42]" /> 2. Data Pemesan (Untuk Tiket QR Code)
              </h3>

              {user ? (
                <div className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#C5B8A8]">Terautentikasi Sebagai:</p>
                    <p className="text-sm font-bold text-[#F8F4EC]">{user.name}</p>
                    <p className="text-xs text-[#D49B42] font-semibold">{user.phone}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#2E7D32]/20 text-[#2E7D32] text-xs font-bold rounded-full">
                    ✓ Akun Terverifikasi
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 p-1 bg-[#17110C] rounded-xl border border-[#3F2D23]">
                    <button
                      type="button"
                      onClick={() => setAuthTab('guest')}
                      className={`py-2 text-xs font-bold rounded-lg ${
                        authTab === 'guest' ? 'bg-[#2E7D32] text-white' : 'text-[#C5B8A8]'
                      }`}
                    >
                      Beli Sebagai Tamu
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthTab('register')}
                      className={`py-2 text-xs font-bold rounded-lg ${
                        authTab === 'register' ? 'bg-[#2E7D32] text-white' : 'text-[#C5B8A8]'
                      }`}
                    >
                      Daftar Akun Baru
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl p-2.5 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#C5B8A8] mb-1">
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-[#17110C] border border-[#3F2D23] rounded-xl p-2.5 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D49B42]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-[#F8F4EC] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D49B42]" /> 3. Pilih Metode Pembayaran Digital
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'QRIS', label: 'QRIS Instant', icon: <QrCode className="w-4 h-4 text-[#D49B42]" /> },
                  { id: 'GOPAY', label: 'GoPay / OVO', icon: <Sparkles className="w-4 h-4 text-[#2E7D32]" /> },
                  { id: 'CASH', label: 'Bayar Di Kasir', icon: <CreditCard className="w-4 h-4 text-[#D49B42]" /> },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3.5 rounded-2xl text-xs font-bold flex flex-col items-center gap-2 border transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-[#2E7D32]/20 border-[#2E7D32] text-[#F8F4EC] ring-1 ring-[#2E7D32]'
                        : 'bg-[#17110C] border-[#3F2D23] text-[#C5B8A8] hover:border-[#D49B42]'
                    }`}
                  >
                    {pm.icon}
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>

              {/* QRIS Interactive Preview */}
              {paymentMethod === 'QRIS' && (
                <div className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23] flex items-center gap-4">
                  <div className="w-20 h-20 bg-white p-1.5 rounded-xl shrink-0 flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PUTHU-MALANG-${totalPrice}`}
                      alt="Scan QRIS"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#F8F4EC]">Scan QRIS Resmi Puthu Lanang</p>
                    <p className="text-[11px] text-[#C5B8A8]">
                      Mendukung BCA, Mandiri, GoPay, ShopeePay, OVO, Dana, LinkAja.
                    </p>
                    <p className="text-[10px] text-[#D49B42] font-semibold">
                      Verifikasi otomatis begitu tombol konfirmasi ditekan.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary Review */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-6 shadow-2xl space-y-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#F8F4EC] flex items-center justify-between border-b border-[#3F2D23] pb-4">
                <span>Rangkuman Pesanan</span>
                <span className="text-xs text-[#D49B42] font-normal">{totalItems} Item</span>
              </h3>

              {/* Cart List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((c) => (
                  <div key={c.item.id} className="flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-[#F8F4EC]">{c.item.name}</p>
                      <p className="text-[11px] text-[#C5B8A8]">
                        {c.quantity} x Rp {c.item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <span className="font-bold text-[#D49B42]">
                      Rp {(c.quantity * c.item.price).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation */}
              <div className="pt-4 border-t border-[#3F2D23] space-y-2 text-xs">
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Subtotal Jajanan:</span>
                  <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[#C5B8A8]">
                  <span>Kemasan Daun Pisang & Besek:</span>
                  <span className="text-[#2E7D32] font-bold">GRATIS</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#F8F4EC] pt-2 border-t border-[#3F2D23]">
                  <span>Total Bayar:</span>
                  <span className="text-[#D49B42]">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 text-sm"
              >
                {isProcessing ? (
                  <span>Menerbitkan Tiket QR Code...</span>
                ) : (
                  <>
                    <span>Konfirmasi & Terbitkan Tiket Ambil</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#C5B8A8]">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Garansi Segar Dikukus Dadakan</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
