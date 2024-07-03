import { Product } from "./product.interface";

export interface Category {
  id: string;
  name: string;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
}