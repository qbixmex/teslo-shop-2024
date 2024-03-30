import { Metadata } from 'next';
import styles from '../auth.module.css';
import Link from 'next/link';
import { FormFields } from '@/components';

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
        <form action="#">

          <FormFields />

          <section>
            <button
              type="submit"
              className={`btn-primary ${styles['btn--extras']}`}
            >Login</button>
          </section>

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
        </form>
      </section>
    </section>
  );
}

export default LoginPage;
