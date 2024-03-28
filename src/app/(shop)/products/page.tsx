import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Products",
  description: "Products Page",
  robots: "noindex, nofollow",
};

const ProductsPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Products Page
      </h1>
      <p className={styles.paragraph}>
        This website is under construction
      </p>
    </div>
  );
};

export default ProductsPage;
