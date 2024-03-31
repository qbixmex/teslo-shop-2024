"use server";

import prisma from "@/lib/prisma";

export const getPaginatedProductsWithImages = async () => {
  try {

    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: { url: true }
        }
      }
    });

    return products;

  } catch (error) {
    if (error instanceof Error) {
      throw `Error: ${ error.message }`;
    }
    console.log(error);
    throw 'Unknown error occurred. Check logs !';
  }
};
