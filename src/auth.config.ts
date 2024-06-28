import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from './lib';

// const urls

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

        const userParsed = parsedCredentials.data;

        // 1. Search email.
        let user = await prisma.user.findUnique({
          where: {
            email: userParsed.email.toLowerCase(),
          }
        });

        if (!user) return null;

        // 2. Compare passwords.
        if (!bcrypt.compareSync(userParsed.password, user.password)) return null;

        const { password, ...userWithoutPassword } = user;

        // 3. Return user.
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user.role === 'admin';

      if (nextUrl.pathname.startsWith('/orders')) {
        return (isLoggedIn && isAdmin) ? true : false;
      }

      if (nextUrl.pathname.startsWith('/profile')) {
        return (isLoggedIn) ? true : false;
      }

      return true;
    },
    jwt({ token, user }) {
      
      if ( user ) {
        token.data = user;
      }

      return token;
    },
    session({ session, token }) {
      session.user = token.data as any;
      return session;
    },
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
