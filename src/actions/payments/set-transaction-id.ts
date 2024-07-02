"use server";

import { prisma } from "@/lib";

const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const orderUpdated = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId },
    });

    if (!orderUpdated) {
      return {
        ok: false,
        message: `Order with id: "${orderId}", not found !`,
      };
    }

    return {
      ok: true
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Failed to set transaction id to database !, check logs for more info.',
    }
  }
};

export default setTransactionId;
