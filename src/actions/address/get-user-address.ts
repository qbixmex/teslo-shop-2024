"use server";

import { prisma } from "@/lib";

const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!address) {
      return null;
    }

    return {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2 ?? undefined,
      postalCode: address.postalCode,
      phone: address.phone,
      city: address.city,
      country: address.countryId,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getUserAddress;
