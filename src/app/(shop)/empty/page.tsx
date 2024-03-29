import { IoCartOutline } from 'react-icons/io5';
import styles from './page.module.css';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Teslo Shop - Empty",
  description: "Empty Page",
  robots: "noindex, nofollow",
};

const EmptyPage = () => {
  return (
    <section className={styles.container}>
      <IoCartOutline className={styles.icon} />
      <section className={styles.content}>
        <h1 className={styles.heading}>Your cart is empty</h1>
        <Link href="/" className={styles.button}>back</Link>
      </section>
    </section>
  );
};

export default EmptyPage;
