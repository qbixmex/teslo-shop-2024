"use server";
import * as fs from "fs";

import prisma from "@/lib/prisma";

import { slugFormat } from "@/utils";
import { Size } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import productSchema from "./product.schema";
import { revalidatePath } from "next/cache";
import { CloudinaryResponse, ProductResponse } from "./product";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

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
        console.log(images);
      }
      
      // TODO: 2. Save Each Image URL to the database.

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

const uploadImages = async (images: File[]): Promise<(CloudinaryResponse | null)[] | null> => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        const response = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`);

        return {
          publicId: response.public_id,
          secureUrl: response.secure_url,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;

  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createProduct;
