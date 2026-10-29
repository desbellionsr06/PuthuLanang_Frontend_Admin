'use client';

// Hook data halaman dashboard: fetch orders + stats (polling), filter, ubah status.
// Dipisah dari page.tsx agar page hanya merakit section.

import { useState, useEffect, useCallback, useMemo } from 'react';
import { AdminOrderModel, OrderStatus } from '@/types';
import {
  fetchAdminOrders,
  updateOrderStatus,
  fetchAdminStats,
  BackendOrder,
  AdminStats,
} from '@/lib/adminApi';

// Interval polling (dalam milidetik) — setiap 8 detik
export const POLL_INTERVAL_MS = 8000;

// Konversi format BackendOrder → AdminOrderModel (untuk tabel)
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

export function useDashboardData() {
  const [orders, setOrders] = useState<AdminOrderModel[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [stats, setStats] = useState<AdminStats | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Ambil orders + stats dari backend
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

  // Load awal + polling otomatis
  useEffect(() => {
    loadData();
    const interval = setInterval(() => loadData(), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadData]);

  // Filter pesanan berdasarkan status
  const filteredOrders = useMemo(
    () => orders.filter((o) => statusFilter === 'Semua' || o.status === statusFilter),
    [orders, statusFilter]
  );

  // Ubah status pesanan → kirim PATCH ke backend (optimistic update)
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err: unknown) {
      // Rollback jika gagal: re-fetch untuk sinkronisasi
      console.error('Gagal update status:', err);
      loadData();
    }
  };

  return {
    stats,
    filteredOrders,
    statusFilter,
    setStatusFilter,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    loadData,
    handleStatusChange,
  };
}
