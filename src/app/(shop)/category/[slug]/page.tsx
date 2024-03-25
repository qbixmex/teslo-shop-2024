import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';
import { Category } from '@/interfaces';
import { FC } from 'react';

export const metadata: Metadata = {
  title: "Teslo Shop - Category",
  description: "Category Page",
  robots: "noindex, nofollow",
};

const allowedCategories: Category[] = [ "men", "women", "kid", "unisex" ];

type Props = {
  params: {
    slug: Category;
  };
};

const NewAccountPage: FC<Props> = ({ params: { slug } }) => {

  const seedProducts = initialData.products;

  if (!allowedCategories.includes(slug)) {
    notFound();
  }

  const genderProducts = seedProducts.filter((product) => {
    return product.gender === slug;
  });

  // Alternative
  // const labels: { [key in ValidCategories]: string; }

  const labels: Record<Category, string> = {
    "men": "Men",
    "women": "Women",
    "kid": "Kids",
    "unisex": "Everyone",
  };

  return (
    <>
      <Title
        title={`Products for ${labels[slug]}`}
        subtitle="All Products"
        className="mb-2"
      />

      <ProductGrid products={genderProducts} />
    </>
  );
}

export default NewAccountPage;
