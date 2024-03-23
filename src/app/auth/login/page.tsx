import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Teslo Shop - Login",
  description: "Login Page",
  robots: "noindex, nofollow",
};

const LoginPage = () => {
  return (
    <>
      <h1 className={styles.heading}>
        Login Page
      </h1>
      <p className="">
        This website is under construction
      </p>
    </>
  );
}

export default LoginPage;
