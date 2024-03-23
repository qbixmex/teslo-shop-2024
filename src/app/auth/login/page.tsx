import { Metadata } from 'next';
import styles from './page.module.css';
import { paragraph, titleFont } from '@/config/fonts';

export const metadata: Metadata = {
  title: "Teslo Shop - Login",
  description: "Login Page",
  robots: "noindex, nofollow",
};

const headingClasses = [titleFont.className, styles.heading].join(' ');
const paragraphClasses = [paragraph.className, styles.paragraph].join(' ');

const LoginPage = () => {
  return (
    <>
      <h1 className={headingClasses}>
        Login Page
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </>
  );
}

export default LoginPage;
