import ProductGrid from '@/components/products/product-grid/product-grid.component';
import { Title } from '@/components';
import { getPaginatedProductsWithImages } from './actions';
import { FC } from 'react';

type Props = {
  searchParams: {
    page?: string;
    limit?: string;
  }
}

const HomePage: FC<Props> = async ({ searchParams }) => {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 12;

  const { products } = await getPaginatedProductsWithImages({ page, limit });

  return (
    <>
      <Title
        title="Store"
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
};

export default HomePage;
