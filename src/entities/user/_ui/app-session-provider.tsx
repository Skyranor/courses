import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function AppSessionProvider({ children }: { children?: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
