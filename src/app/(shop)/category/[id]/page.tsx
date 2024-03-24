import { Metadata } from 'next';
import styles from './page.module.css';
import { paragraph, titleFont } from '@/config/fonts';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: "Teslo Shop - Category",
  description: "Category Page",
  robots: "noindex, nofollow",
};

const headingClasses = [titleFont.className, styles.heading].join(' ');
const paragraphClasses = [paragraph.className, styles.paragraph].join(' ');
const allowedCategories = [ "men", "woman", "kids" ];

type Props = {
  params: {
    id: string;
  };
};


const NewAccountPage: React.FC<Readonly<Props>> = ({ params: { id } }) => {

  if (!allowedCategories.includes(id)) {
    notFound();
  }

  return (
    <>
      <h1 className={headingClasses}>
        Category: { id } 
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </>
  );
}

export default NewAccountPage;
