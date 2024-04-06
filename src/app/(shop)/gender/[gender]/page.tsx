import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductsWithImages } from '../../actions';
import { Gender } from '@prisma/client';

//* This re-validates the page every 24 hours
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Teslo Shop - Category",
  description: "Category Page",
  robots: "noindex, nofollow",
};

type Props = {
  params: {
    gender: string;
  };
  searchParams: {
    page: string;
  };
};

const NewAccountPage: React.FC<Readonly<Props>> = async ({
  params: { gender },
  searchParams,
}) => {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } =
    await getPaginatedProductsWithImages({
      page,
      gender: gender as Gender,
    });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  // Alternative
  // const labels: { [key in ValidCategories]: string; }

  const labels: Record<string, string> = {
    "men": "Men",
    "women": "Women",
    "kid": "Kids",
    "unisex": "Everyone",
  };

  return (
    <>
      <Title
        title={`Products for ${labels[gender]}`}
        subtitle="All Products"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}

export default NewAccountPage;
