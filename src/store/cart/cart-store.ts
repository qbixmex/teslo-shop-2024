import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  cart: CartProduct[];
  addProduct: (product: CartProduct) => void,
  getTotalItems: () => number,
  getTotalPrice: () => number,
  // updateProductQuantity
  // removeProduct
};

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods

      addProduct: (product) => {
        const { cart } = get();

        console.log("================== CART ==================");
        console.log(cart);
        console.log("==========================================");

        // 1. Check if product is already in cart with selected size.
        const productInCart = cart.some(
          (item) => ((item.id === product.id) && (item.size === product.size))
        );

        if (!productInCart) {
          set({ cart: [ ...cart, product ]});
          return;
        }

        // 2. If product is already in cart, update the quantity.
        const updatedCartProducts = cart.map((item) => {
          if ((item.id === product.id) && (item.size === product.size)) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      getTotalItems: () => {
        const { cart } = get();

        const cartTotalQuantity = cart.reduce((totalQuantity, product) => {
          return totalQuantity + product.quantity;
        }, 0);

        return cartTotalQuantity;
      },
      getTotalPrice: () => {
        return 0.0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);