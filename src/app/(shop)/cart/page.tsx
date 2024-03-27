import { QuantitySelector, Title } from '@/components';
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
      <section className="flex flex-col mb-10">
        <Title title="Cart" />

        <span className="text-xl mb-2">Add more items</span>

        <Link
          href="/"
          className="underline"
        >Continue Buying</Link>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Cart */}
        <section className={styles.cart}>
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
              <section>
                <h2 className="text-stone-700 text-2xl mb-4">{product.title}</h2>
                <QuantitySelector quantity={3} />
                <p className="text-green-600 text-xl font-bold mb-4">$ {product.price.toFixed(2)}</p>
                <button
                  className="bg-red-600 hover:bg-red-500 active:bg-red-200 px-4 py-2 text-white rounded-lg w-fit transition-colors"
                >remove</button>
              </section>
            </section>
          ))}
        </section>
        
        {/* Checkout */}
        <section className={styles.summary}>
          <h2 className={styles.summaryHeading}>Order Summary</h2>

          <table className="w-full mb-5">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-2 text-stone-600 text-md font-semibold">Quantity:</th>
                <td className="text-left p-2">
                  <span className="text-blue-600 font-bold mr-2">3</span>
                  <span className="text-stone-500 text-sm">items</span>
                </td>
              </tr>
              <tr className="border-b">
                <th className="text-left p-2 text-stone-600 text-md font-semibold">Subtotal:</th>
                <td className="text-left p-2 text-blue-600 font-bold">$ 195.00</td>
              </tr>
              <tr className="border-b">
                <th className="text-left p-2 text-stone-600 text-md font-semibold">Tax:</th>
                <td className="text-left p-2">
                  <span className="text-blue-600 font-bold mr-3">$ 27.30</span>
                  <span className="text-stone-500 text-sm">(14%)</span>
                </td>
              </tr>
              <tr>
                <th className="text-left p-2 text-stone-600 text-xl font-semibold">Total:</th>
                <td className="text-left p-2">
                  <span className="text-green-600 font-bold text-xl mr-3">$ 222.30</span>
                  <span className="text-stone-500 text-sm">CAD</span>
                </td>
              </tr>
            </tbody>
          </table>

          <Link
            href="/checkout/address"
            className="bg-blue-600 hover:bg-blue-500 active:bg-green-200 px-4 py-2 text-white rounded block w-full mt-5 text-center transition-colors"
          >checkout</Link>

        </section>
      </section>

      </section>
  );
};

export default CartPage;
