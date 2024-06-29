"use client";

import { FC, useEffect, useState } from "react";
import styles from "./stock-label.module.css";
import { getStockById } from "@/actions";

type Props = {
  productId: string;
};

const StockLabel: FC<Props> = ({ productId }) => {

  const [ inStock, setInStock ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);
  
  useEffect(() => {
    getStockById(productId)
      .then((stock) => {
        setInStock(stock);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <>
      {isLoading ? (
        <p className={styles.stockSkeleton}>
          <span className={styles.stockSkeletonLabel}>In Stock:</span>&nbsp;
          <span className={styles.stockSkeletonQty}>&nbsp;</span>
        </p>
      ): (
        <p className={styles.stock}>
          <span>In Stock:</span>&nbsp;
          <span className={styles.stockQty}>
            {inStock}
          </span>
        </p>
      )}
    </>
  );

};

export default StockLabel;
