"use client";

import { FC, useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import styles from "./add-to-cart.module.css";
import { FaInfoCircle } from "react-icons/fa"
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import clsx from "clsx";

type Props = {
  product: Product;
};

const AddToCart: FC<Props> = ({ product }) => {

  const addProductToCart = useCartStore(state => state.addProduct);
  const [ size, setSize ] = useState<Size|undefined>();
  const [ quantity, setQuantity ] = useState<number>(1);
  const [ posted, setPosted ] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price ?? 0.00,
      quantity,
      size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      <div className={clsx({
        [`${styles.errorBox} fade-in`]: !size && posted,
      })}>
        <SizeSelector
          sizeSelected={size}
          availableSizes={product.sizes}
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