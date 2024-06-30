'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

const placeOrder = async (
  productOrder: ProductToOrder[],
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

  console.log({ productOrder, address, userId });

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
