"use client";

import { FC, useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import styles from "./add-to-cart.module.css";
import { FaInfoCircle } from "react-icons/fa"
import { Size } from "@/interfaces";
import clsx from "clsx";

type Props = {
  sizes: Size[];
};

const AddToCart: FC<Props> = ({ sizes }) => {

  const [ size, setSize ] = useState<Size|undefined>();
  const [ quantity, setQuantity ] = useState<number>(1);
  const [ posted, setPosted ] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log("============ CART ============");
    console.log("Size:", size);
    console.log("Quantity:", quantity);
    console.log("==============================");
  };

  return (
    <>
      <div className={clsx({
        [`${styles.errorBox} fade-in`]: !size && posted,
      })}>
        <SizeSelector
          sizeSelected={size}
          availableSizes={sizes}
          onSizeSelected={setSize}
        />
      </div>

      {!size && posted && (
        <div className={`${styles.errorMessage} fade-in`}>
          <FaInfoCircle />
          <span className="text-md">You must select a size before adding to cart</span>
        </div>
      )}

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