import { FC } from 'react';
import { Metadata } from 'next';
import { getOrderById } from '@/actions';
import { redirect } from 'next/navigation';
import { CartItem, PaymentInfo, Title } from '@/components';
import styles from './order.module.css'
import { currencyFormat } from '@/utils/currencyFormat';

export const metadata: Metadata = {
  title: "Teslo Shop - Order #",
  description: "Order Page",
  robots: "noindex, nofollow",
};

type Props = {
  params: { id: string; };
};

const OrderPage: FC<Readonly<Props>> = async ({ params: { id } }) => {
  const { order } = await getOrderById( id );
  
  if (!order) {
    redirect('/');
  }

  const orderAddress = order.orderAddress;

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <Title title={`Order # ...${order?.id.slice(-4)}`} />
      </section>

      <section className={styles.mainContainer}>
        {/* Cart */}
        <section className={styles.cart}>
          <PaymentInfo isPaid={order.isPaid} />
          {order.orderItem.map(product => (
            <CartItem
              key={product.id + '_' + (product.size.toLocaleLowerCase())}
              product={product}
              checkout
            />
          ))}
        </section>

        {/* Checkout */}
        <section className={styles.summary}>
          <h2 className={styles.summaryHeading}>Delivery Address</h2>

          <table className={styles.deliveryAddressTable}>
            <tbody>
              <tr className={styles.addressRow}>
                <th>Name:</th>
                <td>{ `${orderAddress.firstName} ${orderAddress.lastName}` }</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Address:</th>
                <td>{ orderAddress.address }</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Address 2:</th>
                <td>{ orderAddress.address2 !== '' ? orderAddress.address : 'n/a' }</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Phone:</th>
                <td>{ orderAddress.phone }</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Postal Code:</th>
                <td>{ orderAddress.postalCode }</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>City:</th>
                <td>{ orderAddress.city }</td>
              </tr>
              <tr className={styles.addressRow}>
                <th>Country:</th>
                <td>{ orderAddress.country }</td>
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
                  <span className={styles.summaryAmount}>{ order.itemsInOrder }</span>
                  <span className={styles.summaryExtraInfo}>items</span>
                </td>
              </tr>
              <tr className={styles.summaryRow}>
                <th className={styles.summaryTableHeader}>Subtotal:</th>
                <td className={styles.summaryTableData}>
                  <span className={styles.summaryAmount}>{currencyFormat(order.subtotal)}</span>
                </td>
              </tr>
              <tr className={styles.summaryRow}>
                <th className={styles.summaryTableHeader}>Tax:</th>
                <td className={styles.summaryTableData}>
                  <span className={styles.summaryAmount}>{currencyFormat(order.tax)}</span>
                  <span className={styles.summaryExtraInfo}>(15%)</span>
                </td>
              </tr>
              <tr>
                <th className={styles.summaryTableHeader}>Total:</th>
                <td className={styles.summaryTableData}>
                  <span className={styles.summaryTotal}>{currencyFormat(order.total)}</span>
                  <span className={styles.summaryExtraInfo}>CAD</span>
                </td>
              </tr>
            </tbody>
          </table>

          <PaymentInfo isPaid={order.isPaid} />
        </section>
      </section>
    </section>
  );
};

export default OrderPage;
