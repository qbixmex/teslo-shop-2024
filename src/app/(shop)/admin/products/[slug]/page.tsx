import { FC } from "react";
import { Title } from "@/components";
import { getCategories, getProductBySlug } from "@/actions";
import { redirect } from "next/navigation";
import ProductForm from "./ui/product-form";

type Props = {
  params: { slug: string; };
};

const ProductPage: FC<Props> = async ({ params }) => {

  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== 'new') {
    redirect('/admin/products');
  }

  return (
    <section className="min-h-[calc(100vh-200px)]">
      <Title
        title={
          (slug === 'new')
          ? 'Create product'
          : `Edit Product "${product?.title}"`
        }
        className="text-blue-500"
      />

      <ProductForm
        product={product ?? {}}
        categories={categories}
      />
    </section>
  );

};

export default ProductPage;
