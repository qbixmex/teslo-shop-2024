"use client";

import { FaMinus, FaPlus } from "react-icons/fa6";
import styles from "./quantity-selector.module.css";
import { useState } from "react";

type Props = {
  quantity?: number;
};

const QuantitySelector: React.FC<Readonly<Props>> = ({ quantity = 0 }) => {
  const [ value, setValue ] = useState(quantity);

  const handleIncrement = () => {
    setValue(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (value > 0) setValue(prev => prev - 1);
  };

  return (
    <section className={styles.buttonsContainer}>
      {
        <button
          className={styles.buttons}
          onClick={handleIncrement}
        >
          <FaPlus className={styles.buttonsIcon} />
        </button>
      }
      <div className={styles.quantity}>
        {value}
      </div>
      <button
        className={(value === 0) ? styles["buttons--disabled"] : styles.buttons}
        disabled={value === 0}
        onClick={handleDecrement}
      >
        <FaMinus className={styles.buttonsIcon} />
      </button>
    </section>
  );

};

export default QuantitySelector;
