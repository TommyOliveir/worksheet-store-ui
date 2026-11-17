import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Worksheet } from "@/shared/types/worksheet";

interface CartState {
  cart: Worksheet[];
  isOpen: boolean;
  // Set when removeOwnedItems took something out, so the cart can say why.
  removedOwned: boolean;
  addToCart: (item: Worksheet) => void;
  removeFromCart: (id: string) => void;
  removeOwnedItems: (ownedIds: ReadonlySet<string>) => void;
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
      removedOwned: false,
      addToCart: (item) => {
        const exists = get().cart.some((cartItem) => cartItem.id === item.id);
        if (!exists) {
          set((state) => ({
            cart: [...state.cart, item],
            isOpen: true,
            removedOwned: false,
          }));
        }
      },
      removeFromCart: (id) => {
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
      },
      // No-op unless something is actually owned, so calling it on every
      // cart or purchases change can't loop.
      removeOwnedItems: (ownedIds) => {
        const { cart } = get();
        const kept = cart.filter((item) => !ownedIds.has(item.id));
        if (kept.length !== cart.length) {
          set({ cart: kept, removedOwned: true });
        }
      },
      clearCart: () => set({ cart: [], removedOwned: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen) => set({ isOpen }),
      getTotal: () => get().cart.reduce((total, item) => total + item.price, 0),
    }),
    {
      name: "worksheet-cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
