"use client";

import { FC, useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import styles from "./add-to-cart.module.css";
import { Size } from "@/interfaces";

type Props = {
  sizes: Size[];
};

const AddToCart: FC<Props> = ({ sizes }) => {

  const [ size, setSize ] = useState<Size|undefined>();

  return (
    <>
      <SizeSelector
        sizeSelected={size}
        availableSizes={sizes}
        onSizeSelected={setSize}
      />

      {/* Quantity */}
      <section>
        <h2 className={styles.heading}>Quantity</h2>

        {/* Quantity Selector */}
        <QuantitySelector />

        <button className={styles.addToCart}>
          Add to Cart
        </button>
      </section>
    </>
  );
};

export default AddToCart;