"use client";

import { FaMinus, FaPlus } from "react-icons/fa6";
import styles from "./quantity-selector.module.css";
import { useState } from "react";

type Props = {
  quantity?: number;
};

const QuantitySelector: React.FC<Readonly<Props>> = ({ quantity = 0 }) => {
  const [ value, setValue ] = useState(quantity)
  return (
    <section className={styles.buttonsContainer}>
      <button
        className={styles.buttons}
        onClick={() => setValue(value + 1)}
      >
        <FaPlus className={styles.buttonsIcon} />
      </button>
      <div className={styles.quantity}>
        {value}
      </div>
      <button
        className={styles.buttons}
        onClick={() => {
          if (value > 0) {
            setValue(value - 1);
          }
        }}
      >
        <FaMinus className={styles.buttonsIcon} />
      </button>
    </section>
  );

};

export default QuantitySelector;
