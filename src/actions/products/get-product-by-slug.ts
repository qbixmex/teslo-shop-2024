"use server";

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";

const getProductBySlug = async ( slug: string ): Promise<Product | null> => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        ProductImage: {
          select: { url: true }
        }
      }
    });

    if (!product) return null;

    const { ProductImage, ...productRest } = product;

    return {
      ...productRest,
      images: product.ProductImage.map(image => image.url),
    };

  } catch (error) {
    console.log(error);
    throw new Error("Product cannot be fetched !");
  }
};

export default getProductBySlug;
