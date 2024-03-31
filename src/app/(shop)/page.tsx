import ProductGrid from '@/components/products/product-grid/product-grid.component';
import { Title } from '@/components';
import { getPaginatedProductsWithImages } from './actions';

const HomePage = async () => {

  const { products } = await getPaginatedProductsWithImages();

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
