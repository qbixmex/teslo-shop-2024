/* eslint-disable @next/next/no-img-element */
'use client';

import { FC, useState } from "react";
import { Category, Product, ProductImage } from "@/interfaces";
import styles from "./product-form.module.css";
import clsx from 'clsx';
import { SubmitHandler, useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { Alert } from "@/components";
import { FaTrash } from 'react-icons/fa';
import { createProduct, updateProduct } from "@/actions";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

type Props = {
  product: Partial<Product> & { productImage?: ProductImage[] };
  categories: Category[];
};

type FormInputs = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex' | 'select_gender';
  categoryId: string;
  sizes: string[];
  image?: any;
};

const ProductForm: FC<Props> = ({ product, categories }) => {

  // const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      title: product.title ?? 'Workout Running Shirt',
      slug: product.slug ?? 'workout-running-shirt',
      description: product.description ?? "Whether you're lifting weights at the gym, running down the track or exercising at home, you can count on our quick-drying tee-shirts to keep you cool, dry and comfy the entire time. Premium soft fabric with excellent moisture wicking ability keep you dry and comfort during training so you can focus on other more important things.",
      price: product.price ?? 37.35,
      inStock: product.inStock ?? 20,
      tags: product.tags?.join(', ') ?? 'workout, running, shirt',
      gender: product.gender ?? 'men',
      categoryId: product.categoryId ?? categories[3].id,
      sizes: product.sizes ?? ['XS', 'S', 'M', 'L', 'XL'],
      // TODO: images TODO
    }
  });

  // Reload the form when the product sizes changes
  watch('sizes');

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    (sizes.has(size)) ? sizes.delete(size) : sizes.add(size);
    setValue('sizes', Array.from(sizes));
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');

    const formData = new FormData();

    const { ...productToSave } = data;

    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('tags', productToSave.tags);
    formData.append('gender', productToSave.gender);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('sizes', productToSave.sizes.join(','));

    let response: {
      ok: boolean;
      message: string;
    } = { ok: false, message: 'No action has been called !' };

    if (product.id) {
      response = await updateProduct(product?.id as string, formData);
    }
    
    if (product.id === undefined) {
      response = await createProduct(formData);
    }
    
    console.log("RESPONSE:", response);

    // TODO: router.push('/admin/products');

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
                step="0.01"
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

            {/* In Stock */}
            <div className={styles.inputGroup}>
              <label className={styles.formLabel} htmlFor="in_stock">In Stock</label>
              <input
                id="in_stock"
                type="number"
                autoComplete="off"
                className={clsx(styles.formInput, {
                  [styles.fieldError]: errors.inStock
                })}
                {...register('inStock', {
                  required: 'In Stock is required',
                  min: {
                    value: 1,
                    message: 'In Stock must have at least 1 unit'
                  }
                })}
              />
              {errors.inStock && (
                <p className={styles.errorMessage}>
                  * {errors.inStock.message}
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
                    <button
                      key={size}
                      type="button"
                      className={clsx(styles.formSize, {
                        [styles.formSelectedSize]: getValues('sizes').includes(size),
                      })}
                      onClick={() => onSizeChanged(size)}
                    >{size}</button>
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

              {(product.images && (product.images.length !== 0)) && (
                <>
                  <h2 className="text-2xl text-gray-700 mb-2">Loaded Images</h2>
                  <div className={clsx(`grid grid-cols-2 md:grid-cols-3 gap-3`, {
                    'lg:grid-cols-2': product?.images?.length === 2,
                    'lg:grid-cols-4': product?.images?.length === 4,
                  })}>
                    { product?.images?.map((image) => (
                      <div key={image.id} className="flex flex-col gap-4 relative">
                        <img
                          
                          className={clsx(`w-full max-w-200px md:max-w-[180px] shadow-md p-1 border-2 border-white bg-white rounded`, {
                            'lg:max-w-[400px]': product?.images?.length === 2,
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