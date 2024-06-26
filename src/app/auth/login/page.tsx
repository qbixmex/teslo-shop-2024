import { Metadata } from 'next';
import styles from '../auth.module.css';
import LoginForm from './ui/login-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Teslo Shop - Login",
  description: "Login Page",
  robots: "noindex, nofollow",
};

const LoginPage = () => {
  return (
    <section className={styles.container}>
      <section className={styles.content}>
        <h1 className={styles.heading}>Sign In</h1>

        <LoginForm />

        <section className={styles.divisorContainer}>
          <div className={styles.divisorLine} />
          <div className={styles.divisorText}>O</div>
          <div className={styles.divisorLine} />
        </section>

        <Link
          href="/auth/new-account"
          className={`btn-secondary ${styles.registerBtn}`}
        >
          create an account
        </Link>
      </section>
    </section>
  );
}

export default LoginPage;
