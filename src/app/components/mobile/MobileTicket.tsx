'use client';

import React from 'react';
import { Ticket, QrCode, MapPin, Clock, CheckCircle, Sparkles, RefreshCw, Download } from 'lucide-react';

interface MobileTicketProps {
  ticketData?: any;
  onNewOrder: () => void;
}

export const MobileTicket: React.FC<MobileTicketProps> = ({ ticketData, onNewOrder }) => {
  // Fallback default ticket if none provided yet
  const activeTicket = ticketData || {
    ticketNumber: 'ANTREAN-04',
    outlet: 'Pusat Celaket',
    outletAddress: 'Jl. Jaksa Agung Suprapto No. 73, Malang',
    date: 'Hari Ini, 30 Sep',
    timeSlot: '16:30 - 17:00',
    notes: 'Pisahkan parutan kelapa',
    customerName: 'Pecinta Kuliner',
    phone: '081234567890',
    items: [
      { id: '1', name: 'Puthu Bambu Original (5 Biji)', price: 15000, quantity: 2 },
      { id: '2', name: 'Klepon Pandan Melaka (10 Biji)', price: 15000, quantity: 1 }
    ],
    totalPrice: 45000,
    status: 'SEDANG DIKUKUS ♨️',
    createdAt: '16:15'
  };

  return (
    <div className="p-4 space-y-4 animate-fadeIn pb-24">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2E7D32]/20 border border-[#2E7D32] rounded-full text-[#2E7D32] text-[11px] font-bold">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Pesanan Smart Takeaway Berhasil</span>
        </div>
        <h2 className="text-lg font-extrabold text-[#F8F4EC]">E-Tiket Pengambilan</h2>
        <p className="text-xs text-[#C5B8A8]">Tunjukkan QR Code ini kepada kasir gerai Puthu Lanang</p>
      </div>

      {/* Main E-Ticket Card Design */}
      <div className="bg-[#241913] border-2 border-[#D49B42] rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Ticket Header Banner */}
        <div className="bg-gradient-to-r from-[#2E7D32] via-[#241913] to-[#2E7D32] p-4 text-center border-b border-[#3F2D23] relative">
          <span className="text-[10px] text-[#D49B42] uppercase font-extrabold tracking-widest block">
            PUTHU LANANG MALANG • EST 1935
          </span>
          <div className="mt-1 flex items-center justify-center gap-2">
            <h3 className="text-2xl font-black text-[#F8F4EC] tracking-wider">
              {activeTicket.ticketNumber}
            </h3>
          </div>
          <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#D49B42] text-[#17110C] font-extrabold text-[10px] rounded-full uppercase shadow">
            {activeTicket.status}
          </span>
        </div>

        {/* QR Code Section */}
        <div className="p-5 flex flex-col items-center justify-center bg-[#17110C]/80 border-b border-dashed border-[#3F2D23] relative">
          
          {/* Simulated QR Code Canvas Box */}
          <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-inner flex flex-col items-center justify-center border-4 border-[#D49B42]">
            {/* Visual SVG QR Simulation */}
            <div className="w-full h-full border-2 border-black p-1 bg-white grid grid-cols-5 gap-1 place-items-center">
              <div className="w-full h-full bg-black rounded-sm" />
              <div className="w-full h-full bg-white" />
              <div className="w-full h-full bg-black rounded-sm" />
              <div className="w-full h-full bg-black rounded-sm" />
              <div className="w-full h-full bg-black rounded-sm" />

              <div className="w-full h-full bg-white" />
              <div className="w-full h-full bg-black" />
              <div className="w-full h-full bg-white" />
              <div className="w-full h-full bg-black" />
              <div className="w-full h-full bg-white" />

              <div className="w-full h-full bg-black rounded-sm" />
              <div className="w-full h-full bg-white" />
              <div className="w-full h-full bg-black rounded-sm" />
              <div className="w-full h-full bg-white" />
              <div className="w-full h-full bg-black rounded-sm" />

              <div className="w-full h-full bg-black" />
              <div className="w-full h-full bg-black" />
              <div className="w-full h-full bg-white" />
              <div className="w-full h-full bg-black" />
              <div className="w-full h-full bg-black" />

              <div className="w-full h-full bg-black rounded-sm" />
              <div className="w-full h-full bg-white" />
              <div className="w-full h-full bg-black rounded-sm" />
              <div className="w-full h-full bg-black" />
              <div className="w-full h-full bg-black rounded-sm" />
            </div>
          </div>

          <p className="text-[10px] text-[#C5B8A8] mt-2 font-mono tracking-widest uppercase">
            TOKEN: PL-2026-X99201
          </p>
        </div>

        {/* Ticket Details */}
        <div className="p-4 space-y-3 bg-[#241913]">
          
          {/* Outlet Info */}
          <div className="flex items-start gap-2.5 text-xs pb-3 border-b border-[#3F2D23]">
            <MapPin className="w-4 h-4 text-[#D49B42] shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-[#F8F4EC]">{activeTicket.outlet}</p>
              <p className="text-[10px] text-[#C5B8A8]">{activeTicket.outletAddress}</p>
            </div>
          </div>

          {/* Time Slot Info */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-[#3F2D23]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2E7D32]" />
              <div>
                <p className="text-[10px] text-[#C5B8A8]">Slot Pengambilan</p>
                <p className="font-extrabold text-[#F8F4EC]">{activeTicket.date} • {activeTicket.timeSlot}</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#2E7D32]/20 text-[#2E7D32] font-bold text-[10px] rounded">
              Prioritas Express
            </span>
          </div>

          {/* Items Purchased List */}
          <div className="space-y-1.5 pb-3 border-b border-[#3F2D23]">
            <p className="text-[10px] font-bold text-[#D49B42] uppercase">Rincian Menu Dipesan:</p>
            {activeTicket.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between text-xs text-[#F8F4EC]">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="font-bold text-[#C5B8A8]">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}

            {activeTicket.notes && (
              <div className="mt-1 bg-[#17110C] p-2 rounded-lg text-[10px] text-[#D49B42] border border-[#3F2D23]">
                <span className="font-bold">Catatan:</span> {activeTicket.notes}
              </div>
            )}
          </div>

          {/* Total Payment */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#C5B8A8]">Total Pembayaran:</span>
            <span className="text-base font-black text-[#D49B42]">
              Rp {activeTicket.totalPrice.toLocaleString('id-ID')}
            </span>
          </div>

        </div>

      </div>

      {/* Ticket Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={() => alert('Simulasi: E-Tiket telah disimpan ke Galeri Smartphone Anda!')}
          className="py-2.5 px-3 bg-[#241913] hover:bg-[#3F2D23] border border-[#3F2D23] text-[#F8F4EC] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow"
        >
          <Download className="w-4 h-4 text-[#D49B42]" />
          <span>Simpan Tiket</span>
        </button>

        <button
          onClick={onNewOrder}
          className="py-2.5 px-3 bg-[#2E7D32] hover:bg-[#388E3C] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Pesan Lagi</span>
        </button>
      </div>

    </div>
  );
};
