"use client";

import { useEffect, useState } from "react";
import styles from "./order-summary.module.css";
import { useCartStore } from "@/store";

const TAX_RATE = 15;

const OrderSummary = () => {

  const [componentLoaded, setComponentLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation(TAX_RATE));

  useEffect(() => setComponentLoaded(true), []);

  if (!componentLoaded) {
    return <p>Loading ...</p>;
  }

  return (
    <table className={styles.summaryTable}>
      <tbody>
        <tr className={styles.summaryRow}>
          <th className={styles.summaryTableHeader}>Quantity:</th>
          <td className={styles.summaryTableData}>
            <span className={styles.summaryAmount}>
              {itemsInCart}
            </span>
            <span className={styles.summaryExtraInfo}>
              item{itemsInCart > 1 ? 's' : '' }
            </span>
          </td>
        </tr>
        <tr className={styles.summaryRow}>
          <th className={styles.summaryTableHeader}>Subtotal:</th>
          <td className={styles.summaryTableData}>
            <span className={styles.summaryAmount}>
              $ {subTotal.toFixed(2)}
            </span>
          </td>
        </tr>
        <tr className={styles.summaryRow}>
          <th className={styles.summaryTableHeader}>Tax:</th>
          <td className={styles.summaryTableData}>
            <span className={styles.summaryAmount}>
              $ {tax.toFixed(2)}
            </span>
            <span className={styles.summaryExtraInfo}>({TAX_RATE}%)</span>
          </td>
        </tr>
        <tr>
          <th className={styles.summaryTableHeader}>Total:</th>
          <td className={styles.summaryTableData}>
            <span className={styles.summaryTotal}>
              $ {total.toFixed(2)}
            </span>
            <span className={styles.summaryExtraInfo}>CAD</span>
          </td>
        </tr>
      </tbody>
    </table>
  );

};

export default OrderSummary;
