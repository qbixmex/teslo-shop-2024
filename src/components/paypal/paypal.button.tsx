'use client';

import { FC } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

type Props = {
  layout?: 'horizontal' | 'vertical';
};

const PaypalButton: FC<Props> = ({ layout = 'horizontal' }) => {
  return (
    <PayPalButtons style={{ layout }} />
  );
};

export default PaypalButton;
