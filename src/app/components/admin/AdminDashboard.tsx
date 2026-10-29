'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Utensils, Clock, Users, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { AdminOrderModel, OrderStatus } from '@/types';
import { fetchAdminOrders, updateOrderStatus, fetchAdminStats, BackendOrder, AdminStats } from '@/lib/adminApi';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { MetricCard, MetricItem } from './dashboard/MetricCard';
import { OrderFilterBar } from './dashboard/OrderFilterBar';
import { OrderTable } from './dashboard/OrderTable';
import { SalesChart } from './dashboard/SalesChart';

export type { AdminOrderModel as AdminOrder };

// ==================================================================
// Helper: Konversi format BackendOrder → AdminOrderModel (untuk tabel)
// ==================================================================
function mapBackendToAdminOrder(o: BackendOrder): AdminOrderModel {
  return {
    id: o.order_id,
    customerName: o.customer_name || 'Pelanggan',
    itemsSummary: o.summary_items || '-',
    pickupMethod: (o.pickup_time && o.pickup_time !== '-') ? 'SCHEDULED_PICKUP' : 'TAKEAWAY_NOW',
    pickupTime: o.pickup_time || '-',
    totalPrice: Number(o.total) || 0,
    status: (o.status as OrderStatus) || 'Baru',
    date: o.pickup_date || new Date(o.created_at).toLocaleDateString('id-ID'),
  };
}

// ==================================================================
// Interval polling (dalam milidetik) — setiap 8 detik
// ==================================================================
const POLL_INTERVAL_MS = 8000;

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrderModel[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [stats, setStats] = useState<AdminStats | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // ----------------------------------------------------------------
  // Fungsi utama: ambil orders + stats dari backend
  // ----------------------------------------------------------------
  const loadData = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    setError(null);
    try {
      const [ordersData, statsData] = await Promise.all([
        fetchAdminOrders(),
        fetchAdminStats(),
      ]);
      setOrders(ordersData.map(mapBackendToAdminOrder));
      setStats(statsData);
      setLastUpdated(new Date());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal terhubung ke backend.';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // ----------------------------------------------------------------
  // Load awal + polling otomatis setiap POLL_INTERVAL_MS
  // ----------------------------------------------------------------
  useEffect(() => {
    loadData();
    const interval = setInterval(() => loadData(), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadData]);

  // ----------------------------------------------------------------
  // Filter pesanan berdasarkan status
  // ----------------------------------------------------------------
  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'Semua') return true;
    return o.status === statusFilter;
  });

  // ----------------------------------------------------------------
  // Aksi: Ubah status pesanan → kirim PATCH ke backend
  // ----------------------------------------------------------------
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    // Optimistic update UI terlebih dahulu
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err: unknown) {
      // Rollback jika gagal
      console.error('Gagal update status:', err);
      loadData(); // re-fetch untuk sinkronisasi
    }
  };

  // ----------------------------------------------------------------
  // Metrik Dashboard
  // ----------------------------------------------------------------
  const metrics: MetricItem[] = [
    {
      title: 'Total Pesanan',
      value: stats ? String(stats.total_orders) : (isLoading ? '...' : '0'),
      desc: 'Semua pesanan masuk',
      icon: <ShoppingBag className="w-5 h-5 text-[#D49B42]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Total Menu',
      value: stats ? String(stats.total_menu) : (isLoading ? '...' : '0'),
      desc: 'Item aktif di database',
      icon: <Utensils className="w-5 h-5 text-[#2E7D32]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Pesanan Baru',
      value: stats ? String(stats.new_orders) : (isLoading ? '...' : '0'),
      desc: 'Perlu Diproses Dapur',
      icon: <Clock className="w-5 h-5 text-[#D49B42]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Total Pelanggan',
      value: stats ? String(stats.total_customers) : (isLoading ? '...' : '0'),
      desc: 'Unik berdasarkan akun/HP',
      icon: <Users className="w-5 h-5 text-[#2E7D32]" />,
      borderColor: 'border-[#3E2C22]'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <DashboardHeader />

      {/* Status Bar Koneksi + Refresh */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#2A1D16] border border-[#3E2C22] rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2 text-xs">
          {error ? (
            <>
              <WifiOff className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-red-400 font-semibold">Tidak dapat terhubung ke backend:</span>
              <span className="text-red-300">{error}</span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 text-[#2E7D32] shrink-0" />
              <span className="text-[#2E7D32] font-semibold">Terhubung ke Backend</span>
              {lastUpdated && (
                <span className="text-[#C5B8A8]">
                  — Terakhir diperbarui: {lastUpdated.toLocaleTimeString('id-ID')}
                </span>
              )}
              <span className="text-[#C5B8A8] hidden sm:inline">
                (Auto-refresh setiap {POLL_INTERVAL_MS / 1000} detik)
              </span>
            </>
          )}
        </div>
        <button
          onClick={() => loadData(true)}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42]/60 text-[#C5B8A8] hover:text-[#F8F4EC] text-xs font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Memperbarui...' : 'Perbarui Sekarang'}
        </button>
      </div>

      {/* Grid 4 Kartu Metrik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {metrics.map((m, idx) => (
          <MetricCard key={idx} metric={m} />
        ))}
      </div>

      {/* Grafik Penjualan Real-time */}
      <SalesChart />

      {/* Table Section */}
      <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
        <OrderFilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-[#D49B42]/30 border-t-[#D49B42] rounded-full animate-spin" />
            <p className="text-[#C5B8A8] text-sm">Mengambil data pesanan dari database...</p>
          </div>
        ) : (
          <OrderTable
            orders={filteredOrders}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
};
