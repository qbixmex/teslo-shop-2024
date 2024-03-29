import { Metadata } from 'next';
import styles from '../auth.module.css';
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
        <form action="#">
          <section className={styles.group}>
            <label className={styles.label} htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className={styles.field}
              autoComplete="off"
            />
          </section>
          <section className={styles.group}>
            <label htmlFor="password" className={styles.label}>
              password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value=""
              required
              className={styles.field}
              autoComplete="off"
            />
          </section>
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
