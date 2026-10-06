import { create } from 'zustand';
import { MenuItem } from '@/lib/db';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface UserState {
  id: string;
  name: string;
  phone: string;
}

export type ViewTab = 'home' | 'menu' | 'heritage' | 'location' | 'custom' | 'checkout' | 'ticket';

interface AppStore {
  // Navigation & View
  activeView: ViewTab;
  setActiveView: (view: ViewTab) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, qty?: number, notes?: string) => void;
  updateCartQty: (menuId: string, delta: number) => void;
  removeFromCart: (menuId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;

  // Auth
  user: UserState | null;
  token: string | null;
  setUser: (user: UserState | null, token: string | null) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  setAuthModal: (open: boolean, tab?: 'login' | 'register') => void;

  // Pickup Options
  selectedDate: string;
  selectedTimeSlot: string;
  setPickupSlot: (date: string, timeSlot: string) => void;

  // Active Ticket
  activeTicketId: string | null;
  setActiveTicketId: (ticketId: string | null) => void;

  // Filter & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  // Navigation
  activeView: 'home',
  setActiveView: (view) => set({ activeView: view }),

  // Cart
  cart: [],
  addToCart: (item, qty = 1, notes = '') => {
    set((state) => {
      const existingIndex = state.cart.findIndex((c) => c.item.id === item.id);
      if (existingIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += qty;
        if (notes) updatedCart[existingIndex].notes = notes;
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, { item, quantity: qty, notes }] };
      }
    });
    get().addToast(`"${item.name}" berhasil ditambahkan ke keranjang!`, 'success');
  },
  updateCartQty: (menuId, delta) => {
    set((state) => {
      const updatedCart = state.cart
        .map((c) => {
          if (c.item.id === menuId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
      return { cart: updatedCart };
    });
  },
  removeFromCart: (menuId) => {
    set((state) => ({
      cart: state.cart.filter((c) => c.item.id !== menuId)
    }));
    get().addToast('Item dihapus dari keranjang', 'info');
  },
  clearCart: () => set({ cart: [] }),
  getTotalItems: () => get().cart.reduce((acc, c) => acc + c.quantity, 0),
  getTotalPrice: () => get().cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0),

  // Auth
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  logout: () => {
    set({ user: null, token: null });
    get().addToast('Anda telah keluar akun', 'info');
  },
  isAuthModalOpen: false,
  authModalTab: 'login',
  setAuthModal: (open, tab = 'login') => set({ isAuthModalOpen: open, authModalTab: tab }),

  // Pickup
  selectedDate: new Date().toISOString().split('T')[0],
  selectedTimeSlot: '17:30 - 18:00 WIB',
  setPickupSlot: (date, timeSlot) => set({ selectedDate: date, selectedTimeSlot: timeSlot }),

  // Ticket
  activeTicketId: 'ORD-93501',
  setActiveTicketId: (ticketId) => set({ activeTicketId: ticketId }),

  // Filter & Search
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  selectedCategory: 'semua',
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

  // Toasts
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3500);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
}));
