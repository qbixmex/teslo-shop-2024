import { SessionProvider } from "next-auth/react";

type Props = { children: React.ReactNode };

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default Provider;
