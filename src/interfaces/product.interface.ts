export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
  productId: string | null;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  images: ProductImage[];
  inStock: number | null;
  price: number | null;
  sizes: Size[];
  slug: string;
  tags: string[];
  type?: Type;
  categoryId: string;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductSeed = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

export interface ProductLight {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: ProductImage[];
}

export interface CartProduct {
  id: string;
  orderId: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}

export interface OrderSummary {
  itemsInCart: number;
  subTotal: number;
  tax: number;
  total: number;
}

export type Role = 'admin' | 'user';

export type Gender = 'men'|'women'|'kid'|'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';