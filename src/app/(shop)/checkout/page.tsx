import { titleFont, paragraph } from '@/config/fonts';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Checkout",
  description: "Category Page",
  robots: "noindex, nofollow",
};

const headingClasses = [titleFont.className, styles.heading].join(' ');
const paragraphClasses = [paragraph.className, styles.paragraph].join(' ');

export const CheckoutPage = () => {
  return (
    <div>
      <h1 className={headingClasses}>
        Checkout Page
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </div>
  );
};

export default CheckoutPage;
