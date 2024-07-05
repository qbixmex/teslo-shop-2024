"use server";

import prisma from "@/lib/prisma";

import { slugFormat } from "@/utils";
import { Size } from "@prisma/client";
import productSchema from "./product.schema";
import { revalidatePath } from "next/cache";

const createProduct = async ( formData: FormData ) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return {
      ok: false,
      message: productParsed.error.errors[0].message,
    }
  }

  const productToSave = productParsed.data;
  productToSave.slug = slugFormat(productToSave.slug);
  const tagsArray = productToSave.tags
                      .split(",")
                      .map(tag => tag.trim().toLowerCase());

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {

      // TODO: 1. Load Images to third-party storage.
      // TODO: 2. Save Each Image URL to the database.

      if (formData.getAll('images')) {
        console.log(formData.getAll('images'));
      }

      return {
        ok: true,
        message: 'Check the images',
      };

      const createdProduct = await prisma.product.create({
        data: {
          title: productToSave.title,
          slug: productToSave.slug,
          description: productToSave.description,
          price: productToSave.price,
          inStock: productToSave.inStock,
          categoryId: productToSave.categoryId,
          sizes: { set: productToSave.sizes as Size[] },
          tags: { set: tagsArray },
          gender: productToSave.gender,
        },
      });

      return {
        ok: true,
        message: 'Product created successfully',
        product: {
          ...createdProduct,
          images: [],
        },
      }
    });

    // Revalidate Paths
    revalidatePath('/products');
    revalidatePath('/admin/products');

    return prismaTransaction;

  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Error creating a product',
    }
  }
};

export default createProduct;
