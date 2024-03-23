import { titleFont, paragraph } from '@/config/fonts';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Product",
  description: "Product Page",
  robots: "noindex, nofollow",
};

const headingClasses = [titleFont.className, styles.heading].join(' ');
const paragraphClasses = [paragraph.className, styles.paragraph].join(' ');

export const ProductPage = () => {
  return (
    <div>
      <h1 className={headingClasses}>
        Product Page
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </div>
  );
};

export default ProductPage;
