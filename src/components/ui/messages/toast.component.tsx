import { FC, ReactNode } from 'react';
import styles from './toast.module.css';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  type?: 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error';
};

const Toast: FC<Props> = ({ children, type = 'secondary' }) => {
  return (
    <div className={clsx(styles.base, {
      [styles.primary]:   type === 'primary',
      [styles.secondary]:   type === 'secondary',
      [styles.info]:    type === 'info',
      [styles.warning]: type === 'warning',
      [styles.error]:    type === 'error',
      [styles.success]:  type === 'success',
    })}>{ children }</div>
  );
};

export default Toast;