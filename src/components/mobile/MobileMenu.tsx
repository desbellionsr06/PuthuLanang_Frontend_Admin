'use client';

import React from 'react';
import { MENU_ITEMS, MenuItem } from '@/lib/db';
import { useStore } from '@/store/useStore';
import { Plus, Minus, ShoppingBag, ArrowRight, Star } from 'lucide-react';

interface MobileMenuProps {
  onProceedToTakeaway: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onProceedToTakeaway }) => {
  const { cart, addToCart, removeFromCart, getTotalItems, getTotalPrice } = useStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const getItemQuantity = (id: string) => {
    const found = cart.find((c) => c.item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="p-4 space-y-4 animate-fadeIn pb-28">
      {/* Title */}
      <div>
        <h2 className="text-lg font-extrabold text-[#F8F4EC]">Menu Jajanan Traditional</h2>
        <p className="text-xs text-[#C5B8A8]">Resep asli 1935, dikukus dadakan dengan kelapa parut guris</p>
      </div>

      {/* Menu List */}
      <div className="space-y-3">
        {MENU_ITEMS.map((item: MenuItem) => {
          const qty = getItemQuantity(item.id);
          return (
            <div
              key={item.id}
              className="bg-[#241913] border border-[#3F2D23] rounded-2xl p-3 flex gap-3 shadow-md relative overflow-hidden"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#17110C] shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#17110C]/90 text-[#D49B42] text-[9px] font-extrabold rounded flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-[#D49B42]" /> {item.rating}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#F8F4EC]">{item.name}</h3>
                  <p className="text-[11px] text-[#C5B8A8] line-clamp-2 mt-0.5">{item.description}</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-extrabold text-[#D49B42]">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item, 1)}
                      className="px-3 py-1.5 bg-[#2E7D32] hover:bg-[#388E3C] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-[#17110C] border border-[#3F2D23] rounded-lg p-1">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 rounded bg-[#241913] text-[#F8F4EC] flex items-center justify-center hover:bg-[#3F2D23]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#D49B42] min-w-[16px] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="w-6 h-6 rounded bg-[#2E7D32] text-white flex items-center justify-center hover:bg-[#388E3C]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Checkout Button Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-30 px-4 max-w-md mx-auto">
          <div className="bg-[#2E7D32] text-white p-3 rounded-2xl shadow-2xl border border-[#388E3C] flex items-center justify-between animate-bounce-short">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#17110C]/30 flex items-center justify-center relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D49B42] text-[#17110C] font-extrabold text-[9px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-white/80">Total Pesanan</p>
                <p className="text-xs font-extrabold">Rp {totalPrice.toLocaleString('id-ID')}</p>
              </div>
            </div>

            <button
              onClick={onProceedToTakeaway}
              className="px-4 py-2 bg-[#D49B42] hover:bg-[#E5AA4E] text-[#17110C] text-xs font-extrabold rounded-xl flex items-center gap-1.5 shadow"
            >
              <span>Lanjut Ambil</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
