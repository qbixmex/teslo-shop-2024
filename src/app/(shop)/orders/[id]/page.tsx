import { FC } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CartItem, PaymentInfo, Title } from '@/components';
import { initialData } from '@/seed/seed';
import styles from './page.module.css';
import { CartProduct } from '@/interfaces';

export const metadata: Metadata = {
  title: "Teslo Shop - Order #",
  description: "Order Page",
  robots: "noindex, nofollow",
};

const productsInCart: CartProduct[] = [
  {
    id: "d1a7a451-0026-458d-b3aa-d2431962add7",
    orderId: "be49b6c1-ab8a-4caa-aa66-e8763c19d224",
    image: '7654420-00-A_0_2000.jpg',
    price: 60,
    size: 'M',
    slug: "cybertruck_graffiti_hoodie",
    title: "Cybertruck Graffiti Hoodie",
    quantity: 2,
  },
  {
    id: "5efa0078-8b16-4f3f-8fa2-3bf9a5014763",
    orderId: "e062d870-9af7-412f-9352-f1b4e933866b",
    image: '1740260-00-A_0_2000.jpg',
    price: 110,
    slug: 'women-s-raven-slouchy-crew-sweatshirt',
    size: 'L',
    title: "Women's Raven Slouchy Crew Sweatshirt",
    quantity: 1,
  },
  {
    id: "24c0e576-5a29-44d3-9fb1-1ee65029de33",
    orderId: "8b5f7c2d-458d-48fd-bc21-f56f7243a663",
    image: '8765090-00-A_0_2000.jpg',
    price: 35,
    size: 'M',
    slug: "women_t_logo_short_sleeve_scoop_neck_tee",
    title: "Women's T Logo Short Sleeve Scoop Neck Tee",
    quantity: 3,
  },
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
