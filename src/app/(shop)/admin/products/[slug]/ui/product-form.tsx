/* eslint-disable @next/next/no-img-element */
'use client';

import { FC, useState } from "react";
import { Category, Product } from "@/interfaces";
import styles from "./product-form.module.css";
import clsx from 'clsx';
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Alert } from "@/components";
import { FaTrash } from 'react-icons/fa';

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

type Props = {
  product: Product;
  categories: Category[];
};

type FormInputs = {
  title: string;
  slug: string;
  description: string;
  price: number;
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex' | 'select_gender';
  categoryId: string;
  sizes: string[];
  image?: any;
};

const ProductForm: FC<Props> = ({ product, categories }) => {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: Number(product.price) ?? 0,
      tags: product.tags.join(', '),
      gender: product.gender,
      categoryId: product.categoryId,
      sizes: product.sizes ?? [],
      // TODO: images TODO
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    setErrorMessage('');

    // const { rememberAddress, ...addressWithoutRememberAddress } = formData;
    

    router.push('/checkout');

  };
  
  return (
    <>
      {errorMessage && (
        <Alert type="error" withIcon>{errorMessage}</Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.mainContainer}>
          {/* TEXTS */}
          <div className={styles.textsContainer}>
            {/* TITLE */}
            <div className={styles.inputGroup}>
              <label className={styles.formLabel} htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                autoComplete="off"
                // autoFocus // TODO: Put true if we are in new product
                className={clsx(styles.formInput, {
                  [styles.fieldError]: errors.title
                })}
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 8,
                    message: 'Title must have at least 8 characters'
                  }
                })}
              />
              {errors.title && (
                <p className={styles.errorMessage}>
                  * {errors.title.message}
                </p>
              )}
            </div>
            {/* SLUG */}
            <div className={styles.inputGroup}>
              <label className={styles.formLabel} htmlFor="slug">Slug</label>
              <input
                id="slug"
                type="text"
                autoComplete="off"
                className={clsx(styles.formInput, {
                  [styles.fieldError]: errors.slug
                })}
                {...register('slug', {
                  required: 'Slug is required',
                  minLength: {
                    value: 8,
                    message: 'Slug must have at least 8 characters'
                  }
                })}
              />
              {errors.slug && (
                <p className={styles.errorMessage}>
                  * {errors.slug.message}
                </p>
              )}
            </div>
            {/* DESCRIPTION */}
            <div className={styles.inputGroup}>
              <label className={styles.formLabel} htmlFor="description">Description</label>
              <textarea
                id="description"
                rows={5}
                className={clsx(styles.formTextArea, {
                  [styles.fieldError]: errors.description
                })}
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 8,
                    message: 'Description must have at least 8 characters'
                  }
                })}
              ></textarea>
              {errors.description && (
                <p className={styles.errorMessage}>
                  * {errors.description.message}
                </p>
              )}
            </div>
            {/* PRICE */}
            <div className={styles.inputGroup}>
              <label className={styles.formLabel} htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                autoComplete="off"
                className={clsx(styles.formInput, {
                  [styles.fieldError]: errors.price
                })}
                {...register('price', {
                  required: 'Price is required',
                  min: {
                    value: 1,
                    message: 'Price must have at least 1 unit'
                  }
                })}
              />
              {errors.price && (
                <p className={styles.errorMessage}>
                  * {errors.price.message}
                </p>
              )}
            </div>
            {/* TAGS */}
            <div className={styles.inputGroup}>
              <label className={styles.formLabel} htmlFor="tags">Tags</label>
              <input
                id="tags"
                type="text"
                autoComplete="off"
                className={clsx(styles.formInput, {
                  [styles.fieldError]: errors.tags
                })}
                {...register('tags', {
                  required: 'Tags is required',
                })}
              />
              {errors.tags && (
                <p className={styles.errorMessage}>
                  * {errors.tags.message}
                </p>
              )}
            </div>
            {/* GENDER */}
            <div className={styles.inputGroup}>
              <label className={styles.formLabel} htmlFor="gender">Gender</label>
              <select
                id="gender"
                defaultValue="select_gender"
                className={clsx(styles.formInput, {
                  [styles.fieldError]: errors.gender
                })}
                {...register('gender', {
                  required: 'Gender is required',
                  validate: (value) => value !== 'select_gender' || 'Gender is required',
                })}
              >
                <option value="select_gender" disabled>Select Gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
                <option value="unisex">Unisex</option>
              </select>
              {errors.gender && (
                <p className={styles.errorMessage}>
                  * {errors.gender.message}
                </p>
              )}
            </div>
            {/* CATEGORY */}
            <div className={styles.inputGroup}>
              <label className={styles.formLabel} htmlFor="category">Category</label>
              <select
                id="category"
                defaultValue="select_category"
                className={clsx(styles.formInput, {
                  [styles.fieldError]: errors.categoryId
                })}
                {...register('categoryId', {
                  required: 'Category is required',
                  validate: (value) => value !== 'select_category' || 'Category is required',
                })}
              >
                <option value="select_category" disabled>Select a Category</option>
                {categories.map((category) =>(
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.categoryId && (
                <p className={styles.errorMessage}>
                  * {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>
          {/* SIZES and IMAGES */}
          <div className={styles.sizesAndImages}>
            {/* SIZES */}
            <div className={styles.sizesGroup}>
              <label className={styles.formLabel}>Size</label>
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

              {product.images.length !== 0 && (
                <>
                  <h2 className="text-2xl text-gray-700 mb-2">Loaded Images</h2>
                  <div className={clsx(`grid grid-cols-2 md:grid-cols-3 gap-3`, {
                    'lg:grid-cols-2': product.images.length === 2,
                    'lg:grid-cols-4': product.images.length === 4,
                  })}>
                    { product.images.map((image) => (
                      <div key={image.id} className="flex flex-col gap-4 relative">
                        <img
                          
                          className={clsx(`w-full max-w-200px md:max-w-[180px] shadow-md p-1 border-2 border-white bg-white rounded`, {
                            'lg:max-w-[400px]': product.images.length === 2,
                          })}
                          src={`/products/${image.url}`}
                          alt={product.title}
                        />
                        <button
                          type="button"
                          className="absolute bottom-3 right-3 rounded-md p-3 bg-red-600 hover:bg-red-700 text-white text-sm place-self-end transition-colors"
                          title="Delete Image"
                          onClick={() => console.table({id: image.id, url: image.url})}
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
    </>
  );
};

export default ProductForm;