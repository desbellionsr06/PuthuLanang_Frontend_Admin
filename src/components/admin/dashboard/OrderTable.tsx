'use client';

import React from 'react';
import { AdminOrderModel, OrderStatus } from '@/types';

interface OrderTableProps {
  orders: AdminOrderModel[];
  statusFilter: string;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  statusFilter,
  onStatusChange,
}) => {
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

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#3E2C22] shadow-inner max-w-full">
      <table className="w-full text-left text-xs min-w-[640px]">
        <thead className="bg-[#1E1510] text-[#C5B8A8] uppercase tracking-wider font-bold border-b border-[#3E2C22]">
          <tr>
            <th className="p-3.5 sm:p-4">ID Pesanan</th>
            <th className="p-3.5 sm:p-4">Nama Pelanggan</th>
            <th className="p-3.5 sm:p-4">Menu yang Dipesan</th>
            <th className="p-3.5 sm:p-4">Metode Ambil</th>
            <th className="p-3.5 sm:p-4">Total Bayar</th>
            <th className="p-3.5 sm:p-4">Status</th>
            <th className="p-3.5 sm:p-4 text-center">Aksi Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3E2C22] text-[#F8F4EC]">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-8 text-center text-[#C5B8A8]">
                Tidak ada data pesanan dengan status "{statusFilter}".
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id} className="hover:bg-[#1E1510]/80 transition-colors">
                <td className="p-3.5 sm:p-4 font-mono font-extrabold text-[#D49B42] whitespace-nowrap">{o.id}</td>
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
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${getStatusBadgeStyle(o.status)}`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-3.5 sm:p-4 text-center whitespace-nowrap">
                  <select
                    value={o.status}
                    onChange={(e) => onStatusChange(o.id, e.target.value as OrderStatus)}
                    className="bg-[#1E1510] border border-[#3E2C22] text-xs font-bold text-[#F8F4EC] rounded-xl p-1.5 focus:outline-none focus:border-[#D49B42] focus:ring-1 focus:ring-[#D49B42] transition-all cursor-pointer"
                  >
                    <option value="Baru">Baru</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
