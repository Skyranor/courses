import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

export const useAppSession = useSession;

export const useRole = () => {
  const { data: session } = useAppSession();
  return session?.user.role;
};

export function AppSessionProvider({ children }: { children?: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
