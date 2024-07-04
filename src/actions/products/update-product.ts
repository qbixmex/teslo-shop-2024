"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { Gender } from "@/enums/gender.enums";
import { slugFormat } from "@/utils";
import { Size } from "@prisma/client";

const productSchema = z.object({
  title: z.string().min(8).max(255),
  slug: z.string().min(8).max(255),
  description: z.string().min(8),
  price: z.coerce
    .number()
    .min(1)
    .transform((value) => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(1)
    .transform((value) => Number(value.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce
    .string()
    .transform((value) => value.trim().split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
});

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
    });

    // TODO: revalidatePath()

    return {
      ok: true,
      message: 'Product updated successfully',
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error updating product',
    }
  }
};

export default updateProduct;
