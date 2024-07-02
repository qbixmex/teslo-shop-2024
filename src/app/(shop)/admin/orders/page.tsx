import Link from "next/link";
import { FaRobot } from "react-icons/fa6";
import { getPaginatedOrders } from "@/actions";
import { PaymentStatus, Title } from "@/components";
import styles from "./page.module.css";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

const OrdersPage = async () => {

  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/login');
  }

  const { orders = [] } = await getPaginatedOrders();

  if (!orders) {
    redirect('/');
  }

  return (
    <div className="min-h-[calc(100vh-236px)]">
      <Title title={`Manage Orders`} className="mb-2" />

      {orders?.length === 0 && (
        <div className={styles.emptyContainer}>
          <h1 className={styles.emptyHeading}>There&apos;s no orders created yet !</h1>
          <FaRobot className={styles.emptySvgIcon} />
          <Link href="/" className={styles.emptyBackBtn}>back</Link>
        </div>
      )}

      {(orders.length > 0) && (
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
                  <td className={styles.tableBodyColID}>...{order.id.slice(-4)}</td>
                  <td className={styles.tableBodyCol}>{order.fullName}</td>
                  <td className={styles.tableBodyCol}>{order.address}</td>
                  <td className={styles.tableBodyCol}>{order.country}</td>
                  <td className={styles.tableBodyCol}>{order.city}</td>
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
      )}
    </div>
  );
};

export default OrdersPage;
