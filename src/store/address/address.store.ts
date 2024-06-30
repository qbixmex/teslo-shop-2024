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
    rememberAddress?: boolean;
  },
  setAddress: (address: State['address']) => void;
  clearAddress: () => void;
};

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  address: '',
  address2: undefined,
  postalCode: '',
  phone: '',
  city: '',
  country: '',
  rememberAddress: false,
};

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: INITIAL_STATE,
      setAddress: (address) => set({ address }),
      clearAddress: () => set({ address: INITIAL_STATE }),
    }),
    { name: 'address-storage' },
  )
);
