import { FC } from "react";
import { Title } from "@/components";
import { Product } from "@/interfaces";
import { getProductBySlug } from "@/actions";
import { redirect } from "next/navigation";
import ProductForm from "./ui/product-form";

type Props = {
  params: { slug: string; };
};

const ProductPage: FC<Props> = async ({ params }) => {

  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    redirect('/admin/products');
  }

  return (
    <section className="min-h-[calc(100vh-200px)]">
      <Title
        title={`Edit Product "${product.title}"`}
        className="text-blue-500"
      />

      <ProductForm product={product} />
    </section>
  );

};

export default ProductPage;
