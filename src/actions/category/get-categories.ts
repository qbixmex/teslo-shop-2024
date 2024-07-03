"use server";

import { prisma } from "@/lib";
import { Category } from "@/interfaces";

const getCategories = async (): Promise<Category[]> => {
  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getCategories;
