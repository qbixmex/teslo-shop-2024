
export type ProductResponse = {
  ok: boolean;
  message: string;
  product?: {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    categoryId: string;
    sizes: string[];
    tags: string[];
    gender: string;
    images: Image[];
  };
};

export type CloudinaryResponse = {
  publicId: string;
  secureUrl: string;
};