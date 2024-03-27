import { QuantitySelector, SizeSelector, Title } from '@/components';
import styles from './page.module.css';
import Image from 'next/image';
import { initialData } from '@/seed/seed';
import Link from 'next/link';

const productsInCart = [
  initialData.products[25],
  initialData.products[35],
  initialData.products[40],
];

export const CartPage = () => {
  return (
    <section className={styles.container}>
      <section className="flex flex-col w-[1000px]">
        <Title title="Cart" />

        <section className="grid grid-col-1 gap-10 md:grid-col-2">
          {/* Cart */}
          <section className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link
              href="/"
              className="underline mb-5"
            >Continue Buying</Link>
          </section>
          {productsInCart.map(product => (
            <section
              key={product.slug}
              className="flex gap-5"
            >
              <Image
                src={`/products/${product.images[0]}`}
                width={200}
                height={200}
                alt={product.title}
                className="size-[200px] rounded object-cover"
              />
              <section className="">
                <h2 className="text-stone-700 text-2xl mb-4">{product.title}</h2>
                <QuantitySelector quantity={3} />
                <p className="text-green-600 text-xl font-bold mb-4">$ {product.price.toFixed(2)}</p>
                <button
                  className="bg-red-600 hover:bg-red-500 active:bg-red-200 px-4 py-2 text-white rounded-lg w-fit transition-colors"
                >remove</button>
              </section>
            </section>
          ))}
          
          {/* Checkout */}
        </section>
      </section>
    </section>
  );
};

export default CartPage;
