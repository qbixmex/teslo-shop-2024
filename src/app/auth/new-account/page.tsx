import { Metadata } from 'next';
import styles from '../auth.module.css';
import Link from 'next/link';
import RegisterForm from './ui/register-form';

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
        
        <RegisterForm />

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
      </section>
    </section>
  );
}

export default NewAccountPage;
