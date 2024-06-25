"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

type PaginationOptions = {
  page?: number;
  limit?: number;
  gender?: Gender;
};

export const getPaginatedProductsWithImages = async ({
  page = 1,
  limit = 12,
  gender,
}: PaginationOptions = {}) => {

  // In case for example: page=abc or similar, it will be converted to 1
  if (isNaN(Number(page)) || page < 1) page = 1;

  try {

    const products = await prisma.product.findMany({
      take: limit,
      // Skip the first n items
      // For example if (page === 3): 3 - 1 = 2 * 12 = 24
      skip: (page - 1) * limit,
      include: {
        ProductImage: {
          take: 2,
          select: { url: true },
        }
      },
      where: { gender },
    });

    const totalProductsCount = await prisma.product.count({
      where: { gender }
    });

    const totalPages = Math.ceil(totalProductsCount / limit);

    return {
      currentPage: page,
      totalPages,
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
      throw new Error("Products cannot loaded !");
    }
    console.log(error);
    throw 'Unknown error occurred. Check logs !';
  }
};
