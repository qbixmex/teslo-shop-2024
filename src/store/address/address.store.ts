import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    phone: string;
    city: string;
    country: string;
    remember?: boolean;
  },
  setAddress: (address: State['address']) => void;
};

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: undefined,
        postalCode: '',
        phone: '',
        city: '',
        country: '',
        remember: false,
      },
      setAddress: (address) => set({ address }),
    }),
    { name: 'address-storage' }
  )
);
