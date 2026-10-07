'use client';

import { useCartStore } from '@/store/useCartStore';
import CheckoutButton from '@/features/checkout/components/CheckoutButton';

export default function CartDrawer() {
  const { cart, isOpen, toggleCart, removeFromCart, getTotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40" onClick={toggleCart} />
      <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col z-10 p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-bold">Your Shopping Cart</h2>
          <button onClick={toggleCart} className="text-slate-500 hover:text-slate-800">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-4 flex flex-col gap-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <CheckoutButton />
          </div>
        )}
      </div>
    </div>
  );
}
