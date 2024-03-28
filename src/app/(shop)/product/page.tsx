import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Product",
  description: "Product Page",
  robots: "noindex, nofollow",
};

const ProductPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Product Page
      </h1>
      <p className={styles.paragraph}>
        This website is under construction
      </p>
    </div>
  );
};

export default ProductPage;
