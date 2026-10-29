'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { X, ShoppingBag, Plus, Minus, Trash2, Clock, Calendar, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    selectedDate,
    selectedTimeSlot,
    setActiveView
  } = useStore();

  if (!isOpen) return null;

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-[#241913] border-l border-[#3F2D23] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#17110C] border-b border-[#3F2D23] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2E7D32]/20 border border-[#2E7D32]/40 flex items-center justify-center text-[#2E7D32]">
              <ShoppingBag className="w-5 h-5 text-[#D49B42]" />
            </div>
            <div>
              <h3 className="font-bold text-[#F8F4EC]">Keranjang Takeaway</h3>
              <p className="text-xs text-[#C5B8A8]">{totalItems} Item terpilih</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#C5B8A8] hover:text-[#F8F4EC] hover:bg-[#3F2D23]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pickup Info Banner */}
        <div className="p-4 bg-[#17110C]/80 border-b border-[#3F2D23] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#C5B8A8]">
            <Calendar className="w-4 h-4 text-[#D49B42]" />
            <span>{selectedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-[#D49B42] font-semibold">
            <Clock className="w-4 h-4 text-[#D49B42]" />
            <span>{selectedTimeSlot}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#C5B8A8]">
              <ShoppingBag className="w-16 h-16 text-[#3F2D23] mb-4 stroke-1" />
              <p className="text-base font-bold text-[#F8F4EC]">Keranjang Masih Kosong</p>
              <p className="text-xs mt-1 text-[#C5B8A8]">
                Pilih jajanan pusaka favorit Anda seperti Puthu Bambu, Klepon Lumer, Cenil, atau Lupis.
              </p>
            </div>
          ) : (
            cart.map((cartItem) => (
              <div
                key={cartItem.item.id}
                className="bg-[#17110C] p-4 rounded-2xl border border-[#3F2D23] flex gap-3 items-center shadow-md"
              >
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#3F2D23]"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#F8F4EC] truncate">
                    {cartItem.item.name}
                  </h4>
                  <p className="text-xs text-[#D49B42] font-semibold mt-0.5">
                    Rp {cartItem.item.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-[11px] text-[#C5B8A8] truncate mt-0.5">
                    {cartItem.item.portionDetails}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromCart(cartItem.item.id)}
                    className="text-[#C5B8A8] hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 bg-[#241913] border border-[#3F2D23] rounded-lg px-2 py-1">
                    <button
                      onClick={() => updateCartQty(cartItem.item.id, -1)}
                      className="text-[#C5B8A8] hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-[#F8F4EC] w-4 text-center">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQty(cartItem.item.id, 1)}
                      className="text-[#C5B8A8] hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#17110C] border-t border-[#3F2D23] space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#C5B8A8]">Total Pesanan ({totalItems} Item):</span>
              <span className="text-lg font-extrabold text-[#D49B42]">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                setActiveView('checkout');
              }}
              className="w-full py-4 bg-[#2E7D32] hover:bg-[#388E3C] text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Lanjut Ke Checkout & Slot Pickup</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
