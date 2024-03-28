import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Checkout",
  description: "Category Page",
  robots: "noindex, nofollow",
};

export const CheckoutPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Checkout Page
      </h1>
      <p className={styles.paragraph}>
        This website is under construction
      </p>
    </div>
  );
};

export default CheckoutPage;
