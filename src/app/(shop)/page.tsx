import { FC } from 'react';
import { redirect } from 'next/navigation';
import ProductGrid from '@/components/products/product-grid/product-grid.component';
import { Pagination, Title } from '@/components';
import { getPaginatedProductsWithImages } from '../../actions';

//* This re-validates the page every 24 hours
export const revalidate = 86400;

type Props = {
  searchParams: {
    page?: string;
    limit?: string;
  }
}

const HomePage: FC<Props> = async ({ searchParams }) => {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 12;

  const {
    products,
    currentPage,
    totalPages,
  } = await getPaginatedProductsWithImages({ page, limit });

  console.log({ currentPage, totalPages });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title
        title="Store"
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
};

export default HomePage;
