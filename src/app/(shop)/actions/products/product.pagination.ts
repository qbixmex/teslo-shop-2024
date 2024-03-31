"use server";

import prisma from "@/lib/prisma";

export const getPaginatedProductsWithImages = async () => {
  try {

    const products = await prisma.product.findMany({
      take: 2,
      include: {
        ProductImage: {
          take: 2,
          select: { url: true }
        }
      }
    });

    return {
      currentPage: 1,
      totalPages: 10,
      products: products.map(product => ({
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price ?? 0,
        images: product.ProductImage.map(image => image.url),
      })),
    };

  } catch (error) {
    if (error instanceof Error) {
      throw `Error: ${ error.message }`;
    }
    console.log(error);
    throw 'Unknown error occurred. Check logs !';
  }
};
