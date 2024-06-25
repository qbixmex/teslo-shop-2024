"use server";

import prisma from "@/lib/prisma";

export const GetStockById = async (id: string): Promise<number> => {
  try {
    const product = await prisma.product.findFirst({
      where: { id },
      select: { inStock: true },
    });

    return product?.inStock ?? 0;

  } catch (error) {
    return 0;
  }
};