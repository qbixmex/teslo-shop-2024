"use client";

import { PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";

type Props = { children: React.ReactNode };

const paypalOptions: ReactPayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
  currency: "USD",
  intent: "capture",
};

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={paypalOptions}>
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  );
};

export default Providers;
