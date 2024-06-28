import { FC, ReactNode } from "react";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

const CheckoutLayout: FC<{children: ReactNode}> = async ({ children }) => {

  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login?redirectTo=/checkout/address');
  }

  return <>{children}</>;

};

export default CheckoutLayout;
