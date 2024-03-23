import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Teslo Shop - New Account",
  description: "New Account Page",
  robots: "noindex, nofollow",
};

const NewAccountPage = () => {
  return (
    <>
      <h1 className={styles.heading}>
        New Account
      </h1>
      <p className="">
        This website is under construction
      </p>
    </>
  );
}

export default NewAccountPage;
