"use server";

import prisma from "@/lib/prisma";

export const getProductsBySlug = async ( slug: string ) => {
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