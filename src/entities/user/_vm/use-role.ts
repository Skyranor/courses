import { useAppSession } from "./use-app-session";

export const useRole = () => {
  const { data: session } = useAppSession();
  return session?.user.role;
};
