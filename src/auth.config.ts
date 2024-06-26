import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials);
        
        if (!parsedCredentials.success) {
          return null;
        }

        console.log("============== Parsed Credentials ==============");
        console.log("Parsed Credentials:", parsedCredentials.success);

        const { email, password } = parsedCredentials.data;

        console.log("============= CREDENTIALS =============");
        console.log("EMAIL:", email);
        console.log("PASSWORD:", password);
        console.log("=======================================");

        // 1. Search email.
        // 2. Compare passwords.
        // 3. Return user.

        return null;
      },
    }),
  ],
};

export const { signIn, signOut, auth } = NextAuth(authConfig);
