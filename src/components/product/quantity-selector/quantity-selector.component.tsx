"use client";

import { FaMinus, FaPlus } from "react-icons/fa6";
import styles from "./quantity-selector.module.css";

type Props = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

const QuantitySelector: React.FC<Readonly<Props>> = ({ quantity, onQuantityChange }) => {
  const onValueChanged = (value: number) => {
    if ((quantity + value) < 0) return;
    onQuantityChange(quantity + value);
  };

  return (
    <section className={styles.buttonsContainer}>
      <button
        className={(quantity === 0) ? styles["buttons--disabled"] : styles.buttons}
        disabled={quantity === 0}
        onClick={() => onValueChanged(-1)}
      >
        <FaMinus className={styles.buttonsIcon} />
      </button>

      <div className={styles.quantity}>
        {quantity}
      </div>

      <button
        className={styles.buttons}
        onClick={() => onValueChanged(+1)}
      >
        <FaPlus className={styles.buttonsIcon} />
      </button>
    </section>
  );

};

export default QuantitySelector;
