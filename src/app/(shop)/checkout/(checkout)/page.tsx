import { Metadata } from 'next';
import styles from './page.module.css';
import Link from 'next/link';
import { Title } from '@/components';
import ProductsInCart from './ui/products-in-cart';
import PlaceOrder from './ui/place-order';

export const metadata: Metadata = {
  title: "Teslo Shop - Verify Order",
  description: "Verify your order before proceeding to checkout.",
  robots: "noindex, nofollow",
};

const CheckoutPage = () => {
  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <Title title="Verify Order" />
        <span className={styles.headerMessage}>Modify Order</span>
        <Link href="/cart" className="underline">Edit Cart</Link>
      </section>

      <section className={styles.mainContainer}>
        {/* Cart */}
        <ProductsInCart />

        {/* Checkout */}
        <PlaceOrder />
      </section>
    </section>
  );
};

export default CheckoutPage;
