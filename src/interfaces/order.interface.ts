import { Size } from "./product.interface";

export interface OrderResponse {
  id: string,
  userId: string;
  itemsInOrder: number;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt: null | Date;
  createdAt: Date;
  updatedAt: Date;
  orderAddress: {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    postalCode: string;
    phone: string;
    city: string;
    country: string;
  },
  orderItem: {
    id: string;
    orderId: string;
    title: string;
    quantity: number;
    size: Size;
    price: number;
    slug: string;
    image: string;
  }[]
}
