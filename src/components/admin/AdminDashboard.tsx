'use client';

import React, { useState } from 'react';
import { ShoppingBag, Utensils, Clock, Users, Filter, CheckCircle2, AlertCircle, Flame, Eye, Edit3 } from 'lucide-react';

export interface AdminOrder {
  id: string;
  customerName: string;
  itemsSummary: string;
  pickupMethod: 'TAKEAWAY_NOW' | 'SCHEDULED_PICKUP';
  pickupTime: string;
  totalPrice: number;
  status: 'Baru' | 'Diproses' | 'Selesai' | 'Dibatalkan';
  date: string;
}

const INITIAL_MOCK_ORDERS: AdminOrder[] = [
  {
    id: '#PL-001',
    customerName: 'Budi Santoso',
    itemsSummary: '2x Paket Campur, 1x Puthu',
    pickupMethod: 'SCHEDULED_PICKUP',
    pickupTime: '18:00 - 18:30 WIB',
    totalPrice: 58000,
    status: 'Baru',
    date: '30 Sep 2026'
  },
  {
    id: '#PL-002',
    customerName: 'Rina Wijaya',
    itemsSummary: '1x Paket Tampah Sultan Malang',
    pickupMethod: 'SCHEDULED_PICKUP',
    pickupTime: '16:00 - 17:00 WIB',
    totalPrice: 350000,
    status: 'Diproses',
    date: '30 Sep 2026'
  },
  {
    id: '#PL-003',
    customerName: 'Ahmad Dahlan',
    itemsSummary: '3x Klepon, 2x Cenil',
    pickupMethod: 'TAKEAWAY_NOW',
    pickupTime: 'Langsung Di Lokasi',
    totalPrice: 90000,
    status: 'Selesai',
    date: '30 Sep 2026'
  },
  {
    id: '#PL-004',
    customerName: 'Siti Aminah',
    itemsSummary: '2x Lupis Ketan',
    pickupMethod: 'TAKEAWAY_NOW',
    pickupTime: '17:30 WIB',
    totalPrice: 36000,
    status: 'Baru',
    date: '30 Sep 2026'
  },
  {
    id: '#PL-005',
    customerName: 'Hendra Gunawan',
    itemsSummary: '1x Box Besek Hampers',
    pickupMethod: 'SCHEDULED_PICKUP',
    pickupTime: '19:00 - 19:30 WIB',
    totalPrice: 45000,
    status: 'Diproses',
    date: '30 Sep 2026'
  },
  {
    id: '#PL-006',
    customerName: 'Dewi Lestari',
    itemsSummary: '1x Puthu, 1x Klepon',
    pickupMethod: 'TAKEAWAY_NOW',
    pickupTime: '17:45 WIB',
    totalPrice: 36000,
    status: 'Dibatalkan',
    date: '30 Sep 2026'
  }
];

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_MOCK_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('Semua');

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'Semua') return true;
    return o.status === statusFilter;
  });

  const handleStatusChange = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const metrics = [
    {
      title: 'Total Pesanan',
      value: '125',
      desc: '+12.5% dibanding kemarin',
      icon: <ShoppingBag className="w-5 h-5 text-[#D49B42]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Total Menu',
      value: '4 Varian Utama + 2 Paket',
      desc: 'Stok Aktif Dapur',
      icon: <Utensils className="w-5 h-5 text-[#2E7D32]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Pesanan Baru',
      value: '12',
      desc: 'Perlu Diproses Dapur',
      icon: <Clock className="w-5 h-5 text-[#D49B42]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Total Pelanggan',
      value: '85',
      desc: 'Terdaftar & Guest',
      icon: <Users className="w-5 h-5 text-[#2E7D32]" />,
      borderColor: 'border-[#3E2C22]'
    }
  ];

  const getStatusBadgeStyle = (status: AdminOrder['status']) => {
    switch (status) {
      case 'Baru':
        return 'bg-[#D49B42]/20 border border-[#D49B42]/50 text-[#D49B42]';
      case 'Diproses':
        return 'bg-blue-900/30 border border-blue-700/50 text-blue-300';
      case 'Selesai':
        return 'bg-[#2E7D32]/20 border border-[#2E7D32]/50 text-[#2E7D32]';
      case 'Dibatalkan':
        return 'bg-red-900/30 border border-red-700/50 text-red-300';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#2A1D16] border border-[#3E2C22] p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#F8F4EC]">
              Dashboard Admin - Puthu Lanang
            </h1>
            <span className="px-3 py-0.5 bg-[#2E7D32] text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider">
              ADMIN
            </span>
          </div>
          <p className="text-xs text-[#C5B8A8]">
            Ringkasan data transaksi real-time & manajemen antrean dapur Celaket Malang.
          </p>
        </div>

        <div className="text-right text-xs text-[#C5B8A8] bg-[#1E1510] px-4 py-2 rounded-xl border border-[#3E2C22]">
          Tanggal Hari Ini: <span className="text-[#D49B42] font-bold">Rabu, 30 September 2026</span>
        </div>
      </div>

      {/* Grid 4 Kartu Metrik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={`bg-[#2A1D16] border ${m.borderColor} p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-3 hover:border-[#D49B42] transition-all`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#C5B8A8]">{m.title}</span>
              <div className="w-9 h-9 rounded-xl bg-[#1E1510] border border-[#3E2C22] flex items-center justify-center">
                {m.icon}
              </div>
            </div>

            <div>
              <p className="text-2xl font-extrabold text-[#F8F4EC] tracking-tight">{m.value}</p>
              <p className="text-[11px] text-[#D49B42] font-semibold mt-0.5">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#F8F4EC] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D49B42]" /> Tabel Data Pesanan Masuk
            </h2>
            <p className="text-xs text-[#C5B8A8]">
              Kelola status pesanan dari konsumen dan atur prioritas pengukusan bambu.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#C5B8A8] flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter Status:
            </span>
            {['Semua', 'Baru', 'Diproses', 'Selesai', 'Dibatalkan'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  statusFilter === st
                    ? 'bg-[#2E7D32] border-[#2E7D32] text-white shadow-md'
                    : 'bg-[#1E1510] border-[#3E2C22] text-[#C5B8A8] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#3E2C22]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1E1510] text-[#C5B8A8] uppercase tracking-wider font-bold border-b border-[#3E2C22]">
              <tr>
                <th className="p-4">ID Pesanan</th>
                <th className="p-4">Nama Pelanggan</th>
                <th className="p-4">Menu yang Dipesan</th>
                <th className="p-4">Metode Ambil</th>
                <th className="p-4">Total Bayar</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3E2C22] text-[#F8F4EC]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#C5B8A8]">
                    Tidak ada data pesanan dengan status "{statusFilter}".
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#1E1510]/60 transition-colors">
                    <td className="p-4 font-mono font-extrabold text-[#D49B42]">{o.id}</td>
                    <td className="p-4 font-bold">{o.customerName}</td>
                    <td className="p-4 text-[#C5B8A8] max-w-xs truncate">{o.itemsSummary}</td>
                    <td className="p-4">
                      <span className="font-semibold">{o.pickupMethod === 'SCHEDULED_PICKUP' ? 'Jadwal Jam' : 'Pickup Sekarang'}</span>
                      <p className="text-[10px] text-[#D49B42]">{o.pickupTime}</p>
                    </td>
                    <td className="p-4 font-extrabold">Rp {o.totalPrice.toLocaleString('id-ID')}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${getStatusBadgeStyle(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as AdminOrder['status'])}
                        className="bg-[#1E1510] border border-[#3E2C22] text-xs font-bold text-[#F8F4EC] rounded-xl p-1.5 focus:outline-none focus:border-[#D49B42]"
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

      </div>
    </div>
  );
};
