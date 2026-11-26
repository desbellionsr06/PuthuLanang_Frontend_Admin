'use client';

import React, { useState } from 'react';
import { AdminOrderModel, OrderStatus } from '@/types';
import { Clock, ChevronRight, ChevronLeft, ChevronUp, Check, X } from 'lucide-react';

interface OrderTableProps {
  orders: AdminOrderModel[];
  statusFilter: string;
  onStatusChange: (orderId: string, newStatus: OrderStatus, estimatedMinutes?: number) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  statusFilter,
  onStatusChange,
}) => {
  // State peringkasan tabel (Default: 5 pesanan terbaru)
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // State modal cepat estimasi waktu pengerjaan
  const [estimatingOrder, setEstimatingOrder] = useState<AdminOrderModel | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(15);
  const [customMinutesInput, setCustomMinutesInput] = useState<string>('15');

  const presetTimes = [10, 15, 20, 30];

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case 'Baru':
        return 'bg-[#D49B42]/20 border border-[#D49B42]/50 text-[#D49B42]';
      case 'Diproses':
        return 'bg-blue-900/30 border border-blue-700/50 text-blue-300';
      case 'Selesai':
        return 'bg-[#2E7D32]/20 border border-[#2E7D32]/50 text-[#2E7D32]';
      case 'Dibatalkan':
        return 'bg-red-900/30 border border-red-700/50 text-red-300';
      default:
        return 'bg-[#1E1510] border border-[#3E2C22] text-[#C5B8A8]';
    }
  };

  // Batasi tampilan: 5 pesanan terbaru jika belum expand, atau pagination jika expand
  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / pageSize) || 1;

  const displayedOrders = showAll
    ? orders.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : orders.slice(0, 5);

  const handleSelectChange = (order: AdminOrderModel, newStatus: OrderStatus) => {
    if (newStatus === 'Diproses') {
      // Buka dialog konfirmasi estimasi waktu
      const initialMinutes = order.estimated_minutes && order.estimated_minutes > 0 ? order.estimated_minutes : 15;
      setSelectedMinutes(initialMinutes);
      setCustomMinutesInput(String(initialMinutes));
      setEstimatingOrder(order);
    } else {
      onStatusChange(order.id, newStatus);
    }
  };

  const handleConfirmEstimatedTime = () => {
    if (!estimatingOrder) return;
    const finalMinutes = Number(customMinutesInput) > 0 ? Number(customMinutesInput) : selectedMinutes;
    onStatusChange(estimatingOrder.id, 'Diproses', finalMinutes);
    setEstimatingOrder(null);
  };

  const handleProcessWithoutEstimate = () => {
    if (!estimatingOrder) return;
    onStatusChange(estimatingOrder.id, 'Diproses');
    setEstimatingOrder(null);
  };

  return (
    <div className="space-y-4">
      {/* Header bar: Info jumlah pesanan & Tombol toggle Lihat Semua */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
        <div className="text-xs text-[#C5B8A8]">
          Menampilkan{' '}
          <span className="font-extrabold text-[#F8F4EC]">
            {orders.length === 0 ? 0 : displayedOrders.length}
          </span>{' '}
          dari{' '}
          <span className="font-extrabold text-[#D49B42]">{totalOrders}</span> pesanan
          {!showAll && totalOrders > 5 && (
            <span className="ml-1 text-[11px] text-[#C5B8A8]/70">(Diringkas 5 Teratas)</span>
          )}
        </div>

        {totalOrders > 5 && (
          <button
            type="button"
            onClick={() => {
              setShowAll(!showAll);
              setCurrentPage(1);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1E1510] hover:bg-[#2A1D16] border border-[#3E2C22] hover:border-[#D49B42]/60 text-[#D49B42] hover:text-[#F8F4EC] text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <span>{showAll ? 'Tampilkan Ringkas (5 Pesanan)' : 'Lihat Semua Pesanan'}</span>
            {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Tabel Data Pesanan */}
      <div className="overflow-x-auto rounded-2xl border border-[#3E2C22] shadow-inner max-w-full">
        <table className="w-full text-left text-xs min-w-[640px]">
          <thead className="bg-[#1E1510] text-[#C5B8A8] uppercase tracking-wider font-bold border-b border-[#3E2C22]">
            <tr>
              <th className="p-3.5 sm:p-4">ID Pesanan</th>
              <th className="p-3.5 sm:p-4">Nama Pelanggan</th>
              <th className="p-3.5 sm:p-4">Menu yang Dipesan</th>
              <th className="p-3.5 sm:p-4">Metode Ambil</th>
              <th className="p-3.5 sm:p-4">Total Bayar</th>
              <th className="p-3.5 sm:p-4">Status & Estimasi</th>
              <th className="p-3.5 sm:p-4 text-center">Aksi Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3E2C22] text-[#F8F4EC]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[#C5B8A8]">
                  Tidak ada data pesanan dengan status &quot;{statusFilter}&quot;.
                </td>
              </tr>
            ) : (
              displayedOrders.map((o, index) => {
                const uniqueKey = o.id ? `${o.id}-${index}` : `order-${index}`;
                return (
                  <tr key={uniqueKey} className="hover:bg-[#1E1510]/80 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-extrabold text-[#D49B42] whitespace-nowrap">
                      {o.id}
                    </td>
                    <td className="p-3.5 sm:p-4 font-bold">{o.customerName}</td>
                    <td className="p-3.5 sm:p-4 text-[#C5B8A8] max-w-xs truncate">{o.itemsSummary}</td>
                    <td className="p-3.5 sm:p-4">
                      <span className="font-semibold whitespace-nowrap">
                        {o.pickupMethod === 'SCHEDULED_PICKUP' ? 'Jadwal Jam' : 'Pickup Sekarang'}
                      </span>
                      <p className="text-[10px] text-[#D49B42]">{o.pickupTime}</p>
                    </td>
                    <td className="p-3.5 sm:p-4 font-extrabold whitespace-nowrap">
                      Rp {o.totalPrice.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3.5 sm:p-4 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 ${getStatusBadgeStyle(
                            o.status
                          )}`}
                        >
                          {o.status === 'Diproses' && <Clock className="w-3 h-3 text-blue-300 animate-spin" />}
                          {o.status === 'Diproses' && o.estimated_minutes
                            ? `Diproses • Est. ${o.estimated_minutes} mnt`
                            : o.status}
                        </span>
                        {o.status === 'Diproses' && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMinutes(o.estimated_minutes || 15);
                              setCustomMinutesInput(String(o.estimated_minutes || 15));
                              setEstimatingOrder(o);
                            }}
                            className="text-[10px] text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                          >
                            {o.estimated_minutes ? 'Ubah estimasi waktu' : '+ Set estimasi'}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 sm:p-4 text-center whitespace-nowrap">
                      <select
                        value={o.status}
                        onChange={(e) => handleSelectChange(o, e.target.value as OrderStatus)}
                        className="bg-[#1E1510] border border-[#3E2C22] text-xs font-bold text-[#F8F4EC] rounded-xl p-1.5 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] transition-all cursor-pointer"
                      >
                        <option value="Baru">Baru</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar (Saat Tampilan Di-expand / Lihat Semua) */}
      {showAll && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 px-2">
          <p className="text-xs text-[#C5B8A8]">
            Halaman <span className="font-bold text-[#F8F4EC]">{currentPage}</span> dari{' '}
            <span className="font-bold text-[#F8F4EC]">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 bg-[#1E1510] border border-[#3E2C22] disabled:opacity-40 text-xs font-bold text-[#C5B8A8] hover:text-[#F8F4EC] rounded-xl transition-all disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 bg-[#1E1510] border border-[#3E2C22] disabled:opacity-40 text-xs font-bold text-[#C5B8A8] hover:text-[#F8F4EC] rounded-xl transition-all disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal / Dialog Pemilihan Estimasi Waktu Proses (Requirement 4) */}
      {estimatingOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-start justify-between border-b border-[#3E2C22] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-900/30 border border-blue-700/50 flex items-center justify-center text-blue-300">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#F8F4EC]">Estimasi Waktu Proses</h3>
                  <p className="text-[10px] text-[#D49B42] font-mono">Pesanan #{estimatingOrder.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEstimatingOrder(null)}
                className="text-[#C5B8A8] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#C5B8A8] text-[11px] leading-relaxed">
                Pilih atau masukkan estimasi waktu kukus / penyiapan pesanan pelanggan:
              </p>

              {/* Pilihan Cepat / Preset Menit */}
              <div className="grid grid-cols-4 gap-2">
                {presetTimes.map((mins) => {
                  const isSelected = selectedMinutes === mins && customMinutesInput === String(mins);
                  return (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => {
                        setSelectedMinutes(mins);
                        setCustomMinutesInput(String(mins));
                      }}
                      className={`py-2 px-1 text-center font-bold rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md scale-105'
                          : 'bg-[#1E1510] text-[#C5B8A8] border-[#3E2C22] hover:border-[#D49B42]/50'
                      }`}
                    >
                      {mins} Mnt
                    </button>
                  );
                })}
              </div>

              {/* Input Custom Angka (Hanya Digit) */}
              <div className="space-y-1 pt-1">
                <label className="block text-[11px] font-semibold text-[#C5B8A8] uppercase tracking-wider">
                  Atau Input Manual (Menit)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={customMinutesInput}
                    onChange={(e) => {
                      const cleanDigits = e.target.value.replace(/\D/g, '');
                      setCustomMinutesInput(cleanDigits);
                      if (cleanDigits) setSelectedMinutes(Number(cleanDigits));
                    }}
                    placeholder="Contoh: 15"
                    className="w-full bg-[#1E1510] border border-[#3E2C22] rounded-xl py-2.5 px-3 text-[#F8F4EC] text-xs font-bold focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#C5B8A8]">Menit</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#3E2C22]">
              <button
                type="button"
                onClick={handleConfirmEstimatedTime}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Terapkan & Proses Pesanan</span>
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleProcessWithoutEstimate}
                  className="flex-1 py-2 bg-[#1E1510] border border-[#3E2C22] hover:border-[#C5B8A8] text-[#C5B8A8] hover:text-[#F8F4EC] text-[11px] font-bold rounded-xl transition-all cursor-pointer"
                >
                  Lewati Estimasi
                </button>
                <button
                  type="button"
                  onClick={() => setEstimatingOrder(null)}
                  className="px-4 py-2 bg-transparent hover:bg-red-900/20 text-red-400 text-[11px] font-bold rounded-xl transition-all cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
