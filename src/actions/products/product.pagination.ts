"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

type PaginationOptions = {
  page?: number;
  limit?: number;
  gender?: Gender;
};

const getPaginatedProductsWithImages = async ({
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
        category: {
          select: {
            name: true,
          }
        },
        ProductImage: {
          take: 2,
          select: {
            id: true,
            url: true,
            publicId: true,
            productId: true,
          },
        }
      },
      where: { gender },
    });

    const totalProductsCount = await prisma.product.count({
      where: { gender }
    });

    const totalPages = Math.ceil(totalProductsCount / limit);

    const productsOutput = products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        slug: product.slug,
        gender: product.gender,
        price: product.price ?? 0,
        stock: product.inStock ?? 0,
        images: product.ProductImage,
        image: product.ProductImage.length > 0 ? product.ProductImage[0].url : '',
        category: product.category.name,
      };
    });

    return {
      currentPage: page,
      totalPages,
      products: productsOutput,
    };

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error("Products cannot loaded !");
    }
    console.log(error);
    throw 'Unknown error occurred. Check logs !';
  }
};

export default getPaginatedProductsWithImages;
