import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Worksheet } from '@/shared/types/worksheet';

interface CartState {
  cart: Worksheet[];
  isOpen: boolean;
  addToCart: (item: Worksheet) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,
      addToCart: (item) => {
        const exists = get().cart.some((cartItem) => cartItem.id === item.id);
        if (!exists) {
          set((state) => ({ cart: [...state.cart, item], isOpen: true }));
        }
      },
      removeFromCart: (id) => {
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
      },
      clearCart: () => set({ cart: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen) => set({ isOpen }),
      getTotal: () => get().cart.reduce((total, item) => total + item.price, 0),
    }),
    {
      name: 'worksheet-cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
