import { FC } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CartItem, PaymentInfo, Title } from '@/components';
import { initialData } from '@/seed/seed';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Teslo Shop - Order #",
  description: "Order Page",
  robots: "noindex, nofollow",
};

const productsInCart = [
  initialData.products[25],
  initialData.products[35],
  initialData.products[40],
];

type Props = {
  params: { id: string; };
};

const OrderPage: FC<Readonly<Props>> = ({ params: { id } }) => {
  // TODO: Verify order with id
  // TODO: Redirect to 404 if order not found

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <Title title={`Order # ${id}`} />
      </section>

      <section className={styles.mainContainer}>
        {/* Cart */}
        <section className={styles.cart}>
          <PaymentInfo isPaid={false} />
          {productsInCart.map(product => (
            <CartItem key={product.slug} product={product} checkout />
          ))}
        </section>

        {/* Checkout */}
        <section className={styles.summary}>
          <h2 className={styles.summaryHeading}>Delivery Address</h2>

          <table className={styles.deliveryAddressTable}>
            <tbody>
              <tr className={styles.addressRow}>
                <th>Name:</th>
                <td>Bart Simpson</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Address:</th>
                <td>742 Evergreen Terrace</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Address 2:</th>
                <td>Apt 1234</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Phone:</th>
                <td>123-456-7890</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Postal Code:</th>
                <td>12345</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>City:</th>
                <td>Springfield</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Country:</th>
                <td>USA</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.divider} />

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

          <PaymentInfo isPaid={false} />
        </section>
      </section>
    </section>
  );
};

export default OrderPage;
