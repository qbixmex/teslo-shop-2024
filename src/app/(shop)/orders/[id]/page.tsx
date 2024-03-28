import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Order #",
  description: "Order Page",
  robots: "noindex, nofollow",
};

const OrderPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Order Page
      </h1>
      <p className={styles.paragraph}>
        This website is under construction
      </p>
    </div>
  );
};

export default OrderPage;
