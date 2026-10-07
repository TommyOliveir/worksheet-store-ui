'use client';

import { useCartStore } from '@/store/useCartStore';
import { Worksheet } from '@/shared/types/worksheet';

export default function AddToCartButton({ worksheet }: { worksheet: Worksheet }) {
  const { addToCart, cart } = useCartStore();
  const inCart = cart.some((item) => item.id === worksheet.id);

  return (
    <button
      onClick={() => addToCart(worksheet)}
      disabled={inCart}
      className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
    >
      {inCart ? 'In Your Cart' : 'Add to Cart'}
    </button>
  );
}
