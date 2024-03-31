import { FC } from "react";
import { ProductLight } from "@/interfaces";
import ProductGridItem from "./product-grid-item.component";
import styles from './product-grid.module.css';

const gridClasses = ['grid', styles.grid].join(' ');

type Props = { products: ProductLight[]; }

const ProductGrid: FC<Props> = ({ products }) => {

  return (
    <section className={gridClasses}>
      {products.map((product) => (
        <ProductGridItem key={product.id} product={product} />
      ))}
    </section>
  );

};

export default ProductGrid;
