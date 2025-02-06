"use client";

import { useAppSession } from "@/entities/user/session.client";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

export function AuthorizedGuard({ children }: { children: ReactNode }) {
  const session = useAppSession();

  const isUnauthenticated = session.status === "unauthenticated";

  if (isUnauthenticated) {
    signIn();
  }

  const isLoading =
    session.status === "loading" || session.status === "unauthenticated";

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />
      {session.status === "authenticated" && children}
    </>
  );
}
