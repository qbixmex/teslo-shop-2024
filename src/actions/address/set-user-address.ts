"use server";

import type { Address } from "@/interfaces";
import { prisma } from "@/lib";

const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrderReplaceAddress(address, userId);

    return {
      ok: true,
      message: 'Address saved successfully 🚀👍',
      address: newAddress,
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Something went wrong 👎, check logs for more info ❗',
    }
  }
};

const createOrderReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      phone: address.phone,
      city: address.city,
      countryId: address.country,
      userId,
    };

    if (!storedAddress) {
      return await prisma.userAddress.create({
        data: addressToSave,
      });
    }

    if (storedAddress) {
      return await prisma.userAddress.update({
        where: { userId },
        data: addressToSave,
      });
    }

  } catch (error) {
    console.log(error);
    throw new Error('Could not save the address !, check logs for more info.');
  }
};

export default setUserAddress;
