import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';

type State = {
  cart: CartProduct[];
  // addProduct
  // updateProductQuantity
  // removeProduct
};

export const useCartStore = create<State>()(
  (set) => ({
    cart: [],
  })
);