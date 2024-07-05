"use server";

import { Product, ProductImage } from "@/interfaces";
import prisma from "@/lib/prisma";

const getProductBySlug = async ( slug: string ): Promise<Product | null> => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        ProductImage: {
          select: {
            id: true,
            url: true,
            publicId: true,
            productId: true,
          }
        }
      }
    });

    if (!product) return null;

    const { ProductImage, ...productRest } = product;

    return {
      ...productRest,
      images: product.ProductImage as ProductImage[],
    };

  } catch (error) {
    console.log(error);
    throw new Error("Product cannot be fetched !");
  }
};

export default getProductBySlug;
