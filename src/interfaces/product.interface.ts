export interface Product {
  // TODO: id: string;
  title: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  type: ValidTypes;
  gender: 'men'|'women'|'kid'|'unisex';
  // TODO: createdAt: Date;
  // TODO: updatedAt: Date;
}

export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';