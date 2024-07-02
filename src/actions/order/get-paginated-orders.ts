export const revalidate = 0;

import { auth } from "@/auth.config";
import { prisma } from "@/lib";

const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: "You must be logged in to get order !",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
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
      orders: orders.map(order => ({
        id: order.id,
        fullName: `${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`,
        address: order.OrderAddress?.address,
        country: order.OrderAddress?.country.name,
        city: order.OrderAddress?.city,
        isPaid: order.isPaid,
      })),
    };
  } catch (error) {
    return {
      ok: false,
      message: 'An error occurred while fetching orders !',
    }
  }
};

export default getPaginatedOrders;
