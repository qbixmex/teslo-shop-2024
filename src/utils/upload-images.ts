"use server";

import { CloudinaryResponse } from "@/actions/products/product";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const uploadImages = async (images: File[]): Promise<(CloudinaryResponse | null)[] | null> => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
          folder: 'teslo-shop/products',
          public_id: crypto.randomUUID(),
        }).then(response => {
          return {
            publicId: response.public_id,
            secureUrl: response.secure_url,
          };
        });
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

export default uploadImages;
