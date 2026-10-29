'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { MapPin, Calendar, Clock, Edit3, ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';

interface MobileTakeawayFormProps {
  onBack: () => void;
  onSubmitSuccess: (ticketData: any) => void;
}

export const MobileTakeawayForm: React.FC<MobileTakeawayFormProps> = ({ onBack, onSubmitSuccess }) => {
  const { cart, getTotalPrice, clearCart } = useStore();
  const totalPrice = getTotalPrice();

  const [selectedOutlet, setSelectedOutlet] = useState<'celaket' | 'dinoyo'>('celaket');
  const [selectedDate, setSelectedDate] = useState<string>('Hari Ini, 30 Sep');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('16:30 - 17:00');
  const [notes, setNotes] = useState<string>('Pisahkan parutan kelapa');
  const [customerName, setCustomerName] = useState<string>('Budi Santoso');
  const [phone, setPhone] = useState<string>('081234567890');

  const outlets = [
    {
      id: 'celaket',
      name: 'Gerai Pusat Celaket',
      address: 'Jl. Jaksa Agung Suprapto No. 73, Samaan, Klojen, Malang',
      queue: '~12 Mnt',
      status: 'Buka • Ramai Lancar',
    },
    {
      id: 'dinoyo',
      name: 'Cabang Dinoyo',
      address: 'Jl. MT Haryono No. 195, Lowokwaru, Kota Malang',
      queue: '~5 Mnt',
      status: 'Buka • Antrean Pendek',
    },
  ];

  const dates = [
    { id: 'today', label: 'Hari Ini', sub: '30 Sep' },
    { id: 'tomorrow', label: 'Besok', sub: '01 Okt' },
    { id: 'dayafter', label: 'Kamis', sub: '02 Okt' },
  ];

  const timeSlots = [
    '16:00 - 16:30',
    '16:30 - 17:00',
    '17:00 - 17:30',
    '17:30 - 18:00',
    '18:00 - 18:30',
    '18:30 - 19:00',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Keranjang belanja Anda masih kosong. Silakan pilih menu terlebih dahulu!');
      onBack();
      return;
    }

    const ticketNumber = `ANTREAN-${Math.floor(10 + Math.random() * 90)}`;
    const newTicket = {
      ticketNumber,
      outlet: selectedOutlet === 'celaket' ? 'Pusat Celaket' : 'Cabang Dinoyo',
      outletAddress: selectedOutlet === 'celaket' ? outlets[0].address : outlets[1].address,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes,
      customerName,
      phone,
      items: [...cart],
      totalPrice,
      status: 'SEDANG DIKUKUS ♨️',
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    // Store in localStorage for UTS persistence
    try {
      localStorage.setItem('puthu_active_ticket', JSON.stringify(newTicket));
    } catch (err) {
      console.error(err);
    }

    clearCart();
    onSubmitSuccess(newTicket);
  };

  return (
    <div className="p-4 space-y-5 animate-fadeIn pb-24">
      {/* Header Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-[#241913] border border-[#3F2D23] flex items-center justify-center text-heritage-cream"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-base font-extrabold text-heritage-cream">Form Smart Takeaway</h2>
          <p className="text-[11px] text-heritage-tan">Atur gerai & slot waktu pengambilan pesanan</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 1. Radio Card Pilihan Gerai Outlet */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-heritage-cream flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-heritage-amber" /> Pilihan Gerai Outlet
          </label>
          <div className="grid grid-cols-1 gap-2.5">
            {outlets.map((outlet) => {
              const isSelected = selectedOutlet === outlet.id;
              return (
                <div
                  key={outlet.id}
                  onClick={() => setSelectedOutlet(outlet.id as 'celaket' | 'dinoyo')}
                  className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-heritage-forest/15 border-heritage-forest ring-1 ring-heritage-forest'
                      : 'bg-[#241913] border-[#3F2D23] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="outlet"
                        checked={isSelected}
                        onChange={() => setSelectedOutlet(outlet.id as 'celaket' | 'dinoyo')}
                        className="accent-heritage-forest"
                      />
                      <h4 className="text-xs font-extrabold text-heritage-cream">{outlet.name}</h4>
                    </div>
                    <p className="text-[10px] text-heritage-tan pl-5">{outlet.address}</p>
                    <div className="pl-5 flex items-center gap-2 pt-1">
                      <span className="text-[9px] font-bold text-heritage-forest bg-heritage-forest/20 px-2 py-0.5 rounded">
                        {outlet.status}
                      </span>
                      <span className="text-[9px] text-heritage-amber font-semibold">
                        Estimasi Antrean: {outlet.queue}
                      </span>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-heritage-forest shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Date Picker / Pills Tanggal */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-heritage-cream flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-heritage-amber" /> Tanggal Pengambilan
          </label>
          <div className="grid grid-cols-3 gap-2">
            {dates.map((d) => {
              const fullLabel = `${d.label}, ${d.sub}`;
              const isSelected = selectedDate === fullLabel;
              return (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setSelectedDate(fullLabel)}
                  className={`py-2.5 px-2 rounded-xl text-center border transition-all ${
                    isSelected
                      ? 'bg-heritage-amber text-heritage-dark font-extrabold border-heritage-amber'
                      : 'bg-[#241913] text-heritage-tan border-[#3F2D23] hover:text-white'
                  }`}
                >
                  <p className="text-[11px] leading-none">{d.label}</p>
                  <p className="text-[10px] opacity-80 mt-1">{d.sub}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Time Slot Chips */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-heritage-cream flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-heritage-amber" /> Slot Waktu Pengambilan
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                    isSelected
                      ? 'bg-heritage-forest text-white border-heritage-forest shadow-md'
                      : 'bg-[#241913] text-heritage-tan border-[#3F2D23] hover:border-heritage-amber'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Opsi Catatan Khusus */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-heritage-cream flex items-center gap-1.5">
            <Edit3 className="w-4 h-4 text-heritage-amber" /> Catatan Khusus Pesanan
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: Pisahkan parutan kelapa, gula melaka minta lebih banyak..."
            rows={2}
            className="w-full bg-heritage-dark border border-[#3F2D23] rounded-xl p-3 text-xs text-heritage-cream focus:outline-none focus:border-heritage-amber placeholder-[#7E6A5A]"
          />
        </div>

        {/* Input Identitas Pengambil */}
        <div className="space-y-2 bg-[#241913] p-3.5 rounded-xl border border-[#3F2D23]">
          <h4 className="text-xs font-bold text-heritage-amber">Data Pengambil Pesanan</h4>
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nama Pemesan"
              required
              className="bg-heritage-dark border border-[#3F2D23] rounded-lg p-2 text-xs text-heritage-cream"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nomor WhatsApp"
              required
              className="bg-heritage-dark border border-[#3F2D23] rounded-lg p-2 text-xs text-heritage-cream"
            />
          </div>
        </div>

        {/* Order Summary & Submit Button */}
        <div className="space-y-3 pt-2">
          <div className="bg-[#241913] p-3 rounded-xl border border-[#3F2D23] flex justify-between items-center text-xs">
            <span className="text-heritage-tan">Total Pembayaran ({cart.reduce((a, b) => a + b.quantity, 0)} item):</span>
            <span className="text-sm font-extrabold text-heritage-amber">
              Rp {totalPrice.toLocaleString('id-ID')}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-heritage-forest hover:bg-heritage-forest-hover text-white font-extrabold text-xs rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buat Tiket Smart Takeaway 🎟️</span>
          </button>
        </div>
      </form>
    </div>
  );
};
