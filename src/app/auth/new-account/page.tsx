import { Metadata } from 'next';
import styles from '../auth.module.css';
import Link from 'next/link';

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
          <section className={styles.group}>
            <label className={styles.label} htmlFor="name">Full Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className={styles.field}
              autoComplete="off"
            />
          </section>
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
          <section className={styles.group}>
            <label className={styles.label} htmlFor="password_confirmation">
              Password Confirmation
            </label>
            <input
              type="password_confirmation"
              id="password_confirmation"
              name="password_confirmation"
              className={styles.field}
              required
            />
          </section>
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
