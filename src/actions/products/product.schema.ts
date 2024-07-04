import { z } from "zod";
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
  sizes: z.coerce
    .string()
    .transform((value) => value.trim().split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
});

export default productSchema;
