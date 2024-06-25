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
  const [ quantity, setQuantity ] = useState<number>(1);

  const addToCart = () => {
    if (!size) return;
    console.log("============ CART ============");
    console.log("Size:", size);
    console.log("Quantity:", quantity);
    console.log("==============================");
  };

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
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        <button
          className={styles.addToCart}
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </section>
    </>
  );
};

export default AddToCart;