"use server";

import { prisma } from "@/lib";
import { Country } from "@/interfaces";

const getCountries = async (): Promise<Country[]> => {
  try {
    return await prisma.country.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getCountries;
