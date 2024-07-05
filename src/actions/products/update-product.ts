"use server";

import prisma from "@/lib/prisma";

import { slugFormat } from "@/utils";
import productSchema from "./product.schema";
import { Size } from "@prisma/client";
import { revalidatePath } from "next/cache";

const updateProduct = async ( id: string, formData: FormData ) => {

  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return {
      ok: false,
      message: productParsed.error.errors[0].message,
    }
  }

  const productToUpdate = productParsed.data;
  productToUpdate.slug = slugFormat(productToUpdate.slug);

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          title: productToUpdate.title,
          slug: productToUpdate.slug,
          description: productToUpdate.description,
          price: productToUpdate.price,
          inStock: productToUpdate.inStock,
          categoryId: productToUpdate.categoryId,
          sizes: {
            set: productToUpdate.sizes as Size[],
          },
          tags: {
            set: productToUpdate.tags
              .split(",")
              .map(tag => tag.trim().toLowerCase()),
          },
          gender: productToUpdate.gender,
        },
      });

      // Revalidate Paths
      revalidatePath('/products');
      revalidatePath(`/product/${updatedProduct.slug}`);
      revalidatePath('/admin/products');
      revalidatePath(`/admin/product/${updatedProduct.slug}`);

      return {
        ok: true,
        message: 'Product updated successfully',
        product: {
          ...updatedProduct,
          images: [],
        },
      };
    });

    return prismaTransaction;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error updating product !',
    }
  }
};

export default updateProduct;
