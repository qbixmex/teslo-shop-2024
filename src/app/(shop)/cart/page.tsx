import Link from 'next/link';
import { Title } from '@/components';
import ProductsInCart from './ui/products-in-cart';
import OrderSummary from './ui/order-summary';
import styles from "./page.module.css";

const CartPage = () => {
  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <Title title="Cart" />

        <span className={styles.headerMessage}>Add more items</span>

        <Link href="/" className="underline">Continue Buying</Link>
      </section>

      <section className={styles.mainContainer}>
        {/* Cart */}
        <ProductsInCart />

        {/* Checkout */}
        <section className={styles.summary}>
          <h2 className={styles.summaryHeading}>Order Summary</h2>

          <OrderSummary />

          <Link
            href="/checkout/address"
            className={styles.summaryCheckoutBtn}
          >checkout</Link>
        </section>

      </section>
    </section>
  );
};

export default CartPage;
