import { IoCardOutline } from 'react-icons/io5';
import styles from './page.module.css';
import { Metadata } from 'next';
import Link from 'next/link';
import { PaymentStatus, Title } from '@/components';

export const metadata: Metadata = {
  title: "Teslo Shop - Orders",
  description: "Orders Page",
  robots: "noindex, nofollow",
};

const OrdersPage = () => {
  return (
    <>
      <Title title="Orders" />

      <section className={styles.container}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tableBodyRow}>
              <td className={styles.tableBodyColID}>1</td>
              <td className={styles.tableBodyCol}>Bart Simpson</td>
              <td className={styles.tableBodyColStatus}>
                <PaymentStatus isPaid={true} />
              </td>
              <td className={styles.tableBodyColLink}>
                <Link href="/orders/123">show</Link>
              </td>
            </tr>

            <tr className={styles.tableBodyRow}>
              <td className={styles.tableBodyColID}>2</td>
              <td className={styles.tableBodyCol}>Lisa Simpson</td>
              <td className={styles.tableBodyColStatus}>
                <PaymentStatus isPaid={false} />
              </td>
              <td className={styles.tableBodyColLink}>
                <Link href="/orders/123">show</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default OrdersPage;
