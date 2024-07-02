'use client';

import { FC } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import styles from './paypal.button.module.css';

type Props = {
  layout?: 'horizontal' | 'vertical';
};

const PaypalButton: FC<Props> = ({ layout = 'horizontal' }) => {

  const [{ isPending }] = usePayPalScriptReducer();

  if (!isPending) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <PayPalButtons style={{ layout }} />
  );
};

export default PaypalButton;
