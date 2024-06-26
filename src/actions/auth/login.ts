'use server';

import { signIn } from "@/auth.config";

const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    console.log("================ FORM DATA ================");
    console.log("FORM DATA:", Object.fromEntries(formData))

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
      redirectTo: '/',
    });
  } catch (error) {
    // if ((error as Error).message.includes('CredentialsSignin')) {
      console.error(error);
      return 'Credentials Sign in failed. Check Logs !';
    // }
  }
};

export default authenticate;
