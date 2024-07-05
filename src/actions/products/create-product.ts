"use server";
import prisma from "@/lib/prisma";

import { slugFormat, uploadImages } from "@/utils";
import { Size } from "@prisma/client";
import productSchema from "./product.schema";
import { revalidatePath } from "next/cache";
import { ProductResponse } from "./product";

const createProduct = async ( formData: FormData ): Promise<ProductResponse> => {
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

      const createdProduct = await prisma.product.create({
        data: {
          ...productToSave,
          sizes: { set: productToSave.sizes as Size[] },
          tags: { set: tagsArray },
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
            productId: createdProduct.id,
          }))
        });
      }
      
      return {
        ok: true,
        message: 'Product created successfully',
        product: {
          ...createdProduct,
          price: createdProduct.price ?? 0,
          inStock: createdProduct.inStock ?? 0,
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
