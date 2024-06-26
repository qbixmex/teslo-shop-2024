import type { CartProduct, OrderSummary } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  cart: CartProduct[];
  addProduct: (product: CartProduct) => void,
  getSummaryInformation: (tax_rate?: number) => OrderSummary,
  getTotalItems: () => number,
  updateProductQuantity: (product: CartProduct, quantity: number) => void,
  removeProduct: (orderId: string) => void,
};

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods

      addProduct: (product) => {
        const { cart } = get();

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

      getSummaryInformation: (tax_rate = 15) => {
        const { cart } = get();

        const itemsInCart = cart.reduce((totalQuantity, product) => {
          return totalQuantity + product.quantity;
        }, 0);

        const subTotal = cart.reduce((subTotal, product) => {
          return (product.price * product.quantity) + subTotal;
        }, 0);

        const tax = (subTotal * tax_rate) / 100;
        const total = subTotal + tax;

        return {
          itemsInCart,
          subTotal,
          tax,
          total,
        };
      },

      getTotalItems: () => {
        const { cart } = get();

        const cartTotalQuantity = cart.reduce((totalQuantity, product) => {
          return totalQuantity + product.quantity;
        }, 0);

        return cartTotalQuantity;
      },

      updateProductQuantity: (product, quantity) => {
        const { cart } = get();
        
        const updatedCartProducts = cart.map((item) => {
          if ((item.id === product.id) && (item.size === product.size)) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct: (orderId) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter((item) => item.orderId !== orderId);
        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);