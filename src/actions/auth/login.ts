'use server';

import { signIn } from "@/auth.config";
import { AuthError } from 'next-auth';

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Signin Successful';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return 'Credentials Sign in failed !';
        default:
          return 'Something went wrong.';
      }
    }

    return 'Unknown error occurred !';
  }
};

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password,  });

    return {
      ok: true,
      message: 'Signin Successful',
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        case 'CallbackRouteError':
          return 'Credentials Sign in failed !';
        default:
          return 'Something went wrong.';
      }
    }

    return 'Unknown error occurred !';
  }
};
