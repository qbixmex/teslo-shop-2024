import { Title } from '@/components';
import { Metadata } from 'next';
import AddressForm from './ui/address-form';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Teslo Shop - Address",
  description: "Address Page",
  robots: "noindex, nofollow",
};

const AddressPage = () => {
  return (
    <section className={styles.container}>
      <section className={styles.subContainer}>
        <Title title="Address" subtitle="Delivery Address" />
        <AddressForm />
      </section>
    </section>
  );
};

export default AddressPage;
