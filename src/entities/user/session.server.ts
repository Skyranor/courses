import { NeedAuthError } from "@/shared/lib/errors";
import { nextAuthConfig } from "./next-auth-config";
import { getServerSession } from "next-auth";

export const getAppSessionServer = () => {
  return getServerSession(nextAuthConfig);
};

export const getAppSessionStrictServer = async () => {
  const session = await getAppSessionServer();
  if (session === null) {
    throw new NeedAuthError("Session not found");
  }

  return session;
};
