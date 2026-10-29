'use client';

import React from 'react';
import { AdminOrderModel, OrderStatus } from '@/types';
import { OrderFilterBar } from './OrderFilterBar';
import { OrderTable } from './OrderTable';

interface OrdersSectionProps {
  orders: AdminOrderModel[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  isLoading: boolean;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

// Section: filter status + tabel pesanan
export const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders,
  statusFilter,
  setStatusFilter,
  isLoading,
  onStatusChange,
}) => {
  return (
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
          orders={orders}
          statusFilter={statusFilter}
          onStatusChange={onStatusChange}
        />
      )}
    </div>
  );
};
