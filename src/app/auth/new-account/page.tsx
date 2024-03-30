import { Metadata } from 'next';
import styles from '../auth.module.css';
import Link from 'next/link';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FormFields } from '@/components';

export const metadata: Metadata = {
  title: "Teslo Shop - New Account",
  description: "New Account Page",
  robots: "noindex, nofollow",
};

const NewAccountPage = () => {
  return (
    <section className={styles.container}>
      <section className={styles.content}>
        <h1 className={styles.heading}>New Account</h1>
        <form action="#">

          <FormFields register />
          
          <section>
            <button
              type="submit"
              className={`btn-primary ${styles['btn--extras']}`}
            >Create Account</button>
          </section>

          <section className={styles.divisorContainer}>
            <div className={styles.divisorLine} />
            <div className={styles.divisorText}>O</div>
            <div className={styles.divisorLine} />
          </section>

          <Link
            href="/auth/login"
            className={`btn-secondary ${styles.registerBtn}`}
          >
            login
          </Link>
        </form>
      </section>
    </section>
  );
}

export default NewAccountPage;
