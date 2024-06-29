import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  address: {
    firstName: string;
    lastName: string;
    deliveryAddress: string;
    deliveryAddress2?: string;
    postalCode: string;
    phone: string;
    city: string;
    country: string;
    rememberAddress?: boolean;
  },
  setAddress: (address: State['address']) => void;
};

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: '',
        lastName: '',
        deliveryAddress: '',
        deliveryAddress2: undefined,
        postalCode: '',
        phone: '',
        city: '',
        country: '',
        rememberAddress: false,
      },
      setAddress: (address) => set({ address }),
    }),
    { name: 'address-storage' }
  )
);
