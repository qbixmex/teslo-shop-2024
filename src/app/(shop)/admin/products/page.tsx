import { FC } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { FaRobot } from "react-icons/fa6";
import { Pagination, ImagePlaceholderIcon, Title } from "@/components";
import { auth } from "@/auth.config";
import { getPaginatedProductsWithImages } from "@/actions";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { currencyFormat } from "@/utils";
import styles from "./page.module.css";

type Props = {
  searchParams: {
    page?: string;
  };
};

const ProductsPage: FC<Props> = async ({ searchParams }) => {

  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/login');
  }

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {
    totalPages,
    products,
    // currentPage,
  } = await getPaginatedProductsWithImages({ page });

  if (!products) {
    redirect('/');
  }

  return (
    <div className={styles.mainContainer}>
      <section className="flex justify-between items-center mb-2">
        <Title title="Manage Products" />
        <Link href="/admin/products/new" className={styles.createProductBtn}>
          Create Product
        </Link>
      </section>

      {(products.length === 0) && (
        <div className={styles.emptyContainer}>
          <h1 className={styles.emptyHeading}>There&apos;s no products created yet !</h1>
          <FaRobot className={styles.emptySvgIcon} />
          <Link href="/" className={styles.emptyBackBtn}>back</Link>
        </div>
      )}

      {(products.length > 0) && (
        <section className={styles.container}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th style={{ width: 50 }}>Image</th>
                <th>Title</th>
                <th style={{ width: 50 }}>Category</th>
                <th style={{ width: 50 }}>Gender</th>
                <th style={{ width: 50 }}>Stock</th>
                <th style={{ width: 50 }}>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((product) => (
                  <tr key={product.id} className={styles.tableBodyRow}>
                    <td className={styles.tableBodyColImage}>
                      <Link href={`/product/${product.slug}`}>
                        {!product.image && (
                          <ImagePlaceholderIcon size={80} className="text-neutral-500/50" />
                        )}
                        {product.image && (
                          <Image
                            width={80}
                            height={80}
                            alt={product.title}
                            src={`/products/${product.image}`}
                            className="w-[80px] h-[80px] object-cover rounded"
                          />
                        )}
                      </Link>
                    </td>
                    <td className={styles.tableBodyColLink}>
                      <Link href={`/product/${product.slug}`}>
                        {
                          (product.title.length >= 50)
                            ? product.title.substring(0, 50) + ' ...'
                            : product.title
                        }
                      </Link>
                    </td>
                    <td className={styles.tableBodyCol}>{ product.category }</td>
                    <td className={styles.tableBodyCol}>{ product.gender }</td>
                    <td className={styles.tableBodyCol}>{ product.stock }</td>
                    <td className={styles.tableBodyColPrice}>{ currencyFormat(product.price) }</td>
                    <td className={styles.tableBodyColActions}>
                      <Link
                        className={clsx([styles.iconButtons, styles.iconEdit])}
                        href={`/admin/products/${product.slug}`}
                        title="Edit Product Details"
                      >
                        <FaPencilAlt size={16} />
                      </Link>
                      {/* TODO Move this to Client Component */}
                      <button
                        className={clsx([styles.iconButtons, styles.iconRemove])}
                        title="Delete Product"
                      >
                        <FaTrash size={16} />
                      </button>
                      {/* ================================== */}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          <Pagination totalPages={totalPages} />
        </section>
      )}
    </div>
  );
};

export default ProductsPage;
