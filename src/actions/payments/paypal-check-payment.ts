'use server';

const paypalCheckPayment = async ( paypalTransactionId: string ) => {
  console.log({paypalTransactionId});

  const authToken = await getPayPalBearerToken();

  console.log("AUTH TOKEN:", authToken);

  if (!authToken) {
    return {
      ok: false,
      message: "Failed to get PayPal Token !",
    };
  }
};

type PaypalOAuthResponse = {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
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
    const response = await fetch(PAYPAL_OAUTH_URL, requestOptions);
    const { access_token } = await response.json() as PaypalOAuthResponse;
    return access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default paypalCheckPayment;
