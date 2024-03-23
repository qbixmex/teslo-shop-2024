import type { Metadata } from "next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication System",
  robots: "noindex, nofollow",
};

type Props = { children: React.ReactNode; }

const AuthLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
};

export default AuthLayout;

