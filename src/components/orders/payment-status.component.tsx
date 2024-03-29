import { IoCardOutline } from "react-icons/io5";
import styles from "./payment-status.module.css";
import clsx from "clsx";

type Props = {
  isPaid: boolean;
};

const PaymentStatus: React.FC<Readonly<Props>> = ({ isPaid }) => {

  return (
    <section className={clsx(
      styles.status,
      {
        [styles.isPaid]: isPaid,
        [styles.isUnpaid]: !isPaid,
      }
    )}>
      <IoCardOutline />
      <span>{ isPaid ? 'paid' : 'unpaid' }</span>
    </section>
  );

};

export default PaymentStatus;
