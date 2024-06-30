"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './place-order.module.css';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat, sleep } from '@/utils';
import clsx from 'clsx';
import { Alert } from '@/components';
import { placeOrder } from '@/actions';

const PlaceOrder = () => {

  const [ componentLoaded, setComponentLoaded ] = useState(false);
  const [ isPlacingOrder, setIsPlacingOrder ] = useState(false);
  const [ error, setError ] = useState('');
  const address = useAddressStore(state => state.address);
  const summary = useCartStore(state => state.getSummaryInformation());
  const cart = useCartStore(state => state.cart);

  useEffect(() => {
    setComponentLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));

    // Server Action
    const response = await placeOrder(productsToOrder, address);

    console.log("RESPONSE:", response);

    // setError('Could not place your order !');

    setIsPlacingOrder(false);
  };

  if (!componentLoaded) {
    return <div className="text-center text-2xl text-stone-700 font-semibold italic">Loading...</div>;
  }

  return (
    <section className={styles.summary}>
      <h2 className={styles.summaryHeading}>Delivery Address</h2>

      <table className={styles.deliveryAddressTable}>
        <tbody>
          <tr className={styles.addressRow}>
            <th>Name:</th>
            <td>{ `${address.firstName} ${address.lastName}` }</td>
          </tr>
          <tr className={styles.addressRow}>
            <th>Address:</th>
            <td>{address.address}</td>
          </tr>
          {address.address2 && (
            <tr className={styles.addressRow}>
              <th>Address 2:</th>
              <td>{address.address2}</td>
            </tr>
          )}
          <tr className={styles.addressRow}>
            <th>Phone:</th>
            <td>{address.phone}</td>
          </tr>
          <tr className={styles.addressRow}>
            <th>Postal Code:</th>
            <td>{address.postalCode}</td>
          </tr>
          <tr className={styles.addressRow}>
            <th>City:</th>
            <td>{address.city}</td>
          </tr>
          <tr className={styles.addressRow}>
            <th>Country:</th>
            <td>{address.country}</td>
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
              <span className={styles.summaryAmount}>{summary.itemsInCart}</span>
              <span className={styles.summaryExtraInfo}>items</span>
            </td>
          </tr>
          <tr className={styles.summaryRow}>
            <th className={styles.summaryTableHeader}>Subtotal:</th>
            <td className={styles.summaryTableData}>
              <span className={styles.summaryAmount}>{currencyFormat(summary.subTotal)}</span>
            </td>
          </tr>
          <tr className={styles.summaryRow}>
            <th className={styles.summaryTableHeader}>Tax:</th>
            <td className={styles.summaryTableData}>
              <span className={styles.summaryAmount}>{currencyFormat(summary.tax)}</span>
              <span className={styles.summaryExtraInfo}>(15%)</span>
            </td>
          </tr>
          <tr>
            <th className={styles.summaryTableHeader}>Total:</th>
            <td className={styles.summaryTableData}>
              <span className={styles.summaryTotal}>{currencyFormat(summary.total)}</span>
              <span className={styles.summaryExtraInfo}>CAD</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p className={styles.disclaimer}>
        When you click &quot;checkout&quot;, you agree to our <Link href="/terms" className="underline">terms of service</Link> and <Link href="/privacy" className="underline">privacy policy</Link>.
      </p>

      {error && (
        <Alert type="error" withIcon className="mt-5">{error}</Alert>
      )}

      <button
        // TODO: navigate to -> /orders/123
        type='submit'
        disabled={isPlacingOrder}
        className={clsx(styles.summaryCheckoutBtn, {
          [styles.summaryCheckoutBtnDisabled]: isPlacingOrder
        })}
        onClick={onPlaceOrder}
      >{ isPlacingOrder ? 'Placing Order ...' : 'Place Order' }</button>
    </section>
  );
};

export default PlaceOrder;
