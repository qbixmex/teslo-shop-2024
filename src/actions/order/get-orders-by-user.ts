export const revalidate = 0;

import { auth } from "@/auth.config";
import { prisma } from "@/lib";

const getOrdersByUser = async (userId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "You must be logged in to get order !",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      select: {
        id: true,
        isPaid: true,
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
            address: true,
            country: true,
            city: true,
          },
        },
      },
    });

    return {
      ok: true,
      message: 'Orders fetched successfully',
      orders,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'An error occurred while fetching orders !',
    }
  }
};

export default getOrdersByUser;
