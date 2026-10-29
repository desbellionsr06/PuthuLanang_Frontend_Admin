'use client';

import React from 'react';
import { ShoppingBag, Utensils, Clock, Users } from 'lucide-react';
import { AdminStats } from '@/lib/adminApi';
import { MetricCard, MetricItem } from './MetricCard';

interface MetricsSectionProps {
  stats: AdminStats | null;
  isLoading: boolean;
}

// Section: grid 4 kartu metrik
export const MetricsSection: React.FC<MetricsSectionProps> = ({ stats, isLoading }) => {
  const fallback = isLoading ? '...' : '0';

  const metrics: MetricItem[] = [
    {
      title: 'Total Pesanan',
      value: stats ? String(stats.total_orders) : fallback,
      desc: 'Semua pesanan masuk',
      icon: <ShoppingBag className="w-5 h-5 text-[#D49B42]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Total Menu',
      value: stats ? String(stats.total_menu) : fallback,
      desc: 'Item aktif di database',
      icon: <Utensils className="w-5 h-5 text-[#2E7D32]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Pesanan Baru',
      value: stats ? String(stats.new_orders) : fallback,
      desc: 'Perlu Diproses Dapur',
      icon: <Clock className="w-5 h-5 text-[#D49B42]" />,
      borderColor: 'border-[#3E2C22]'
    },
    {
      title: 'Total Pelanggan',
      value: stats ? String(stats.total_customers) : fallback,
      desc: 'Unik berdasarkan akun/HP',
      icon: <Users className="w-5 h-5 text-[#2E7D32]" />,
      borderColor: 'border-[#3E2C22]'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {metrics.map((m, idx) => (
        <MetricCard key={idx} metric={m} />
      ))}
    </div>
  );
};
