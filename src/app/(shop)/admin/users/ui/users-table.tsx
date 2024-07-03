'use client';

import Link from 'next/link';
import type { User } from '@/interfaces';
import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from './users-table.module.css';

type Props = {
  users: User[];
};

/*
  id: '26c30404-0463-4c03-860d-a3fad77a2e62',
  name: 'Izuku Midoriya',
  email: 'deku@heroacademy.com',
  emailVerified: null,
  role: 'user',
  image: null
*/


const UsersTable: React.FC<Readonly<Props>> = ({ users }) => {

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={styles.tableHeaderTh}>Email</th>
          <th className={styles.tableHeaderTh}>Full Name</th>
          <th className={styles.tableHeaderThCenter} style={{ width: 150 }}>Is Verified</th>
          <th className={styles.tableHeaderTh} style={{ width: 100 }}>Role</th>
          <th className={styles.tableHeaderTh}>Actions</th>
        </tr>
      </thead>
      <tbody>
       {users.map((user) => (
          <tr key={user.id} className={styles.tableBodyRow}>
            <td className={styles.tableBodyCol}>{user.email}</td>
            <td className={styles.tableBodyCol}>{user.name}</td>
            <td className={styles.tableBodyColCenter} style={{ width: 150 }}>
              {user.emailVerified ? (
                <span className={styles.verifyTrue}><FaCheck size={18} /></span>
              ) : (
                <span className={styles.verifyFalse}><FaTimes size={18} /></span>
              )}
            </td>
            <td className={styles.tableBodyCol}>
              <select
                defaultValue={user.role}
                onChange={(event) => console.log(event.target.value)}
                className="w-[100px] p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              >
                <option value="admin" selected={user.role === 'admin'}>Admin</option>
                <option value="user" selected={user.role === 'user'}>User</option>
              </select>
            </td>
            <td className={styles.tableBodyColLink}>
              <Link href={`/users/123`}>show</Link>
            </td>
          </tr>
       ))}
      </tbody>
    </table>
  );

};

export default UsersTable;
