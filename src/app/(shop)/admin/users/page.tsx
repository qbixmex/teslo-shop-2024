import { Title } from "@/components";
import styles from "./page.module.css";
import { FaRobot } from "react-icons/fa6";
import Link from "next/link";
import UsersTable from "./ui/users-table";
import { getPaginatedUsers } from "@/actions/user";
import { redirect } from "next/navigation";

const UsersPage = async () => {

  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/');
  }

  return (
    <div className={styles.mainContainer}>
      <Title title={`Manage Users`} className="mb-2" />

      {(users.length === 0) && (
        <div className={styles.emptyContainer}>
          <h2 className={styles.emptyHeading}>There&apos;s no users created yet !</h2>
          <FaRobot className={styles.emptySvgIcon} />
          <Link href="/" className={styles.emptyBackBtn}>back</Link>
        </div>
      )}

      {(users.length > 0) && (
        <section className={styles.container}>
          <UsersTable users={users} />
        </section>
      )}
    </div>
  );
};

export default UsersPage;
