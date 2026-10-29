'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { QrCode, CheckCircle2, Flame, Clock, MapPin, RefreshCw, Printer, ArrowLeft, ShieldCheck } from 'lucide-react';

export const TicketView: React.FC = () => {
  const { activeTicketId, setActiveView } = useStore();
  const [ticketData, setTicketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const fetchTicket = async () => {
    if (!activeTicketId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${activeTicketId}/ticket`);
      const data = await res.json();
      if (res.ok && data.ticket) {
        setTicketData(data.ticket);
        setQrDataUrl(
          `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
            data.ticket.qrCodeToken
          )}`
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [activeTicketId]);

  if (loading) {
    return (
      <div className="py-24 bg-[#17110C] min-h-screen flex items-center justify-center text-center">
        <div className="space-y-4">
          <RefreshCw className="w-10 h-10 text-[#D49B42] animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#F8F4EC]">Memuat Tiket QR Code Ambil...</p>
        </div>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="py-24 bg-[#17110C] min-h-screen flex items-center justify-center text-center p-4">
        <div className="bg-[#241913] border border-[#3F2D23] rounded-3xl p-8 max-w-md w-full space-y-4">
          <p className="text-base font-bold text-[#F8F4EC]">Tiket Tidak Ditemukan</p>
          <button
            onClick={() => setActiveView('home')}
            className="w-full py-3 bg-[#2E7D32] text-white font-bold text-xs rounded-xl"
          >
            Kembali Ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#17110C] animate-fadeIn min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navigation Back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-xs font-bold text-[#C5B8A8] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali Ke Beranda</span>
          </button>

          <button
            onClick={fetchTicket}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#241913] border border-[#3F2D23] text-xs font-semibold text-[#D49B42] rounded-xl hover:border-[#D49B42]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Perbarui Status Dapur</span>
          </button>
        </div>

        {/* Unique Ticket Pass Container */}
        <div className="bg-[#241913] border-2 border-[#D49B42]/50 rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Ticket Header Banner */}
          <div className="p-6 bg-gradient-to-r from-[#241913] via-[#2E7D32]/30 to-[#241913] border-b border-[#3F2D23] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49B42]">
                  TIKET SMART TAKEAWAY RESMI
                </span>
                <h2 className="text-lg font-bold text-[#F8F4EC]">Puthu Lanang Malang</h2>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-[#C5B8A8]">ID Tiket:</p>
              <p className="text-sm font-extrabold text-[#D49B42]">{ticketData.orderId}</p>
            </div>
          </div>

          {/* Ticket Body Grid */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Live Kitchen Process Status */}
            <div className="bg-[#17110C] p-5 rounded-2xl border border-[#3F2D23] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-[#C5B8A8]">Status Proses Dapur Bambu:</span>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="w-3 h-3 rounded-full bg-[#D49B42] animate-ping" />
                  <h3 className="text-lg font-extrabold text-[#D49B42]">
                    SEDANG DIKUKUS BAMBU ♨️
                  </h3>
                </div>
                <p className="text-xs text-[#C5B8A8]">
                  Nomor Antrean Dapur: <span className="text-[#F8F4EC] font-bold">#{ticketData.kitchenQueueNumber}</span> • Est. Siap: <span className="text-[#2E7D32] font-bold">{ticketData.estimatedReadyTime}</span>
                </p>
              </div>

              <div className="px-4 py-2 bg-[#2E7D32]/20 border border-[#2E7D32]/40 rounded-xl text-center">
                <p className="text-[10px] text-[#C5B8A8]">Status Bayar</p>
                <p className="text-xs font-bold text-[#2E7D32]">LUNAS ({ticketData.paymentMethod})</p>
              </div>
            </div>

            {/* QR Code Scan Container */}
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border-2 border-dashed border-[#D49B42]/50 text-center max-w-sm mx-auto shadow-inner">
              <p className="text-xs font-extrabold text-[#17110C] mb-3 uppercase tracking-wider">
                Tunjukkan QR Code Ini Ke Kasir Outlet
              </p>

              {qrDataUrl && (
                <img
                  src={qrDataUrl}
                  alt="QR Code Tiket Takeaway"
                  className="w-52 h-52 object-contain"
                />
              )}

              <p className="text-[11px] font-mono font-bold text-gray-700 mt-3 bg-gray-100 px-3 py-1 rounded-lg">
                {ticketData.qrCodeToken}
              </p>
            </div>

            {/* Order Details & Pickup Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#17110C] p-6 rounded-2xl border border-[#3F2D23]">
              
              <div className="space-y-2 text-xs">
                <p className="font-bold text-[#D49B42] uppercase tracking-wider">Detail Pengambilan</p>
                <p className="text-[#F8F4EC] font-bold">{ticketData.customerName} ({ticketData.customerPhone})</p>
                <p className="text-[#C5B8A8] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D49B42]" /> Slot: {ticketData.pickupTimeSlot}
                </p>
                <p className="text-[#C5B8A8] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D49B42]" /> Outlet Celaket Malang
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-[#D49B42] uppercase tracking-wider">Rincian Item Jajanan</p>
                <ul className="space-y-1">
                  {ticketData.items.map((item: any, idx: number) => (
                    <li key={idx} className="flex justify-between text-[#C5B8A8]">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-bold text-[#F8F4EC]">
                        Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-[#3F2D23] flex justify-between text-sm font-extrabold text-[#F8F4EC]">
                  <span>Total Bayar:</span>
                  <span className="text-[#D49B42]">Rp {ticketData.totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Ticket Footer Actions */}
          <div className="p-4 bg-[#17110C] border-t border-[#3F2D23] flex justify-between items-center text-xs">
            <span className="text-[#C5B8A8] flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32]" /> Simpan tangkapan layar tiket ini.
            </span>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#241913] border border-[#3F2D23] text-[#F8F4EC] hover:border-[#D49B42] font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Tiket</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
