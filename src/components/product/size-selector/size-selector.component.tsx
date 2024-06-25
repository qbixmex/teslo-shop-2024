"use client";

import type { Size } from "@/interfaces";
import styles from "./size-selector.module.css";
import clsx from "clsx";

type Props = {
  sizeSelected?: Size;
  availableSizes: Size[];
  onSizeSelected: (size: Size) => void;
};

const SizeSelector: React.FC<Readonly<Props>> = ({
  sizeSelected,
  availableSizes,
  onSizeSelected,
}) => {
  return (
    <section className={styles.sizeSection}>
      <h2 className={styles.heading}>Available Sizes</h2>
      <section className={styles.sizesContainer}>
        {availableSizes.map(size => (
          <button
            key={size}
            className={clsx(styles.sizeBTN,
              {[styles['size--selected']]: (sizeSelected === size)}
            )}
            onClick={() => onSizeSelected(size)}
          >{size}</button>
        ))}
      </section>
    </section>
  );
};

export default SizeSelector;
