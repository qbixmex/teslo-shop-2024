"use server";

import { prisma } from "@/lib";

const setUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({
      where: { userId },
    });

    return {
      ok: true,
      message: 'Address deleted successfully 🚀👍',
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Something went wrong 👎, check logs for more info ❗',
    }
  }
};

export default setUserAddress;