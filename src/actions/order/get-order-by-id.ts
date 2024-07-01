"use server";

import { auth } from "@/auth.config";
import { OrderResponse } from '@/interfaces';
import { prisma } from "@/lib";

type responseAction = {
  ok: boolean;
  message: string;
  order?: OrderResponse | null;
};

const getOrderById = async (id: string): Promise<responseAction> => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "You must be logged in to get order !",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
            address: true,
            address2: true,
            postalCode: true,
            phone: true,
            city: true,
            countryId: true,
            country: {
              select: {
                name: true,
              }
            }
          }
        },
        OrderItem: {
          select: {
            orderId: true,
            quantity: true,
            price: true,
            size: true,
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                ProductImage: {
                  select: { url: true },
                  take: 1,
                }
              }
            },
          }
        },
      }
    });

    if (!order) {
      throw `Order with "${id}" not found !`;
    }

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw `You are not authorized to get order this order !`;
      }
    }

    return {
      ok: true,
      message: `Order "${id}" fetched successfully !`,
      order: {
        id: order.id,
        userId: order.userId,
        itemsInOrder: order.itemsInOrder,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        isPaid: order.isPaid,
        paidAt: order.paidAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        orderAddress: {
          firstName: order.OrderAddress!.firstName,
          lastName: order.OrderAddress!.lastName,
          address: order.OrderAddress!.address,
          address2: order.OrderAddress?.address2 ?? '',
          postalCode: order.OrderAddress!.postalCode,
          phone: order.OrderAddress!.phone,
          city: order.OrderAddress!.city,
          country: order.OrderAddress!.country.name,
        },
        orderItem: order.OrderItem.map((item) => ({
          id: item.product.id,
          orderId: item.orderId,
          title: item.product.title,
          slug: item.product.slug,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          image: item.product.ProductImage[0].url
        }))
      },
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Failed to get order, check logs !",
    };
  }
};

export default getOrderById;
