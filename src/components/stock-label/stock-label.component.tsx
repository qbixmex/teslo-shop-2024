"use client";

import { FC, useEffect, useState } from "react";
import styles from "./stock-label.module.css";
import { GetStockById } from "@/actions";

type Props = {
  productId: string;
};

const StockLabel: FC<Props> = ({ productId }) => {

  const [ inStock, setInStock ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);

  const getStock = async () => {
    const stock = await GetStockById(productId);
    setInStock(stock);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <p className={styles.stock}>
      <span>In Stock:</span>&nbsp;
      <span className={styles.stockQty}>
        { isLoading ? "Loading ..." : inStock }
      </span>
    </p>
  );
};

export default StockLabel;
