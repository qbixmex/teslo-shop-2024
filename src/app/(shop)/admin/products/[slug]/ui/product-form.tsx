'use client';

import { FC } from "react";
import { Category, Product } from "@/interfaces";
import styles from "./product-form.module.css";
import clsx from 'clsx';

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

type Props = {
  product: Product;
  categories: Category[];
};

const ProductForm: FC<Props> = ({ product, categories }) => {
  return (
    <form>
      <div className={styles.mainContainer}>
        {/* TEXTS */}
        <div className={styles.textsContainer}>
          {/* TITLE */}
          <div className={styles.inputGroup}>
            <label className={styles.formLabel} htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className={styles.formInput}
            />
          </div>

          {/* SLUG */}
          <div className={styles.inputGroup}>
            <label className={styles.formLabel} htmlFor="slug">Slug</label>
            <input
              id="slug"
              type="text"
              className={styles.formInput}
            />
          </div>

          {/* DESCRIPTION */}
          <div className={styles.inputGroup}>
            <label className={styles.formLabel} htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={5}
              className={styles.formTextArea}
            ></textarea>
          </div>

          {/* PRICE */}
          <div className={styles.inputGroup}>
            <label className={styles.formLabel} htmlFor="price">Price</label>
            <input id="price" type="number" className={styles.formInput} />
          </div>

          {/* TAGS */}
          <div className={styles.inputGroup}>
            <label className={styles.formLabel} htmlFor="tags">Tags</label>
            <input id="tags" type="text" className={styles.formInput} />
          </div>

          {/* GENDER */}
          <div className={styles.inputGroup}>
            <label className={styles.formLabel} htmlFor="gender">Gender</label>
            <select
              id="gender"
              className={styles.formInput}
              defaultValue="select-gender"
            >
              <option value="select-gender" disabled>Select Gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* CATEGORY */}
          <div className={styles.inputGroup}>
            <label className={styles.formLabel} htmlFor="category">Category</label>
            <select
              id="category"
              className={styles.formInput}
              defaultValue="select"
            >
              <option value="select" disabled>Select a Category</option>
              {categories.map((category) =>(
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* SIZES and IMAGES */}
        <div className={styles.sizesAndImages}>
          {/* SIZES */}
          <div className={styles.sizesGroup}>
            <label className={styles.formLabel}>Sizes</label>
            <div className={styles.formSizes}>
              {
                sizes.map(size => (
                  <div key={size} className={clsx(styles.formSize, {
                    [styles.formSelectedSize]: false, // TODO: Change Dynamically
                  })}>{size}</div>
                ))
              }
            </div>

            {/* IMAGES */}
            <div className="flex flex-col mb-2">
              <label className={styles.formLabel} htmlFor="images">Images</label>
              <input
                id="images"
                type="file"
                multiple
                className={styles.formImages}
                accept="image/png, image/jpeg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className={styles.submitContainer}>
          <button
            type="submit"
            className={styles.formSubmitBtn}
          >save</button>
        </div>
    </form>
  );
};

export default ProductForm;