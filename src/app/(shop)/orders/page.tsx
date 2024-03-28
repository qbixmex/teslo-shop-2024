import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Orders",
  description: "Orders Page",
  robots: "noindex, nofollow",
};

const OrdersPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Orders Page
      </h1>
      <p className={styles.paragraph}>
        This website is under construction
      </p>
    </div>
  );
};

export default OrdersPage;
