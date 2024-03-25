import { Product } from "@/interfaces";
import Image from "next/image";
import { FC } from "react";

type Props = { products: Product[]; }

const ProductGrid: FC<Props> = ({ products }) => {

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
      {
        products.map(product => (
          <div
            key={product.slug}
            className="border border-gray-400 rounded-md w-[100%]"
          >
            <figure>
              <Image
                src={`/products/${product.images[0]}`}
                alt={product.title}
                className="max-w-[640px] w-[100%] h-auto rounded-t-md"
                width={640}
                height={640}
              />
              <figcaption className="bg-gray-50 border-t rounded-b-md p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                <p className="text-sm text-gray-600">In stock: {product.inStock}</p>
              </figcaption>
            </figure>
          </div>
        ))
      }
    </section>
  );

};

export default ProductGrid;
