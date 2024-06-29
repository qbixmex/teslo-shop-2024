import clsx from "clsx";
import { FC } from "react";
import { IoWarning, IoInformationCircle } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa6";

type Props = {
  children: string;
  type?: 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error';
  withIcon?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
};

const Alert: FC<Props> = ({
  children,
  type = 'info',
  withIcon = false,
  iconPosition = 'left',
  className,
}) => {
  return (
    <div className={clsx(
      [
        className,
        "flex flex-row items-center justify-center gap-2 text-white py-4 mb-5 rounded"
      ], {
      "flex-row-reverse": iconPosition === "right",
      "bg-blue-500": type === "primary",
      "bg-sky-500": type === "info",
      "bg-orange-500": type === "warning",
      "bg-emerald-500": type === "success",
      "bg-red-500": type === "error",
    })}>
      {(withIcon && (type === "error") || (type === "warning")) && (<IoWarning size={25} />)}
      {(withIcon && (type === "primary") || (type === "info")) && (<IoInformationCircle size={25} />)}
      {withIcon && type === "success" && <FaThumbsUp size={25} />}
      <span className="text-lg font-semibold">{children}</span>
    </div>
  );
};

export default Alert;