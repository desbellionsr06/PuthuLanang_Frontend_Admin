'use client';

// Halaman Dashboard Admin — Route: /admin/dashboard
// ─────────────────────────────────────────────────────────────────────
// page.tsx hanya merakit section. Seluruh section ada di ./components,
// dan logika data (fetch, polling, filter) ada di ./useDashboardData.
// Proteksi login ditangani oleh src/proxy.ts + app/admin/layout.tsx.
// ─────────────────────────────────────────────────────────────────────

import React from 'react';
import { useDashboardData } from './useDashboardData';
import { DashboardHeader } from './components/DashboardHeader';
import { ConnectionStatusSection } from './components/ConnectionStatusSection';
import { MetricsSection } from './components/MetricsSection';
import { SalesChart } from './components/SalesChart';
import { OrdersSection } from './components/OrdersSection';

export default function DashboardPage() {
  const {
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
  } = useDashboardData();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <DashboardHeader />

      {/* Status Bar Koneksi + Refresh */}
      <ConnectionStatusSection
        error={error}
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
        onRefresh={() => loadData(true)}
      />

      {/* Grid 4 Kartu Metrik */}
      <MetricsSection stats={stats} isLoading={isLoading} />

      {/* Grafik Penjualan Real-time */}
      <SalesChart />

      {/* Tabel Pesanan */}
      <OrdersSection
        orders={filteredOrders}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
