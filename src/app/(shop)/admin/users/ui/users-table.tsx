'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { User } from '@/interfaces';
import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from './users-table.module.css';
import { changeUserRole } from '@/actions/user';
import { Toast } from '@/components';

type Props = {
  users: User[];
};

const MESSAGE_INITIAL_STATE: {
  text: string;
  type: 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error';
} = {
  text: '',
  type: 'info',
};

const UsersTable: React.FC<Readonly<Props>> = ({ users }) => {

  const [ message, setMessage ] = useState(MESSAGE_INITIAL_STATE);

  const onRoleChange = async (userId: string, role: string) => {
    const response = await changeUserRole(userId, role as 'admin' | 'user');

    if (response.ok) {
      setMessage({ text: response.message, type: 'success' });
    } else {
      setMessage({ text: response.message, type: 'error' });
    }

    setTimeout(() => {
      setMessage(MESSAGE_INITIAL_STATE);
    }, 3000);
  };

  return (
    <div>
      { message.text && (
        <Toast type={message.type}>{message.text}</Toast>
      )}

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
                  value={user.role}
                  onChange={({ target }) => {
                    onRoleChange(user.id, target.value);
                  }}
                  className="w-[100px] p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td className={styles.tableBodyColLink}>
                <Link href={`/users/123`}>show</Link>
              </td>
            </tr>
         ))}
        </tbody>
      </table>
    </div>
  );

};

export default UsersTable;
