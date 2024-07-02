'use client';

import { FC } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type {
  CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions,
} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';
import styles from './paypal.button.module.css';

type Props = {
  options: {
    orderId: string;
    amount: number;
    layout?: 'horizontal' | 'vertical';
  }
};

const PaypalButton: FC<Props> = ({ options }) => {

  const { orderId, amount, layout = 'vertical' } = options;

  const roundedAmount = (Math.round(amount * 100)) / 100;

  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
      </div>
    );
  }

  const onCreateOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          // invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`,
            currency_code: 'USD',
          },
        },
      ],
      intent: 'CAPTURE',
    });

    // console.log({ transactionId });

    // Add transactionId to the order to the database.
    const { ok, message } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      console.log(`Message: ${message}`);
    }

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    console.log('============ onApprove ============');
    const details = await actions.order?.capture();
    if (!details?.id) return;
    await paypalCheckPayment(details.id);
  };

  return (
    <PayPalButtons
      style={{ layout }}
      createOrder={onCreateOrder}
      onApprove={onApprove}
    />
  );
};

export default PaypalButton;
