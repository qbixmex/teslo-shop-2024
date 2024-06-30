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

  const productsToBuy = await prisma.product.findMany({
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

  const { subtotal, tax, total } = productOrders.reduce((totals, item) => {
    const productQuantity = item.quantity;
    const product = productsToBuy.find(product => product.id === item.productId);

    if (!product) {
      throw new Error(`Product "${item.productId}" does not exist !`);
    }

    const productPrice = product.price ?? 0;
    const subtotal = productPrice * productQuantity

    totals.subtotal += subtotal;
    totals.tax += subtotal * 0.15;
    totals.total += subtotal * 1.15;

    return totals;
  }, { subtotal: 0, tax: 0, total: 0 });

  try {

    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      // 1. Update product stock.
      const updatedProductsPromises = productsToBuy.map((product) => {

        // Get the total quantity of each product
        // where the product id is equal to the current product id.
        // This is because we can have 2 or more products with the same id but different sizes.
        const productQuantity = productOrders.filter((item) => {
          return item.productId === product.id;
        }).reduce((accumulateAmount, currentProduct) => {
          return currentProduct.quantity + accumulateAmount;
        }, 0);

        if (productQuantity === 0) {
          throw new Error(`Product "${product.id}" quantity is not set !`);
        }

        return transaction.product.update({
          where: { id: product.id },
          data: {
            // inStock: (product.inStock ?? 0) - productQuantity, // This is wrong.
            inStock: {
              decrement: productQuantity,
            }
          }
        });

      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Check if we have inStock negative values.
      updatedProducts.forEach((product) => {
        if ((product.inStock ?? 0) < 0) {
          throw new Error(`Product "${product.title}" is out of stock !`);
        }
      });

      // 2. Create order. (details)
      const orderPlaced = await transaction.order.create({
        data: {
          userId,
          itemsInOrder,
          subtotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productOrders.map(productOrder => ({
                quantity: productOrder.quantity,
                size: productOrder.size,
                productId: productOrder.productId,
                price: productsToBuy.find(item => item.id === productOrder.productId)?.price ?? 0,
              })),
            }
          }
        }
      });

      // 3. Create order address.
      const orderAddress = await transaction.orderAddress.create({
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2,
          postalCode: address.postalCode,
          phone: address.phone,
          city: address.city,
          countryId: address.country,
          orderId: orderPlaced.id,
        }
      });

      return {
        updatedProducts,
        order: orderPlaced,
        orderAddress,
      };
    });

    return {
      ok: true,
      message: 'Order placed successfully !',
      order: prismaTransaction.order,
      prismaTransaction
    };

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    }
    return {
      ok: false,
      message: 'Unexpected error occurred, check logs !',
    };
  }
};

export default placeOrder;
