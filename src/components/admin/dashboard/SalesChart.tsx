'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, BarChart2, RefreshCw, Calendar } from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';
const ADMIN_KEY = 'puthu-admin-2026';

// ─────────────────────────────────────────────
// Tipe data grafik dari backend
// ─────────────────────────────────────────────
interface ChartPoint {
  date: string;
  label: string;
  total_orders: number;
  total_revenue: number;
}

interface SalesChartData {
  days: number;
  data: ChartPoint[];
  labels: string[];
  orders: number[];
  revenue: number[];
}

// ─────────────────────────────────────────────
// Custom Tooltip untuk Recharts
// ─────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#241913] border border-[#3E2C22] rounded-xl p-3 shadow-2xl text-xs min-w-[160px]">
      <p className="text-[#D49B42] font-extrabold mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-1">
          <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="font-bold text-[#F8F4EC]">
            {entry.name === 'Pendapatan'
              ? `Rp ${entry.value.toLocaleString('id-ID')}`
              : `${entry.value} pesanan`}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// Komponen Utama SalesChart
// ─────────────────────────────────────────────
export const SalesChart: React.FC = () => {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<7 | 14 | 30>(7);
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  const fetchChart = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    setError(null);
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/admin/sales-chart?days=${days}&admin_key=${ADMIN_KEY}`,
        { headers: { 'X-Admin-Key': ADMIN_KEY }, cache: 'no-store' }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: SalesChartData = await res.json();
      setData(json.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gagal memuat grafik');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [days]);

  useEffect(() => {
    fetchChart();
  }, [fetchChart]);

  // Hitung summary
  const totalOrders = data.reduce((s, d) => s + d.total_orders, 0);
  const totalRevenue = data.reduce((s, d) => s + d.total_revenue, 0);
  const avgOrders = data.length ? (totalOrders / data.length).toFixed(1) : '0';

  return (
    <div className="bg-[#2A1D16] border border-[#3E2C22] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#F8F4EC] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#D49B42]" />
            Grafik Penjualan Real-time
          </h2>
          <p className="text-xs text-[#C5B8A8] mt-0.5">
            Data pesanan & pendapatan harian dari database
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle Tipe Grafik */}
          <div className="flex items-center bg-[#1E1510] border border-[#3E2C22] rounded-xl overflow-hidden">
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                chartType === 'area'
                  ? 'bg-[#D49B42] text-[#1E1510]'
                  : 'text-[#C5B8A8] hover:text-white'
              }`}
            >
              <TrendingUp className="w-3 h-3" /> Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                chartType === 'bar'
                  ? 'bg-[#D49B42] text-[#1E1510]'
                  : 'text-[#C5B8A8] hover:text-white'
              }`}
            >
              <BarChart2 className="w-3 h-3" /> Bar
            </button>
          </div>

          {/* Toggle Rentang Hari */}
          <div className="flex items-center bg-[#1E1510] border border-[#3E2C22] rounded-xl overflow-hidden">
            {([7, 14, 30] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 text-xs font-bold transition-all ${
                  days === d
                    ? 'bg-[#2E7D32] text-white'
                    : 'text-[#C5B8A8] hover:text-white'
                }`}
              >
                {d}H
              </button>
            ))}
          </div>

          {/* Tombol Refresh */}
          <button
            onClick={() => fetchChart(true)}
            disabled={isRefreshing}
            className="p-2 bg-[#1E1510] border border-[#3E2C22] hover:border-[#D49B42]/60 rounded-xl transition-all disabled:opacity-50 active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#C5B8A8] ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Pesanan', value: `${totalOrders}`, sub: `${days} hari terakhir` },
          { label: 'Total Pendapatan', value: `Rp ${(totalRevenue / 1000).toFixed(0)}k`, sub: `${days} hari terakhir` },
          { label: 'Rata-rata/Hari', value: `${avgOrders}`, sub: 'pesanan per hari' },
        ].map((c, i) => (
          <div key={i} className="bg-[#1E1510] border border-[#3E2C22] rounded-xl p-3">
            <p className="text-[10px] text-[#C5B8A8] uppercase tracking-wide">{c.label}</p>
            <p className="text-base sm:text-xl font-extrabold text-[#D49B42] mt-0.5">{c.value}</p>
            <p className="text-[10px] text-[#C5B8A8]">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Grafik Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-52 gap-3">
          <div className="w-8 h-8 border-4 border-[#D49B42]/30 border-t-[#D49B42] rounded-full animate-spin" />
          <p className="text-[#C5B8A8] text-xs">Memuat data grafik...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-52 gap-2">
          <Calendar className="w-8 h-8 text-[#C5B8A8]/40" />
          <p className="text-[#C5B8A8] text-xs text-center">
            Gagal memuat grafik: {error}
            <br />
            <span className="text-[#D49B42]">Pastikan backend berjalan di localhost:5000</span>
          </p>
        </div>
      ) : data.every(d => d.total_orders === 0) ? (
        <div className="flex flex-col items-center justify-center h-52 gap-2">
          <TrendingUp className="w-8 h-8 text-[#C5B8A8]/30" />
          <p className="text-[#C5B8A8] text-xs text-center">
            Belum ada data pesanan dalam {days} hari terakhir.
          </p>
        </div>
      ) : chartType === 'area' ? (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D49B42" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D49B42" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#3E2C22" />
            <XAxis
              dataKey="label"
              tick={{ fill: '#C5B8A8', fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: '#3E2C22' }}
            />
            <YAxis
              yAxisId="orders"
              tick={{ fill: '#C5B8A8', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <YAxis
              yAxisId="revenue"
              orientation="right"
              tick={{ fill: '#C5B8A8', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', color: '#C5B8A8', paddingTop: '8px' }}
            />
            <Area
              yAxisId="orders"
              type="monotone"
              dataKey="total_orders"
              name="Pesanan"
              stroke="#D49B42"
              strokeWidth={2}
              fill="url(#gradOrders)"
              dot={{ fill: '#D49B42', r: 3 }}
              activeDot={{ r: 5, fill: '#D49B42' }}
            />
            <Area
              yAxisId="revenue"
              type="monotone"
              dataKey="total_revenue"
              name="Pendapatan"
              stroke="#2E7D32"
              strokeWidth={2}
              fill="url(#gradRevenue)"
              dot={{ fill: '#2E7D32', r: 3 }}
              activeDot={{ r: 5, fill: '#2E7D32' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3E2C22" />
            <XAxis
              dataKey="label"
              tick={{ fill: '#C5B8A8', fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: '#3E2C22' }}
            />
            <YAxis
              tick={{ fill: '#C5B8A8', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', color: '#C5B8A8', paddingTop: '8px' }}
            />
            <Bar
              dataKey="total_orders"
              name="Pesanan"
              fill="#D49B42"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
