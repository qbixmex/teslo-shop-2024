'use client';

import { FaCheck } from 'react-icons/fa';
import styles from './address-form.module.css';

const AddressForm = () => {
  return (
    <form onSubmit={() => { }}>
      <section className={styles.fieldsContainer}>
        <section className={styles.fieldsColumn}>
          {/* Name */}
          <div className="flex flex-col mb-2">
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              defaultValue="Bart"
              className={styles.field}
            />
          </div>
          {/* Last name */}
          <div className="flex flex-col mb-2">
            <label htmlFor="last_name" className={styles.label}>Last Name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="off"
              defaultValue="Simpson"
              className={styles.field}
            />
          </div>
          {/* Address */}
          <div className="flex flex-col mb-2">
            <label htmlFor="address" className={styles.label}>Address</label>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="off"
              defaultValue="742 Evergreen Terrace"
              className={styles.field}
            />
          </div>
          {/* Address 2 */}
          <div className="flex flex-col mb-2">
            <label htmlFor="address_2" className={styles.label}>Address 2 (opcional)</label>
            <input
              id="address_2"
              name="address_2"
              type="text"
              autoComplete="off"
              defaultValue="Apt 1234"
              className={styles.field}
            />
          </div>
        </section>
        <section className={styles.fieldsColumn}>
          {/* Postal Code */}
          <div className="flex flex-col mb-2">
            <label htmlFor="postal_code" className={styles.label}>Postal Code</label>
            <input
              id="postal_code"
              name="postal_code"
              type="text"
              autoComplete="off"
              defaultValue="12345"
              className={styles.field}
            />
          </div>
          {/* Phone */}
          <div className="flex flex-col mb-2">
            <label htmlFor="phone" className={styles.label}>Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              autoComplete="off"
              defaultValue="123-456-7890"
              className={styles.field}
            />
          </div>
          {/* City */}
          <div className="flex flex-col mb-2">
            <label htmlFor="city" className={styles.label}>City</label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="off"
              defaultValue="Springfield"
              className={styles.field}
            />
          </div>
          {/* Country */}
          <div className="flex flex-col mb-2">
            <label htmlFor="country" className={styles.label}>Country</label>
            <select
              id="country"
              name="country"
              className={styles.field}
              defaultValue="select"
            >
              <option value="select" disabled>Select an option</option>
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
              <option value="mexico">Mexico</option>
            </select>
          </div>
        </section>
      </section>

      <section className={styles.checkboxContainer}>
        <label className={styles.checkboxLabel} htmlFor="checkbox">
        <input
          id="checkbox"
          type="checkbox"
          className={`peer ${styles.checkboxInput}`}
        />
          <div className={`${styles.checkContainer} peer-checked:opacity-100`}>
            <FaCheck className={styles.checkIcon} />
          </div>
        </label>
        <span className={styles.checkboxMessage}>Remember this address for future purchases.</span>
      </section>

      {/* Next Button */}
      <div className={styles.nextBTNContainer}>
        <button className={styles.nextBTN}>Next</button>
      </div>
    </form>
  );
};

export default AddressForm;
