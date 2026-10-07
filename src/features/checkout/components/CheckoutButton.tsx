'use client';

import { useCartStore } from '@/store/useCartStore';
import { apiClient } from '@/shared/lib/api-client';
import { useState } from 'react';

export default function CheckoutButton() {
  const { cart, getTotal } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const items = cart.map((item) => item.id);
      
      const response = await apiClient.post('/checkout/create-session', { items });
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={cart.length === 0 || loading}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 transition"
    >
      {loading ? 'Processing...' : `Pay $${getTotal().toFixed(2)}`}
    </button>
  );
}
