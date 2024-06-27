'use server';

import { signIn } from "@/auth.config";
import { sleep } from "@/utils";

const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await sleep(5);
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
      redirectTo: '/',
    });
  } catch (error) {
    // if ((error as Error).message.includes('CredentialsSignin')) {
      console.error(error);
      return 'Credentials Sign in failed !';
    // }
  }
};

export default authenticate;
