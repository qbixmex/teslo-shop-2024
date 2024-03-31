import ProductGrid from '@/components/products/product-grid/product-grid.component';
import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import { getPaginatedProductsWithImages } from './actions';

const HomePage = async () => {

  await getPaginatedProductsWithImages();

  return (
    <>
      <Title
        title="Store"
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid products={initialData.products} />
    </>
  );
};

export default HomePage;
