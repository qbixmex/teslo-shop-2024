import type { Metadata } from "next";
import styles from "./layout.module.css";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication System",
  robots: "noindex, nofollow",
};

type Props = { children: React.ReactNode; };

const AuthLayout: React.FC<Readonly<Props>> = async ({ children }) => {

  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <main className={styles.main}>
      {children}
    </main>
  );
};

export default AuthLayout;

