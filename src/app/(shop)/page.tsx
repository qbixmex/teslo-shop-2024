import ProductGrid from '@/components/products/product-grid/product-grid.component';
import { Title } from '@/components';
import { initialData } from '@/seed/seed';

export const ShopPage = () => {
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

export default ShopPage;
