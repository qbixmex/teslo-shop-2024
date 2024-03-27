import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Address",
  description: "Address Page",
  robots: "noindex, nofollow",
};

export const AddressPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Address Page
      </h1>
      <p className={styles.paragraph}>
        This website is under construction
      </p>
    </div>
  );
};

export default AddressPage;
