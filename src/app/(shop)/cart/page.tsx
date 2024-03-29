import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CartItem, Title } from '@/components';
import styles from './page.module.css';
import { initialData } from '@/seed/seed';
import { Product } from '@/interfaces';

const productsInCart: Product[] = [
  initialData.products[25],
  initialData.products[35],
  initialData.products[40],
];

const CartPage = () => {

  if (productsInCart.length === 0) {
    redirect('/empty');
  }

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
        <section className={styles.cart}>
          {productsInCart.map(product => (
            <CartItem key={product.slug} product={product} />
          ))}
        </section>
        
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
