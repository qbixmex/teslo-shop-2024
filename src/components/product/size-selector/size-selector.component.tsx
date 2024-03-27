"use client";

import type { Size } from "@/interfaces";
import styles from "./size-selector.module.css";
import clsx from "clsx";

type Props = {
  sizeSelected: Size;
  availableSizes: Size[];
};

const SizeSelector: React.FC<Readonly<Props>> = ({ sizeSelected, availableSizes }) => {

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
            onClick={() => console.log(size + ': selected')}
          >{size}</button>
        ))}
      </section>
    </section>
  );

};

export default SizeSelector;
