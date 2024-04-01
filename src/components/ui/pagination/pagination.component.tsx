import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  totalPages: number;
};

const Pagination: React.FC<Readonly<Props>> = ({ totalPages }) => {
  return (
    <section className="flex text-center justify-center mt-10">
      <nav aria-label="Page navigation example">
        <ul className="flex items-center list-style-none">
          <li className="page-item">
            <Link
              href="/?page=1"
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-stone-600 hover:bg-gray-200 focus:shadow-none"
            >
              <FaChevronLeft className="size-6" />
            </Link>
          </li>
          <li className="page-item">
            <Link
              href="#"
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >1</Link>
          </li>
          <li className="page-item active">
            <Link
              href="#"
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-700 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
            >
              2&nbsp;
              <span className="visually-hidden"></span>
            </Link>
          </li>
          <li className="page-item">
            <Link
              href="#"
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >3</Link>
            </li>
          <li className="page-item">
            <Link
              href="/?page=2"
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-stone-600 hover:bg-gray-200 focus:shadow-none"
            >
              <FaChevronRight className="size-6" />
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Pagination;
