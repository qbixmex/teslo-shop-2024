import { Metadata } from 'next';
import styles from './page.module.css';
import { paragraph, titleFont } from '@/config/fonts';

export const metadata: Metadata = {
  title: "Teslo Shop - Category",
  description: "Category Page",
  robots: "noindex, nofollow",
};

const headingClasses = [titleFont.className, styles.heading].join(' ');
const paragraphClasses = [paragraph.className, styles.paragraph].join(' ');

const NewAccountPage = () => {
  return (
    <>
      <h1 className={headingClasses}>
        Category Page
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </>
  );
}

export default NewAccountPage;
