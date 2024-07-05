"use server";

import prisma from "@/lib/prisma";

import { slugFormat, uploadImages } from "@/utils";
import productSchema from "./product.schema";
import { Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ProductResponse } from "./product";

const updateProduct = async (
  id: string,
  formData: FormData
): Promise<ProductResponse> => {

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
          ...productToUpdate,
          sizes: {
            set: productToUpdate.sizes as Size[],
          },
          tags: {
            set: productToUpdate.tags
              .split(",")
              .map(tag => tag.trim().toLowerCase()),
          },
        },
      });

      // If user selected images from form,
      // then upload them to cloudinary storage.
      if (formData.getAll('images')) {
        // 1. Load Images to third-party storage.
        const images = await uploadImages(formData.getAll('images') as File[]);

        if (!images) {
          throw 'Error uploading images to cloudinary';
        }

        // 2. Save Each Image URL to the database.
        await prisma.productImage.createMany({
          data: images.map(image => ({
            url: image!.secureUrl,
            publicId: image!.publicId,
            productId: updatedProduct.id,
          }))
        });
      }

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
          price: updatedProduct.price ?? 0,
          inStock: updatedProduct.inStock ?? 0,
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
