import NextAuth, { DefaultSession } from 'next-auth';
import { Role } from '@/interfaces';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: Date;
      role?: Role,
      image?: string | null;
    } & DefaultSession['user'];
  };
}