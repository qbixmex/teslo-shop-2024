import { FC } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { FaRobot } from "react-icons/fa6";
import { Pagination, Title } from "@/components";
import { auth } from "@/auth.config";
import { getPaginatedProductsWithImages } from "@/actions";
import { FaInfo, FaPencilAlt, FaTrash } from "react-icons/fa";
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
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

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
                <th style={{ width: 400 }}>Title</th>
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
                        <Image
                          width={50}
                          height={50}
                          alt={product.title}
                          src={`/products/${product.image}`}
                          className="w-[50px] h-[50px] object-cover rounded"
                        />
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
                        className={clsx([styles.iconButtons, styles.iconInfo])}
                        href={`/product/${123}`}
                        title="View Product Details"
                      >
                        <FaInfo size={16} />
                      </Link>
                      <Link
                        className={clsx([styles.iconButtons, styles.iconEdit])}
                        href={`/product/${123}`}
                        title="Edit Product Details"
                      >
                        <FaPencilAlt size={16} />
                      </Link>
                      <Link
                        className={clsx([styles.iconButtons, styles.iconRemove])}
                        href={`/product/${123}`}
                        title="Delete Product"
                      >
                        <FaTrash size={16} />
                      </Link>
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
