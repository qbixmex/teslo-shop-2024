export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  role: 'admin' | 'user';
  image?: string | null;
}