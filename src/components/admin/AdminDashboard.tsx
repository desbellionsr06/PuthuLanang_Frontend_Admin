'use client';

import React, { useState } from 'react';
import { ShoppingBag, Utensils, Clock, Users } from 'lucide-react';
import { AdminOrderModel, OrderStatus } from '@/types';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { MetricCard, MetricItem } from './dashboard/MetricCard';
import { OrderFilterBar } from './dashboard/OrderFilterBar';
import { OrderTable } from './dashboard/OrderTable';

export type { AdminOrderModel as AdminOrder };

const INITIAL_MOCK_ORDERS: AdminOrderModel[] = [
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
  const [orders, setOrders] = useState<AdminOrderModel[]>(INITIAL_MOCK_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('Semua');

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'Semua') return true;
    return o.status === statusFilter;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const metrics: MetricItem[] = [
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

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <DashboardHeader />

      {/* Grid 4 Kartu Metrik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {metrics.map((m, idx) => (
          <MetricCard key={idx} metric={m} />
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
        <OrderFilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <OrderTable
          orders={filteredOrders}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};
