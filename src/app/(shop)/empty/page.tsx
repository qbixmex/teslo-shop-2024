import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Empty",
  description: "Empty Page",
  robots: "noindex, nofollow",
};

const EmptyPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Empty Page
      </h1>
      <p className={styles.paragraph}>
        This website is under construction
      </p>
    </div>
  );
};

export default EmptyPage;
