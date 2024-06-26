import Link from 'next/link';
import { Title } from '@/components';
import styles from './page.module.css';
import ProductsInCart from './ui/products-in-cart';

const CartPage = () => {
  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <Title title="Cart" />

        <span className={styles.headerMessage}>Add more items</span>

        <Link
          href="/"
          className="underline"
        >Continue Buying</Link>
      </section>

      <section className={styles.mainContainer}>
        {/* Cart */}
        <ProductsInCart />
        
        {/* Checkout */}
        <section className={styles.summary}>
          <h2 className={styles.summaryHeading}>Order Summary</h2>

          <table className={styles.summaryTable}>
            <tbody>
              <tr className={styles.summaryRow}>
                <th className={styles.summaryTableHeader}>Quantity:</th>
                <td className={styles.summaryTableData}>
                  <span className={styles.summaryAmount}>3</span>
                  <span className={styles.summaryExtraInfo}>items</span>
                </td>
              </tr>
              <tr className={styles.summaryRow}>
                <th className={styles.summaryTableHeader}>Subtotal:</th>
                <td className={styles.summaryTableData}>
                  <span className={styles.summaryAmount}>$ 195.00</span>
                </td>
              </tr>
              <tr className={styles.summaryRow}>
                <th className={styles.summaryTableHeader}>Tax:</th>
                <td className={styles.summaryTableData}>
                  <span className={styles.summaryAmount}>$ 27.30</span>
                  <span className={styles.summaryExtraInfo}>(14%)</span>
                </td>
              </tr>
              <tr>
                <th className={styles.summaryTableHeader}>Total:</th>
                <td className={styles.summaryTableData}>
                  <span className={styles.summaryTotal}>$ 222.30</span>
                  <span className={styles.summaryExtraInfo}>CAD</span>
                </td>
              </tr>
            </tbody>
          </table>

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
