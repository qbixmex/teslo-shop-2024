"use client";

import { FC, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import styles from './form-fields.module.css';

type Props = {
  register?: boolean;
};

const PASSWORDS_DATA = {
  password: false,
  passwordConfirmation: false,
};

const FormFields: FC<Readonly<Props>> = ({ register = false }) => {
  const [ isVisible, setIsVisible ] = useState(PASSWORDS_DATA);

  const handleVisibly = (field: 'password' | 'passwordConfirmation') => {
    return setIsVisible(prev => ({
      ...prev,
      password: (field === 'password') && !prev.password,
      passwordConfirmation: (field === 'passwordConfirmation') && !prev.passwordConfirmation
    }));
  };

  return (
    <>
      {register && (
        <section className={styles.group}>
          <label className={styles.label} htmlFor="name">Full Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className={styles.field}
            autoComplete="off"
            value="Daniel González"
          />
        </section>
      )}

      <section className={styles.group}>
        <label className={styles.label} htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className={styles.field}
          autoComplete="off"
          value="daniel@gmail.com"
        />
      </section>

      <section className={styles.group}>
        <label htmlFor="password" className={styles.label}>
          password
        </label>
        <input
          id="password"
          name="password"
          type={isVisible.password ? 'text' : 'password'}
          required
          className={styles.field}
          autoComplete="off"
          value="123456"
        />
        {
          (isVisible.password)
            ? <IoEye onClick={() => handleVisibly('password')} className={styles.fieldIcon} />
            : <IoEyeOff onClick={() => handleVisibly('password')} className={styles.fieldIcon} />
        }
      </section>

      {(register) && (
        <section className={styles.group}>
          <label className={styles.label} htmlFor="passwordConfirmation">
            Password Confirmation
          </label>
          <input
            type={isVisible.passwordConfirmation ? 'text' : 'password'}
            id="passwordConfirmation"
            name="passwordConfirmation"
            className={styles.field}
            required
            value="123456"
          />
          {(isVisible.passwordConfirmation)
            ? (
              <IoEye
                onClick={() => handleVisibly('passwordConfirmation')}
                className={styles.fieldIcon}
              />
            ) : (
              <IoEyeOff
                onClick={() => handleVisibly('passwordConfirmation')}
                className={styles.fieldIcon}
              />
          )}
        </section>
      )}
    </>
  );
};

export default FormFields
  ;
