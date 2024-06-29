"use server";

import prisma from "@/lib/prisma";

const getStockById = async (id: string): Promise<number> => {
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

export default getStockById;
