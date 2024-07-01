import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { getOrdersByUser } from '@/actions';
import { PaymentStatus, Title } from '@/components';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Teslo Shop - Orders",
  description: "Orders Page",
  robots: "noindex, nofollow",
};

const OrdersPage = async () => {

  const session = await auth();

  const { ok, orders = [] } = await getOrdersByUser(session?.user.id as string);

  if (!ok) {
    redirect('/auth/login');
  };

  return (
    <>
      <Title title="Orders" />

      <section className={styles.container}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Address</th>
              <th scope="col">Country</th>
              <th scope="col">City</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className={styles.tableBodyRow}>
                <td className={styles.tableBodyColID}>...{ order.id.slice(-4) }</td>
                <td className={styles.tableBodyCol}>
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className={styles.tableBodyCol}>{order.OrderAddress?.address}</td>
                <td className={styles.tableBodyCol}>{order.OrderAddress?.country.name}</td>
                <td className={styles.tableBodyCol}>{order.OrderAddress?.city}</td>
                <td className={styles.tableBodyColStatus}>
                  <PaymentStatus isPaid={order.isPaid} />
                </td>
                <td className={styles.tableBodyColLink}>
                  <Link href={`/orders/${order.id}`}>show</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default OrdersPage;
