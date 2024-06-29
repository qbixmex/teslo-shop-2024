import { Title } from '@/components';
import { Metadata } from 'next';
import AddressForm from './ui/address-form';
import { getCountries, getUserAddress } from '@/actions';
import styles from './page.module.css';
import { auth } from '@/auth.config';

export const metadata: Metadata = {
  title: "Teslo Shop - Address",
  description: "Address Page",
  robots: "noindex, nofollow",
};

const AddressPage = async () => {

  const session = await auth();

  if (!session?.user) {
    return (
      <h2 className="text-red-500 text-2xl">There&apos;s no session !</h2>
    )
  }

  const countries = await getCountries();
  const userAddress = await getUserAddress(session.user.id);

  return (
    <section className={styles.container}>
      <section className={styles.subContainer}>
        <Title title="Address" subtitle="Delivery Address" />
        <AddressForm
          countries={countries}
          userStoreAddress={userAddress ?? undefined}
        />
      </section>
    </section>
  );
};

export default AddressPage;
