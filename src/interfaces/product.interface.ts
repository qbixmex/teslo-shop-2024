export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  type?: Type;
  gender: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductLight {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: string[];
}

export type Category = 'men'|'women'|'kid'|'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';