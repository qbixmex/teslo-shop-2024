'use server';

import { PaypalOAuthResponse, PayPalOrderStatusResponse } from "@/interfaces";
import { prisma } from "@/lib";

const paypalCheckPayment = async ( paypalTransactionId: string ) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "Failed to get PayPal Token !",
    };
  }

  const orderStatus = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!orderStatus) {
    return {
      ok: false,
      message: "Failed to verify PayPal Payment !",
    };
  }

  const { status, purchase_units } = orderStatus;
  // TODO: Invoice ID
  // const {  } = purchase_units[0]; 

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Payment is not completed yet !",
    };
  }

  try {
    // Update database with the payment status.
    await prisma.order.update({
      where: { id: '9873240a-ff1a-47a0-9a40-ef3822b2698d' },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // TODO: Path Revalidate
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Failed to update database with payment status !",
    }
  }


};

/**
 * Get PayPal Token
 * @returns PayPal Bearer Token or null.
 */
const getPayPalBearerToken = async (): Promise<string | null> => {

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
  const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY ?? '';
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
    'utf-8'
  ).toString('base64');

  const customHeaders = new Headers();
  customHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  customHeaders.append(
    "Authorization",
    `Basic ${base64Token}`
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: customHeaders,
    body: urlencoded,
  };
  
  try {
    const response = await fetch(PAYPAL_OAUTH_URL, {
      ...requestOptions,
      cache: "no-cache",
    });
    const { access_token } = await response.json() as PaypalOAuthResponse;
    // console.log("ACCESS TOKEN", access_token);
    return access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Verify PayPal Payment and get Order Status.
 * @param paypalTransactionId PayPal Transaction ID.
 * @param token Bearer Token.
 * @returns PayPal Order Status Response or null.
 */
const verifyPayPalPayment = async (
  paypalTransactionId: string,
  token: string
): Promise<PayPalOrderStatusResponse | null> => {
  const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL ?? '';
  const customHeaders = new Headers();
  customHeaders.append(
    // Important: Space after "Bearer" is required !
    "Authorization", "Bearer" + " " + token
  );
  
  const requestOptions = {
    method: "GET",
    headers: customHeaders,
  };
  
  const URL = `${PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  try {
    const response = await fetch(URL, {
      ...requestOptions,
      cache: "no-cache",
    });
    const data = await response.json() as PayPalOrderStatusResponse;
    // console.log("DATA:", data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default paypalCheckPayment;
