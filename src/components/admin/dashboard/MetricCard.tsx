'use client';

import React from 'react';

export interface MetricItem {
  title: string;
  value: string;
  desc: string;
  icon: React.ReactNode;
  borderColor?: string;
}

interface MetricCardProps {
  metric: MetricItem;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <div
      className="bg-[#2A1D16] border border-[#3E2C22] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-3 hover:border-[#D49B42] transition-all duration-300 group"
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-[#C5B8A8] group-hover:text-[#F8F4EC] transition-colors">
          {metric.title}
        </span>
        <div className="w-9 h-9 rounded-xl bg-[#1E1510] border border-[#3E2C22] flex items-center justify-center group-hover:scale-105 transition-transform">
          {metric.icon}
        </div>
      </div>

      <div>
        <p className="text-xl sm:text-2xl font-extrabold text-[#F8F4EC] tracking-tight">
          {metric.value}
        </p>
        <p className="text-[11px] text-[#D49B42] font-semibold mt-0.5">
          {metric.desc}
        </p>
      </div>
    </div>
  );
};
