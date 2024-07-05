"use server";

import { CloudinaryResponse } from "@/actions/products/product";
import { prisma } from "@/lib";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

type Props = {
  imageId: string;
  imageUrl: string;
  publicId: string;
};

const deleteProductImage = async (props: Props) => {
  if (!props.imageUrl.startsWith('https')) {
    return {
      ok: false,
      message: 'Cannot delete image from File System !'
    }
  }
  
  try {
    await cloudinary.uploader.destroy(props.publicId);

    const deletedImage = await prisma.productImage.delete({
      where: { id: props.imageId },
      select: {
        product: {
          select: {
            slug: true,
          }
        },
      }
    });

    // Revalidate paths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/products/${deletedImage.product.slug}`);

    return {
      ok: true,
      message: 'Image deleted successfully !'
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Could not delete the image !'
    };
  }
};

export default deleteProductImage;