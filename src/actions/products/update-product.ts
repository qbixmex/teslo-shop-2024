"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { Product } from "@/interfaces";
import { Gender } from "@/enums/gender.enums";

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
  size: z.coerce
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

  console.log(productParsed.data);

  try {
    // const product = await prisma.product.findFirst({
    //   where: { id },
    //   data: {...formData},
    // });

    // if (!product) return null;


    return {
      ok: true,
      message: 'Product updated successfully',
      formData,
      // product,
    };

  } catch (error) {
    console.log(error);
    throw new Error("Product cannot be fetched !");
  }
};

export default updateProduct;
