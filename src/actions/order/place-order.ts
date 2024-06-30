'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import { prisma } from "@/lib";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

const placeOrder = async (
  productOrders: ProductToOrder[],
  address: Address
): Promise<any> => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'User session not found !'
    };
  }

  const productIds = productOrders.map(item => item.productId);

  // Get products data from database based on productOrder products ids.
  // Remember we can can 2 or more products with the same id but different sizes.

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      }
    }
  });

  // Calculate total price amount of the order.
  const itemsInOrder = productOrders.reduce((amount, item) => {
    return amount + item.quantity;
  }, 0);

  console.log({ itemsInOrder });

  return {
    ok: true,
    message: 'Order placed successfully 👍'
  };

  // try {
  // } catch (error) {
  //   console.log(error);

  //   return {
  //     ok: false,
  //     message: 'Something went wrong !'
  //   };
  // }
};

export default placeOrder;
