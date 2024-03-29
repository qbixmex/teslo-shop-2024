"use client";

import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import styles from "./payment-info.module.css";

type Props = {
  isPaid: boolean;
};

const PaymentInfo: React.FC<Readonly<Props>> = ({ isPaid }) => {
  return (
    <section className={clsx(
      styles.container,
      {
        [styles.unpaid]: !isPaid,
        [styles.paid]: isPaid,
      }
    )}>
      <IoCardOutline className={styles.icon} />
      {
        (isPaid)
          ? <span>Order Paid</span>
          : <span>Pending Payment</span>
      }
    </section>
  );
};

export default PaymentInfo;
