'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import styles from './address-form.module.css';
import { Alert } from '@/components';
import clsx from 'clsx';

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  phone: string;
  city: string;
  country: string;
  rememberAddress: boolean;
};

const AddressForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      // TODO: Add default values
    },
  });

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');

    console.table(data);

    // SERVER ACTION
    // const response = await saveAddress(data);

    // if (!response.ok) {
    //   setErrorMessage(response.message);
    //   return;
    // }
  };

  return (
    <>
      {errorMessage && (
        <Alert type="error" withIcon>{errorMessage}</Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.fieldsContainer}>
          <section className={styles.fieldsColumn}>
            {/* First Name */}
            <div className="flex flex-col mb-2">
              <label htmlFor="name" className={styles.label}>First Name</label>
              <input
                id="firstName"
                type="text"
                autoComplete="off"
                autoFocus
                className={clsx(styles.field, {
                  [styles.fieldError]: errors.firstName
                })}
                {...register('firstName', {
                  required: 'First Name is required',
                  minLength: {
                    value: 3,
                    message: 'First Name must have at least 3 characters'
                  }
                })}
              />
              {errors.firstName && (
                <p className={styles.errorMessage}>
                  * {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last name */}
            <div className="flex flex-col mb-2">
              <label htmlFor="last_name" className={styles.label}>Last Name</label>
              <input
                id="lastName"
                type="text"
                autoComplete="off"
                className={clsx(styles.field, {
                  [styles.fieldError]: errors.lastName
                })}
                {...register('lastName', {
                  required: 'Last Name is required',
                  minLength: {
                    value: 3,
                    message: 'Last Name must have at least 3 characters'
                  }
                })}
              />
              {errors.lastName && (
                <p className={styles.errorMessage}>
                  * {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col mb-2">
              <label htmlFor="address" className={styles.label}>Address</label>
              <input
                id="address"
                type="text"
                autoComplete="off"
                className={clsx(styles.field, {
                  [styles.fieldError]: errors.address
                })}
                {...register('address', {
                  required: 'Address is required',
                  minLength: {
                    value: 8,
                    message: 'Address must have at least 8 characters'
                  }
                })}
              />
              {errors.address && (
                <p className={styles.errorMessage}>
                  * {errors.address.message}
                </p>
              )}
            </div>

            {/* Address 2 */}
            <div className="flex flex-col mb-2">
              <label htmlFor="address_2" className={styles.label}>Address 2 (opcional)</label>
              <input
                id="address_2"
                type="text"
                autoComplete="off"
                className={clsx(styles.field, {
                  [styles.fieldError]: errors.address2
                })}
                {...register('address2', {
                  minLength: {
                    value: 8,
                    message: 'Address must have at least 8 characters'
                  }
                })}
              />
              {errors.address2 && (
                <p className={styles.errorMessage}>
                  * {errors.address2.message}
                </p>
              )}
            </div>
          </section>
          <section className={styles.fieldsColumn}>

            {/* Postal Code */}
            <div className="flex flex-col mb-2">
              <label htmlFor="postal_code" className={styles.label}>Postal Code</label>
              <input
                id="postalCode"
                type="text"
                autoComplete="off"
                className={clsx(styles.field, {
                  [styles.fieldError]: errors.postalCode
                })}
                {...register('postalCode', {
                  required: 'Postal code is required',
                  minLength: {
                    value: 6,
                    message: 'Postal code must have at least 6 characters'
                  }
                })}
              />
              {errors.postalCode && (
                <p className={styles.errorMessage}>
                  * {errors.postalCode.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col mb-2">
              <label htmlFor="phone" className={styles.label}>Phone</label>
              <input
                id="phone"
                type="tel"
                autoComplete="off"
                className={clsx(styles.field, {
                  [styles.fieldError]: errors.phone
                })}
                {...register('phone', {
                  required: 'Phone is required',
                  min: {
                    value: 10,
                    message: 'Phone must have at least 10 digits'
                  }
                })}
              />
              {errors.phone && (
                <p className={styles.errorMessage}>
                  * {errors.phone.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col mb-2">
              <label htmlFor="city" className={styles.label}>City</label>
              <input
                id="city"
                type="text"
                autoComplete="off"
                className={clsx(styles.field, {
                  [styles.fieldError]: errors.city
                })}
                {...register('city', {
                  required: 'City is required',
                  minLength: {
                    value: 3,
                    message: 'City must have at least 3 characters'
                  }
                })}
              />
              {errors.city && (
                <p className={styles.errorMessage}>
                  * {errors.city.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col mb-2">
              <label htmlFor="country" className={styles.label}>Country</label>
              <select
                id="country"
                defaultValue="select"
                className={clsx(styles.field, {
                  [styles.selectError]: errors.country
                })}
                {...register('country', {
                  required: 'Country is required',
                  validate: (value) => value !== 'select' || 'Country is required',
                })}
              >
                <option value="select" disabled>Select an option</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
                <option value="mexico">Mexico</option>
              </select>
              {errors.country && (
                <p className={styles.errorMessage}>
                  * {errors.country.message}
                </p>
              )}
            </div>
          </section>
        </section>
        <section className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel} htmlFor="checkbox">
            <input
              id="checkbox"
              type="checkbox"
              className={`peer ${styles.checkboxInput}`}
              {...register('rememberAddress')}
            />
            <div className={`${styles.checkContainer} peer-checked:opacity-100`}>
              <FaCheck className={styles.checkIcon} />
            </div>
          </label>
          <span className={styles.checkboxMessage}>Remember this address for future purchases.</span>
        </section>

        {/* Next Button */}
        <div className={styles.nextBTNContainer}>
          <button
            type="submit"
            disabled={false}
            className={clsx({
              [styles.nextBTN]: true,
              [styles.nextBTNDisabled]: false
            })}
          >Next</button>
        </div>

      </form>
    </>
  );
};

export default AddressForm;
